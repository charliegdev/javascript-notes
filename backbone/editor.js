var TodoView = Backbone.View.extend({
    tagName: 'li',

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
        console.log(e);
    }
});

var todoView = new TodoView();

console.log(todoView.el);




var TodosView = Backbone.View.extend({
    tagName: 'ul', // required, defaults to 'div' if not set
    className: 'container homepage list', // optional, 3 classes added
    id: 'tools', // optional
});

// in jQuery, wrap HTML inside a jQuery selector will create that element, 
// instead of trying to select anything
var button1 = $('<button></button>'),
    button2 = $('<button></button>');

// you can assign an 'el' to a view at instantiation
var todosView = new TodosView({el: button1}); 

todosView.setElement(button2);


var ListView= Backbone.View.extend({
    // compile a template for this view
    template: _.template($("#list_template").html()),

    render: function () {
        "use strict";
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

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
