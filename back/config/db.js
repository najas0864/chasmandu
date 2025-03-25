import { connect } from "mongoose";

export const conectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URL);
        console.log(`DB connected: ${conn.connection.host}`);
        
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}