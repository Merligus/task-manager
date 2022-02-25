const request = require("supertest")
const app = require("./../src/app")
const User = require("./../src/models/user")
const {userOneId, userOne, setupDatabase} = require("./fixtures/db")

beforeEach(setupDatabase)

test
(
    "Should signup a new user",
    async () =>
    {
        const response = await request(app)
                                .post("/users")
                                .send
                                (
                                    {
                                        name: "Mike",
                                        email: "mike@email.com",
                                        password: "1234567"
                                    }
                                )
                                .expect(201)

        // Assert the database created the new user
        const user = await User.findById(response.body.user._id)
        expect(user).not.toBeNull()

        // Assertions about the response
        expect(response.body).toMatchObject
        (
            {
                user:
                {
                    name: "Mike",
                    email: "mike@email.com"
                },
                token: user.tokens[0].token
            }
        )
        expect(user.password).not.toBe("1234567")
    }
)

test
(
    "Should login existing user",
    async () =>
    {
        const response = await request(app)
                                .post("/users/login")
                                .send
                                (
                                    {
                                        email: userOne.email,
                                        password: userOne.password
                                    }
                                )
                                .expect(200)
        
        const user = await User.findById(userOneId)
        expect(response.body.token).toBe(user.tokens[1].token)
    }
)

test
(
    "Should not login nonexistent user",
    async () =>
    {
        request(app).post("/users/login").send
        (
            {
                email: "john@email.com",
                password: "1234567"
            }
        ).expect(400)
    }
)

test
(
    "Should get profile for user",
    async () =>
    {
        await request(app)
            .get("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
    }
)

test
(
    "Should not get profile for unauthenticated user",
    async () =>
    {
        await request(app)
            .get("/users/me")
            .send()
            .expect(401)
    }
)

test
(
    "Should delete account for user",
    async () =>
    {
        await request(app)
            .delete("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)

        const user = await User.findById(userOneId)
        expect(user).toBeNull()
    }
)

test
(
    "Should not delete account for unauthenticated user",
    async () =>
    {
        await request(app)
            .delete("/users/me")
            .send()
            .expect(401)
    }
)

test
(
    "Should upload avatar image",
    async () =>
    {
        await request(app)
            .post("/users/me/avatar")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .attach("avatar", "tests/fixtures/profile-pic.jpg")
            .expect(200)
        const user = await User.findById(userOneId)
        expect(user.avatar).toEqual(expect.any(Buffer))
    }
)

test
(
    "Should update valid user fields",
    async () =>
    {
        await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send
            (
                {
                    name: userOne.name + " PATCHED",
                }
            )
            .expect(200)

        const user = await User.findById(userOneId)
        expect(user.name).toEqual(userOne.name + " PATCHED")
    }
)

test
(
    "Should not update invalid user fields",
    async () =>
    {
        await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send
            (
                {
                    location: "new location"
                }
            )
            .expect(400)
    }
)

// Should not signup user with invalid name/email/password
test
(
    "Should not signup a new user due to no name",
    async () =>
    {
        await request(app)
            .post("/users")
            .send
            (
                {
                    email: "mike1@email.com",
                    password: "1234567"
                }
            )
            .expect(400)
    }
)

test
(
    "Should not signup a new user due to no invalid email",
    async () =>
    {
        await request(app)
            .post("/users")
            .send
            (
                {
                    name: "mike2",
                    email: "mike2",
                    password: "1234567"
                }
            )
            .expect(400)
    }
)

test
(
    "Should not signup a new user due to no invalid password",
    async () =>
    {
        await request(app)
            .post("/users")
            .send
            (
                {
                    name: "mike3",
                    email: "mike3@email.com",
                    password: "123456"
                }
            )
            .expect(400)
    }
)

test
(
    "Should not signup a new user due to no invalid password",
    async () =>
    {
        await request(app)
            .post("/users")
            .send
            (
                {
                    name: "mike4",
                    email: "mike4@email.com",
                    password: "password"
                }
            )
            .expect(400)
    }
)

// Should not update user if unauthenticated
test
(
    "Should not update user if unauthenticated",
    async () =>
    {
        await request(app)
            .patch("/users/me")
            .send
            (
                {
                    name: userOne.name + " PATCHED",
                }
            )
            .expect(401)

        const user = await User.findById(userOneId)
        expect(user.name).toEqual(userOne.name)
    }
)

// Should not update user with invalid name/email/password
test
(
    "Should not update user with invalid email",
    async () =>
    {
        await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send
            (
                {
                    email: "InvalidEmail",
                }
            )
            .expect(400)

        const user = await User.findById(userOneId)
        expect(user.email).toEqual(userOne.email)
    }
)

test
(
    "Should not update user with invalid password",
    async () =>
    {
        await request(app)
            .patch("/users/me")
            .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
            .send
            (
                {
                    password: "password",
                }
            )
            .expect(400)
    }
)