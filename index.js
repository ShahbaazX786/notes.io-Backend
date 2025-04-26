require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require("./models/user.model");

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utils');

app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({ data: "Bismillah" });
});

app.post('/create-account', async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required!" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required!" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required!" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true, message: "User Already Exists"
        })
    }

    const user = new User({
        fullName, email, password
    })

    await user.save();

    const accessToken = jwt.sign(
        { id: user._id },  // payload
        process.env.ACCESS_TOKEN_SECRET,  // secret
        { expiresIn: "36000m" }  // options
    );
    return res.json({
        error: false, accessToken, message: "New User Registration Sucessful!"
    })
})

app.listen(7860);

module.exports = app;