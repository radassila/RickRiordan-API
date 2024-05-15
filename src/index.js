const express = require("express")
const mongoose = require('mongoose')



const app = express()
app.use(express.json())
const port = 3000

const Livro = mongoose.model('Livro', { 
    title: String,
    description: String,
    publication_date: String,
    image_url: String
    
});

app.get("/", async (req, res)=> {
    const livro = await Livro.find()
    return res.send(livro)
})

app.delete("/:id", async (req, res) => {
    const livro = await Livro.findByIdAndDelete(req.params.id)
    res.send(livro)
})

app.put("/:id", async (req, res) => {
    const livro = await Livro.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        publication_date:req.body.publication_date,
        image_url: req.body.image_url
    },{
        new:true
    })

    return res.send(livro)
})

app.post("/", async (req, res) => {

    try {
        const livro = await Livro.create(req.body)
        res.status(200).json(livro);
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }

    return res.send(Livro)

})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://radassila:Amora!3698@rickriordan-api.afa16en.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api');

    console.log('ta rodando')
})