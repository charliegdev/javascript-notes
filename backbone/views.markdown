# Views

* [Creating a View](#creating-a-view)
* [`el` Property](#el-property)
	* [Creating a New Element](#creating-a-new-element)
	* [Select an Existing Element Using jQuery Selector](#select-an-existing-element-using-jquery-selector)
* [Apply an Existing Backbone View to a Different DOM Element](#apply-an-existing-backbone-view-to-a-different-dom-element)
* [`render`() Function](#render-function)

Views in Backbone don't contain the HTML markup for your application; they contain the logic behind the presentation of the model's data to the user. They achieve this using JavaScript templating, for example, Underscore microtemplates.

A view's `render()` method can be bound to a models' `change()` event, enabling the view to instantly reflect model changes without requiring a full page refresh.

## Creating a View

Creating a view is similar to creating a model:

```javascript
var TodoView = Backbone.View.extend({
    tagName: 'li',
    className: 'container homepage list', // optional, 3 classes added
    id: 'tools', // optional

    // Cache the template function for a single item.
    todoTpl: _.template("An exmaple template"),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    render: function () {
        "use strict";
        this.$el.html(this.todoTpl(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    edit: function () {
        "use strict";
        // executed when todo lable is double-clicked
    },

    close: function () {
        "use strict";
        // executed when todo loses focus
    },

    updateOnEnter: function (e) {
        "use strict";
        // executed on each keypress when in todo edit mode,
        // but we'll wait for enter to get in action
    }
});

var todoView = new TodoView();

console.log(todoView.el);
```

## `el` Property

The central property of a view is `el`; it's a reference to a DOM element, and all views must have one.

Views can use `el` to compose their elements' content and then insert it into the DOM all at once.

There are 2 ways to associate a DOM element with a view:

1. A new element can be created for the view and then added to the DOM
2. A reference to an existing DOM element can be created using jQuery selector

### Creating a New Element 

If you want to create a new element for your view, set any combination of the following properties on the view: `tagName`, `id`, and `className`. If `tagName` is not specified, it will default to `div`.

```javascript
var TodosView = Backbone.View.extend({
    tagName: 'ul', // required, defaults to 'div' if not set
    className: 'container homepage list', // optional, 3 classes added
    id: 'tools', // optional
});

var todosView = new TodosView();
```
 The previous code creates the foolowing DOM element, but doesn't append it to the DOM:

```html
<ul id="todos" class="container homepage list"></ul>
```

### Select an Existing Element Using jQuery Selector

If the element already exists in the page, you can set `el` as a CSS selector that matches the element:

```javascript
el: '#footer'
```

## Apply an Existing Backbone View to a Different DOM Element

A view doesn't have to be tied to a single DOM element for its lifetime; you can change it using `setElement()` method:

```javascript
// in jQuery, wrap HTML inside a jQuery selector will create that element, 
// instead of trying to select anything
var button1 = $('<button></button>'),
    button2 = $('<button></button>');

// you can assign an 'el' to a view at instantiation
var todosView = new TodosView({el: button1}); 

todosView.setElement(button2);
```

## `render`() Function

`render()` is an optional functon that defines the logic for rendering a template. The book at this section is very unclear of how `render()` works, or how Underscore microtemplate works, but here is an example snippet of Underscore microtemplate:

```html
<script type="text/template" id="item-template">
    <div>
        <input id="todo_complete" type="checkbox" <%= completed ? 'checked="checked"' : '' %>>
        <%= title %>
    </div>
</script>
```

Sample `render()` function:

```javascript
var ListView= Backbone.View.extend({
    // compile a template for this view
    template: _.template($("#list_template").html()),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
```

A more complicated view to enable nested view (with the help of `return this`):

```javascript
var ItemView = Backbone.View.extend({
    events: {},
    render: function () {
        "use strict";
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

// now, reuse the ItemView as a subview:
var ListView = Backbone.View.extend({
    render: function() {
        "use strict";
        var items = this.model.get('items');
            // loop through each of our items
        _.each(items, function (item) {
            var itemView = new ItemView({model: item});
            this.$el.append(itemView.render().el);
        }, this);
    }
});
```

Notes about `render()`:

The `el` property represents the markup portion of the view that will be rendered; however having an `el` property doesn't mean the view is going to be rendered. To get the view to actually render to the page, you need to add it as a new element, or append it to an existing element.

