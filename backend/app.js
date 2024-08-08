const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite= require("./routes/favourite");
const Cart=require("./routes/cart");

app.use(express.json());

//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
//sending response
app.get("/", (req, res) => {
  res.send("Hello");
});

//creating Port
app.listen(process.env.PORT, () => {
  console.log("Server Working");
});
