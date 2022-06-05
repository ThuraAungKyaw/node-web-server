const request = require('postman-request');

ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
MP_TOKEN = 'pk.eyJ1IjoidGh1cmFhdW5na3lhdyIsImEiOiJjbDFxZG91MWgwMGVrM2JxczdjNXBtbzBjIn0.rE1ZRhCVvyRjtT44hG2RDw'
module.exports = (place, callback) => {

    const url = `${ENDPOINT}${encodeURIComponent(place)}.json?access_token=${MP_TOKEN}&limit=1`
    request(url, { json: true }, (err, { body }) => {

        if (err) {
            callback(err, undefined)
        }
        else {
            const { features } = body;
            if (features.length > 0) {
                const coordinates = features[0].center;
                const placeName = features[0].place_name;

                const data = {
                    place: placeName,
                    lat: coordinates[1],
                    long: coordinates[0]
                }
                callback(undefined, data)

            } else {
                callback("No location with the given keyword found.", undefined)
            }


        }
    })
}