import express from "express";
import path from "path";
import cors from 'cors';
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from 'cookie-parser';
import { conectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import ReviewRoutes from "./routes/review.route.js";
import productRoutes from "./routes/product.route.js";
import connectMongoDBSession from "connect-mongodb-session";

dotenv.config();
const app = express();
const port = process.env.PORT||5000;
const __dirname = path.resolve();
const MongoDBSession = connectMongoDBSession(session);

app.use(cors({
  origin: "http://localhost:2000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));
const sessionStorage = new MongoDBSession({
    uri:process.env.MONGO_URL,
    collection: "sessions"
})
app.use(session({
    secret: 'my-secret-key-8755657676464-oooooo+0000000',
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: { 
        secure: true,
        maxAge: 1000*60*50*24
     }
  }))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({limit:"150mb", extended: true }));


app.use("/api/order",orderRoute);
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/products",ReviewRoutes);

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