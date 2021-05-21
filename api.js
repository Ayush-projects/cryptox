const express = require('express');
const P2pServer = require('./server');
const Blockchain = require('./blockchain.js');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
dotenv.config({path: './var.env'})
const bc = new Blockchain();
const HTTP_PORT = process.env.HTTP_PORT || 3001

const p2pServer = new P2pServer(bc);
app.get('/blocks', (req,res)=>{
    res.json({bc});
})

app.post('/mine', (req,res)=>{
    const block = bc.addBlock(req.body.data);
    console.log(`New Block Added to Chain: ${block.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
})

app.listen(HTTP_PORT, (error)=>{
    if(error)
    console.log(error)
    else
    console.log(`Listening for HTTP requests on : ${HTTP_PORT}`);
})

p2pServer.listen();






