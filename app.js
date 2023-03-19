const express=require("express");
const https=require("https");
const bodyParser=require('body-parser')

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

const port=3000;

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiId="85ff17d511e7713bac9e975e55ddaac5";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/forecast?appid="+apiId+"&units="+unit+"&q="+query;
  console.log(url);
  https.get(url,function(response){
    console.log(response.statusCode); //control 200 OK
    let DATA="";
    response.on("data",function(data){
      DATA+=data;
    });
    response.on("end",function(){
      const weatherData = JSON.parse(DATA);
      const temp = weatherData.list[0].main.temp;
      console.log(temp);
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.send(); 
    });
  });
});
app.listen(port, function(){
    console.log("server is on port "+port);
});