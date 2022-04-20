const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class AuthController {
    async signin(req, res) {
        // const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Username or password was incorrect",
                });
            }
            const isCorrectPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isCorrectPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password was incorrect",
                });
            }
            const accessToken = jwt.sign(
                { email: user.email, userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            const { password, ...returnUser } = user._doc;
            return res
                .status(200)
                .json({ success: true, user: { ...returnUser, accessToken } });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
    async signup(req, res) {
        // const { email, firstName, lastName, password } = req.body;

        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ success: false, message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                name: `${req.body.firstName} ${req.body.lastName}`,
            });
            const savedUser = await newUser.save();
            const accessToken = jwt.sign(
                { email: savedUser.email, userId: savedUser._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            const { password, ...returnUser } = savedUser._doc;
            return res
                .status(200)
                .json({ success: true, user: { ...returnUser, accessToken } });
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new AuthController();
