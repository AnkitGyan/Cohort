const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.USER_JWT_PASSWORD;

const userMiddleware = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Credentials" });
  }
};