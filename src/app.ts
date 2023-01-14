import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "./errors";
import { sessionRouter } from "./routes";
import userRoutes from "./routes/users";
import { categoriesRoutes } from "./routes/categories";
import profileRoutes from "./routes/profile";
import { createNewBookController } from "./controllers/books/books.controller";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRoutes);
app.use("/profile", profileRoutes);
app.use("/books", createNewBookController);
app.use(handleAppError);

export default app;
