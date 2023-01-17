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
        expect(response.body).toHaveProperty("user")
        expect(response.status).toBe(201)

    })

    test("GET /address - Must be able to list all address", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin)
        await request(app).post(`/address/${employeeLoginResponse.body.user.id}`).set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send(mockedEmployeeAddress)
        const response = await request(app).get("/address").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)

        expect(response.body).toHaveLength(2)
        expect(response.status).toBe(200)
    })

    test("GET /address - Should not be able to list address without authentication", async() => {
        const response = await request(app).get("/address")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /address - Should not be able to list address not being employee", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get("/address").set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("GET /address/:id - Should be able to user get a specific address", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get(`/address/${userLoginResponse.body.user.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("city")
        expect(response.body).toHaveProperty("state")
        expect(response.body).toHaveProperty("street")
        expect(response.body).toHaveProperty("zipCode")
        expect(response.body).toHaveProperty("neighborhood")
        expect(response.body).toHaveProperty("number")
        expect(response.body).toHaveProperty("user")
        expect(response.status).toBe(200)
    })

    test("PATCH /address/:id - Should not be able to update a address without authentication", async() => {
        const newValue = {street: "Nova Rua", number: "555"}
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const addressToBeUpdate = await request(app).get(`/address/${userLoginResponse.body.id}`)

        const response = await request(app).patch(`/address/${addressToBeUpdate.body.id}`).send(newValue)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /address/:id - Should not be able to update address with invalid id", async() => {
        const newValue = {street: "Nova Rua", number: "555"}
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);

        const response = await request(app).patch(`/address/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(newValue)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("PATCH /address/:id - Should not be able to update address id field", async() => {
        const newValue = {id: "13970660-5dbe-423a-9a9d-5c23b37943cf"}
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const addressToBeUpdate = await request(app).get("/address").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)

        const response = await request(app).patch(`/address/${addressToBeUpdate.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(newValue)

        expect(response.body.id).not.toEqual("13970660-5dbe-423a-9a9d-5c23b37943cf")
        expect(response.status).toBe(200)
    })

    test("PATCH /address/:id - Should be able to update address", async() => {
        const newValue = {street: "Nova Rua", number: "555"}
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);

        const addressToBeUpdate = await request(app).get(`/address/${userLoginResponse.body.user.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        const response = await request(app).patch(`/address/${addressToBeUpdate.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(newValue)

        expect(response.body.street).toEqual("Nova Rua")
        expect(response.body.number).toEqual("555")
        expect(response.status).toBe(200)
    })

    test("DELETE /address/:id - Should not be able to delete address without authentication", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const addressToBeDeleted = await request(app).get(`/address/${userLoginResponse.body.user.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        const response = await request(app).delete(`/address/${addressToBeDeleted.body.id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /address/:id - Should not be able to delete another user address not being employee", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);

        const addressToBeDeleted = await request(app).get(`/address/${employeeLoginResponse.body.user.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        const response = await request(app).delete(`/address/${addressToBeDeleted.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("DELETE /address/:id - Must be able to delete address", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);

        const addressToBeDeleted = await request(app).get(`/address/${userLoginResponse.body.user.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        const response = await request(app).delete(`/address/${userLoginResponse.body.user.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)
        console.log(userLoginResponse.body.user.id)
        console.log(response.body)
        console.log(addressToBeDeleted.body.id)
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);

        const addressList = await request(app).get("/address").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)

        expect(addressList.body).toHaveLength(1)
        expect(response.status).toBe(204)
    })
})