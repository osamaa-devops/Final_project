const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

const fallbackPlanets = [
    {
        id: 1,
        name: "Mercury",
        description: "Mercury is the smallest planet in our solar system and the closest planet to the Sun.",
        image: "images/mercury.svg"
    },
    {
        id: 2,
        name: "Venus",
        description: "Venus spins slowly in the opposite direction from most planets and is the hottest planet in our solar system.",
        image: "images/venus.svg"
    },
    {
        id: 3,
        name: "Earth",
        description: "Earth is the only planet known to support life and has one natural satellite, the Moon.",
        image: "images/earth.svg"
    },
    {
        id: 4,
        name: "Mars",
        description: "Mars is known as the red planet and is home to the largest volcano in the solar system.",
        image: "images/mars.svg"
    },
    {
        id: 5,
        name: "Jupiter",
        description: "Jupiter is the largest planet in our solar system and is famous for the Great Red Spot.",
        image: "images/jupiter.svg"
    },
    {
        id: 6,
        name: "Saturn",
        description: "Saturn is best known for its spectacular rings made of ice and rock.",
        image: "images/saturn.svg"
    },
    {
        id: 7,
        name: "Uranus",
        description: "Uranus rotates on its side, making it one of the most unusual planets in the solar system.",
        image: "images/uranus.svg"
    },
    {
        id: 8,
        name: "Neptune",
        description: "Neptune is a cold and windy ice giant that orbits far from the Sun.",
        image: "images/neptune.svg"
    }
];

const mongoUri = process.env.MONGO_URI;
const useFallbackData = process.env.NODE_ENV === "test" || !mongoUri;
const port = process.env.PORT || 3000;
let mongoReady = false;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())

/* istanbul ignore next */
if (mongoUri) {
    mongoose.connect(mongoUri, {
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function(err) {
        if (err) {
            console.log("error!! " + err)
        } else {
            mongoReady = true;
        }
    });
} else if (useFallbackData) {
    mongoReady = true;
}

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);

function getFallbackPlanet(id) {
    return fallbackPlanets.find((planet) => planet.id === Number(id));
}

app.post('/planet',   function(req, res) {
    if (useFallbackData || !mongoReady) {
        const fallbackPlanet = getFallbackPlanet(req.body.id);
        if (fallbackPlanet) {
            res.send(fallbackPlanet);
            return;
        }

        res.status(404).send({
            error: "Planet not found"
        });
        return;
    }

    planetModel.findOne({
        id: req.body.id
    }, function(err, planetData) {
        if (!err && planetData) {
            res.send(planetData);
            return;
        }

        const fallbackPlanet = getFallbackPlanet(req.body.id);
        if (fallbackPlanet) {
            res.send(fallbackPlanet);
            return;
        }

        res.status(404).send({
            error: "Planet not found"
        });
    });
})

app.get('/',   async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});


app.get('/os',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

app.get('/live',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

app.get('/ready',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": useFallbackData || mongoReady ? "ready" : "degraded"
    });
})

/* istanbul ignore next */
if (require.main === module) {
    app.listen(port, () => {
        console.log("Server successfully running on port - " + port);
    });
}


module.exports = app;
