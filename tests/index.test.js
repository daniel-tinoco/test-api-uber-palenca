const supertest = require("supertest");
const app = require('../src/app.js');

describe("POST /uber/lign", () => {
  describe("given a access_token", async () => {
    const response = await supertest(app).post("/uber/lign").send({
      email: "pierre@palenca.com",
      password: "MyPwdChingon123"
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: "SUCCESS",
      access_token: "cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5"
    })
  })

  describe("bad request login", async () => {
    const response = await supertest(app).post("/uber/lign").send({
      email: "pierre@palenca.co",
      password: "MyPwdChingon123"
    })
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      message: "CREDENTIALS_INVALID",
      details: "Incorrect username or password"
    })
  })
})

describe("GET /uber/profile/:access_token", () => {
  describe("given a user profile", async () => {
    const response = await supertest(app).post("/uber/lign").send({
      access_token: "cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5"
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'SUCCESS',
      platform: 'uber',
      profile: {
        email: 'pierre@palenca.com',
        name: 'Pierre'
      }
    })
  })

  describe("bad request user profile", async () => {
    const response = await supertest(app).post("/uber/lign").send({
      access_token: "cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5_WRONG"
    })
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      message: 'CREDENTIALS_INVALID',
      details: 'Incorrect token'
    })
  })
})