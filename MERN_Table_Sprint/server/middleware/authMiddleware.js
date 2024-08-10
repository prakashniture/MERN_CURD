export const authMiddleware = (req, res, next) => {
  console.log('Authorization Header:', req.headers['authorization']);
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
