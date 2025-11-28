import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../Models/user.model.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const AuthMiddleware = (req, res, next) =>{
  const token = req.cookies.token
  if(!token) return res.status(401).json({message: 'Access token is missing', isExpired:true})
    
  jwt.verify(token, JWT_SECRET, async (error, decoded) =>{
      if(error) {
        return res.status(403).json({ message: 'Invalid token' })
      } else {
          const user = await User.findById(decoded.id).select("-password");
          if(user) {
            req.user = user
            next()
          } else {
            return res.json({ status: false })
          }
      }     
  })
}