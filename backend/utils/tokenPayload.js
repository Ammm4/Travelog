const tokenPayload = (user) => {
  return {
    userId: user._id,
    name: user.username,
    avatarURL: user.avatar.avatar_url,
  }
}
module.exports = tokenPayload