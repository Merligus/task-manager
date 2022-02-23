// Create, read, update, and delete

// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const {MongoClient, ObjectID} = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)

MongoClient.connect
(
    connectionURL, 
    {useNewUrlParser: true}, 
    (error, client) =>
    {
        if (error)
            return console.log("Unable to connect to database")
        
        const db = client.db(databaseName)

        // db.collection("users").insertOne
        // (
        //     {
        //         name: "Merligus",
        //         age: 20
        //     },
        //     (error, result) => 
        //     {
        //         if (error)
        //             return console.log("Unable to insert user")
                
        //         console.log(result.ops)
        //     }
        // )

        // db.collection("users").insertMany
        // (
        //     [
        //         {
        //             name: "John",
        //             age: 28
        //         },
        //         {
        //             name: "Jane",
        //             age: 30
        //         },
        //         {
        //             name: "Mike",
        //             age: 21
        //         }
        //     ],
        //     (error, result) =>
        //     {
        //         if (error)
        //             console.log("Unable to insert documents")

        //             console.log(result.ops)
        //     }
        // )

        // db.collection("tasks").insertMany
        // (
        //     [
        //         {
        //             description: "Task#1",
        //             completed: true
        //         },
        //         {
        //             description: "Task#2",
        //             completed: false
        //         },
        //         {
        //             description: "Task#3",
        //             completed: true
        //         }
        //     ],
        //     (error, result) =>
        //     {
        //         if (error)
        //             console.log("Unable to insert tasks documents")

        //         console.log(result.ops)
        //     }
        // )

        // db.collection("tasks").findOne
        // (
        //     {
        //         _id: new ObjectID("6215728348760a37747d8dcd")
        //     },
        //     (error, task) =>
        //     {
        //         if (error)
        //             return console.log("Unable to find last task")
                
        //         console.log(task)
        //     }
        // )

        // db.collection("tasks").find({ completed: false }).toArray
        // (
        //     (error, tasks) =>
        //     {
        //         if (error)
        //             return console.log("Unable to find tasks not completed")

        //         console.log(tasks)
        //     }
        // )

        // db.collection("users").updateOne
        // (
        //     {
        //         _id: new ObjectID("621574890f1c180be0c23eba")
        //     },
        //     {
        //         $set:
        //         {
        //             name: "Mike"
        //         },
        //         $inc:
        //         {
        //             age: 1
        //         }
        //     }
        // ).then
        // (
        //     (result) =>
        //     {
        //         console.log(result)
        //     }
        // ).catch
        // (
        //     (error) =>
        //     {
        //         console.log(error)
        //     }
        // )

        // db.collection("tasks").updateMany
        // (
        //     {
        //         completed: false
        //     },
        //     {
        //         $set:
        //         {
        //             completed: true
        //         }
        //     }
        // ).then
        // (
        //     (result) =>
        //     {
        //         console.log(result)
        //     }
        // ).catch
        // (
        //     (error) =>
        //     {
        //         console.log(error)
        //     }
        // )

        // db.collection("users").deleteMany
        // (
        //     {
        //         age: 
        //         {
        //             $gte: 28
        //         }
        //     }
        // ).then
        // (
        //     (result) =>
        //     {
        //         console.log(result)
        //     }
        // ).catch
        // (
        //     (error) =>
        //     {
        //         console.log(error)
        //     }
        // )

        // db.collection("tasks").deleteOne
        // (
        //     {
        //         description: "Task#2"
        //     }
        // ).then
        // (
        //     (result) =>
        //     {
        //         console.log(result)
        //     }
        // ).catch
        // (
        //     (error) =>
        //     {
        //         console.log(error)
        //     }
        // )
    }
)