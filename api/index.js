const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

const DB_PASSWORD = process.env.REACT_APP_DB_PASSWORD;
const CONNECTION_STRING = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.txzrtg8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const DATABASE_NAME = "resumedb";
const SECRET_KEY = process.env.SECRET_KEY_ENV;
var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.error("Failed to connect to MongoDB", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("Connected to MongoDB");
    });
});


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    const existingUser = await database.collection("users").findOne({ username });
    if (existingUser) {
        return res.status(400).send("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        username,
        password: hashedPassword,
    };

    await database.collection("users").insertOne(newUser);
    res.status(201).send("User registered successfully");
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    const user = await database.collection("users").findOne({ username });
    if (!user) {
        return res.status(400).send("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send("Invalid username or password");
    }

    const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
});


app.post('/api/logout', authenticateToken, (req, res) => {
    res.status(200).send("Logged out successfully");
});


app.get('/api/resumedb/getNotes', authenticateToken, (req, res) => {
    database.collection("usersinfocollection").find({ userId: req.user.id }).toArray((error, result) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(result);
    });
});


app.post('/api/resumedb/AddUserInfo', authenticateToken, (req, res) => {
    const userInfo = { ...req.body, userId: req.user.id };
    database.collection("usersinfocollection").insertOne(userInfo, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json("Added Successfully");
    });
});



app.get('/api/resumedb/getUsers', authenticateToken, (req, res) => {
    if (!req.user.id) {
        return res.status(400).send("User ID is missing");
    }

    database.collection("users").findOne({ _id: new require('mongodb').ObjectId(req.user.id) }, (error, result) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        if (!result) {
            return res.status(404).send("User not found");
        }
        res.send(result);
    });
});





app.delete('/api/resumedb/DeleteNotes', authenticateToken, (req, res) => {
    database.collection("usersinfocollection").deleteOne({
        _id: new require('mongodb').ObjectID(req.query.id),
        userId: req.user.id
    }, (error, result) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json("Deleted Successfully");
    });
});


app.post('/api/profile', authenticateToken, (req, res) => {
    const userInfo = { ...req.body, userId: req.user.id };
    database.collection("usersinfocollection").insertOne(userInfo, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json("Profile added successfully");
    });
});
