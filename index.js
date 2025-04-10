const express=require("express");
const methodOveride=require('method-override');
const app = express();
const port=8080;
const { v4: uuidv4 } = require('uuid'); 
app.use(express.json());
app.use(methodOveride('_method'));
app.use(express.urlencoded({ extended: true }));
const path = require('path');
 let post=[
    {
        id: uuidv4(),
        username:"anushka",
        content:"I Love Coding in JAVA"
    },
    {
        id: uuidv4(),
        username:"harshit",
        content:"Giving False hopes is unacceptable"
    },
    {
        id: uuidv4(),
        username:"mehak",
        content:"Fixing this will help you in better vision"
    },
    {
        id:uuidv4(),
        username:"shreya",
        content:"Batter about to die"
    }
 ]
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.send("Server is working");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{post});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let {username, content}=req.body;
    let id=uuidv4();
    post.push({id, username, content});
    res.redirect("/posts");
})
app.patch("/posts/:id",(req,res)=>{
    let id=req.params.id;
    let newContent= req.body.content;
    const posts = post.find(p => p.id === id);
    posts.content=newContent;
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let Postid= req.params.id;
    let posts = post.find(p => p.id === Postid);
    console.log(posts)
    res.render("show.ejs",{posts});
})

app.get("/posts/:id/edit",(req,res)=>{
    let postId = req.params.id;
    let posts = post.find(p => p.id ===postId); // or however you're getting it
    res.render('edit.ejs', { posts});
})

app.delete("/posts/:id",(req,res)=>{
    let Postid=req.params.id;
    post=post.filter((p)=>p.id!==Postid);
    res.redirect("/posts");
})

app.use(express.static(path.join(__dirname,"public")));
app.listen(port, ()=>{
    console.log("App is listening");
});