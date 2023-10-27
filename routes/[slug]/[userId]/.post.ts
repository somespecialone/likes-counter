export default eventHandler(async (event) => {
  const { slug, userId } = event.context.params
  const { count = -1 } = await readBody(event)
  const config = useRuntimeConfig(event)
  const maxCount = Number(slug.split('::')[1]) || Number(config.defMaxLikesCount)

  if (userId === 'total') {
    throw createError({ statusCode: 400, statusMessage: "Invalid 'userId'" })
  }

  if (count < 0 || maxCount < count) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid "count" value' })
  }

  const { base } = useDeta(event)
  const totalKey = makeKey(slug, 'total')
  const userKey = makeKey(slug, userId)

  const userData = await base.get(userKey)
  if (userData) {
    const data = { likes: base.util.increment(count - (userData.likes as number)) }
    await Promise.all([base.update(data, userKey), base.update(data, totalKey)])
  } else {
    const data = { likes: base.util.increment(count) }
    await Promise.all([base.put({ likes: count }, userKey), base.update(data, totalKey)])
  }

  return null
})
