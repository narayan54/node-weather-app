const request = require('request');

const forecast = (lat, lon, callback) => {

const url = 'http://api.weatherstack.com/current?access_key=9f031129a20ee2e8dac5e53ce1dd3af3&query=' + lat +',' + lon + '=&units=f';

request({ url, json: true}, (error, {body}) => {
       //console.log(response.body.current);
       if(error){
            callback('Unable to connect to weather service', undefined);
           //console.log('');
            //console.log();
       }else if(body.error){
            callback('Unable to find location', undefined);
            //console.log('');
       }else{

            const currentWeather = body.current;
            const temparature = currentWeather.temperature;
            const feelLike = currentWeather.feelslike;
            const foreCast = currentWeather.weather_descriptions[0];
            const result = {
                temperature: temparature,
                feelLike: feelLike,
                foreCast: foreCast

            }
            callback(undefined, result);
            //console.log(foreCast + '. It is currently ' + temparature + ' degrees out. It feels like ' + feelLike + ' degreeos out.');
       }
    });
}

module.exports = forecast;