const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myFirstDB', {useNewUrlParser: true});
console.log("Running Database");

//1. create schema->pattern
const fruitSchema=new mongoose.Schema({
	price:Number,
	name:String,
	rating:{
		//data validation
		type:Number,
		min:1,
		max:10,
		required:[true, "it is a required a field with restriction"]
	}
});


//2. collection, name=Fruit, shown as   fruits
const FruitCollection=mongoose.model("Fruit",fruitSchema);


//3. data
const fruit=new FruitCollection({
	price:1,
	name:"apple",
    rating:5
});

//4. store data, it will store it each time for your rum

fruit.save();


//5. find
FruitCollection.find(function(err,fruits){ //fruits  is  an  array
	if(err){
		console.log(err);
	}
	else{
		//mongoose.connection.close();    // close connection automatically without crl+c, must be placed here
		console.log(fruits);
	}
	console.log(fruits[0].rating);
});


//6. update
FruitCollection.updateOne({_id:"5c2539a8de120fae34a625d7"},{name:"Peach"},function(err){
	if(err){
		console.log(err);
	}
	else{
		//mongoose.connection.close();
		console.log("Update");
	}
});


//7. Delete
FruitCollection.deleteMany({name:"apple"},function(error){
	if(error){
		console.log(error);
	}
	else{
		//mongoose.connection.close();
		console.log("Delete");
	}
});








