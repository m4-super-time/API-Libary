import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedEmployee, mockedEmployeeAddress, mockedEmployeeLogin, mockedUser, mockedUserAddress, mockedUserLogin } from "../../mocks";


describe("/address", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post("/users").send(mockedUser)
        await request(app).post("/users").send(mockedEmployee)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /address/:id - Must be able to create a address", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)
        const response = await request(app).post(`/address/${userLoginResponse.body.user.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedUserAddress)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("city")
        expect(response.body).toHaveProperty("state")
        expect(response.body).toHaveProperty("street")
        expect(response.body).toHaveProperty("zipCode")
        expect(response.body).toHaveProperty("neighborhood")
        expect(response.body).toHaveProperty("number")
        expect(response.body).toHaveProperty("userId")
        expect(response.status).toBe(201)

    })

    test("GET /address - Must be able to list all address", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin)
        await request(app).post(`/address/${employeeLoginResponse.body.user.id}`).set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send(mockedEmployeeAddress)
        const response = await request(app).get("/address").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)

        expect(response.body).toHaveLength(2)
        expect(response.status).toBe(200)
    })
})