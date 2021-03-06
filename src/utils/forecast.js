const request = require('postman-request');

API_KEY = process.env.API_KEY || ''

module.exports = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?query=${lat},${long}&access_key=${API_KEY}`
    request(url, { json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback(`Error: (${body.error.code}) ${body.error.info}`, undefined)
        } else {

            const { current } = body;
            //const { temperature, precip, feelslike, weather_descriptions } = current;
            callback(undefined, {
                temperature: current.temperature,
                forecast: current.weather_descriptions.join(", "),
                feelsLike: current.feelslike

            })

        }
    })
}