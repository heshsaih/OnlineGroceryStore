import mongoose, { Error } from "mongoose";

export const connectToMongoDB = async () => {
    await mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/db", {
            serverSelectionTimeoutMS: 10000
        }).then(() => {
            console.log("Connection to a database has been successful");
        }).catch( async (error) => {
            console.log(error);
            if (error instanceof Error.MongooseServerSelectionError) {
                console.log("Trying to connect again...");
                await connectToMongoDB();
            }
        });
}