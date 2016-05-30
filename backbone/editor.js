var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

// define the collection with type of model it holds
var TodosCollection = Backbone.Collection.extend({
    model: Todo
});


// define 'add' and 'remove' event listeners
TodosCollection.on('add', function (todo) {
    "use strict";
    console.log('I should ' + todo.get('title') + '. Have I dont it before? ' +
                (todo.get("completed") ? 'Yeah!': 'No.'));
});

TodosCollection.on('remove', function (todo) {
    "use strict";
    // things to do when removing an item
});

// collection can listen to 'change' event for any model it contains
TodosCollection.on('change:title', function (model) {
    "use strict";
    console.log('Changed my mind! I should ' + model.get('title'));
});


var myTodo = new Todo({
    title: 'Read the whole book',
    id: 2
});

var todos = new TodosCollection([myTodo]);

console.log(todos.length); // 1

var a = new Todo({title: 'Go to Jamaica.'}),
    b = new Todo({title: 'Go to Iceland.'}),
    c = new Todo({title: 'Go to Disneyland.'});

todos = new TodosCollection([a, b]); // length: 2
todos.add(c); // length: 3

todos.remove([a, b]); // length: 1
todos.remove(c); // length: 0


// remember the myTodo with id of 2
var todo2 = todos.get(2);
console.log(todo2 === myTodo); // true






