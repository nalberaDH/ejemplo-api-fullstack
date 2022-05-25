const express = require('express');
const axios = require('axios');

const app = express();

const apiInfo = async () => {
    const allUsers = await axios('https://jsonplaceholder.typicode.com/users');
    return json = allUsers.data.map((e)=> {
        return{
            id: e.id,
            name: e.name,
            userName: e.userName,
            email: e.email,
            street: e.address.street,
            city: e.address.city,
            zipcode: e.address.zipcode,
            phone: e.phone,
            website: e.website,
            companyName: e.company.name,
        }
    });    
}


app.get('/users', async (req,res)=>{
    
    const name = req.query.name;
    const allUsers = await apiInfo();
    if(!name){
        return res.status(200).json(allUsers);
    }
    
    const filterInfo = allUsers.filter((user) => user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

    filterInfo.length ? res.status(200).send(filterInfo) : res.sendStatus(404);
    
});

app.get('/users/:id', async (req,res) => {
    const { id } = req.params;
    const allUsers = await apiInfo();
    const user = allUsers.find((e) => e.id == id);console.log(user);
    user ? res.status(200).json(user) : res.sendStatus(404);
})

app.listen(3001, () => console.log("Servidor escuchando en puerto 3001"))