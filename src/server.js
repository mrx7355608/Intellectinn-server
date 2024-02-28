import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./utils/db.js";

const port = process.env.PORT || 5000;

async function startServer() {
    await connectDB();
    app.listen(port, () => {
        console.log("express server started on port", port);
    });
}

startServer();
