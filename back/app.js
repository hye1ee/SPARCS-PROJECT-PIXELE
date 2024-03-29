const express = require("express");
const bodyParser = require("body-parser");
const pixelRouter = require("./pixelrouter");

const mongoose = require("mongoose");

const app = express();
const port = 8080;

mongoose.connect("mongodb://root:{"replace password here"}@ssal.sparcs.org:33374?authSource=admin",{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.once('open', function(){
    console.log("DB connected!");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use("/pixel", pixelRouter);

app.get("/", (req, res)=>{
    res.status(418).send("Hi");
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});

