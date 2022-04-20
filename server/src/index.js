const postRoute = require("./routes/postRoute");
const authRoute = require("./routes/authRoute");
function route(app) {
    app.use("/api/posts", postRoute);
    app.use("/api/auth", authRoute);
    app.use("/", (req, res) => res.send("App running"));
}
module.exports = route;
