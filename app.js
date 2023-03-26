const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB", {useNewUrlParser: true });

/*const fruitSchema = new mongoose.Schema (
    {
        name: String,
        rating: Number,
        review: String
    }
);*/

const fruitSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            //required: [true, "please add name"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    }
);

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit (
{
    
    rating: 7,
    review: "i am peach"
}
);

const pineapple = new Fruit({
    name: "Pineaaple",
    rating: 9,
    review: "saving u up"
});
pineapple.save();

//fruit.save();

/*const kiwi = new Fruit({
    name: "kiwi",
    rating: 10,
    review: "good one"
});

const orange = new Fruit({
    name: "orange",
    rating: 8,
    review: "great fruit"
}); 
*/
/*Fruit.insertMany([kiwi, orange], function(err){
    if (err) {
        console.log(err);
    }
    else {
        console.log("success");
    }
});*/

async function foo()
{
const result = await Fruit.find(); // Make sure to wrap this code in an async function
//console.log(result);
result.forEach(function(goodies){
    console.log(goodies.name);
});
return result;
}
 
const fin=foo();
console.log(fin);

/*async function foo2()
{
const result = await Fruit.updateOne({_id: "6411e5e1fdab5f90147c7078"},{name: "peach"}); // Make sure to wrap this code in an async function
//console.log(result);
if(result!=null){
    console.log("success");
}
return result;
}
const fin2=foo2();*/

async function foo3()
{
const result = await Fruit.deleteMany({ name: "John" }); // Make sure to wrap this code in an async function
//console.log(result);
if(result!=null){
    console.log("success");
}
return result;
}
const fin3=foo3();

const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouritefruit: fruitSchema
});

const Person = mongoose.model("Person",PersonSchema);

const person=new Person({
    name: "Amy",
    age: 12,
    favouritefruit: pineapple
});
person.save();


const findDocuments = function(db, callback){
    const collection = db.collection( 'fruits' );
    collection.find({}).toArray(function(err, fruits){
        AuthenticatorAssertionResponse.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
};