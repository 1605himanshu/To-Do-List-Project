const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Define your schema here (example schema)
const trySchema = new mongoose.Schema({
    name: String
});

// Initialize Express app
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI; // Use the environment variable

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

const item = mongoose.model("task", trySchema);

// Routes
app.get("/", async (req, res) => {
    try {
        const foundItems = await item.find({});
        res.render("list", { ejes: foundItems.length ? foundItems : [] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/", async (req, res) => {
    const itemName = req.body.e1e1;
    const todo5 = new item({ name: itemName });

    try {
        await todo5.save();
        res.redirect("/");
    } catch (err) {
        console.error("Error saving item:", err);
        res.status(500).send("Error saving item.");
    }
});

app.post("/delete", async (req, res) => {
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

// Start the server on the specified port
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
