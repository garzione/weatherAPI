const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
	res.sendFile(__dirname +"/index.html")

//res.send("Server is up and running");
})

app.listen(3000,function() {
	console.log("Server is running on port 3000.");

})

app.post("/", function(req,res){
	const query = req.body.cityName;
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=d0221e6720925e3c859693acdecd3aa6&units=imperial";
	https.get(url,function(response){
	console.log(response.statusCode);
	response.on("data", function(data){
		const weatherData = JSON.parse(data)
		const temp = weatherData.main.temp
		const icon = weatherData.weather[0].icon
		const weatherDescription = weatherData.weather[0].description
		const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
		res.write("<h1> The temperature in "+query+" is " + temp +  " degrees fahrenheit.</h1>");
		res.write("<img src="+imageURL+">");
		res.send()
		console.log(temp);
})


	})
})
