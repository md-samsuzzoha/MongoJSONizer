const fs = require("fs");
const path = require("path");
const cliProgress = require("cli-progress"); // Progress bar package
const connectToDatabase = require("./dbConnection"); // Import the connection function

const collectionName = "your-collection-name";

// Function to fix the date format
function fixDateFormat(document) {
    // Adjust as necessary or write your own logic here
    if (document.CreateDate) {
        document.CreateDate = { $date: document.CreateDate };
    }
    if (document.LastUpdateDate) {
        document.LastUpdateDate = { $date: document.LastUpdateDate };
    }
    return document;
}

// Main function to process the collection and export data
async function processAndExportData() {
    let client;

    try {
        // Connect to the database
        const connection = await connectToDatabase();
        client = connection.client;
        const db = connection.db;

        // Access the collection and fetch documents
        const collection = db.collection(collectionName);
        const totalDocuments = await collection.countDocuments();

        if (totalDocuments === 0) {
            console.log("No documents found in the collection.");
            return;
        }

        // Initialize progress bar
        const progressBar = new cliProgress.SingleBar(
            {},
            cliProgress.Presets.shades_classic
        );
        progressBar.start(totalDocuments, 0);

        // Fetch and process documents in batches
        const cursor = collection.find({});
        const processedDocuments = [];
        let documentCount = 0;

        while (await cursor.hasNext()) {
            const document = await cursor.next();
            const processedDocument = fixDateFormat(document);
            processedDocuments.push(processedDocument);

            documentCount++;
            progressBar.update(documentCount); // Update the progress bar
        }

        // Stop the progress bar after processing
        progressBar.stop();

        // Export the processed data to a JSON file
        const outputFilePath = path.join(__dirname, `${collectionName}.json`);
        fs.writeFileSync(
            outputFilePath,
            JSON.stringify(processedDocuments, null, 2),
            "utf-8"
        );
        console.log(`\nData exported to ${collectionName}.json`);
    } catch (error) {
        console.error("Error occurred while processing data:", error);
    } finally {
        // Ensure MongoDB connection is closed
        if (client) {
            await client.close();
            console.log("MongoDB connection closed");
        }
    }
}

// Call the main function
processAndExportData();
