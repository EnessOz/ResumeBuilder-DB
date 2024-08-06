import { verify } from 'jsonwebtoken';
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY_ENV;
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send("Access denied. No token provided.");
    }

    try {
        const decoded = verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};

export default authenticate;
