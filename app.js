const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://admin:demo@cluster0-9dblz.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("DB connected") }).catch((err) => { console.log(err) });

const dataSchema = new mongoose.Schema({
    name:"String",
    team:"String"
})

var User = mongoose.model("User",dataSchema)


app.use(express.static('views'));

app.get('/', (req, res) => {
    User.find({},(err,data)=>{
        if(err){
            console.log("cant find data",err)
        }
        else{
            res.render("index.ejs",{user:data})
        }
    })
})

app.post('/test', (req, res) => {
    var newUser = new User({
        name:req.body.name,
        team:req.body.team
    }).save().then(savedData => console.log("data saved", savedData)).catch(err => console.log(err))
    console.log(req.body);
    res.redirect('/');
})

app.listen(8000, () => {
    console.log('Server started at 8000');
})
// app file setup

// second commit