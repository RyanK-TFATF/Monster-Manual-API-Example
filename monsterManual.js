// Monster Manual API
// v0.2h

// Requirements for Express
const express = require('express');
const app = express(); 
const port = 4001

// Monster Names
const monstersArr = ['Goblin', 'Dragon', 'Zombie', 'Beholder'];

// Create (POST) -- Template
app.post('/monsters/:id', (req, res, next) =>  {
    // Check to see if the monster ID doesn't exist AND it is the next sequential number. 
    if (typeof monstersArr[req.params.id] === 'undefined' && req.params.id == monstersArr.length + 1 ) {
        res.send('That monster was not found and ID number is next in line, adding now...');
        const monsterID = req.params.id;
        const monsterName = req.query.name; // Fix to pull actual name from string. FIXED. SO PROUD.
        monstersArr.push(monsterName);        
        console.log(`${monsterName} was added at ID#${monsterID}.`);
        res.status(200).send();        
    } else {
        res.send('A monster either exists at that ID number or the ID number is not sequential. Please try again.');        
        res.status(400).send();
        console.log('Monster ID already exists.');
    }   
})

// (GET) -- ROOT PATH REQ. Display welcome message, log all monsters to console.
// Currently works as intended. 11/12/12 @ 10:48PM
app.get('/', (req, res) => {
    res.send('Welcome to the Monster Manual\n')    
    // Log Monsters to Console
    for (let i = 0; i < monstersArr.length; i++) {
        console.log(`The monster as index ${i} is ${monstersArr[i]}.`)
    }  
})

// GET -- ID REQ. -- Send string with monster name, log to console. 
// Currently works as intended. 11/12/12 @ 10:48PM
app.get('/monsters/:id', (req, res, next) => {
    if (typeof monstersArr[req.params.id] === 'undefined') {
        res.send('That monster ID does not exist, please try again.');
        res.status(404).send(); // Not Needed?
        console.log('Index did not exist.');
    } else {
        let monsterIndex = monstersArr[req.params.id];        
        res.send(`The monster with ID # ${req.params.id} is ${monsterIndex}`);     
        res.status(200).send(); // Not Needed?
        console.log(`The monster ${monsterIndex} was found.`);    
    }  
})

// Update (PUT) Update monster by ID. 
app.put('/monsters/:id', (req, res, next) =>  {
    if (typeof monstersArr[req.params.id] === 'undefined') {
        res.send('That monster cannot be updated as it does not exist.  Please try again.')
        console.log('Monster ID does not exist, cannot update.');
    } else {        
        const monsterID = req.params.id;
        const oldMonsterName = monstersArr[monsterID];
        const newMonsterName = req.query.name; // Fix to pull actual name from string. FIXED. SO PROUD.
        monstersArr[monsterID] = newMonsterName;        
        console.log(`ID#${monsterID} was changed from ${oldMonsterName} to ${newMonsterName}.`);     
        res.send(`ID#${monsterID} was changed from ${oldMonsterName} to ${newMonsterName}.`);     
        
    }   
})

// Delete (DELETE) Template
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
  })
  
// Start Server on 4001
app.listen(port, () => {
    console.log(`Server Passed Perception Check: Port ${port}`)
})