const express=require('express');
const cors=require('cors');
const fs=require('fs');
const path=require('path');
const PORT = 3000;

const app=express();
app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname,"data","recipe.json");

app.get("/api/recipe",(req,res)=>{
    fs.readFile(filePath,'utf8',(err,data)=>{
        res.json(JSON.parse(data || "[]"));
    })
})

app.post("/api/recipe",(req,res)=>{
    if(!title||!ingredients||!instructions){
        res.status(400);
    }
    const {title,ingredients,instructions,cookTime}=req.body;
    const newRecipe={
        id :Date.now(),
        title,
        ingredients,
        instructions,
        cookTime,
        difficulty:"medium"
    }
fs.readFile(filePath,"utf8",(err,data)=>{
    const recipe=JSON.parse(data ||"[]");
    recipe.push(newRecipe);
    fs.writeFile(filePath,JSON.stringify(recipe,null,2),()=>{
        res.status(201).json(newRecipe);
    })
})
})

app.listen(PORT, () => {console.log(`Listening on PORT 3000`)})