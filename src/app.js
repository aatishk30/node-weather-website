const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

const app=express();
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsDirectoryPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath);//setting view directory path ====> default path is view and we have templates in directory thats why
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Atish Soni'
    })//rendering dynamic content
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Atish Soni'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some helpfull text',
        name:'Atish Soni'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        res.send({
            error:'You must provide an address !!'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location}={})=>{

            if(error){
                return res.send({error})
            }else{
    
            //callback chaining
                forecast(latitude,longitude, (error, foreCastData)=>{
                            
                    if(error){
                        return res.send({error})
                    }
                    res.send({
                        forecast:foreCastData,
                        location,
                        address:req.query.address
                    });
                })
            }
    
        })
    }


    

    
    
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMesaage:'Help Article Not Found',
        name:'Atish Soni'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMesaage:'Page Not Found',
        name:'Atish Soni'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})