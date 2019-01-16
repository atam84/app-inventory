import { collections } from '../../../datastructure/datastructure.js';
import { Template } from 'meteor/templating';
//import SimpleSchema from 'simpl-schema';
//import { ReactiveVar } from 'meteor/reactive-var'
import { EJSON } from 'meteor/ejson'
//import "../check/check.js"
import "./exports.html"


//Template.controle.events({});


Template.userdata.helpers({
    'exportUserData': () => {
        return EJSON.stringify(collections.myid.find({}).fetch());
    }
});

Template.vdidata.helpers({
    'exportVDIsData': () => {
        return EJSON.stringify(collections.myvdi.find({}).fetch());
    }
});


