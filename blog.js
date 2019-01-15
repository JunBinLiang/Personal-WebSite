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
var sign=false;
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




//to do list
const itemSchema=new mongoose.Schema({
    item:String
});

const itemCollection=mongoose.model("ItemsCollection",itemSchema);




const leaveMessageSchema=new mongoose.Schema({
	name:String,
	message:String
});

const leaveMessageCollection=mongoose.model("leaveMessageCollection",leaveMessageSchema);



var aboutContent = "The content of the about page.<br> First, let me introduce myself. <br><br>My name is JunBin Liang. A first year student in CUNY queens college who majoring mathmatical and computer science. I like to learn a lot of new things for challenging and enriching my skills. This is the page I made by using the skill I learn from UDEMY online BootCamp Class. I will contiunuously update this website. It will include my new skill, project, taken course and so on.";    
var contactContent="The content of the contact page.<br><br> Number:917-678-4238 <br>Email: junbinliang816@gmail.com";
var homeContent="This is the main page.<br>Write Your Journal below<br>";
 
app.get("/journal",function(request,response){
	 sign=false;
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
app.get("/calculator",function(request,response){
	sign=false;
	dangerDiary.length=0;
	 dangerTest=false;
	response.render("calculator");
});

app.get("/resume",function(request,response){
	sign=false;
	dangerDiary.length=0;
	 dangerTest=false;
	response.render("resume");
});
app.get("/signin",function(request,response){
	
	if(sign){
		response.render("leaveMessage");
		
	}
	else
	{
	response.render("signin");
	}
	sign=false;
	dangerDiary.length=0;
	 dangerTest=false;
});

app.get("/",function(request,response){  //about page
	sign=false;
	dangerDiary.length=0;
	dangerTest=false;
	response.render("about",{content:aboutContent});
});

app.get("/contact",function(request,response){
	sign=false;
	dangerDiary.length=0;
	dangerTest=false;
	response.render("contact",{content:contactContent});
});

app.get("/compose",function(request,response){
	sign=false;
	dangerDiary.length=0;
	 dangerTest=false;
	response.render("compose");
});


app.get("/register",function(request,response){
	sign=false;
	dangerDiary.length=0;
	 dangerTest=false;
	response.render("register");
});



app.get("/secret/123456",function(request,response){

	sign=false;
	dangerDiary.length=0;
	 dangerTest=false;
	response.render("secret");
});





app.post("/myMessage",function(request,response){
   
	var secretPassword=request.body.messagePassord;
	
	   if(secretPassword==="woxihuanjiejie")
	   {
		  leaveMessageCollection.find(function(err,leaves){ //fruits  is  an  array
	         if(err)
		     {
	    	           console.log(err);
	         }
	         else
			 {
			            response.render("myMessage",{collection:leaves});
	         }
	
                                                           });
	   }
	
	  else
	   {
	   response.send("What are you Doing");
	   }

});




app.post("/register",function(request,response){
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





app.post("/signin",function(request,response){
	var gmail=request.body.gmail;
	var password=request.body.password;
	
	accountCollection.find({mail:gmail,password:password},function(err,diarys){
	
		if(diarys.length===0)
		{
			response.send("<h1>Wrong PassWord or em...</h1>");
			
		}
		
		else
		{
			sign=true;
			response.render("leaveMessage");
		}
	
	});
	
	
	
});







app.post("/message",function(request,response){
	var name=request.body.name;
	var message=request.body.message;
	
	const leavingMessage=new leaveMessageCollection({
	           name:name,
			   message:message
                                           });	
			 
	     //save into database		
	     leavingMessage.save();
	
	     response.render("success1");
	
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
			
			res.write("<h1>Error Error</h1>");
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
	  sign=false;
	  dangerDiary.length=0;
	  dangerTest=false;
    var routeTitle=req.params.routeParam;  
    console.log(routeTitle);

//withoue exiting the page: stay same->by using dangerTest, as it exit -> dangerTest=false
	if(dangerTest){
		diaryCollection.find({title:routeTitle},function(err,diarys){ 
        res.render("actual",{collection:dangerDiary});  //dangerDiary,from last func
	
	                                                                });	
	               }    
	
	//random refresh-> just the first one by title, general finding
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
	     response.redirect("/journal");}
		
		else{
			response.redirect("/journa;");
			
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
		response.redirect("/journal");
	   }
                                                 });
});




//app.listen(3000||process.env.PORT,function(){
	//console.log("Success Server");
	//console.log("rs command re-start server");
//});


//accountCollection.deleteMany(function(error){
	//if(error){
		//console.log(error);
	//}
//else{
		//mongoose.connection.close();
		//console.log("Delete");
	//}
//});
//leaveMessageCollection.deleteMany(function(error){
	//if(error){
		//console.log(error);
	//}
//else{
		//mongoose.connection.close();
		//console.log("Delete");
	//}
//});
   





app.get("/list",function(request,response)
{    sign=false;
	 dangerDiary.length=0;
	 dangerTest=false;
	
	// render to page when database is loaded
	
	itemCollection.find(function(err,itemsInDB){ //itemsInDB  is  an  array by our database
	if(err){
		console.log(err);
	}
	else{
		response.render("list",{collections:itemsInDB});  //list from directory views,      ejs response
	                                                            // each pass data must be specified
	                                                            // collections -> items is triggered by each post call
	    }
	
                                             });
	
	

});   
  
    

app.post("/todolist", function(req,res){
	  var adding=req.body.item;
     
	  const myItem=new itemCollection({
	       item:adding
                                     });
	  
	  myItem.save();  //save into the database instead of using regular array
	  
	  res.redirect("/list");
});

  

app.post("/listDelete", function(req,res){
      var removeID=req.body.chk;   //from the checkbox
	  itemCollection.deleteOne({_id:removeID},function(err){
		  if(err){
			  console.log(err);
		  }
	  });
	  res.redirect("/list");
});


  
 
//https://git.heroku.com/rocky-gorge-12412.git


















app.listen(process.env.PORT,function(){
	console.log("Success Server");
	console.log("rs command re-start server");
});

