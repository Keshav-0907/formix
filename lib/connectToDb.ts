import mongoose from "mongoose";

export async function connectToDb() {
    await mongoose.connect(process.env.MONGODB_URI as string).then(() => {
        console.log("Connected to MongoDB");
    }
    ).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    }
    );
}