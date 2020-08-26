const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent = "gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih ";
const aboutContent = "gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih ";
const contactContent = "gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih gibberish gibbersih ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', function (req, res) {
    res.render("home", { homepageContent: homeStartingContent, posts:posts });
});

app.get('/about', function (req, res) {
    res.render("about", { aboutpageContent: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactpageContent: contactContent });
});

app.get("/compose",function(req,res){
    res.render('compose');
});

app.post("/compose",function(req,res){
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    }
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName",function(req,res){
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);

        if(requestedTitle === storedTitle){
            res.render("post",{title:post.title,content:post.content});
        } else {
            console.log("Match Not Found!");
        }
    });
});

app.listen(3000, function () {
    console.log("Server running in Port 3000");
})