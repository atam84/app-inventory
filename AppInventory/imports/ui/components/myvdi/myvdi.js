import { Meteor } from 'meteor/meteor'
import { collections } from '../../../datastructure/datastructure.js';
import { Template } from 'meteor/templating';
import SimpleSchema from 'simpl-schema';
import { ReactiveVar } from 'meteor/reactive-var'
import "./myvdi.html"

SimpleSchema.extendOptions(['autoform']);

let _collection = collections.myvdi;
let _collectionUsers = collections.myid;


Template.myvdi.helpers({
    'getMongoObject': () => {
        return _collection;
    },
    'getMyVdiDocs': () => {
        let _myVdi = _collection.find({das: FlowRouter.getParam("_das")}).fetch();
        console.dir(_myVdi);
        return _myVdi;
    },
    'setMyDas': () => {
        return FlowRouter.getParam("_das");
    },
    'getUserInfo': () => {
        return _collectionUsers.findOne({das: FlowRouter.getParam("_das")});
    }
});

Template.myvdi.events({
    'click .vdi-remove': (e) => {
        e.preventDefault();
        let _docId = e.target.id;
        //_collection.remove({_id: _docId});
        console.log('i will detch this VDI id : ' + _docId);
        Meteor.call('detachVdi', _docId, (err, res) => {
            if (err) {
                console.log('ERROR : ' + err);
            } else if (res) {
                console.log(_docId + ' is flagged as removed CI');
            }
        });
    }
});


