# Backbone Collections Quick Reference

Collections are sets of Models, and are created by extending `Backbone.Collection`.

Normally, when creating a collection, you'll also want to define a property **specifying the type of model** that your collection will contain, along with **any instance properties required.**

## Creation

```javascript
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
```

## Adding or Removing Models

After the collection has been initialized, we can use `add()` and `remove()` to add and remove items.

```javascript
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var TodosCollection = Backbone.Collection.extend({
    model: Todo
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
```

## Retrieving a Model from a Collection

Use `Collection.get()`, which accepts a single id:

```javascript
// remember the myTodo with id of 2
var todo2 = todos.get(2);
console.log(todo2 === myTodo); // true
```

In Backbone, a `Collection` contains an array of models enumerated by their `id` property, if the model instances happen to have one.

## Add Event Listeners

Besides the `TodoCollection.on('add', function () {...})` examples at the beginning, we can also use jQuery style:

```javascript
myTodo.on({
    'change:title': titleChanged,
    'change:completed': stateChanged
});

function titleChanged () {
    "use strict";
}

function stateChanged () {
    "use strict";
}
```

## Only Invoke Callback Once: `once()`

Just like `on()`, but causes the bound callback to fire only once before being removed. Handy for saying *"the next time X happens, do this."*. When multiple events are passed in using the space separated syntax, the evet will fire once for every event, not once for a combination for all events.

## Resetting/Refreshing Collections

### `Collection.set()`

`Collection.set()` takes an array of models, and performs the necessary add, remove and change operations required to update the collection.

Documentation entry: 

[`collection.set(models`](http://backbonejs.org/#Collection-set)

### `Collection.reset()`

Similar to `set()`, but trigger a single "reset" event, without triggering any add or remove events.

Documentation entry:
[`collection.reset(models)`](http://backbonejs.org/#Collection-reset)

Use `reset()` with no parameter to clear out a collection.

