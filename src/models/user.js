const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model
(
    "User",
    {
        name: 
        {
            type: String, 
            required: true,
            trim: true
        },
        email:
        {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value)
            {
                if (!validator.isEmail(value))
                    throw new Error("Email is invalid")
            }
        },
        age: 
        {
            type: Number,
            default: 0,
            validate(value) 
            {
                if (value < 0)
                    throw new Error("Age must be a positive number")
            }
        },
        password:
        {
            type: String,
            required: true,
            trim: true,
            validate(value)
            {
                if (value.toLowerCase().includes("password"))
                    throw new Error("Password cannot contain password")

                if (value.length < 7)
                    throw new Error("Password length must be greater than 6")
            }
        }
    }
)

module.exports = User

// const me = new User
// (
//     {
//         name: "    JHOOON DENNIS ",
//         email: "   JOHNDENNIS@email.com   ",
//         password: " password23   "
//     }
// )

// me.save().then
// (
//     () =>
//     {
//         console.log(me)
//     }
// ).catch
// (
//     (error) =>
//     {
//         console.log("Error", error)
//     }
// )