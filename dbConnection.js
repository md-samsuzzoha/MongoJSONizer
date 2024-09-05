const { MongoClient } = require("mongodb");

// MongoDB connection URL and database name
// const url = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const dbName = "your-database-name"; // Replace with your database name

// Function to connect to the database
async function connectToDatabase() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        return { client, db };
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error to handle in the main file
    }
}

module.exports = connectToDatabase;
