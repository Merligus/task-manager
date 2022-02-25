const request = require("supertest")
const { response } = require("./../src/app")
const app = require("./../src/app")
const Task = require("./../src/models/task")
const 
{
    userOneId, 
    userOne, 
    setupDatabase, 
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
} = require("./fixtures/db")

beforeEach(setupDatabase)

test
(
    "Should create task for user",
    async () =>
    {
        const response = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send
            (
                {
                    description: "task#1 test"
                }
            )
            .expect(201)

        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toEqual(false)
    }
)

test
(
    "Should get all tasks of user one",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?sortBy=createdAt:desc")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        expect(response.body.length).toBe(2)
    }
)

test
(
    "Should not delete other users tasks",
    async () =>
    {
        const response = await request(app)
            .delete("/tasks/" + encodeURI(taskThree._id))
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(404)

        const task = await Task.findById(taskThree._id)
        expect(task).not.toBeNull()
    }
)

// Should not create task with invalid description/completed
test
(
    "Should not create task with invalid description",
    async () =>
    {
        await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send({})
            .expect(400)
    }
)

test
(
    "Should not create task with invalid completed",
    async () =>
    {
        await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send({completed: 2})
            .expect(400)
    }
)

// Should not update task with invalid description/completed
test
(
    "Should not update task with invalid completed",
    async () =>
    {
        await request(app)
            .patch("/tasks/" + encodeURI(taskOne._id))
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send({completed: 2})
            .expect(500)
    }
)

// Should delete user task
test
(
    "Should delete user tasks",
    async () =>
    {
        const response = await request(app)
            .delete("/tasks/" + encodeURI(taskOne._id))
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)

        const task1 = await Task.findById(response.body._id)
        expect(task1).toBeNull()
        const task2 = await Task.findById(taskOne._id)
        expect(task2).toBeNull()
    }
)

// Should not delete task if unauthenticated
test
(
    "Should not delete task if unauthenticated",
    async () =>
    {
        await request(app)
            .delete("/tasks/" + encodeURI(taskOne._id))
            .send()
            .expect(401)

        const task = await Task.findById(taskOne._id)
        expect(task).not.toBeNull()
    }
)

// Should not update other users task
test
(
    "Should not update other users tasks",
    async () =>
    {
        const response = await request(app)
            .patch("/tasks/" + encodeURI(taskThree._id))
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send
            (
                {
                    description: taskThree.description + " PATCHED"
                }
            )
            .expect(404)

        const task = await Task.findById(taskThree._id)
        expect(task.description).toBe(taskThree.description)
    }
)

// Should fetch user task by id
test
(
    "Should fetch user task by id",
    async () =>
    {
        const response = await request(app)
            .get("/tasks/" + encodeURI(taskOne._id))
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)

        expect(response.body._id).toBe(taskOne._id.toString())
        expect(response.body.description).toBe(taskOne.description)
        expect(response.body.completed).toBe(taskOne.completed)
    }
)

// Should not fetch user task by id if unauthenticated
test
(
    "Should not fetch user task by id if unauthenticated",
    async () =>
    {
        await request(app)
            .get("/tasks/" + encodeURI(taskOne._id))
            .send()
            .expect(401)
    }
)

// Should not fetch other users task by id
test
(
    "Should not fetch other users task by id",
    async () =>
    {
        await request(app)
            .get("/tasks/" + encodeURI(taskThree._id))
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(404)
    }
)

// Should fetch only completed tasks
test
(
    "Should fetch only completed tasks",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?completed=true")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        response.body.forEach((task) => expect(task.completed).toBe(true))
    }
)

// Should fetch only incomplete tasks
test
(
    "Should fetch only incomplete tasks",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?completed=false")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        response.body.forEach((task) => expect(task.completed).toBe(false))
    }
)

// Should sort tasks by description/completed/createdAt/updatedAt
test
(
    "Should sort tasks by description",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?sortBy=description:desc")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        const checkDescending = (array) =>
        {
            for(let index = 1; index < array.length; index++)
            {
                expect(array[index - 1].description.localeCompare(array[index].description)).toBe(1)
            }
        }

        checkDescending(response.body)
    }
)

test
(
    "Should sort tasks by completed",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?sortBy=completed:desc")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        const checkDescending = (array) =>
        {
            for(let index = 1; index < array.length; index++)
            {
                expect(array[index - 1].completed | 0).toBeGreaterThanOrEqual(array[index].completed | 0)
            }
        }

        checkDescending(response.body)
    }
)

test
(
    "Should sort tasks by createdAt",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?sortBy=createdAt:desc")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        const checkDescending = (array) =>
        {
            for(let index = 1; index < array.length; index++)
            {
                const d1 = new Date(array[index - 1].createdAt)
                const d2 = new Date(array[index].createdAt)
                expect(d1.getTime()).toBeGreaterThanOrEqual(d2.getTime())
            }
        }

        checkDescending(response.body)
    }
)

test
(
    "Should sort tasks by updatedAt",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?sortBy=updatedAt:desc")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        const checkDescending = (array) =>
        {
            for(let index = 1; index < array.length; index++)
            {
                const d1 = new Date(array[index - 1].updatedAt)
                const d2 = new Date(array[index].updatedAt)
                expect(d1.getTime()).toBeGreaterThanOrEqual(d2.getTime())
            }
        }

        checkDescending(response.body)
    }
)

// Should fetch page of tasks
test
(
    "Should fetch page of tasks skipping 1",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?skip=1")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        expect(response.body.length).toBe(1)
    }
)

test
(
    "Should fetch page of tasks limited by 1",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?limit=1")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        expect(response.body.length).toBe(1)
    }
)

test
(
    "Should fetch page of tasks limited by 2",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?limit=2")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        expect(response.body.length).toBe(2)
    }
)

test
(
    "Should fetch page of tasks skipping 2",
    async () =>
    {
        const response = await request(app)
            .get("/tasks?skip=2")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(202)

        expect(response.body.length).toBe(0)
    }
)