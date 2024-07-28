const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");


//routes
app.use("/api/v1", user);

//sending response
app.get("/", (req, res) => {
  res.send("Hello");
});

//creating Port
app.listen(process.env.PORT, () => {
  console.log("Server Working");
});
