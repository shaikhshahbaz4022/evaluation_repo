const express = require('express');
const postRouter = express.Router()

const jwt = require("jsonwebtoken");
const PostModel = require('../model/postModel');


postRouter.get("/", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token, 'privateKey');
    try {
        if (decoded) {
            const data = await PostModel.find({ "userID": decoded.userID })
            res.status(201).send(data)
        }
    } catch (error) {
        res.status(401).send({ "msg": error.message })

    }
})

postRouter.get("/top", async (req, res) => {
    let { page, q, sort } = req.query

    let val = sort =="asc" ? 1 : -1 
    let limit =3

    let skip = (+page -1)* limit

    let data = await PostModel.find().sort({device:val}).skip(skip).limit(limit)
    res.status(201).send(data)
})

postRouter.post("/add", async (req, res) => {
    try {
        let post = new PostModel(req.body)
        await post.save()
        res.status(201).send({ "msg": "Posts added Succesfully" })
    } catch (error) {
        res.status(401).send({ "msg": error.message })

    }
})
postRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    try {


        await PostModel.findByIdAndUpdate({ _id: id }, req.body)
        res.status(201).send({ "msg": "posts updated succesfully" })

    } catch (error) {
        res.status(401).send({ "msg": error.message })

    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {


        await PostModel.findByIdAndDelete({ _id: id })
        res.status(201).send({ "msg": "posts deleted succesfully" })

    } catch (error) {
        res.status(401).send({ "msg": error.message })

    }
})


module.exports = postRouter