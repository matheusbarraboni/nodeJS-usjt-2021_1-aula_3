const express = require("express");
const app = express();
const axios = require('axios');
app.use(express.json());


let lembretes = {};
let contador = 0;

app.get('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.put('/lembretes', async (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {
        contador, texto
    };
    await axios.post('http://localhost:10000/eventos', {
        tipo: 'LembreteCriado',
        dados: lembretes[contador]
    });
    res.status(201).send(lembretes[contador]);
});

app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(200).send({mgs: "ok"})
})

app.listen(4000, () =>{
    console.log('Lembretes, porta 4000.')
});