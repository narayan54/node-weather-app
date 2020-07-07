const request = require('request');

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFyYXlhbmJveWEiLCJhIjoiY2tidnN5bTRqMDdvYjJybW85NXdkNmlzMSJ9.f3A5E2VeRHQel4Dx8pVncw&limit=1';
    request({url, json: true}, (error, {body}) => {

        if(error){
            callback("Unable to connect to location service", undefined);
        }else if(body.features.length === 0){
            callback("Unable to find location. Try another location", undefined);
        }else{
            const info = body.features[0].center;
            const result = {
                latitude: info[1],
                longitude: info[0],
                location: body.features[0].place_name
            }
            callback(undefined, result)
        }
    })
}

module.exports = geocode;
