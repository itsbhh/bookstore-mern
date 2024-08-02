const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");

app.use(express.json());

//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);

//sending response
app.get("/", (req, res) => {
  res.send("Hello");
});

//creating Port
app.listen(process.env.PORT, () => {
  console.log("Server Working");
});
