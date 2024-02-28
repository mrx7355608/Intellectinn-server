import "dotenv/config";
import { createAndSetupApp } from "./app.js";
import { connectDB } from "./utils/db.js";

const port = process.env.PORT || 5000;

async function start() {
    await connectDB();

    // Create app
    const app = createAndSetupApp();

    // Start listening
    app.listen(port, () => {
        console.log("express server started on port", port);
    });
}

start();
