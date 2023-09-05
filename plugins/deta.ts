import { Deta } from 'deta'

export default defineNitroPlugin((a) => {
  const config = useRuntimeConfig()
  const deta = Deta(config.detaProjectKey)
  const base = deta.Base(config.detaBaseName)

  // @ts-ignore
  a._deta = { base }
})
