const request = require("supertest")
const app = require("../../app")
const userSrv = require("../../services/user")
const { jwtVerify } = require("../../utils/jwt")
const User = require("../../models/user")

jest.mock("../../services/user")
jest.mock("../../utils/jwt")
jest.mock("../../models/user")

describe("User Controller Tests", () => {
  const mockUser = {
    id: "1",
    userName: "testUser",
    accountNumber: "123456",
    emailAddress: "test@example.com",
    identityNumber: "ID12345",
  }

  beforeAll(() => {
    jwtVerify.mockReturnValue({ id: "1" })
    User.findById.mockResolvedValue(mockUser)
  })
  describe("Create User", () => {
    test("should create a new user and return 201", async () => {
      const mockUser = {
        id: "1",
        userName: "testUser",
        accountNumber: "123456",
        emailAddress: "test@example.com",
        identityNumber: "ID12345",
        password: "hashedPassword",
      }
      userSrv.createUser.mockResolvedValue(mockUser)

      const res = await request(app).post("/users").send({
        userName: "testUser",
        accountNumber: "123456",
        emailAddress: "test@example.com",
        identityNumber: "ID12345",
        password: "password123",
      })

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty("message", "Successfully create user")
      expect(res.body.data).toEqual(mockUser)
    })

    test("should handle errors when creating a user", async () => {
      userSrv.createUser.mockRejectedValue(new Error("Error creating user"))

      const res = await request(app).post("/users").send({
        userName: "testUser",
        accountNumber: "123456",
        emailAddress: "test@example.com",
        identityNumber: "ID12345",
        password: "password123",
      })

      expect(res.status).toBe(500)
    })
  })

  describe("Find User by ID", () => {
    test("should return user data by ID and return 200", async () => {
      const mockUser = {
        id: "1",
        userName: "testUser",
        accountNumber: "123456",
        emailAddress: "test@example.com",
        identityNumber: "ID12345",
      }
      userSrv.findUserById.mockResolvedValue(mockUser)

      const res = await request(app).get("/users/1")

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("message", "Successfully find user")
      expect(res.body.data).toEqual(mockUser)
    })

    test("should handle errors when finding user by ID", async () => {
      userSrv.findUserById.mockRejectedValue(new Error("Error finding user"))

      const res = await request(app).get("/users/1")

      expect(res.status).toBe(500)
    })
  })

  describe("Find Users", () => {
    test("should return users based on query params and return 200", async () => {
      const mockUsers = [
        { id: "1", userName: "testUser1" },
        { id: "2", userName: "testUser2" },
      ]
      userSrv.findUsers.mockResolvedValue(mockUsers)

      const res = await request(app).get("/users?accountNumber=123")

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("message", "Successfully find users")
      expect(res.body.data).toEqual(mockUsers)
    })

    test("should handle errors when finding users", async () => {
      userSrv.findUsers.mockRejectedValue(new Error("Error finding users"))

      const res = await request(app).get("/users?accountNumber=123")

      expect(res.status).toBe(500)
    })
  })

  describe("Update User", () => {
    test("should update a user and return 200", async () => {
      const updatedUser = {
        id: "1",
        userName: "updatedUser",
        accountNumber: "654321",
        emailAddress: "updated@example.com",
        identityNumber: "ID54321",
      }
      userSrv.updateUser.mockResolvedValue(updatedUser)

      const res = await request(app)
        .put("/users/1")
        .set("Authorization", "Bearer valid_token")
        .send({
          userName: "updatedUser",
          accountNumber: "654321",
          emailAddress: "updated@example.com",
          identityNumber: "ID54321",
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("message", "Successfully update user")
      expect(res.body.data).toEqual(updatedUser)
    })

    test("should handle unauthorized access when user IDs do not match", async () => {
      const differentUserId = "2"
      User.findById.mockResolvedValue(mockUser)

      const res = await request(app)
        .put(`/users/${differentUserId}`)
        .set("Authorization", "Bearer valid_token")
        .send({
          userName: "updatedUser",
          accountNumber: "654321",
          emailAddress: "updated@example.com",
          identityNumber: "ID54321",
        })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty("message", "You're unauthorized")
    })

    test("should handle errors when updating user", async () => {
      userSrv.updateUser.mockRejectedValue(new Error("Error updating user"))

      const res = await request(app)
        .put("/users/1")
        .set("Authorization", "Bearer valid_token") // Simulate authentication
        .send({
          userName: "updatedUser",
          accountNumber: "654321",
          emailAddress: "updated@example.com",
          identityNumber: "ID54321",
        })

      expect(res.status).toBe(500)
    })
  })

  describe("Delete User", () => {
    test("should delete a user and return 200", async () => {
      userSrv.deleteUserById.mockResolvedValue(null)

      const res = await request(app)
        .delete("/users/1")
        .set("Authorization", "Bearer valid_token") // Simulate authentication
        .send()

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("message", "Successfully delete user")
      expect(res.body.data).toBeNull()
    })

    test("should handle errors when deleting user", async () => {
      userSrv.deleteUserById.mockRejectedValue(new Error("Error deleting user"))

      const res = await request(app)
        .delete("/users/1")
        .set("Authorization", "Bearer valid_token") // Simulate authentication
        .send()

      expect(res.status).toBe(500)
    })
  })

  describe("Login", () => {
    test("should return access token after login", async () => {
      userSrv.login.mockResolvedValue("mocked-token")

      const res = await request(app)
        .post("/users/login")
        .send({ emailAddress: "test@example.com", password: "password123" })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("message", "Successfully login")
      expect(res.body.data).toHaveProperty("access_token", "mocked-token")
    })

    test("should handle errors during login", async () => {
      userSrv.login.mockRejectedValue(new Error("Login failed"))

      const res = await request(app)
        .post("/users/login")
        .send({ emailAddress: "test@example.com", password: "password123" })

      expect(res.status).toBe(500)
    })
  })
})
