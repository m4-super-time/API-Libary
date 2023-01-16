import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { book1, book2 } from "../../mocks/books";
import { Categories } from "../../../entities/categories.entity";
import { mockedEmployee, mockedEmployeeLogin, mockedUser, mockedUserLogin } from "../../mocks";

describe("/books", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedEmployee);
    await request(app).post("/users").send(mockedUser);

    const categoriesDb = connection.getRepository(Categories);

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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /books - Must be able to create a book", async () => {
    const categories = await request(app).get("/categories");
    const createBook = {
      ...book1,
      categoryId: categories.body[0].id,
    };

    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(createBook);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("author");
    expect(response.body).toHaveProperty("category");
    expect(response.body).toHaveProperty("synopsis");
    expect(response.body.name).toEqual("Duna");
    expect(response.status).toBe(201);
  });

  test("POST /books - Should not be able to create book without authorization", async () => {
    const categories = await request(app).get("/categories");
    const createBook = {
      ...book1,
      categoryId: categories.body[0].id,
    };

    const response = await request(app).post("/books").send(createBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /books - Should not be able to create book without employee permission", async () => {
    const categories = await request(app).get("/categories");

    const createBook = {
      ...book2,
      categoryId: categories.body[1].id,
    };

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(createBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /books - Should not be able to create a repeated book", async () => {
    const categories = await request(app).get("/categories");

    const createBook = {
      ...book1,
      categoryId: categories.body[0].id,
    };

    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(createBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /books - Should not be able to create book with invalid category id", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);

    book2.categoryId = "";

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(book2);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /books - Must be able to list all book", async () => {
    const categories = await request(app).get("/categories");
    const createBook = {
      ...book2,
      categoryId: categories.body[1].id,
    };

    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);

    await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(createBook);

    const response = await request(app).get("/books");

    expect(response.body).toHaveLength(2);
    expect(response.status).toBe(200);
  });

  test("GET /books/:id - Must be able to get specific book", async () => {
    const books = await request(app).get("/books");

    const response = await request(app).get(`/books/${books.body[1].id}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Trono de Vidro");
    expect(response.status).toBe(200);
  });

  test("DELETE /books/:id - Should not be able to delete book without authorization", async () => {
    const books = await request(app).get("/books");

    const response = await request(app).delete(`/books/${books.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /books/:id - Should not be able to delete book not being employee", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const bookToBeDeleted = await request(app).get("/books");

    const response = await request(app)
      .delete(`/books/${bookToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /books/:id - Must be able to delete a book", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);
    const bookToBeDeleted = await request(app).get("/books");

    const response = await request(app)
      .delete(`/books/${bookToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    const findBook = await request(app).get("/books");

    expect(findBook.body).toHaveLength(1);
    expect(response.status).toBe(204);
  });

  test("DELETE /books/:id - Should not be able to delete book with invalid id", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);

    const response = await request(app)
      .delete("/books/13970660-5dbe-423a-9a9d-5c23b37943cf")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /books/:id - Should not be able to update book without authentication", async () => {
    const updatePrice = { price: 40.00 };
    const bookToBeUpdate = await request(app).get("/books");

    const response = await request(app)
      .patch(`/books/${bookToBeUpdate.body[0].id}`)
      .send(updatePrice);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /books/:id - Should not be able to update book with invalid id", async () => {
    const updatePrice = { price: 40.00 };
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);

    const response = await request(app)
      .patch(`/books/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(updatePrice);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /books/:id - Should not be able to update book id field", async () => {
    const updateId = { id: "13970660-5dbe-423a-9a9d-5c23b37943cf" };
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);
    const bookToBeUpdate = await request(app).get("/books");

    const response = await request(app)
      .patch(`/books/${bookToBeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(updateId);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /books/:id - Should not be able to update book not being employee", async () => {
    const updatePrice = { price: 40.0 };
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const bookToBeUpdate = await request(app).get("/books");

    const response = await request(app)
      .patch(`/books/${bookToBeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(updatePrice);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("PATCH /books/:id - Should be able to update book", async () => {
    const updatePrice = { price: 40.00 };
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployeeLogin);
    const bookToBeUpdate = await request(app).get("/books");

    const response = await request(app)
      .patch(`/books/${bookToBeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(updatePrice);

    const updatedBook = await request(app).get("/books");

    expect(updatedBook.body[0].id).toEqual(bookToBeUpdate.body[0].id)
    expect(updatedBook.body[0].name).toEqual("Trono de Vidro");
    expect(updatedBook.body[0].price).toEqual(40.0);
    expect(response.status).toBe(200);
  });
});
