import mongoose from "mongoose";

export async function connectDB(dbURL) {
    await mongoose.connect(dbURL);
    console.log("New database connection established");
}

export async function getMongooseClient() {
    const mongooseClient = mongoose.connection.getClient();
    return mongooseClient;
}

export async function disconnectDB() {
    await mongoose.disconnect();
    console.log("Disconnected from database");
}
