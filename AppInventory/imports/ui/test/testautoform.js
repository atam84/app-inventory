import { Tracker } from 'meteor/tracker';
//import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
import './testautoform.html';

Schema = {};
Schema.contact = new SimpleSchema({
    name: {
        type: String,
        label: "Your name",
        max: 50
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address"
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
}, { tracker: Tracker });

Template.contactForm.helpers({
    contactFormSchema: function() {
        return Schema.contact;
    }
});

