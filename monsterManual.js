// Monster Manual API
// v0.2

// Requirements for Express
const express = require('express');
const app = express(); 
const port = 4001

// Monster Names
const monstersArr = ['goblin', 'dragon', 'zombie'];

// Serve Static Files
// app.use(express.static('public'))

// Create (POST) -- Template
app.post('/', (req, res) =>  {
    res.send('Got a POST request.')
})

// Read (GET) -- Display all monsters in with / request. 
app.get('/', (req, res) => {
    res.send('Welcome to the Monster Manual\n')    
    // res.status(200).send('OK'); <-- Do I need this?
    // Log Monsters to Console
    for (let i = 0; i < monstersArr.length; i++) {
        console.log(`The monster as index ${i} is ${monstersArr[i]}.`)
    }  
})

// GET -- Monster by :id 
app.get('/monsters/:id', (req, res, next) => {
    let monsterIndex = monstersArr[req.params.id];
    //res.send(`${monstersArr[monsterIndex]}\n`)    
    res.send(`The monster with ID # ${req.params.id} is ${monsterIndex}`);     
})


// Update (PUT) Template
app.put('/', (req, res) =>  {
    res.send('Got a PUT request.')
})

// Delete (DELETE) Template
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
  })
  
// Start Server on 4001
app.listen(port, () => {
    console.log(`Server Passed Perception Check: Port ${port}`)
})