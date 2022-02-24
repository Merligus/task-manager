const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema
(
    {
        description: 
        {
            type: String,
            required: true,
            trim: true
        },
        completed:
        {
            type: Boolean,
            default: false,
        }
    }
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task

// const task = new Tasks
// (
//     {
//         description: "    task#2    ",
//     }
// )

// task.save().then
// (
//     () =>
//     {
//         console.log(task)
//     }
// ).catch
// (
//     (error) =>
//     {
//         console.log("Error", error)
//     }
// )

