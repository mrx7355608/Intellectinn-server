import mongoose from "mongoose";

let cachedConnection = null;

export async function connectDB() {
    if (cachedConnection) {
        console.log("using already established connection");
        return cachedConnection;
    }

    const dbURL = process.env.DB_URL;
    cachedConnection = await mongoose.connect(dbURL);
    console.log("New database connection established");

    return cachedConnection;
}
