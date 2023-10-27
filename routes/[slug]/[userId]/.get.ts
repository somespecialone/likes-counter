export default eventHandler(async (event) => {
  const { slug, userId } = event.context.params

  if (userId === 'total') {
    throw createError({ statusCode: 400, statusMessage: "Invalid 'userId'" })
  }

  const { base } = useDeta(event)
  const totalKey = makeKey(slug, 'total')
  const userKey = makeKey(slug, userId)

  let userLikes = 0
  let totalLikes = 0

  const [userData, totalData] = await Promise.all([base.get(userKey), base.get(totalKey)])

  if (userData) {
    userLikes = userData.likes as number
  }

  if (!totalData) {
    await base.put({ likes: 0 }, totalKey)
  } else {
    totalLikes = totalData.likes as number
  }

  return { userLikes, totalLikes }
})
