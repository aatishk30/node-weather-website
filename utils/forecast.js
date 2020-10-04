const request=require('request')

// const forecast=(latitude, longitude,callback)=>{
//     const url='http://api.weatherstack.com/current?access_key=c1c2b22c580ab3eda2e877bb62436e66&query='+ latitude +','+ longitude +'&units=f'

//     request({url:url, json: true},(error, response)=>{
//         if(error){
//             callback('Unable to connect the weather Service', undefined);
//         }else if(response.body.error){
//             callback('Unable to find Location',undefined)
//         }else{
//             // console.log('It is currently '+response.body.current.temperature+' degrees out. It feels like '+response.body.current.feelslike+' degrees out')
//             callback(undefined,'It is currently '+response.body.current.temperature+' degrees out. It feels like '+response.body.current.feelslike+' degrees out')
//         }
//     })
// }


//using destructuring
const forecast=(latitude, longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c1c2b22c580ab3eda2e877bb62436e66&query='+ latitude +','+ longitude +'&units=f'

    request({url, json: true},(error, {body}={})=>{
        // console.log(error)
        // console.log(body)
        if(error){
            callback('Unable to connect the weather Service', undefined);
        }else if(body.error){
            callback('Unable to find Location',undefined)
        }else{
            callback(undefined,'It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')
        }
    })
}

    module.exports=forecast;