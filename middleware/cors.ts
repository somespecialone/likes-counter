// https://github.com/nuxt/nuxt/issues/14598#issuecomment-1397361152

export default eventHandler((event) => {
  const config = useRuntimeConfig(event)

  getHeader(event, 'Origin') && setResponseHeaders(event, { 'Access-Control-Allow-Origin': config.allowOrigin })

  if (event.method === 'OPTIONS') {
    setResponseHeaders(event, {
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers': '*'
    })
    sendNoContent(event)
  }
})
