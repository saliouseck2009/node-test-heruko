const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require("./models/things");


mongoose.connect('mongodb+srv://tdsi:toor@tpclassdb.tynsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//autoriser le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


app.post('/api/stuff', (req,res,next)=>{
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(()=>res.status(201).json({message: "Objet enrégistré !"}))
        .catch(error => res.status(400).json({error}));
});

app.get('/api/stuff/:id',(req, res,next)=>{
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(erro => res.status(404).json({ error }));
});

app.get('/api/stuff',(req,res,next)=>{
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error}));
});


app.put('/api/stuff/:id', (req, res, next) =>{
    Thing.updateOne({_id: req.params.id}, {...req.body, _id:req.params.id})
        .then(()=> res.status(200).json({message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({error}));
});

app.delete('/api/stuff/:id',(req, res, next)=>{
    Thing.deleteOne({_id:req.params.id})
        .then(()=> res.status(200).json({message: 'objet supprimé'}))
        .catch((erreur)=>res.status(400).json({erreur}))
})
module.exports = app;