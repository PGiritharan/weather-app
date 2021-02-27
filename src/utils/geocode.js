const request = require('request');

const geoCode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ2lyaXRoYXJhbiIsImEiOiJja2xjZXlocmEwODY0MnhwN3R2ajFrY240In0.KdgE84La0T-Qagi7qw94Cg&limit=1`;
    request({url:url,json:true}, (error, { body }={})=>{
        if(error){
            callback('Unable to connect location service!', undefined);
        }else if(body.features.length===0){
            callback('Unable to find the location. Please try with different search',undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;