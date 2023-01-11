import { DataSource } from "typeorm";
import request from "supertest";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";
import { mockedEmployee, mockedEmployeeLogin, mockedUser, mockedUserLogin } from "../../mocks";


describe("/users", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        })
    });

    afterAll(async() => {
        await connection.destroy();
    });

    test("POST /users - Must be able to create a user", async() => {
        const response = await request(app).post("/users").send(mockedUser);

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("isEmployee")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Sarah")
        expect(response.body.email).toEqual("sarah@teste.com")
        expect(response.body.isEmployee).toEqual(false)
        expect(response.body.isActive).toEqual(true)
        expect(response.status).toBe(201)
    });

    test("POST /users - Should not be able to create a repeated user", async() => {
        const response = await request(app).post("/users").send(mockedUser);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });

    test("GET /users - Must be able to list users", async() => {
        await request(app).post("/users").send(mockedEmployee);
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

        expect(response.body).toHaveLength(2)
        expect(response.body[0]).not.toHaveProperty("password")
    });

    test("GET /users - Should not be able to list users without authentication", async() => {
        const response = await request(app).get("/users")

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("GET /users - Should not be able to list users not being employee", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    });

    test("DELETE /users/:id - Should not be able to delete user without authentication", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("DELETE /users/:id - should not be able to delete another user without employee permission",async () => {

        const userLoginResponse = await request(app).post("/login").send(mockedUser);
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);
        const userToken = `Bearer ${userLoginResponse.body.token}`
        const employeeToken = `Bearer ${employeeLoginResponse.body.token}`
        
        const userTobeDeletedRequest = await request(app).get("/users").set("Authorization", employeeToken)
        const userTobeDeleteId = userTobeDeletedRequest.body[1].id

        const response = await request(app).delete(`/users/${userTobeDeleteId}`).set("Authorization",userToken)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

})