import jwt from "jsonwebtoken";

const AuthenticateMiddleware = (req, res, next) => {
    if(!req.session.token ||!req.headers.authorization){
        return res.status(401).json({ status: false, message: 'Access denied. Either Your Session Or Token Is Missing.'});
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: false, message: 'Access denied. Bearer token not provided.'});
    }
    const token = authHeader.split(' ')[1];
    if (req.session.token !== token) {
        return res.status(401).json({ status: false, message: 'Access denied. You Are Not Valid User Token Not Matched.'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify the token
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Invalid token.'});
    }
};

export default AuthenticateMiddleware;