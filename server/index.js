const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// run static content the folder "public"
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));


// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// execute file index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

// run the server
app.listen(port, () => {
  console.log(`server run in port ${port}`);
})