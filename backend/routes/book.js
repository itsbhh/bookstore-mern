const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//add book --admin
router.post("/add-book",  authenticateToken, async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" }); 
    }
})

module.exports = router;