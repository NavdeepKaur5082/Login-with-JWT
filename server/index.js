
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.listen(4000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server Started Successfully on Port 4000.");
    }
  });

mongoose.connect("mongodb+srv://navdeepkaur61:computer123@loginapp.u8b1v.mongodb.net/?retryWrites=true&w=majority&appName=LoginApp")
     .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);