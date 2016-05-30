# Backbone Models Quick Reference

* [Definition and Instantiation](#definition-and-instantiation)
* [Print a Backbone Object](#print-a-backbone-object)
	* [`toJSON()`](#tojson)
	* [`JSON.stringify()`](#jsonstringify)
* [The Correct Way of Interating with Models: `get()` and `set()`](#the-correct-way-of-interating-with-models-get-and-set)
	* [`Model.set()`](#modelset)
* [Validation](#validation)

Backbone models contain data for an application as well as the logic around its data. For example, we can use a model to represent the concept of a todo item, including its attributes like `title` and `completed`.

## Definition and Instantiation

We can create such a model using Backbone like this:

```javascript
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    initialize: function () {
        "use strict";
        console.log('This model has been initialized.');

        // whatever you want to do when the model is first instantiated
        // a good example is adding some event listeners
        this.on('change', function () {
            console.log('- Values for this model have changed.');
        });

        // you can also listen to a single attribute
        this.on('change:title', function () {
            console.log('Title value for this model has changed.');
        });
    },

    // you can have a setter for a single attribute, instead of a generic set()
    setTitle: function (newTitle) {
        "use strict";
        this.set({title: newTitle});
    },

    validation: function (attrs) {
        "use strict";
        if (!attrs.title) {
            return 'I need a title';
        }
    }
});

var todo1 = new Todo();
var todo2 = new Todo({
    title: 'do laundry',
    completed: false
};

console.log(JSON.stringify(todo1));
```

## Print a Backbone Object

Backbone provides 2 convenient functions: `toJSON()` and `JSON.stringify(object)`.

### `toJSON()`

This method returns a copy of the attributes as an object.

Example:

```javascript
>>> print(todo2);
child {cid: "c2", attributes: Object, _changing: false, _previousAttributes: Object, changed: Object…}

>>> print(todo2.toJSON());
Object {title: "", completed: false}
```

### `JSON.stringify()`

When this method is used on an object, the object's `toJSON()` method is implicitly called. Then, the returned object is printed out in a string form.

## The Correct Way of Interating with Models: `get()` and `set()`

### `Model.set()`

`Model.set()` sets a hash containing one or more attributes on the model. When any of these attributes alter the state of the model, a change event is triggered on it.

```javascript
// do: set via instantiation
var myTodo = new Todo({
    title: "Set through instantiation."
});

// do: set via set()
myTodo.set("title", "A new hope");

// set() also takes dictionaries
myTodo.set({
    title: "The empire strikes back"
    director: "George Lucas"
});

// don't: change directly using .attributes
```

Don't change an attribute by using `.attributes` attribute; it won't trigger 'change' events.

## Validation

Backbone supports model validation through `model.validate()`. By default, this method is invoked when:

1. model is persisted via `save()`
1. `set()` and `unset()` is called with `{validate: true}` is passed as an argument.

```javascript
var Person = new Backbone.Model.extend({name: 'Jeremy'});

Person.validate = function (attrs) {
    if (!attrs.name) {
        return 'I need your name';
    }
};

Person.unset('name', {validation: true});
```

`.validate()` should return an error if attributes are invalid. When an error is returnd:

* An `invalid` event will be triggered, setting the `validationError` property on the model with the value that is returned by this method.
* `.save()` will not continue and the attributes of the model will not be modified on the server.



