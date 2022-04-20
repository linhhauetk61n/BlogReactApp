const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Access token is not valid",
                });
            }
            req.userId = user.userId;
            next();
        });
    } else {
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" });
    }
};

module.exports = verifyToken;
