import { Tracker } from 'meteor/tracker'
import SimpleSchema from 'simpl-schema'
import { collections } from './datastructure.js'


SimpleSchema.debug = true;
SimpleSchema.extendOptions(['autoform']);

export const myid = new SimpleSchema({
	das: {
		type: String,
		label: "DAS",
		max: 8,
		required: true,
		custom() {
			console.log('check das duplication : ' + this.field('das').value);
			if(!this.field('das').value && !this.value) {
				return 'required';
			}
			if(Meteor.isServer) {
				console.log('[srv] - check das duplication : ' + this.field('das').value);
				let targetCheck = collections.myid.find({das: this.field('das').value}).fetch();
				if (targetCheck !== undefined && targetCheck.length > 0) {
					return 'errDuplicate';
				} else {
					return undefined;
				}
			}
		}
	},
	firstName: {
		type: String,
		label: "First Name",
		required: false
    },
    lastName: {
		type: String,
		label: "Last name",
		required: false
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address",
        required: true
    },
	comment: {
		type: String,
		label: "Comment",
		max: 255,
		required: false
    },
    myvdi: {
		type: Object,
		required: false,
		blackbox: true
	},
	info: {
		type: Object,
		required: false,
		blackbox: true
	},
}, { tracker: Tracker });
