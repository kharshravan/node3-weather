const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// console.log(__filename)

//express will help us to connect backend to front end
const app = express()
//define paths for express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//handlebars hbs engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index',{
        title : 'Weather',
        name : 'shravan khar'
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title : 'About me',
        name : 'shravan khar'
    })
})
app.get('/help',(req, res) =>{
    res.render('help',{
        message : 'contact me',
        title : 'Help',
        name : 'shravan khar'
    })
})

//get will stringify data itself and give us json check browser
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide a address term'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast : forecastData,
                location,
                address: req.query.address
            })
        })
    })

    })

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }

        console.log(req.query.search)
        res.send({
            products : []
        })
    
})

app.get('/help/*',(req, res) =>{
    res.render('404',{
        title : '404',
        name : 'shravan khar',
        errorMessage : 'help article not found'
    })
})
//for 404 wildcard '*'
app.get('*',(req, res) =>{
    res.render('404',{
        title : '404',
        name : 'shravan khar',
        errorMessage : 'page not found'
    })
})
//set up a local host
app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})