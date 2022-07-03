 const express = require("express");
 const https = require("https");
 const bodyParser = require("body-parser");
 const ejs = require("ejs");
require("dotenv").config();
const KEY = process.env.API_KEY;



 const app = express();
 app.set("view engine","ejs");
 app.use(bodyParser.urlencoded({extended:true}));

    app.get("/",function(req,res){


        res.sendFile(__dirname + "/index.html")
       
    });

    app.post("/",(req, res)=>{
        
        // let y = req.body.citizen="KIGALI";
        // console.log(y);

 const city = req.body.citizen;
 const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+KEY+"&units=metric";
 https.get(url,(response)=>{
     console.log(response.statusCode);
     response.on("data",(data)=>{
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        // const search = "Kampala";
       
       
        const cityName = weatherData.name;
        
        //res.send("The temperature in "+cityName + " is "+temperature+" degrees celcius.");
        res.render("weather",{DatCity : cityName, TEMP : temperature , HUM : humidity , DES : description});
        
        
     });
 });

// res.sendFile(__dirname + "/index.html");


    });

 app.listen(5000, ()=>{
    console.log("server is running at port 5000");
 })


