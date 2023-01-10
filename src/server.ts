import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
    console.log("Database initialized");

    const PORT = process.env.PORT;
    
    app.listen(PORT, () => {
        return console.log(`Server running on http://localhost:${PORT}`);
    });
});
