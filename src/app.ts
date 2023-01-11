import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "./errors";
import { sessionRouter } from "./routes";
import userRoutes from "./routes/users";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRouter);

app.use(handleAppError);

export default app;
