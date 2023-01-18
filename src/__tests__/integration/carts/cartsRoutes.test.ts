import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedEmployee, mockedEmployeeLogin, mockedUser, mockedUserLogin } from "../../mocks";
import { Categories } from "../../../entities/categories.entity";
import { book1, book2 } from "../../mocks/books";
import { Books } from "../../../entities/books.entity";
import { Books_Cart } from "../../../entities/books_cart.entity";
import { response } from "express";
import { Cart } from "../../../entities/cart.entity";
describe("/carts", () => {
    let connection: DataSource
    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post("/users").send(mockedUser)
        await request(app).post("/users").send(mockedEmployee)

        const categoriesDb = connection.getRepository(Categories);
        const bookDb = connection.getRepository(Books);
    
        const aventura = categoriesDb.create({
          category_name: "Aventura",
          description: "Aventura muito legal",
        });
        const acao = categoriesDb.create({
          category_name: "Ação",
          description: "Livros genero acao",
        });
        await categoriesDb.save(aventura);
        await categoriesDb.save(acao);
        const categories = await request(app).get("/categories");
        await bookDb.save({
            ...book1,
            categoryId: categories.body[0].id,
          })
        await bookDb.save({
            ...book2,
            categoryId: categories.body[1].id,
          })
    })
    afterAll(async () => {
        await connection.destroy();
      });
    test("POST /carts - Must be able to create a cart and add a product", async() => {
        const employeeLoginResponse = await request(app)
        .post("/login")
        .send(mockedEmployeeLogin);
        
        const bookToBeAdd = await request(app).get("/books");
        const response = await request(app)
        .post(`/carts/${bookToBeAdd.body[0].id}`)
        .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("cart");
        expect(response.body).toHaveProperty("book");
        expect(response.status).toBe(201);
    });

    test("POST /carts - It should not be possible to create a book in the cart when the book does not exist", async() => {
        const employeeLoginResponse = await request(app)
        .post("/login")
        .send(mockedEmployeeLogin);

        const wrongBookUuid = "e035e3da-0f7f-43e6-a1e3-867f1fe138cd"
        
        const response = await request(app)
        .post(`/carts/${wrongBookUuid}`)
        .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("POST /carts - Must be able to list books from a cart", async() => {

      const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);
      
      const bookToBeAdd = await request(app).get("/books");
      const response = await request(app)
      .post(`/carts/${bookToBeAdd.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      await request(app)
      .post(`/carts/${bookToBeAdd.body[1].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)

      const responseGetCart = await request(app)
      .get(`/carts/${response.body.id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      //expect(responseGetCart.body).toHaveLength(0)
      expect(responseGetCart.status).toBe(200);
      expect(responseGetCart.body[0]).toHaveProperty("id")
      expect(responseGetCart.body[0]).toHaveProperty("cart")

    });
})