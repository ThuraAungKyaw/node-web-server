const request = require('postman-request');

ENDPOINT = process.env.ENDPOINT || ''
MP_TOKEN = process.env.MP_TOKEN || ''

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