```md
# MongoDB Export Script with Progress Bar

This Node.js script connects to a MongoDB database, processes data from the `HoldingTaxClientInfos` collection to fix date formats, and exports the data as `HoldingTaxClientInfos.json`. A progress bar is displayed during the export.

## Features

- Connects to MongoDB and retrieves all documents from the specified collection.
- Fixes date fields to ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- Exports the data to a JSON file with a real-time progress bar.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update MongoDB connection details in `dbConnection.js`:
   ```js
   const url = 'mongodb://localhost:27017';  // Update MongoDB URL
   const dbName = 'yourDatabaseName';        // Update database name
   ```

3. Ensure the `server.js` file has the correct collection name and date field:
   ```js
   const collectionName = 'yourCollectionName';  // Update if needed
   ```

## Usage

Run the script:
```bash
node server.js
```

The script will process the data and display a progress bar. Once completed, the data will be exported to `HoldingTaxClientInfos.json`.

### Example Output:
```
[===========>             ] 45% | 90/200 | Time: 0:00:05
Data exported to HoldingTaxClientInfos.json
MongoDB connection closed
```

## License

Licensed under MIT.
