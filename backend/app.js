const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const galleryRouter = require("./gallery_router");

const mongoose = require("mongoose");

const app = express();
const port = 8080;

mongoose.connect("mongodb://localhost:27017/gallery",{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.once('open', function(){
    console.log("DB connected!");
})

app.use(bodyParser.json());
app.use(bodyParser, urlencoded({
    extended : true
}))

app.use("/gallery", galleryRouter);

app.get("/", (req, res)=>{
    res.status(418).send("Hi");
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});

