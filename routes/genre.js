
const express = require('express');
const Joi = require('joi');

const Router=express.Router();

const genres =[
    {id:1,name:'Action'},
    {id:2,name:'Horror'},
    {id:3,name:'Romance'}
];

// get request
Router.get('/',(req,res)=>{

    res.status(200).send(genres);
})

//get with id request

Router.get('/:id',(req,res)=>{
     const genre = genres.find(genre=>genre.id === parseInt(req.params.id));
    if(!genre)
    return res.status(404).send('The genre with given id not found');
    res.status(200).send(genre);
});

//PUT request

Router.put('/:id',(req,res)=>{

    const genre = genres.find(genre=>genre.id === parseInt(req.params.id))
    if(!genre)
    return res.status(404).send('The genre with given id not founf');

    const {error} = validateGenre(req.body);
    if(error)
     return res.status(400).send(error.details[0].message);

     genre.name = req.body.name;
     res.send(genre);

})




// post request
Router.post('/',(req,res)=>{
    const {error} = validateGenre(req.body);
    if(error)
     return res.status(400).send(error.details[0].message);
    const genre ={
        id: genres.length +1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
})

// delete request

Router.delete('/:id',(req,res)=>{

    const genre = genres.find(c=>c.id === parseInt(req.params.id));
    if(!genre)
    return res.status(404).send('The genre with given id doesnt match');

    const index = genres.indexOf(genre);
    //at position index remove one element
    genres.splice(index,1);

    res.send(genre);
})

// Validate Genre
function validateGenre(genre){
    const schema={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre,schema);
}

module.exports = Router;