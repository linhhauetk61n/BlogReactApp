const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const route = require("./src/index");

//DB
const db = require("./src/config/db/index");
db.connect();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
route(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
