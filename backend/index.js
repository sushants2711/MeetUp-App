import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDb } from "./config/db.connect.js";
import eventRouter from "./router/event.route.js";


dotenv.config();

connectDb();

const PORT = process.env.PORT || 2450;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "https://meetup-app-sushant-singh.onrender.com",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/event", eventRouter);

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
});
