const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")

const uploadRoutes = require("./routes/upload.routes");

const captionRoutes = require("./routes/caption.routes")

const app = express();


// Middlewares

app.use(cors({
    origin: "https://instacaply.vercel.app",
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

// Routes 
app.use("/api/auth", authRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/captions", captionRoutes)




// Test route

app.get("/", (req, res) => {
    res.json({
        message: "AI Caption Studio API is running"
    });
});


module.exports = app;
