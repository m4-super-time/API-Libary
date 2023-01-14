import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "./errors";
import { sessionRouter } from "./routes";
import userRoutes from "./routes/users";
import { categoriesRoutes } from "./routes/categories";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRoutes);

app.use(handleAppError);

export default app;
