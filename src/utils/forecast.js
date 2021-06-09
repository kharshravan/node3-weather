const request = require('request')

const forecast = (longitude,latitude,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=8945450027e353ef061905e83e6b97f4&query=${latitude},${longitude}&units=m`
    request({url, json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        } else{
            const data =response.body.current
            callback(undefined,`${data.weather_descriptions[0]}.The current temperature is ${data.temperature} degrees out.There is ${data.precip} % chances of rain.Humidity is ${data.humidity}`)

            
        }
    })
}
module.exports = forecast