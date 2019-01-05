//Initialization    https://rocky-gorge-12412.herokuapp.com/
const mongoose = require('mongoose');
//local
//mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true});

//use mongoDB database
mongoose.connect('mongodb+srv://JunBin:QQqq816108@cluster0-e119v.mongodb.net/test?retryWrites=true/blogDB', {useNewUrlParser: true});
const express=require("express");
const app=express();
const requestHttp=require("request"); //use for       API  npm install request
const bodyParser=require("body-parser");  //body-parser : get the form data     //npm install body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');  //use ejs， views folder
app.use(express.static("static_folder"));
var test2=false;
var test=false;
var test1=true;
//var titles=[];
//var journals=[];
var dangerDiary=[];
var dangerTest;
var dangerTest=false;

const diarySchema=new mongoose.Schema({
	title:String,
	content:String,
});


const accountSchema=new mongoose.Schema({
	mail:String,
	password:String
});

//collection ->use what sechema
const diaryCollection=mongoose.model("Diarys",diarySchema);
//
const accountCollection=mongoose.model("Account",accountSchema);


//  Have you tried the tag <%- %> instead of <%= %>?
//  <%= escapes html by default (therefore your br tag is changed to it's escaped equivalent).


var aboutContent = "The content of the about page.<br> First, let me introduce myself. <br><br>My name is JunBin Liang. A first year student in CUNY queens college who majoring mathmatical and computer science. I like to learn a lot of new things for challenging and enriching my skills. This is the page I made by using the skill I learn from UDEMY online BootCamp Class. I will contiunuously update this website. It will include my new skill, project, taken course and so on.";    
var contactContent="The content of the contact page.<br><br> Number:917-678-4238 <br>Email: junbinliang816@gmail.com";
var homeContent="This is the main page.<br>Write Your Journal below<br>";
 
app.get("/",function(request,response){
	 dangerDiary.length=0;
	 dangerTest=false;
	
	diaryCollection.find(function(err,diarys){ //fruits  is  an  array
	if(err){
		console.log(err);
	}
	else{
	response.render("blog",{content:homeContent, diarys:diarys});  //load diarys to homepage
	}
	
});


});


app.get("/about",function(request,response){
	dangerDiary.length=0;
	dangerTest=false;
	response.render("about",{content:aboutContent});
});

app.get("/contact",function(request,response){
	dangerDiary.length=0;
	dangerTest=false;
	response.render("contact",{content:contactContent});
});

app.get("/compose",function(request,response){
	response.render("compose");
});


app.get("/signIn",function(request,response){
	response.render("signIn");
});



app.post("/signIn",function(request,response){
	var gmail=request.body.gmail;
	var password=request.body.password;
	
	accountCollection.find({mail:gmail},function(err,diarys){
	
		if(diarys.length===0)
		{
			const newAccount=new accountCollection({
	           mail:gmail,
			   password:password
                                           });	
			newAccount.save();
			response.render("success");
			
		}
		
		else
		{
			response.send("<h1>Exist Account</h1>");
		}
	
	});
	
	
	
});






//only one page, change accoding to the routeParam you passed


app.post("/compose/ok/:routeParam", function(req,res){  //route parameter, important
	
	console.log(req.params.routeParam);            // the parameter can be anything you type
	//var routeParameter=req.params.routeParam;     //get from the rout parameter, actually is same as id
	var myID=req.body.myid;  
	console.log(myID);
	diaryCollection.find({_id:myID},function(err,diarys){ //diarys  is  an  array   ,  first param is query
		                                                  //find by _id ->unique
	
	//_id is unique, diarys is always one? 
	if(err){
		console.log("fail");
		console.log(err);
	       }
	else{

	
		  if(diarys.length===0) //not found
		  { 
			
			res.write("<h1>Error</h1>");
		    res.send();
		  }
		
		  else{                //found
			 console.log("success");
		     console.log(diarys);
			 //dangerTest=true;
			 //res.redirect("/compose/"+dangerTitle);
			 dangerDiary=diarys;
			 dangerTest=true;
			 res.render("actual",{collection:diarys});  //
			  }
	}
	 
                                                                    })
});


app.get("/compose/ok/:routeParam", function(req,res){ 
    var routeTitle=req.params.routeParam;  
    console.log(routeTitle);

//withoue exiting the page: stay same->by using dangerTest, as it exit -> dangerTest=false
	if(dangerTest){
		diaryCollection.find({title:routeTitle},function(err,diarys){ 
        res.render("actual",{collection:dangerDiary});  //dangerDiary,from last func
	
	                                                                });	
	               }    
	
	//random refresh-> just the first one by title
	else{
	diaryCollection.find({title:routeTitle},function(err,diarys){ 
        res.render("actual",{collection:diarys});  //random refresh
	
	                                                            });
	    }    
});






app.post("/compose", function(request,response){
	var password=request.body.password;
	
	if(password=="jiejie")
	{
	 let title=request.body.title;     //get back the information from user type
	 let journal=request.body.journal; // string type
		
			  if(title.length===0||journal.length===0)
				{
				 response.redirect("/");
				}

		
		else  // length !=0
		{
	     for(var i=1;i<=title.length;i++){
			 if(title.substring(i-1,i)!==" ")
			 {   
				 test=true;
				 break;
			 }
		     

	                                     }	
			
	 	 for(var i=1;i<=journal.length;i++){
		 
		    	
			 
			 if(journal.substring(i-1,i)!==" ")
			 {
				  test2=true;
				 break;
			 }
             
	                                        }		
		
		if(test&&test2){
			//save data into database -> to diartCollection
		const myDiary=new diaryCollection({
	           title:title,
			   content:journal
                                           });	
			 
	     //save into database		
	     myDiary.save();
	     response.redirect("/");}
		
		else{
			response.redirect("/");
			
			} 
			
		}
	  
	}
	
	
	else{
		response.send("Wrong PassWord");
	}
	test=false;
	test2=false;
		
});


app.post("/delete", function(request,response){
	var deleteVal=request.body.deleteButton;
	diaryCollection.deleteOne({_id:deleteVal},function(error){
	if(error){
		console.log(error);
		response.write("<h1>Error</h1>");
		response.send();
		
	          }
	else{
		console.log("Delete");
		response.redirect("/");
	   }
                                                 });
});




//app.listen(3000||process.env.PORT,function(){
//	console.log("Success Server");
//	console.log("rs command re-start server");
//});


app.listen(process.env.PORT,function(){
	console.log("Success Server");
	console.log("rs command re-start server");
});

