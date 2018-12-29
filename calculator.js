//Initialization
const express=require("express");
const app=express();
const requestHttp=require("request"); //use for       API  npm install request

const bodyParser=require("body-parser");  //body-parser : get the form data     //npm install body-parser
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(request,response){
	response.sendFile(__dirname+"/index.html");  //__dirname give you the full path to the current directory
});



app.post("/", function(request,response){
	
	//request.body.name     gets  parse  as  String, need to convert back to Num
	
	var num1=Number(request.body.num1);
	var num2=Number(request.body.num2);
	var result=num1+num2;
	console.log(""+result);   //must include string
	
	var baseURL="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
	var crypto=request.body.crypto;
	var fiat=request.body.fiat;
	var finalURL=baseURL+crypto+fiat;
	
	
	requestHttp(finalURL, function (error, response1, body) {  //request by using API
		
	//parsing JSON	
      var data=JSON.parse(body);
	  var price=data.last;
	   
	  response.write("<h1>The price is"+price+"</h>");
	  response.write("<h1>The Result is "+ result+" </h>");  //rather than response.send("");
		
	  response.send();
		
   });  
	
});





app.listen(3000,function(){
	console.log("Success Server");
});