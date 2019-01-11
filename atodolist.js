//Initialization
//Use MainChimp   API       de1aa4b6512699a4a7d7bb1ba790e4fe-us7       9f8369715c
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/toDoListDB', {useNewUrlParser: true}); 
//mongoose.connect('mongodb+srv://JunBin:QQqq816108@cluster0-e119v.mongodb.net/test?retryWrites=true/toDoListDB', {useNewUrlParser: true});

const express=require("express");
const app=express();
const requestHttp=require("request"); //use for       API  npm install request

const bodyParser=require("body-parser");  //body-parser : get the form data     //npm install body-parser


const itemSchema=new mongoose.Schema({
    item:String
});


//2. collection, name=Fruit, shown as   fruits
const itemCollection=mongoose.model("ItemsCollection",itemSchema);






//app.use(express.static("static_folder"));  // a folder that hold static that can be send together with the html file
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');  //use ejs
app.use(express.static("static_folder"));  

//var items=[];


app.get("/include",function(request,response){
	response.render("useInclude");
});



app.get("/",function(request,response)
{
	 var today=new Date();
	 var currentDay=today.getDay();  //return as an integer
	 var day="";
	
	if(currentDay===6 || currentDay===0){
		day="WeekEnd";
	}
	else
	{
		day="WeekDay";
	}
	
	// render to page when database is loaded
	
	itemCollection.find(function(err,itemsInDB){ //itemsInDB  is  an  array by our database
	if(err){
		console.log(err);
	}
	else{
		response.render("list",{date:day, collections:itemsInDB});  //list from directory views,      ejs response
	                                                            // each pass data must be specified
	                                                            // collections -> items is triggered by each post call
	    }
	
                                             });
	
	

});   
  
    

app.post("/", function(req,res){
	  var adding=req.body.item;
     
	  const myItem=new itemCollection({
	       item:adding
                                     });
	  
	  myItem.save();  //save into the database instead of using regular array
	  
	  res.redirect("/");
});

 

app.post("/anypage", function(req,res){
      var removeID=req.body.chk;   //from the checkbox
	  itemCollection.deleteOne({_id:removeID},function(err){
		  if(err){
			  console.log(err);
		  }
	  });
	  res.redirect("/");
});


  
 
//https://git.heroku.com/rocky-gorge-12412.git


app.listen(3000,function(){
	console.log("Success Server");
});