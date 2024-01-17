const express = require("express")
const app = express()
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.set(express.json())
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public")))
app.use(methodOverride('_method'))

app.listen(3000,()=>{
  console.log("Server started on port 3000")
})


let posts = [
  {
    id: "1a",
    name: "Mohammad Ariful",
    postTime: "1d ago",
    postCaption:"The more you get, The more you own to loose",
    likes: 128,
    comments: 25,
    postImage:
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fHww",
    activity: "added a new post"
  } ,
  {
    id: "2a",
    name: "Tanvirul Tuhin",
    postTime: "30m ago",
    postCaption:"The harder you work,you get sweeter fruit",
    likes: 57,
    comments: 4,
    postImage:
    "https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fHww",
    activity: "added a new post"
  } ,
  {
    id: "3a",
    name: "Sakib al hasan",
    postTime: "2d ago",
    postCaption:"Time and tides wait for none",
    likes: 179,
    comments: 12,
    postImage:
    "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
    activity: "added a new post"
  }
  ]

app.get("/posts",(req,res)=>{
  res.render("index",{posts})
})

app.get("/posts/create",(req,res)=>{
  res.render("create")
})

app.post("/posts",(req,res)=>{
  let {name,postCaption,postImage} = req.body;
  let newPost = {
    id:uuidv4(),
    name,
    postCaption,
    postImage,
    likes:0,
    comments:0,
    postTime:"Just now",
    activity: postImage?"added a new photo":"added a new post"
  }
  posts.push(newPost)
  res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find(p=>id===p.id)
  res.render("post.ejs",{post})
})

app.get("/posts/:id/edit",(req,res)=>{
  let {id} = req.params;
  let post = posts.find(p=>id===p.id)
  res.render("editpost",{post})
})

app.patch("/posts/:id",(req,res)=>{
  let {postCaption,postImage} = req.body;
  let {id} = req.params;
  let post = posts.find(p=>id===p.id)
  post.postCaption = postCaption;
  post.postImage = postImage;
  res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find(p=>id===p.id)
  posts = posts.filter(p=> id!==p.id)
  res.redirect("/posts")
})

app.patch("/posts/like/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find(p=>id===p.id)
  post.likes += 1;
  res.redirect("/posts")
})