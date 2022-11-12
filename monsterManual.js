// Monster Manual API
// v0.2c

// Requirements for Express
const express = require('express');
const app = express(); 
const port = 4001

// Serve Static Files
app.use(express.static('public'))

// Create (POST) -- Template
app.post('/', (req, res) =>  {
    res.send('Got a POST request.')
})

// Read (GET) -- Template 
app.get('/', (req, res) => {
    res.send('Welcome to the Monster Manual\n')  
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