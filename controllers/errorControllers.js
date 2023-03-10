const sendErrorDev = (err, req, res) => {
    return res.status(err.statuscode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}
module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500
    err.status = err.status || "error"
    let error = Object.defineProperties({}, Object.getOwnPropertyDescriptors(err))

    if (err.name == 'CastError') error = handleCastErrorDB(error)

    sendErrorProd(error, req, res)
}