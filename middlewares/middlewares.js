module.exports = {
    messageAppender(req, res, next) {
        req.body.message += 'you just got appended, breh!';
        next()
    }
}