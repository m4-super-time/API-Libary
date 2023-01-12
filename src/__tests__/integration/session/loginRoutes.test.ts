import { DataSource } from "typeorm";
import request from "supertest";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";
import { mockedEmployee, mockedEmployeeLogin, mockedUser, mockedUserLogin } from "../../mocks";

describe("/login", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post("/users").send(mockedEmployee)
    })

    afterAll(async() => {
        await connection.destroy();
    })

    test("POST /login - should be able to login with the user", async () => {
        const response = await request(app).post("/login").send(mockedEmployeeLogin);

        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
    });

    test("POST /login - should not be able to login with user with incorrect password or email", async() => {
        const response = await request(app).post("/login").send({
            email: "felipe@teste.com",
            password: "1234567"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    });

    test("POST /login - should not be able to login with the user with isActive = false", async() => {
        await request(app).post("/users").send(mockedUser);
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);

        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)

        await request(app).delete(`/users/${userToBeDeleted.body[1].id}`).set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

        const response = await request(app).post("/login").send(mockedUserLogin);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    });
})