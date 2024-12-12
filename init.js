const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});

let chat=[
    {
        from:"boi1",
        to:"boy2",
        msg:"boy2 how are you??",
        date:new Date()
    },
    {
        from:"boi3",
        to:"boy4",
        msg:"boy4 how are you??",
        date:new Date()
    },
    {
        from:"boi5",
        to:"boy6",
        msg:"boy6 how are you??",
        date:new Date()
    },
];

Chat.insertMany(chat);


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}