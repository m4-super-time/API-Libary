import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "./errors";
import { sessionRouter } from "./routes";
import userRoutes from "./routes/users";
import { categoriesRoutes } from "./routes/categories";
import profileRoutes from "./routes/profile";
import { booksRoutes } from "./routes/books";
import addressRouter from "./routes/address/addressRouter";
import stockRoutes from "./routes/stock";
import { cartsRoutes } from "./routes/carts";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRoutes);
app.use("/profile", profileRoutes);
app.use("/books", booksRoutes);
app.use("/address", addressRouter);
app.use("/stocks", stockRoutes);
app.use("/carts", cartsRoutes);
app.use(handleAppError);

export default app;
