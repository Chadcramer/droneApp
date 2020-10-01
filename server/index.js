const express = require('express')
const app = express()
const PORT = 3001
const chalk = require('chalk');
const cors = require('cors')

app.use(cors())
app.use(express.json())

// GeoJSON
let flights = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.779297,
          39.329860
          
        ]
      },
      "properties": {
        "address": "Dragon",
        "droneID": "ID - 829347238",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -71.530467,
          43.355694
          
        ]
      },
      "properties": {
        "address": "Mercury",
        "droneID": "ID - 333333233",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.043929,
          38.910525
        ]
      },
      "properties": {
        "address": "Mars",
        "droneID": "ID - 134245346",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.0672,
          38.90516896
        ]
      },
      "properties": {
        "address": "Jupiter",
        "droneID": "ID - 084675376",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -83.341924,
          33.692369
        ]
      },
      "properties": {
        "address": "Saturn",
        "droneID": "ID - 652462457",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -81.740541,
          29.294312
        ]
      },
      "properties": {
        "address": "Gemini",
        "droneID": "ID - 234562346",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.097083330154,
          38.980979
        ]
      },
      "properties": {
        "address": "Apollo",
        "droneID": "ID - 143534634",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -120.563844,
          43.238202
        ]
      },
      "properties": {
        "address": "Sky",
        "droneID": "ID - 665276222",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -123.054885,
          46.850817
        ]
      },
      "properties": {
        "address": "Blue",
        "droneID": "ID - 243532344",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.734488,
          34.674358
        ]
      },
      "properties": {
        "address": "Green",
        "droneID": "ID - 998544777",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -117.108640,
          32.793383
        ]
      },
      "properties": {
        "address": "Venus",
        "droneID": "ID - 654236546",
        "country": "United States",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -72.720167,
          41.366268
        ]
      },
      "properties": {
        "address": "Pluto",
        "droneID": "ID - 1594373948",
        "country": "United States",
      }
    }
  ]
};

flights.features.forEach(function(flights, i){
  flights.properties.id = i;
});

app.get('/api/flights', (req, res) => {
  // let flightData = notes;
  res.json(flights)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})