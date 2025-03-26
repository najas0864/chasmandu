import express from "express";
import path from "path";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { conectDB } from "./config/db.js";
import orderRoute from "./routes/order.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT||5000;
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:2000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({limit:"150mb", extended: true }));


app.use("/api/order",orderRoute);
app.use("/api/products",productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"/front/dist")));
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname, "front", "dist", "index.html"))
    })
}
app.listen(port,() =>{
    conectDB();
    console.log(`http://localhost:${port}`);
})