const supertest = require("supertest");
const app = require("../../app");

const loginInfo = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD,
};

describe("checkhealth", () => {
  it("should return OK", async () => {
    const { statusCode } = await supertest(app).get("/check_health");
    expect(statusCode).toBe(200);
  });
});

describe("/api/users", () => {
  it("should return OK", async () => {
    const { statusCode } = await supertest(app).get("/api/users");
    expect(statusCode).toBe(200);
  });
});

describe("api/users/login", () => {
  it("should return OK", async () => {
    const { statusCode, body } = await supertest(app)
      .post("/api/users/login")
      .send(loginInfo);
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("accessToken");
  });
});
