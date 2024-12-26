const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://todolist:todo1605@cluster0.nlo36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const trySchema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema);
//const todo = new item({
  //  name:"create some videos"
//});
//const todo2 = new item({
//    name:"Learn DSA"
//});
//const todo3 = new item({
//    name:"Learn React"
//});
//const todo4 = new item({
 //   name:"Take some rest"
//});
//todo2.save();
//todo3.save();
//todo4.save();
app.get("/", async function(req, res) {
    try {
        const foundItems = await item.find({});
        if (foundItems.length === 0) {
            res.render("list", { ejes: [] });
        } else {
            res.render("list", { ejes: foundItems });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/",function(req,res){
    const itemName = req.body.e1e1;
    const todo5 = new item({
        name:itemName
    });
    todo5.save();
    res.redirect("/");
});

app.post("/delete", async function(req, res) {
    const checked = req.body.checkbox1;
    
    try {
        await item.findByIdAndDelete(checked);
        console.log("Item deleted successfully.");
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting item: ", err);
        res.status(500).send("Error deleting item.");
    }
});



app.listen("2000",function(){
    console.log("server started")
});
