const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather Forecast',
        name: 'Giri'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Giri'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title: 'Help',
        name: 'Giri'
    });
});

app.get('/weather',(req, res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'Adress not found'
        })
    }
    if(!address){
        console.log("Please provide the address");
    }else{
        geoCode(address,(error, {latitude,longitude,location} = {})=>{
            if(error){
                return res.send({
                   error
                });
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error
                     });
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address: address
                 });
            })
        })
    }
});

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        message: "Help page article is not found",
        name: 'Giri'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Giri'
    })
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}.`)
});