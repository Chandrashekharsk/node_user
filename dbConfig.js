const mongoose = require('mongoose');
require("dotenv").config();


// Check if required environment variables are present
if (!process.env.URI) {
    console.error("MongoDB URI not found in environment variables. Please check your configuration.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.URI);

        console.log(
            "MongoDB connected2",
            "Port:", connect.connection.port,
            "Database:", connect.connection.name,
            "User:", connect.connection.user,
            "Host:", connect.connection.host,
        );
    } catch (error) {
        console.error("MongoDB connection error:", error.name, error.message);
        process.exit(1);
    }
}

// Additional event handling for connection events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = connectDB;
