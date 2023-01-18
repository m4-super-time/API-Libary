import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { Books } from "../../../entities/books.entity"
import { Categories } from "../../../entities/categories.entity"
import { book1, book2 } from "../../mocks/books"
import { mockedEmployeeLogin, mockedUserLogin } from "../../mocks"

describe("/stocks", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        const categoriesDb = connection.getRepository(Categories)
        const booksDb = connection.getRepository(Books)

        const aventura = categoriesDb.create({category_name: "Aventura", description: "Aventura muito legal"})
        const acao = categoriesDb.create({category_name: "Ação", description: "Livros genero acao"})

        await categoriesDb.save(aventura)
        await categoriesDb.save(acao)

        book1.categoryId = aventura.id
        book2.categoryId = acao.id

        booksDb.create(book1)
        booksDb.create(book2)

        await booksDb.save(book1)
        await booksDb.save(book2)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /stocks/:id - Should not be able to add stock to book without authorization", async() => {
        const bookToAddStock = await request(app).get("/books")

        const response = await request(app).post(`/stock/${bookToAddStock.body[0].id}`).send({book_qntd: 100})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("POST /stocks/:id - Should not be able to add stock to book with invalid id", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);

        const response = await request(app).post(`/stock/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send({book_qntd: 100})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("POST /stocks/:id - Should not be able to add stock to book without employee permission", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);

        const bookToAddStock = await request(app).get("/books")

        const response = await request(app).post(`/stock/${bookToAddStock.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send({book_qntd: 100})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("POST /stocks/:id - Must be able to add stock to book", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);

        const bookToAddStock = await request(app).get("/books")

        const response = await request(app).post(`/stock/${bookToAddStock.body[0].id}`).set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send({book_qntd: 100})

        expect(response.body).toHaveProperty("id")
        expect(response.body.book_qntd).toEqual(100)
        expect(response.status).toBe(201)
    })

    test("POST /stocks/:id - Should not be able to add stock to book with already contain stock", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);

        const bookToAddStock = await request(app).get("/books")

        const response = await request(app).post(`/stock/${bookToAddStock.body[0].id}`).set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send({book_qntd: 100})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

    test("PATCH /stocks/:id - Should not be able to update stock of book without authorization", async() => {
        const bookToUpdateStock = await request(app).get("/books")

        const response = await request(app).post(`/stock/${bookToUpdateStock.body[0].id}`).send({book_qntd: 150})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /stocks/:id - Should not be able to update stock of book without employee permission", async() => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);

        const bookToUpdateStock = await request(app).get("/books")

        const response = await request(app).post(`/stock/${bookToUpdateStock.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send({book_qntd: 150})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("PATCH /stocks/:id - Must be able to update stock of book", async() => {
        const employeeLoginResponse = await request(app).post("/login").send(mockedEmployeeLogin);

        const bookToUpdateStock = await request(app).get("/books")

        const response = await request(app).post(`/stock/${bookToUpdateStock.body[0].id}`).set("Authorization", `Bearer ${employeeLoginResponse.body.token}`).send({book_qntd: 150})

        const bookToUpdatedStock = await request(app).get("/books")

        expect(bookToUpdatedStock.body[0].book_qntd).toEqual(150)
        expect(response.status).toBe(200)
    })


})