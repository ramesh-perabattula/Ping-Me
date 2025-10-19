const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "User Not Authorized" });
    }

    const decoded = jwt.verify(token, "ramesh2317");

     req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "User Not Authorized" });
  }
};

module.exports = authMiddleware;
