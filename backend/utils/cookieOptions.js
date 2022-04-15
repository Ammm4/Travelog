const cookies = {
    expires:new Date(Date.now + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
}

module.exports = cookies;
