import { productsCollection } from '../collections/collections.js';

//define some routes
Router.route('/', function() {
        this.render('productList'); //view allProducts template
});

Router.route('/viewProduct/:_id', function() {
    this.render('viewProduct', {
        data: function() {
            //gather data
            return productsCollection.findOne({'_id': this.params._id});
        }
    }); //view the viewProduct
});

Router.route('/login', function() {
    this.render('login');
});

Router.route('/addProduct', function() {
    this.render('addProduct');
});

Router.route('/editProduct/:_id', function() {
    this.render('editProduct', {
        data: function() {
            //data for the edit product
            return productsCollection.findOne ({'_id': this.params._id});
        }
    });
});

Router.route('/deleteProduct/:_id', function() {
    Meteor.call('productDelete', this.params._id, function(error, result) {
        Router.go('/');
    });
});

//Use a hook to prevent unauthorized access to templates with data
Router.onBeforeAction(function() {
    //Make sure the user is logged in
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        this.next(); //tell the router to continue with its business
    }
}, {
    except: ['login']
});