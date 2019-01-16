import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { _ } from 'underscore';
import { myid } from "./my-id.js"
import { myvdi } from "./my-vdi.js"
import { myservers } from "./my-servers.js"
import { lapostesrv } from "./la_poste_decom.js"
import { myapplications } from "./my-applications.js"

SimpleSchema.debug = true;
SimpleSchema.extendOptions(['autoform']);


SimpleSchema.setDefaultMessages({
	messages: {
		en: {
			errDuplicate: "Duplicate unique field detected.",
		},
	},
});

export const dataStructure = {
	myid: myid,
	myvdi: myvdi,
	myservers: myservers,
	lapostesrv: lapostesrv,
	applications: myapplications
}

export const collections = {
	myid: new Mongo.Collection("myid"),
	myvdi: new Mongo.Collection("myvdi"),
	myservers: new Mongo.Collection("myservers"),
	lapostesrv: new Mongo.Collection("lapostesrv"),
	applications: new Mongo.Collection("applications")
}

collections.myid.attachSchema(dataStructure.myid);
collections.myvdi.attachSchema(dataStructure.myvdi);
collections.myservers.attachSchema(dataStructure.myservers);
collections.lapostesrv.attachSchema(dataStructure.lapostesrv);
collections.applications.attachSchema(dataStructure.applications);

_.each(collections, function(collectionObject, key) {
	collections[key].allow({
		insert: function () { return true; },
		update: function () { return true; },
		remove: function () { return true; }
	});
});

if (Meteor.isServer) {
	Meteor.publish('myid', () => {
		return collections.myid.find({});
	});
	Meteor.publish('myvdi', () => {
		return collections.myvdi.find({});
	});
	Meteor.publish('myservers', () => {
		return collections.myservers.find({});
	});
	Meteor.publish('lapostesrv', () => {
		return collections.lapostesrv.find({});
	});
	Meteor.publish('applications', () => {
		return collections.applications.find({});
	});
}

if (Meteor.isClient) {
	Meteor.startup(() => {
		Tracker.autorun(() => {
			Meteor.subscribe('myid');
			Meteor.subscribe('myvdi');
			Meteor.subscribe('myservers');
			Meteor.subscribe('lapostesrv');
			Meteor.subscribe('applications');
		});
	});
}


