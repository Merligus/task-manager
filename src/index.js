const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen
(
    port,
    () =>
    {
        console.log("Server is up on port " + port)
    }
)

// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// const myFunction = async () =>
// {
//     const token = jwt.sign({ _id: "abc123" }, "thisismytoken", {expiresIn: "2 seconds"})
//     console.log(token)

//     const data = jwt.verify(token, "thisismytoken")
//     console.log(data)
// }

// const myFunction = async () =>
// {
//     const password = "Red12345!"
//     const hashedPassword = await bcrypt.hash(password, 8)
    
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare("red12345!", hashedPassword)
//     console.log(isMatch)
// }

// myFunction()

// const Task = require("./models/task")
// const User = require("./models/user")
// const main = async () =>
// {
//     const task = await Task.findById("6217f737010e313210cdcfc9")
//     await task.populate("owner").execPopulate()
//     console.log(task.owner)

//     id = "6217f6fd010e313210cdcfc7"
//     const user = await User.findById(id)
//     await user.populate("tasks").execPopulate()
//     console.log(user.tasks)
// }

// main()

// const multer = require("multer")
// const upload = multer
// (
//     {
//         dest: "images"
//     }
// )
// app.post
// (
//     "/upload",
//     upload.single("upload"),
//     (req, res) =>
//     {
//         res.send()
//     }
// )