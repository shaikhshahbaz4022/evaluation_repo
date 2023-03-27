const express = require('express');
const connection = require('./connection/connection');
const cors = require("cors");
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
require("dotenv").config()
const auth = require('./middleware/auth');

const app = express()

app.use(express.json())

app.use(cors())

app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)



app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to Database succesfully");
    } catch (error) {
        console.log(error);
        console.log("Some error while connicting to DB");
    }
    console.log("server is connected to port no 8000 ");
})