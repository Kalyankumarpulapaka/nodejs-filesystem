// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();
const port = 3000; // Port number for the server to listen on

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Endpoint to create a text file with current timestamp
app.post('/create-file', (req, res) => {
    // Define the folder path where files will be saved
    const folderPath = path.join(__dirname, 'files');

    // Check if the folder exists, create it if it doesn't
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    // Generate the current timestamp
    const timestamp = new Date().toISOString();

    // Create a filename based on the current timestamp
    const filename = `${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;

    // Define the full file path
    const filePath = path.join(folderPath, filename);

    // Write the timestamp to the file
    fs.writeFile(filePath, timestamp, (err) => {
        if (err) {
            // Handle errors if writing the file fails
            return res.status(500).send('Error writing file');
        }
        // Send success message if file is created successfully
        res.send('File created successfully');
    });
});

// Endpoint to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
    // Define the folder path where files are stored
    const folderPath = path.join(__dirname, 'files');

    // Read the contents of the directory
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            // Handle errors if reading the directory fails
            return res.status(500).send('Error reading directory');
        }

        // Filter out only the text files
        const textFiles = files.filter(file => file.endsWith('.txt'));

        // Send the list of text files as a JSON response
        res.json(textFiles);
    });
});
