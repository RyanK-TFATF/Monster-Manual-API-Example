// Monster Manual API -- 
// v0.5a

// Requirements for Express
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const port = 4001
app.use(bodyParser.json()); 

// Requirements for MySQL
const mysql = require('mysql')
const dBase = mysql.createConnection({
    host: 'localhost',
    user: 'dbdesigner1',
    password: 'dPY8nyoS#Xh%', // How is this secure storing in plain text? 
    database: 'monstermanual'
})
console.log(process.env.CPU); 

dBase.connect((err) => {
    if (err) throw err; 
    console.log('Connected to localhost database.');
}); 

// Create (POST) -- Create New Monster
// Sort Of Working -- Postman calls will return success message, but data is not actually posting to the database.  
app.post('/monsters', (req, res, next) =>  {    // variable names are clashing.  
    const body = req.body
    console.log('The body is',  body)
    let insertQuery = `INSERT INTO test_table0 (monsterName) VALUES ('${body.monsterName}')`;
    
    dBase.query(insertQuery, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send(`Warning! INSERT failed.`)   
        } else {
            // res.send(`New Monster created in test_table0.`);
            console.log('Value added successfully.', results);
            res.status(200).send(`test_table0 updated with new monster name: ${body.monsterName}`)                 
        }    
    })   
})

// (GET) -- ROOT PATH REQ. Display welcome message, log all monsters to console.
// WORKING -- 11/13/22 @ 12:02AM
app.get('/monsters', (req, res) => {
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

// Delete (DELETE) Monster Deletion
// WORKING -- 11/13/22 @ 12:02AM
app.delete('/monsters/:id', (req, res) => {    
    let deleteQuery = `DELETE FROM test_table0 WHERE monsterID = '${req.params.id}'`; 
    dBase.query(deleteQuery, (err, _res) =>  {
        if (err) {
            console.log(err);
            res.status(500).send(`Critical error.`);   
        } else {            
            console.log('Value deleted successfully.');
            res.status(200).send(`monsterID:${req.params.id} DELETED from test_table0.`);   
        }    
    })   
    

    }) 
  
// Start Server on 4001
app.listen(port, () => {
    console.log(`Server Passed Perception Check: Port ${port}`)
})