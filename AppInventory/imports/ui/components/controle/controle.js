import { collections } from '../../../datastructure/datastructure.js';
import { Template } from 'meteor/templating';
import SimpleSchema from 'simpl-schema';
import { ReactiveVar } from 'meteor/reactive-var'
import { EJSON } from 'meteor/ejson'
import "../check/check.js"
import "./controle.html"

SimpleSchema.extendOptions(['autoform']);

let countvdi = new ReactiveVar(0);
let countusers = new ReactiveVar(0);
/*
let showusers = new ReactiveVar(true);
let showvdis = new ReactiveVar(false);
let showusersdata = new ReactiveVar(false);
let showvdisdata = new ReactiveVar(false);
*/
Template.controle.events({});

/*
Template.controle.helpers({
    'showUser': () => {
        return showusers.get();
    },
    'showVdis': () => {
        return showvdis.get();
    },
    'showUserData': () => {
        return showusersdata.get();
    },
    'showVdiData': () => {
        return showvdisdata.get();
    }
});
*/

Template.removedusers.helpers({
    'getRemovedUsers': () => {
        return collections.myid.find({'info.removed': true}).fetch();
    }
});

Template.statistics.helpers({
    'getVMsStatistics': () => {
        let vmstatistics = [
            {type: 'linux ubuntu', number : collections.myvdi.find({type: 'linux ubuntu', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'linux sesu', number : collections.myvdi.find({type: 'linux sesu', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'linux redhat', number : collections.myvdi.find({type: 'linux redhat', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows 7', number : collections.myvdi.find({type: 'windows 7', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows 10', number : collections.myvdi.find({type: 'windows 10', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows xp', number : collections.myvdi.find({type: 'windows xp', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows 8', number : collections.myvdi.find({type: 'windows 8', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows 2000', number : collections.myvdi.find({type: 'windows 2000', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows 2003', number : collections.myvdi.find({type: 'windows 2003', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows 2008', number : collections.myvdi.find({type: 'windows 2008', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
			{type: 'windows 2012', number : collections.myvdi.find({type: 'windows 2012', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
            {type: 'other', number : collections.myvdi.find({type: 'other', localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch().length},
            {type: 'detached', number : collections.myvdi.find({localization: "atos", 'info.isDetached': true}).fetch().length}, 
        ];
        console.log('VMs statistics :');
        console.dir(vmstatistics);
        return vmstatistics;
    }
});

/*
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
*/

Template.allvdi.helpers({
    'getAllVdiDocs': () => {
        let _listvdi = collections.myvdi.find({localization: "atos", 'info.removed': false, 'info.isDetached': false}).fetch();
        //let _listvdi = collections.myvdi.find({}).fetch();
        let countVDI =  collections.myvdi.find({localization: "atos", 'info.removed': false, 'info.isDetached': false, $or: [{type: 'windows 7'}, {type: 'windows xp'}, {type: 'windows 10'}, {type: 'windows 8'}]}).fetch();
        countvdi.set(countVDI.length);
        return _listvdi;
    },
    'counter': () => {
        return countvdi.get();
    },
    'vidusers': (_das) => {
        //console.log('user information by das : ' + _das);
        _userInfo = collections.myid.findOne({das: _das, 'info.removed': false}, {firstName: 1, lastName: 1});
        // , 'info.removed': false, 'info.isDetached': false
        //console.dir(_userInfo);
        return _userInfo;
    }
});

Template.allvdi.events({
    'click .detachVdi': (e) => {
        e.preventDefault();
        let _vdiId = e.target.id;
        Meteor.call('detachVdi', _vdiId);
    }
})

Template.unusedvdi.helpers({
    'getAllUnusedVdis': () => {
        _unusedvdi = collections.myvdi.find({$or : [{'info.removed': true}, {'info.isDetached': true}]}).fetch();
        console.dir(_unusedvdi);
        return _unusedvdi;
    }
});


Template.allusers.helpers({
    'getAllUsers': () => {
        let _listusers = collections.myid.find({'info.removed': false}).fetch();
        countusers.set(_listusers.length);
        return _listusers;
    },
    'counter': () => {
        return countusers.get();
    },
    'countuservdi': (_das) => {
        return collections.myvdi.find({das: _das, localization: "atos", 'info.removed': false}).fetch().length;
    }
});

Template.allusers.events({
    'click .user-remove': (e) => {
        e.preventDefault();
        let _userId = e.target.id;
        Meteor.call('removeUser', _userId);
        //collections.myid.remove({_id: _userId});
    }
});

