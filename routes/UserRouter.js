const express = require("express");
const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcrypt")
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const { AuthMiddleWare } = require("../Middleware/AuthMiddleware");
//Register
UserRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash });
            await user.save();
            res.status(200).send({ msg: "User Registered" })
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ "err": error.message })
    }

})


UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userId: user._id, username: user.name }, 'mock11');
                    res.status(200).send({ msg: "Login successfully", token: token, username: user.name, email: user.email })
                } else {
                    res.status(200).send({ msg: "email and password Mismatch" })
                }
            });
        }else{
            res.status(200).send({ msg: "email is not corrrect" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ "err": error.message })
    }
})

UserRouter.get("/profile", AuthMiddleWare, async (req, res) => {
    const { authorId } = req.body;
    const user = await UserModel.findOne({ _id: authorId })
    try {
        if (user) {
            res.status(200).send({ username: user.name, email: user.email })
        } else {
            res.send({ msg: "something went wrong" })
        }
    } catch (error) {
        console.log(error);
        res.send({ err: error.message })
    }
})

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userId: user._id, username: user.name }, 'mock11');
                    res.status(200).send({ msg: "Login successfully", token: token })
                } else {
                    res.status(400).send({ msg: "email and password Mismatch" })
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ "err": error.message })
    }
})

UserRouter.get("/logout", (req, res) => {
    
    localStorage.clear()
    res.send({ msg: "User logged out successfully" })
})


module.exports = {
    UserRouter
}