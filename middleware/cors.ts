// https://github.com/nuxt/nuxt/issues/14598#issuecomment-1397361152
export default eventHandler((event) => {
  const config = useRuntimeConfig(event)

  setResponseHeaders(event, { 'Access-Control-Allow-Origin': config.allowOrigin })

  if (getMethod(event) === 'OPTIONS') {
    setResponseHeaders(event, {
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers': '*'
    })
    event.res.statusCode = 204
    event.res.statusMessage = 'No Content.'
    return 'OK'
  }
})
