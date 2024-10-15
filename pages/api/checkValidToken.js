import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    
    if (req.method === 'POST') {
        const { token } = req.body;

        if (!token) {
          return res.status(400).json({ isValid: false, message: "Token not provided" });
        }
      
        jwt.verify(token, process.env.JSON_SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(401).json({ isValid: false, message: "Invalid or expired token" });
          }
          return res.status(200).json({ isValid: true, decoded });
    });
    } else {
       return res.status(404).json({isValid: false,message:"invalid request "});
    }
}
