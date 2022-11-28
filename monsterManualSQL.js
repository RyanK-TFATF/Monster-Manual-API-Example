// Monster Manual API -- 
// v0.5a

// Requirements for Express
const express = require('express');
const app = express(); 
const port = 4001

// Requirements for MySQL
const mysql = require('mysql')
const dBase = mysql.createConnection({
    host: 'localhost',
    user: 'dbdesigner1',
    password: 'dPY8nyoS#Xh%', // How is this secure storing in plain text? 
    database: 'monstermanual'
})

dBase.connect((err) => {
    if (err) throw err; 
    console.log('Connected to localhost database.');
}); 


// Monster Names
// const monstersArr = ['Goblin', 'Dragon', 'Zombie', 'Beholder'];

// Create (POST) -- Create New Monster
// Sort Of Working -- Postman calls will return success message, but data is not actually posting to the database.  
app.post('/monsters/:id', (req, res, next) =>  {    
    let insertQuery = `INSERT INTO test_table0 (monsterID, monsterName) VALUES ('${req.params.id}', 'Test Monster')`;
    dBase.query((insertQuery, err, res) => {
        if (err) {
            console.log(err);
            return;
        } else {
            // res.send(`New Monster created in test_table0.`);
            console.log('Value added successfully.');
        }    
    })   
    res.send(`test_table0 updated with monsterID:${req.params.id} and monsterName: Test Monster`)         
})

// (GET) -- ROOT PATH REQ. Display welcome message, log all monsters to console.
// WORKING -- 11/13/22 @ 12:02AM
app.get('/', (req, res) => {
    /*
    res.send('Welcome to the Monster Manual\n')        
    for (let i = 0; i < monstersArr.length; i++) {
        console.log(`The monster as index ${i} is ${monstersArr[i]}.`)
    }  
    */ 
   let sql = 'SELECT * FROM test_table0'; // SELECT <VALUE> FROM <tableName>
   dBase.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
   })

})

/* GET -- ID REQ. -- Send string with monster name, log to console. 
WORKING -- 11/13/22 @ 12:02AM
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
*/

/* Update (PUT) Update monster by ID. 
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
*/

// Delete (DELETE) Monster Deletion
// WORKING -- 11/13/22 @ 12:02AM
app.delete('/monsters/:id', (req, res) => {
    let deleteQuery = `DELETE FROM test_table0 WHERE monsterID = ${req.params.id}`; 
    dBase.query((deleteQuery, err, res) =>  {
        if (err) {
            console.log(err);
            return;
        } else {            
            console.log('Value deleted successfully.');
        }    
    })   
    res.send(`monsterID:${req.params.id} DELETED from test_table0.`);   

    })
    
  
  
// Start Server on 4001
app.listen(port, () => {
    console.log(`Server Passed Perception Check: Port ${port}`)
})