import { RateLimiterMemory } from "rate-limiter-flexible"

const rateLimiter = new RateLimiterMemory ({
    points: 5,
    duration : 1
})

const rateLimitMiddleware = (request,response,next)=>{
    rateLimiter.consume(request.ip).then(()=>{next()}).catch(()=>{
        response.status.json({
            message:'Too many requests ass**le'
        })
    })
}

export default rateLimitMiddleware