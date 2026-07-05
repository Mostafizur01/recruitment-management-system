import jwt  from 'jsonwebtoken'

export const verifyToken =  (req, res, next) => {
    const token =  req.headers.authorization?.split(' ')[1]
    if(!token) {
        return res.status(403).json({message: 'You have to login'})
    }
    try {
        const verified = jwt.verify(token, process.env.KEY)
        req.user = verified
        next()
    } catch (error) {
        res.status(501).json({message: 'Invalid token'})
    }
}