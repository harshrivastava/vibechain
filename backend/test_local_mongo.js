const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/vibechain";

console.log("Testing local MongoDB connection...");
mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 })
    .then(() => {
        console.log("Local MongoDB Connected!");
        process.exit(0);
    })
    .catch(err => {
        console.error("Local MongoDB Failed:", err.message);
        process.exit(1);
    });
