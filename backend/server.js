const express = require("express");
const app = express();
const db = require('./db')
const Food = require('./models/foodModel')

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Working");
})

app.get("/foods", (req, res) => {
    Food.find({})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
