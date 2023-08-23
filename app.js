const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "64e53fc6e8d5ec0cb993265d",
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
  console.log("this is working");
});
