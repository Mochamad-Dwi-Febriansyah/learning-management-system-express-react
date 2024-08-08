const  jwt = require("jsonwebtoken")

// Array untuk menyimpan token yang di-blacklist
const tokenBlacklist = [];

const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            status: 401,
            message: "Token diperlukan"
        });
    }

    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    // Periksa apakah token ada di blacklist
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({
            status: 401,
            message: "Token tidak valid"
        });
    }

    try {
        const jwtDecode = jwt.verify(token, secret);
        req.userData = jwtDecode;
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized user"
        });
    }
    next();
};

module.exports = {
      accessValidation,
tokenBlacklist
}

