const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
   db('accounts')
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Error retrieving accounts.' })
    })
})

server.get('/api/accounts/:id', (req, res) => {
    db('accounts')
     .where('id', req.params.id)
     .then(account => {
         res.status(200).json(account)
     })
     .catch(error => {
         console.log(error)
         res.status(500).json({ error: 'Error retrieving accounts.' })
     })
 })
 

server.post('/api/accounts', (req, res) => {
    db('accounts')
        .insert(req.body)
        .then(account => {
            res.status(201).json(req.body)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Error creating account.' })
        })
})

server.put('/api/accounts/:id', (req, res) => {
    db('accounts')
        .where('id', req.params.id)
        .update(req.body)
        .then(() => {
            res.status(200).json({ message: 'Updated!' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Error updating account.' })
        })
})

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts')
        .where('id', req.params.id)
        .del()
        .then(() => {
            res.status(204).json({ message: 'Deleted' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Couldn\'t delete account.' })
        })
})
//
module.exports = server;