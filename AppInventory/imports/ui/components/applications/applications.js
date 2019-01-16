import { collections } from '../../../datastructure/datastructure.js'
import { Template } from 'meteor/templating'
import SimpleSchema from 'simpl-schema'
import { ReactiveVar } from 'meteor/reactive-var'
import "./applications.html"

SimpleSchema.extendOptions(['autoform']);

let _collection = collections.applications;

Template.addApps.helpers({
    'getMongoObject': () => {
        return _collection;
    }
});

Template.listApps.helpers({
    'getapplicationsDocs': () => {
        let _Applications = _collection.find({}).fetch();
        //console.dir(_Applications);
        return _Applications;
    }
});

Template.viewApps.helpers({
    'getMongoObject': () => {
        return _collection;
    },
    'editSelectedApp': () => {
        console.log('Edit : ' + FlowRouter.getParam("_id"));
        let _doc = _collection.findOne({_id: FlowRouter.getParam("_id")});
        console.dir(_doc);
        return _doc;
    }
});

Template.listApps.events({
    'click .app-remove': (e) => {
        e.preventDefault();
        let _docId = e.target.id;
        _collection.remove({_id: _docId});
    },
    'click .add-new-applications': (e) => {
        FlowRouter.go('/applications/add');
    },
    'click .app-details': (e) => {
        e.preventDefault();
        let _docId = e.target.id;
        FlowRouter.go('/applications/details/' + _docId);
        /*let _app = _collection.find({_id: FlowRouter.getParam("_id")}).fetch();
        console.dir(_app);
        return _app;*/
    }
});
