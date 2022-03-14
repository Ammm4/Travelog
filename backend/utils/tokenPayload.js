const tokenPayload = (user) => {
  return {
    userId: user._id,
    name: user.username,
    avatarURL: user.avatar.avatar_url,
    coverURL: user.cover.cover_url,
    email: user.email,
    about: user.about,
    country: user.country,
    city: user.city,
    hobbies: user.hobbies
  }
}
module.exports = tokenPayload