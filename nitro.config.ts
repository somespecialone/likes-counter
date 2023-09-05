// https://nitro.unjs.io/config
export default defineNitroConfig({
  imports: { dirs: ['constants'] },
  runtimeConfig: {
    detaProjectKey: '',
    detaBaseName: 'likes-counter',
    defMaxLikesCount: 1,
    defIdLength: 10,
    allowOrigin: '*'
  }
})
