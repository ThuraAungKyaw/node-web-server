const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const PORT = process.env.PORT || 3000;

// Define paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Thu Ra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Thu Ra'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Thu Ra",
        message: 'All the help you can get!'
    })
})



app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(address, (err, { lat, long, place } = {}) => {
        if (err) {
            return res.send({
                error: err
            })

        }

        forecast(lat, long, (err, data) => {
            if (err) {
                return res.send({
                    error: err
                })

            }

            res.send({ ...data, weather: place })

        })


    })


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: "Help article not Found!",
        title: 'Help Page',
        name: "Thu Ra",
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        errorMsg: "Not Found!",
        title: "404",
        name: "Thu Ra",
    })
})

app.listen(PORT, () => {
    console.log(`Server started. Listening on port ${PORT}`)
})