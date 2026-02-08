import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDb = async () => {
    try {
        const connectMongoDb = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MongoDb Connected`);
    } catch (error) {
        console.log("MongoDb connection Failed : ", error);
        process.exit(1);
    }
};

export default connectDb;