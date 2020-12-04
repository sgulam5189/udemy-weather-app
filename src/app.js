const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../../weather-app/geocode')
const forecast = require('../../weather-app/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Samdani-Gulam'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Samdani_Gulam'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        message: 'How do we help you?',
        title: 'Help',
        name:'Samdani Gulam'        
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({error : 'Please provide location address' })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {})=> {
        if(error){
            return res.send({error })
        }
        forecast(longtitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address                
            })

        })

    })

   
})

app.get('/products', (req, res) => {
    if( !req.query.search) {
        return   res.send({
            error:'You must provide search term'
        })
    }    
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help Article not found',
        title: 'Article not found',
        name: 'Samdani Gulam'
    })    
})

app.get('*', (req,res) =>{
    res.render('404', {
        message: 'Page not found',
        title: 'Page not found',
        name: 'Samdani Gulam'
    })
})


app.listen(3000, () => {
    console.log('Server Started on port 3000')
})