// Monster Manual API
// v0.2f

// Requirements for Express
const express = require('express');
const app = express(); 
const port = 4001

// Monster Names
const monstersArr = ['Goblin', 'Dragon', 'Zombie', 'Beholder'];

// Create (POST) -- Template
app.post('/', (req, res) =>  {
    res.send('Got a POST request.')
})

// Read (GET) -- ROOT PATH REQ. Display welcome message, log all monsters to console.
app.get('/', (req, res) => {
    res.send('Welcome to the Monster Manual\n')    
    // Log Monsters to Console
    for (let i = 0; i < monstersArr.length; i++) {
        console.log(`The monster as index ${i} is ${monstersArr[i]}.`)
    }  
})

// GET -- ID REQ. -- Send string with monster name, log to console. 
app.get('/monsters/:id', (req, res, next) => {
    if (typeof monstersArr[req.params.id] === 'undefined') {
        res.send('That monster ID does not exist, please try again.');
        res.status(404).send();
        console.log('Index did not exist.');
    } else {
        let monsterIndex = monstersArr[req.params.id];        
        res.send(`The monster with ID # ${req.params.id} is ${monsterIndex}`);     
        res.status(200).send();
        console.log(`The monster ${monsterIndex} was found.`);    
    }  
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