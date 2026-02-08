import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true,
}));

// json data(form)
app.use(express.json({ limit: "16kb" }));

// url data(url)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// parse cookie
app.use(cookieParser());


app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});