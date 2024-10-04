const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/data', (req, res) => {
    console.log(req.body); // Access parsed JSON data
    res.send('Data received');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
