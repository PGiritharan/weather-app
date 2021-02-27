const request = require('request');

const forecast=(latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=529aaf83e3258ccde84d5e55f89c9cc0&query=${latitude},${longitude}`;
    request({url:url, json:true}, (error,{ body }={})=>{
        if(error){
            callback('unable to connect weather service!',undefined);
        }else if(body.error){
            console.log('Unable to find the location',undefined);
        }else{
            let currentForecast = body.current;
            callback(undefined,`${currentForecast.weather_descriptions[0]}. It's currently ${currentForecast.temperature} degrees out. It feels like ${currentForecast.feelslike} degrees out. The humidity is ${currentForecast.humidity}%.`);
        }
    })
}

module.exports = forecast;