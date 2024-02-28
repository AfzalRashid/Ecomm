function notFound(req,res,next){
const error = new Error(`Not found - ${req.originUrl}`)
res.status(404)
next(error)
}

function errorHandler(err,req,res,next){
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'Resource not found'
        statusCode = 404
    }
    res.status(statusCode).json({
        message,
        stack: err.stack
})
}

module.exports ={
    notFound,
    errorHandler
}