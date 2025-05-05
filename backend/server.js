const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb')
const bodyparser = require('body-parser')
const cors = require('cors')

// Load environment variables from .env file
dotenv.config()

// MongoDB connection URL and client setup
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Name of the database to use
const dbName = 'gatekeep';

// Create Express app and set up middleware
const app = express()
const port = 3000
app.use(bodyparser.json()) // Parse incoming JSON requests
app.use(cors()) // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
client.connect();

// GET endpoint to fetch all saved passwords
app.get('/getPasswordsForUser', async (req, res) => {
    // extract username from query parameters
    const userId = req.query.userId;
    console.log(`Fetching passwords for user: ${userId}`);
    if (!userId) {
        return res.status(400).send({ success: false, message: 'Username is required' });
    }

    const db = client.db(dbName);
    const collection = db.collection('passwords');
    // Find all passwords for the specified user
    const findResult = await collection.find({ userId: userId }).toArray(); // Convert cursor to array
    res.json(findResult)
})

// POST endpoint to save a new password
app.post('/create-password', async (req, res) => {
    const userId = req.body.userId; // Extract userId from request body

    const username = req.body.username; // Extract username from request body
    const password = req.body.passwords; // Extract password from request body
    const site = req.body.site; // Extract site from request body
    console.log(`Saving password for userId: ${userId} with username ${username} and password: ${password} for site ${site}`);

    // add new password to the database
    if (!password || !userId) {
        return res.status(400).send({ success: false, message: 'Password and userId are required' });
    }
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    const newPasswordResult = await collection.insertOne({ userId, username, password, site }); // Insert the new password
    res.send({ success: true, result: newPasswordResult, message: 'Password saved successfully' })
})

app.put('/update-password', async (req, res) => {
    const userId = req.body.userId; // Extract userId from request body
    const newUsername = req.body.username; // Extract username from request body
    const newPassword = req.body.passwords; // Extract old password from request body
    const newSite = req.body.site; // Extract site from request body
    const id = req.body.id; // Extract the ID of the password entry to update

    console.log(`Updating password for userId: ${userId} with new username: ${newUsername}, new password: ${newPassword}, and site: ${newSite} for entry with id: ${id}`);

    // Validate presence of required fields
    if (!userId || !newUsername || !newPassword || !newSite || !id) {
        return res.status(400).send({ success: false, message: 'UserId, old password, new password, and site are required' });
    }

    const db = client.db(dbName);
    const collection = db.collection('passwords');

    // Update the password in the database
    const updateResult = await collection.updateOne(
        { _id: new ObjectId(id)  }, // Find the entry to update
        { $set: { username: newUsername, password: newPassword, site: newSite } } // Set the new password
    );

    if (updateResult.matchedCount === 0) {
        return res.status(404).send({ success: false, message: 'No matching password found to update' });
    }

    res.send({ success: true, result: updateResult, message: 'Password updated successfully' });

})

// DELETE endpoint to remove a password
app.delete('/delete-password', async (req, res) => {
    const id = req.body.id; // Extract the ID of the password entry to delete
    console.log(`Deleting password with id: ${id}`);
    // Validate presence of ID
    if (!id) {
        return res.status(400).send({ success: false, message: 'ID is required to delete a password' });
    }
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne({ _id: new ObjectId(id) }); // Delete the matching password entry
    res.send({ success: true, result: findResult })
})

// POST endpoint to handle user login
app.post('/login', async (req, res) => {
    const db = client.db(dbName);
    const username = req.body.username;
    const password = req.body.password;

    // Validate presence of username and password
    if (!username || !password) {
        return res.status(400).send({ success: false, message: 'Username and password are required' });
    }

    const collection = db.collection('users');
    const findResult = await collection.findOne({
        username: username,
    });

    // Check if user exists and password matches
    if (!findResult) {
        return res.status(401).send({ success: false, message: 'Invalid username or password' });
    }
    if (findResult.password !== password) {
        return res.status(401).send({ success: false, message: 'Invalid username or password' });
    }

    // If valid, respond with success and user info
    res.send({ success: true, message: 'Login successful', user: findResult });
})

app.post('/create-account', async (req, res) => {
    const db = client.db(dbName);
    const username = req.body.username;
    const password = req.body.password;

    // Validate presence of username and password
    if (!username || !password) {
        return res.status(400).send({ success: false, message: 'Username and password are required' });
    }

    const collection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await collection.findOne({ username: username });
    if (existingUser) {
        return res.status(409).send({ success: false, message: 'Username already exists' });
    }

    // Create new user account
    const newUser = { username, password };
    const insertResult = await collection.insertOne(newUser);

    // Respond with success and user info
    res.send({ success: true, message: 'Account created successfully', user: newUser });
}
)

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})