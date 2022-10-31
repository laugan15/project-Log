const express = require("express");
const bodyParser = require("body-parser");
const logRouter = require("./routes/logRouter");
const messageError = require("./tools/messageError");
const cors = require("cors");
const messageErrorGlobal = require("./controllers/messageErrorGlobal");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/user", logRouter);

app.all("*", (req, res, next) => {
next(new messageError("Page not found", 404));
});
app.use(messageErrorGlobal);

module.exports = app;