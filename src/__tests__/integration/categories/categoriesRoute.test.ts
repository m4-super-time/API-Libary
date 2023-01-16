import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { Categories } from "../../../entities/categories.entity";


describe("/categories", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        })

        const categoriesDb = connection.getRepository(Categories)

        const aventura = categoriesDb.create({category_name: "Aventura", description: "Aventura muito legal"})
        const acao = categoriesDb.create({category_name: "Ação", description: "Livros genero acao"})

        await categoriesDb.save(aventura)
        await categoriesDb.save(acao)

    })

    test("GET /categories - Must be able to list all categories", async() => {
        const response = await request(app).get("/categories")
        
        expect(response.body).toHaveLength(2)
        expect(response.status).toBe(200)
    })

    test("GET /categories/:id - Should not be able to list specific category with invalid id", async() => {
        const response = await request(app).get("/categories/13970660-5dbe-423a-9a9d-5c23b37943cf")
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("GET /categories - Must be able to list specific category", async() => {
        const categories = await request(app).get("/categories")

        const response = await request(app).get(`/categories/${categories.body[0].id}`)
        
        expect(response.body.id).toEqual(categories.body[0].id)
        expect(response.status).toBe(200)
    })

})