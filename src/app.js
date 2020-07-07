const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('../src/utils/geocode'); 
const forecast = require('../src/utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
// console.log(__filename);


const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {

    res.render('index', {
        title: "Weather App",
        name: "Narayanappa Boya"
    })
});

app.get('/help', (req, res) => {

    res.render('help', {
        name: "Aditi Boya",
        title: "Help"
    })
});

app.get('/about', (req, res) => {

    res.render('about', {
        title: "About App",
        name: "Narayan"
    });
});
app.get('/weather', (req, res) => {

    const locationName = req.query.address;
    if(!locationName){

        return res.send({
            errorMessage: "Please provide an address"
        })
    }

    geocode(locationName, (error, {latitude, longitude, location} = {}) => {

        // if(error){
        //   return console.log("error");
        // }
    
        // console.log('Location Error', error);
        // console.log('Location Data', data);
        forecast(latitude, longitude, (error, forecastData) => {
    
          if(error){
            return res.send({
                error: error
        
            })
          }
    
          //console.log('Location Info', location)
          //console.log('Forecast Data', forecastData)

            res.send({
                forecast: forecastData.foreCast,
                temperature: forecastData.temperature
        
            })
        })
      })

    
});

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: "please provide search item"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })

})
app.get('/help/*', (req, res)=>{
    res.render('404', {
        errorText: "Help Article Not Found",
        name: "Narayan"
    });
});
app.get('*', (req,res) =>{
    res.render('404', {
        title: 404,
        errorText: "Page Not Found",
        name: "Narayan"
    });
});

app.listen(port, () => {
    console.log("Server started" + port);
})