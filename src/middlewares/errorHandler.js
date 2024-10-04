const errorHandler = (err,request,response,next) =>{
    response.status(500).json({
        message : 'Ocurrio un error',
        error: err.stack
    })
}

export default errorHandler