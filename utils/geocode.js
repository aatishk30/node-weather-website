const request=require('request')



// const geocode=(address, callback)=>{
//     const geoCodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoiYWF0aXNoazMwIiwiYSI6ImNrY284bTczaTBpbXUzMXF5YzhtbGk0N2YifQ.kfuOTqGHHkrxQJs877-A7g&limit=1'
//     request({url:geoCodeurl, json: true},(error, response)=>{
//         if(error){
//             callback('Unable to connect the Location Service', undefined)
//          }else if(response.body.features.length === 0){
//              callback('Unable to find Location. try another Search', undefined)
//          }else{
//              callback(undefined,{
     
//                  latitude:response.body.features[0].center[1],
//                  longitude:response.body.features[0].center[0],
//                  location:response.body.features[0].place_name
     
//              })
//          }
//     })
    
// }

//using destructre
const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoiYWF0aXNoazMwIiwiYSI6ImNrY284bTczaTBpbXUzMXF5YzhtbGk0N2YifQ.kfuOTqGHHkrxQJs877-A7g&limit=1'
    request({url, json: true},(error, {body}={})=>{

        // console.log(error);
        // console.log(body);

            if(error){
                callback('Unable to connect the Location Service', undefined)
            }else if(body.message === 'Not Found'){
                callback('Unable to find Location. try another Search', undefined)
            }else{

                if(body.features.length ===0){
                    callback('Unable to find Location. try another Search', undefined)
                }else{
                    callback(undefined,{
        
                        latitude:body.features[0].center[1],
                        longitude:body.features[0].center[0],
                        location:body.features[0].place_name
            
                    })
                }
                
            }
        
        
    })
    
}

module.exports=geocode;