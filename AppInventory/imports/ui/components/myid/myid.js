import { collections } from '../../../datastructure/datastructure.js';
import { Template } from 'meteor/templating';
import SimpleSchema from 'simpl-schema';
import { ReactiveVar } from 'meteor/reactive-var'
import { setCurrentDas, currentDas } from "../../../api/client/actions.js"
import "./myid.html"

SimpleSchema.extendOptions(['autoform']);

let _collection = collections.myid;
let isProfileSaved = new ReactiveVar(false);

Template.myidCreate.helpers({
    'getMongoObject': () => {
        return _collection;
    }
});

Template.myidCheck.helpers({
    'profileSaved': () => {
        return isProfileSaved.get();
    }
});

Template.myidCheck.events({
    'click .check-my-das': function(e, template) {
        let _das = template.find('#das').value;
        isProfileSaved.set(false);
        if(_collection.findOne({das: _das.toUpperCase()}) !== undefined) {
            // goto add machine
            setCurrentDas(_das);
            FlowRouter.go('/my-id/my-vdi/' + _das.toUpperCase());
        } else {
            // goto create user
            FlowRouter.go('/my-id/adduser');
        }
    },
});

AutoForm.addHooks('myid', {
    onSuccess: (formType, result) => {
        isProfileSaved.set(true);
        FlowRouter.go('/');
    }
})

