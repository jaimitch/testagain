const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const expressValidator = require('express-Validator');
const todos = require('./routes/todos');
const edit = require('./routes/edit');

const application = express();

application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');

application.use(expressValidator());
application.use(bodyParser.urlencoded());

application.use(todos);
application.use(edit);

var model = [];

application.get('/', (request, response) => {
    response.render('todos', {todos});
});

application.post('/', (request, response) => {
    var newTodo = {};
    newTodo.name = request.body.listItemAdd
    newTodo.complete = false;
    newTodo.id = model.length;

    model.push(newTodo);
    response.render('todos', {todos});
});

application.post('/', (request, response) => {
    var todoId = parseInt(request.params.id);
    var todo = model.find(q => q.id === todoId);
    todo.complete = true;
    response.render('todos', {todos});
});

application.listen(3000);