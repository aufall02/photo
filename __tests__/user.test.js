const request = require("supertest")
const app = require("../app")
const { User } = require("../models")

const dataUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "terlanjuradmin"
}

// test untuk API register
describe("Test User register", () => {

  afterAll(async () => {
    try {
      await User.destroy({ where: {}})
    } catch (error) {
      console.log(error);
    }
  })

  it("Should be success created user", (done) => {
    request(app)
    .post("/users/register")
    .send(dataUser)
    .expect(201)
    .end((err, res) => {
      if (err) done(err)

      expect(res.body).toHaveProperty("id")
      expect(res.body).toHaveProperty("username")
      expect(res.body).toHaveProperty("email")
      expect(res.body.email).toEqual("admin@mail.com")
      done()

    })
  })  
})

describe("Test User Login", () => {
  beforeAll(async () => {
    try {
      await User.create(dataUser)
    } catch (error) {
      console.log(error);
    }
  })

  it("Should be login success", (done) => {
    request(app)
    .post("/users/login")
    .send({
      email: dataUser.email,
      password: dataUser.password
    })
    .expect(200)
    .end((err, res) => {
      if (err) done(err)

      expect(res.body).toHaveProperty("token")
      expect(typeof res.body.token).toEqual("string")
      done()
    })
  })

  it("Should be response 401", (done) => {
    request(app)
    .post("/users/login")
    .send({
      email: dataUser.email,
      password: "salapassword"
    })
    .expect(401)
    .end((err, res) => {
      if (err) done(err)

      expect(res.body).toHaveProperty("message")
      expect(res.body.message).toEqual("Incorrect password!")
      done()
    })
  })

  afterAll(async () => {
    try {
      await User.destroy({ where: {}})
    } catch (error) {
      console.log(error);
    }
  })
})