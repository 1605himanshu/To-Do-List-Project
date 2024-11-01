const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Set up the view engine and static files
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using environment variables
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/todo";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema and model
const trySchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Task", trySchema);

// Home route
app.get("/", async function(req, res) {
    try {
        const foundItems = await Item.find({});
        res.render("list", { ejes: foundItems.length ? foundItems : [] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Add new item
app.post("/", async function(req, res) {
    const itemName = req.body.e1e1;
    const newItem = new Item({
        name: itemName
    });

    try {
        await newItem.save();
        res.redirect("/");
    } catch (err) {
        console.error("Error saving item: ", err);
        res.status(500).send("Error saving item.");
    }
});

// Delete item
app.post("/delete", async function(req, res) {
    const checkedId = req.body.checkbox1;
    
    try {
        await Item.findByIdAndDelete(checkedId);
        console.log("Item deleted successfully.");
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting item: ", err);
        res.status(500).send("Error deleting item.");
    }
});

// Listen on the specified PORT or 2000 for local development
const PORT = process.env.PORT || 2000;
app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});

