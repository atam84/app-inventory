import { Meteor } from 'meteor/meteor'
import { collections } from '../../../datastructure/datastructure.js';
import { Template } from 'meteor/templating';
import SimpleSchema from 'simpl-schema';
import { ReactiveVar } from 'meteor/reactive-var'
import "./servers.html"

SimpleSchema.extendOptions(['autoform']);

let _collection = collections.myservers;
// let _collectionUsers = collections.myid;



Template.servers.helpers({
    'getMongoObject': () => {
        return _collection;
    },
    'setScoop': () => {
        return FlowRouter.getParam("_scoop");
    },
});

Template.serverslist.helpers({
    'getServersDocs': () => {
        let _Server = _collection.find({/* scoop: FlowRouter.getParam("_scoop") */}).fetch();
        console.dir(_Server);
        return _Server;
    },
});

Template.serverslist.events({
    'click .server-remove': (e) => {
        e.preventDefault();
        let _docId = e.target.id;
        _collection.remove({_id: _docId});
    }
});


