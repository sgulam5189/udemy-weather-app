const request = require('request')
 
const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=71226ec310a44f3d63e9bb73b4f5aeb1&query='+latitude+','+longtitude+'&units=f'
    request({url:url, json:true}, (error,{body} ={}) => {
        if(error){
            callback('Unable to connect to weather services ! ', undefined)
        }else if (body.error){
            callback('Unable to find weather for location , Try another search', undefined)
        }else {
            callback(undefined, 
                `Weather is  ${body.current.weather_descriptions[0]}  It is currently ${body.current.temperature}. But it feels like ${body.current.feelslike}`
            )
        }
    })

}

module.exports = forecast