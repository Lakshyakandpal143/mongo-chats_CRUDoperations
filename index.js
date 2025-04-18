const express=require("express");
const app=express();
const path=require("path");
const mongoose=require('mongoose');
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");
const port=8080;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
 .then(()=>{
    console.log("connection successful");
 }).catch((err)=>{
    console.log(err);
 });

// let chat1=new Chat({
//     from:"boi1",
//     to:"boy2",
//     msg:"boy2 how are you??",
//     date:new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch(
//     (err)=>{
//         console.log(err);
//     }
// );

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}



app.get("/",(req,res)=>{
    res.send("working route");
});
 
//index route
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    res.render("chats.ejs",{chats});
});

//new chat
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//post new chat to database
app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    let date=new Date();
    let newchat=new Chat({
        from:from,
        to:to,
        msg:msg,
        date:date,
    });
    newchat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//edit form 
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let{msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//delete route
app.delete("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.listen(port,()=>{
    console.log("app is listening");
});