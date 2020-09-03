const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu bibendum at varius vel pharetra vel turpis nunc. Dolor magna eget est lorem ipsum. Tortor dignissim convallis aenean et. Et pharetra pharetra massa massa ultricies mi. Libero enim sed faucibus turpis in. Urna nunc id cursus metus aliquam. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Habitant morbi tristique senectus et netus et. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Vitae auctor eu augue ut lectus arcu bibendum at. Feugiat scelerisque varius morbi enim nunc faucibus. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu bibendum at varius vel pharetra vel turpis nunc. Dolor magna eget est lorem ipsum. Tortor dignissim convallis aenean et. Et pharetra pharetra massa massa ultricies mi. Libero enim sed faucibus turpis in. Urna nunc id cursus metus aliquam. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Habitant morbi tristique senectus et netus et. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Vitae auctor eu augue ut lectus arcu bibendum at. Feugiat scelerisque varius morbi enim nunc faucibus. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu bibendum at varius vel pharetra vel turpis nunc. Dolor magna eget est lorem ipsum. Tortor dignissim convallis aenean et. Et pharetra pharetra massa massa ultricies mi. Libero enim sed faucibus turpis in. Urna nunc id cursus metus aliquam. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Habitant morbi tristique senectus et netus et. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Vitae auctor eu augue ut lectus arcu bibendum at. Feugiat scelerisque varius morbi enim nunc faucibus. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://admin-iamnishanth:<pass>@cluster0.5ehrt.mongodb.net/blogDB", { useNewUrlParser: true });

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model('Post', postSchema);

app.get('/', function (req, res) {
    Post.find({}, function (err, posts) {
        res.render("home", {
            homepageContent: homeStartingContent,
            posts: posts
        });
    });
});

app.get('/about', function (req, res) {
    res.render("about", { aboutpageContent: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactpageContent: contactContent });
});

app.get("/compose", function (req, res) {
    res.render('compose');
});

app.post("/compose", function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save(function(err){
        if(!err){
            res.redirect("/");
        }
    });
});

app.get("/posts/:postId",function(req,res){
    const requestedPostId = req.params.postId;
    Post.findOne({_id:requestedPostId},function(err,post){
        res.render("post",{
            title:post.title,
            content: post.content
        });
    });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server running on port 3000.");
})