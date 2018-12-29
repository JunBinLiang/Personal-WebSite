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
	
	
	
	var amount=request.body.ampunt;
	var crypto=request.body.crypto;
	var fiat=request.body.fiat;
	
	var options={  //use options object
		url:"https://apiv2.bitcoinaverage.com/convert/global",
		method:"GET",
		qs:{    //qs is key world       appen to the url as input parameters
			    // & use as seperator     after   ?   are  input parameters
		   from: crypto,
		   to  : fiat,
		   amount: amount
		}
	};
	
	
	requestHttp(options, function (error, response1, body) {  //request by using API     "options" is JS Obkect
		
	//Parsing JSON
      var data=JSON.parse(body);
	  var price=data.price;
	  
	  response.write("<h1>The price is"+price+"</h>");
	 
		
	  response.send();
		
   });  
	
});





app.listen(3000,function(){
	console.log("Success Server");
});