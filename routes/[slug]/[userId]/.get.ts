export default eventHandler(async (event) => {
  const { slug, userId } = event.context.params

  if (userId === TOTAL_LIKES_POSTFIX || Array.isArray(userId)) {
    throw createError({ statusCode: 400, statusMessage: USER_ID_ERR_MSG })
  }

  const { base } = useDeta()
  const totalKey = makeKey(slug, TOTAL_LIKES_POSTFIX)
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
