import { promisify } from 'util'
import { exec } from 'child_process'
import { createServer } from 'http'

import { loadEnv } from 'vite'
import { test, beforeAll, expect, vi, describe, afterAll } from 'vitest'
import { SuperAgentTest, agent as _agent } from 'supertest'
import { Deta } from 'deta'

import { makeKey } from '../utils'

const MAX_LIKES = 10
const SLUG = `some-slug::${MAX_LIKES}`
const USER_ID = 'some-user-id'
const LIKES_URL = `/${SLUG}/${USER_ID}`

const execAsync = promisify(exec)

let agent: SuperAgentTest

beforeAll(async () => {
  Object.assign(process.env, loadEnv('', './', '')) // load .env from local testing

  vi.stubEnv('NITRO_DETA_BASE_NAME', 'test')
  vi.stubEnv('NITRO_PRESET', 'node')

  await execAsync('pnpm build')
  // @ts-ignore
  const { handler } = await import('../.output/server/index.mjs')
  agent = _agent(createServer(handler))
})

afterAll(async () => {
  const deta = Deta()
  const base = deta.Base(process.env.NITRO_DETA_BASE_NAME)

  await base.delete(makeKey(SLUG, USER_ID))
  await base.delete(makeKey(SLUG, 'total'))
})

describe('Generate route', () => {
  test('GET', async () => {
    const res = await agent.get('/generate').set('origin', 'https://example.com').expect(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.headers['cache-control']).toMatch(/no-store/)
    expect(res.headers['access-control-allow-origin']).toEqual(process.env.NITRO_ALLOW_ORIGIN || '*')
    expect(res.body.id).an('string').length(10)
  })
  test('GET with length', async () => {
    const res = await agent.get('/generate?len=15').expect(200)
    expect(res.body.id).an('string').length(15)
  })
})

describe('Likes routes', () => {
  test('GET', async () => {
    const res = await agent.get(LIKES_URL).set('origin', 'https://example.com').expect(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.headers['cache-control']).toMatch(/no-store/)
    expect(res.headers['access-control-allow-origin']).toEqual(process.env.NITRO_ALLOW_ORIGIN || '*')
    expect(res.body.userLikes).equal(0)
    expect(res.body.totalLikes).equal(0)
  })
  test('POST', async () => {
    await agent.post(LIKES_URL).send({ count: 1 }).expect(204)
  })
  test('GET updated', async () => {
    const res = await agent.get(LIKES_URL).expect(200)
    expect(res.body.userLikes).equal(1)
    expect(res.body.totalLikes).equal(1)
  })
  test('POST error', async () => {
    await agent
      .post(LIKES_URL)
      .send({ count: MAX_LIKES + 1 })
      .expect(400)
  })
})
