const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const port = 3000;

var path = require('path');
var http = require("http");
var url = require("url");
var cors = require("cors");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

app.options('*', cors()); 

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('bla bla bla'));
// all routes prefixed with /api
app.use('/api', router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({message: 'Hello, welcome to my server'});
});

router.get('/stuff', (request, response) => {
    var urlParts = url.parse(request.url, true);
    var parameters = urlParts.query;
    var myParam = parameters.myParam;
    // e.g. myVenues = 12;
    
    var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
    
    response.json({message: myResponse});
  });

var todos = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    }];

  router.get('/todo', (request, response) => {

    response.json(todos);
  });  

  router.get('/todo/:id', (request, response) => {
   
    console.log(request.params.id)

    response.json(todos.find(x=>x.id==request.params.id));
  });  

  router.post('/todo', (request, response) => {

    const item = request.body;
    todos.unshift(item);

    response.json(item);

  }); 
  
  router.put('/todo/:id', (request, response) => {
    
    console.log(request.params.id)
    console.log(request.body)
    const item = todos.find(x=>x.id==request.params.id);
    item.title = request.body.title;
    response.json(item);

    // item.title = request.body
    // response.json();
  });  

  router.delete('/todo/:id', (request, response) => {
    console.log(request.params.id)
    todos = todos.filter(x=> x.id != request.params.id)
    response.json(todos);
  });  

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));