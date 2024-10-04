import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware =(request,response,next) =>{
    const token = request.header('Authorization').replace('Bearer','')
    if(!token){
        return response.status(401).json({
            message : 'No Token Provided'
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        request.user=decoded
        next()        
    } catch (error) {
        return response.status(401).json({
            message : 'Invalid Token'
        })
    }
}

export default authMiddleware