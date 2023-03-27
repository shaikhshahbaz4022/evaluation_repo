const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, gender, password: hash, age, city, is_married })
            await user.save()
            res.status(201).send({ "msg": "Registration Succesfull" })
        });
    } catch (error) {
        res.status(401).send({ "msg": "Some error occourd while  Registration" })

    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    res.status(201).send({ "msg": "login succesfull", "token": jwt.sign({ "userID": user._id }, "privateKey", { expiresIn: '1h' }) })
                } else {
                    res.status(401).send({ "msg": "wrong input,login failed" })
                }
            });
        } else {
            res.status(401).send({ "msg": "login failed,user is not present" })

        }
    } catch (error) {
        res.status(401).send({ "msg": "error occourd while login " })

    }
})







module.exports = userRouter