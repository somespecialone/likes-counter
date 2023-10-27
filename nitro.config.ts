// https://nitro.unjs.io/config
export default defineNitroConfig({
  runtimeConfig: {
    detaProjectKey: '',
    detaBaseName: 'likes-counter',
    defMaxLikesCount: 1,
    defIdLength: 10,
    allowOrigin: '*'
  },
  noPublicDir: true
})
