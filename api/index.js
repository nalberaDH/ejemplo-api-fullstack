//https://randomuser.me/

const express = require('express');
const axios = require('axios');

const app = express();

const apiInfo = async () => {
    const allUsers = await axios('https://randomuser.me/api/');
    const { results } = allUsers.data;
    //console.log(results[0])
    
    return json = results.map((e) => {
        return{
            firstName: e.name.first,
            lastName: e.name.last,
            streetName: e.location.street.name,
            streetNumber: e.location.street.number,
            city: e.city,
            country: e.country,
            email: e.email,
            phone: e.phone,
            picture: e.picture.large,
        }
    })
    
    
};

app.get('/users', async (req,res)=>{
    
    const allUsers = await apiInfo();
    res.status(200).json(allUsers);
});


app.listen(3001, () => console.log("Servidor escuchando en puerto 3001"))