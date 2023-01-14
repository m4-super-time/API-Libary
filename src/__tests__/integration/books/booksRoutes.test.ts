import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { book1, book2 } from "../../mocks/books";
import { Categories } from "../../../entities/categories.entity";
import { mockedEmployeeLogin, mockedUserLogin } from "../../mocks";


describe("/books", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        const categoriesDb = connection.getRepository(Categories)

        const aventura = categoriesDb.create({category_name: "Aventura", description: "Aventura muito legal"})
        const acao = categoriesDb.create({category_name: "Ação", description: "Livros genero acao"})

        await categoriesDb.save(aventura)
        await categoriesDb.save(acao)

    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /books - Must be able to create a book", async() => {
        const categories = await request(app).get("/categories");
        const createBook = {
            ...book1,
            categoryId: categories.body[0].id
        }

        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin)

        const response = await request(app).post("/books").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send(createBook)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("author")
        expect(response.body).toHaveProperty("categoryId")
        expect(response.body).toHaveProperty("synopsis")
        expect(response.body.name).toEqual("Duna")
        expect(response.status).toHaveProperty("201")
    })

    test("POST /books - Should not be able to create book without authorization", async() => {
        const categories = await request(app).get("/categories");
        const createBook = {
            ...book1,
            categoryId: categories.body[0].id
        }

        const response = await request(app).post("/books").send(createBook)

        expect(response.body).toHaveProperty("id")
        expect(response.status).toHaveProperty("201")
    })

    test("POST /books - Should not be able to create book without employee permission", async() => {
        const categories = await request(app).get("/categories")
        
        const createBook = {
            ...book2,
            categoryId: categories.body[1].id
        }

        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin)

        const response = await request(app).post("/books").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(createBook)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toHaveProperty("403")
    })

    test("POST /books - Should not be able to create a repeated book", async() => {
        const categories = await request(app).get("/categories")
        
        const createBook = {
            ...book1,
            categoryId: categories.body[0].id
        }

        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin)

        const response = await request(app).post("/books").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send(createBook)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toHaveProperty("409")
    })

    test("POST /books - Should not be able to create book with invalid category id", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin)

        const response = await request(app).post("/books").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send(book2)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /books - Must be able to list all book", async() => {
        const categories = await request(app).get("/categories");
        const createBook = {
            ...book2,
            categoryId: categories.body[1].id
        }

        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin)

        await request(app).post("/books").set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send(createBook)

        const response = await request(app).get("/books")

        expect(response.body).toHaveLength(2)
        expect(response.status).toHaveProperty("200")
    })

    test("GET /books/:id - Must be able to get specific book", async() => {
        const books = await request(app).get("/books")

        const response = await request(app).get(`/books/${books.body[1].id}`)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body.name).toEqual("Trono de Vidro")
        expect(response.status).toHaveProperty("200")
    })

})