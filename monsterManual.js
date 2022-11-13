// Monster Manual API -- 
// v0.4a

// Requirements for Express
const express = require('express');
const app = express(); 
const port = 4001

// Requirements for MySQL
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user 'dbdesigner1',
    password: 'dPY8nyoS#Xh%',
    database: 'monsterManual'
})

// Monster Names
const monstersArr = ['Goblin', 'Dragon', 'Zombie', 'Beholder'];

// Create (POST) -- Create New Monster
// WORKING -- 11/13/22 @ 12:02AM
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
// WORKING -- 11/13/22 @ 12:02AM
app.get('/', (req, res) => {
    res.send('Welcome to the Monster Manual\n')    
    // Log Monsters to Console
    for (let i = 0; i < monstersArr.length; i++) {
        console.log(`The monster as index ${i} is ${monstersArr[i]}.`)
    }  
})

// GET -- ID REQ. -- Send string with monster name, log to console. 
// WORKING -- 11/13/22 @ 12:02AM
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
// WORKING -- 11/13/22 @ 12:02AM
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

// Delete (DELETE) Monster Deletion
// WORKING -- 11/13/22 @ 12:02AM
app.delete('/monsters/:id', (req, res) => {
    if (typeof monstersArr[req.params.id] === 'undefined') {
        res.send('That monster cannot be deleted as it does not exist.  Please try again.')
        console.log('Monster ID does not exist, cannot delete.');
    } else {        
        const monsterID = req.params.id;
        const deletedMonsterName = monstersArr[monsterID];
        const indexToSplice = req.params.id; 
        monstersArr.splice(indexToSplice, 1);
        console.log(`ID#${monsterID} ${deletedMonsterName} was deleted.`);     
        res.send(`ID#${monsterID} ${deletedMonsterName} was deleted.`);             
    }  
  })
  
// Start Server on 4001
app.listen(port, () => {
    console.log(`Server Passed Perception Check: Port ${port}`)
})