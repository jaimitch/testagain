const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/edit/:id', async( request, response) => {
    var id = request.params.id;
    var result = await models.todoList.find({
        where: {
            id: id
        }
    });
    response.render('edit', { todoList: result });
});

router.post('/edit/:id', async (request, response) => {
    request.checkBody('editItem', 'To do item must be atleast 1 character long').len(1);
    var errors = request.validationErrors();
    var updatedItem = request.body.editItem;
    var id = request.body.id;
    var updated = await models.todoList.update({
        name: updatedItem
    }, {
        where: {
            id: id
        }
    });
    var result = await models.todoList.find({
        where: {
            id: id
        }
    });
    if (errors) {
        response.render('edit', {errors: errors, todoList: result });
    } else {
        response.redirect('/todos');
    }
});


module.exports = router;