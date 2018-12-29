//Initialization
//Use MainChimp   API       de1aa4b6512699a4a7d7bb1ba790e4fe-us7       9f8369715c
 
const express=require("express");
const app=express();
const requestHttp=require("request"); //use for       API  npm install request

const bodyParser=require("body-parser");  //body-parser : get the form data     //npm install body-parser


app.use(express.static("static_folder"));  // a folder that hold static that can be send together with the html file

app.use(bodyParser.urlencoded({extended:true}));





app.get("/",function(request,response){
	                                              // all local files are local 
	response.sendFile(__dirname+"/signin.html");  //__dirname give you the full path to the current directory
});



app.post("/", function(req,res){
	
	//request.body.name     gets  parse  as  String, need to convert back to Num  
	var firstName=req.body.firstName;
	var lastName=req.body.lastName;
	var emailAddress=req.body.emailAddress;
	
	console.log(firstName);
	console.log(lastName);
	console.log(emailAddress);
	
	
	
	var data={
		members:[
		{   email_address : emailAddress,
			status:"subscribed",
			merge_fields:{
			  FNAME:firstName,
			  LNAME:lastName
			             }
		}
		         ]
	         };
	
	var jsonData=JSON.stringify(data);   //API required
	
	
	
	var options=
{
		url:'https://us7.api.mailchimp.com/3.0/lists/9f8369715c',
		method:"post",
		headers:
	   {
		 "Authorization": "junbin de1aa4b6512699a4a7d7bb1ba790e4fe-us7"
       },
	    body:jsonData
}
	
	
	
	
requestHttp(options, function (error, response1, body) {  //request by using API, body=json data
		if(response1.statusCode==200){
			res.sendFile(__dirname+"/success.html");
		}
		else{
			res.sendFile(__dirname+"/fail.html");
		}
		
   });  
});
 
//response.redirect("/");

app.post("/failure",function(req,res){
	res.redirect("/");   //redirect the page
});



app.listen(3000,function(){
	console.log("Success Server");
});