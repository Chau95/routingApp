import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { productsCollection } from '../collections/collections.js';

import './main.html';

//import my products collection and make it available to a template
Meteor.subscirbe('allProducts');

Template.productlist.helpers({
    products: function() {
        return productsCollection.find();
    }
});

Template.addProduct.events({
    'submit #addProductForm': function(event) {
        //stop the default action
        event.preventDefault();
        
        //insert new record
        Meteor.call('productInsert', {
            name: $('input[name="name"]').val(),
            price: $('input[name="price"]').val(),
            description: $('textarea[name="description"]').val(),
        }, function (error, result) {
            Router.go('/viewProduct/' + result);
        });
    }   
});

Template.editProduct.events ({
   'submit #editProductForm': function(event) {
    event.preventDefault();
    
    var product = this;
    
    //Get updated values
    product.name = $('input[name="name"]').val();
    product.price = $('input[name="price"]').val();
    product.description = $('textarea[name="description"]').val();
    
    //Save the updates to database
    Meteor.call('productUpdate', product, function(error, result){
        Router.go('/viewProduct/' + product._id);
    });
   }
});