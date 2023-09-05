import { nanoid } from 'nanoid'

export default eventHandler((event) => {
  const { len } = getQuery(event)
  const config = useRuntimeConfig(event)
  const idLen = Number(len) || Number(config.defIdLength)
  const id = nanoid(idLen)

  return { id }
})
