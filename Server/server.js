import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app=express()
const port = process.env.PORT || 5000


// Middlewares
app.use(express.json());
app.use(cors());

//API EndPoints
// app.use('/api/users')



app.get('/', (req, res) => {
  res.send('API is working');
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));