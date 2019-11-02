// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//globals
const PORT = process.env.PORT || 5000;
const toDoRouter = require('./routes/todo.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES  SQL          router
app.use('/toDoList', toDoRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});