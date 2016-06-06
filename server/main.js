import { Meteor } from 'meteor/meteor';
import { productsCollection } from '../collections/collections.js';

Meteor.startup(() => {
    Meteor.call('addDummyData');
});

Meteor.methods({
    productInsert: function(product) {
        //return the id of the new record
        return productsCollection.insert(product);
    },
    productDelete: function (_id) {
        productsCollection.remove ({"_id": _id});
    },
    productUpdate: function(updatedProduct) {
        productsCollection.update({"_id": updatedProduct._id}, {"$set": {
            name: updatedProduct.name,
            price: updatedProduct.price,
            description: updatedproduct.description
        }});
    },
    addDummyData: function() {
        productsCollection.remove({});
        
        productsCollection.insert(
          {
            name: 'Clean Bright Soap',
            price: 1.99,
            description: 'Another work day requires clean bright soap.'
          }
        );
        
        productsCollection.insert(
          {
            name: 'Earphones',
            price: 15.99,
            description: 'Sound in 3D!'
          }
        );
        
        productsCollection.insert(
          {
            name: 'Bluray',
            price: 19.99,
            description: 'Bind is in over his head'
          }
        );
        
        productsCollection.insert(
          {
            name: 'Neon Surfboard',
            price: 199.99,
            description: 'Ride the waves.'
          }
        );
        
        productsCollection.insert(
          {
            name: 'Gel Pen',
            price: 3.99,
            description: 'Black ink.'
          }
        );
    }
});

Meteor.publish('allProduct', function() {
    return productsCollection.find();
});