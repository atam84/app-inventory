import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { collections } from './datastructure.js'

SimpleSchema.debug = true;
SimpleSchema.extendOptions(['autoform']);

export const myservers = new SimpleSchema({
	hostname: {
		type: String,
		label: "hostname",
		max: 25,
		required: true,
		custom() {
			console.log('+++ check hostname duplication : ' + this.field('hostname').value);
			if(!this.field('hostname').value && !this.value) {
				return 'required';
			}
			if(Meteor.isServer) {
				console.log('+++ [srv] - check hostname duplication : ' + this.field('hostname').value);
				let targetCheck = collections.myservers.find({hostname: this.field('hostname').value}).fetch();
				if (targetCheck !== undefined && targetCheck.length > 0) {
					return 'errIpDuplicate';
				} else {
					return undefined;
				}
			}
		}
	},
	ip: {
		type: String,
		label: "IP",
		max: 50,
		regEx: SimpleSchema.RegEx.IPv4,
		required: true,
		custom() {
			console.log('+++ check ip duplication : ' + this.field('ip').value);
			if(!this.field('ip').value && !this.value) {
				return 'required';
			}
			if(Meteor.isServer) {
				console.log('+++ [srv] - check ip duplication : ' + this.field('ip').value);
				let targetCheck = collections.myservers.find({ip: this.field('ip').value}).fetch();
				if (targetCheck !== undefined && targetCheck.length > 0) {
					return 'errIpDuplicate';
				} else {
					return undefined;
				}
			}
		}
	},
	localization: {
		type: String,
		label: "localization",
		max: 500,
        required: true,
        autoform : { 
			options: [
				{label: "Atos", value: "atos"}, 
				{label: "La poste", value: "laposte"}
			]
		}
	},
	type: {
		type: String,
		label: "Type",
		max: 500,
		required: true,
		autoform : { 
			options: [
				{label: "Linux Ubuntu", value: "linux ubuntu"}, 
				{label: "Linux Suse", value: "linux sesu"},
				{label: "Linux redhat", value: "linux redhat"},
				{label: "Windows 2000", value: "windows server 2000"},
				{label: "Windows 2008", value: "windows server 2008"},
				{label: "Windows 2003", value: "windows server 2003"}, 
				{label: "Windows 2012", value: "windows server 2012"},
				{label: "Windows 2013", value: "windows server 2013"},
				{label: "Other", value: "other"},
			]
		}
	},
	os_version: {
		type: String,
		label: "OS version"
	},
	isMutualized: {
		type: String,
		label: "is Mutulized ?",
		max: 15,
		required: true,
		autoform : { 
			options: [
				{label: "Mutualized", value: "mutualized"}, 
				{label: "Dedicated", value: "dedicated"},
			]
		}
	},
    scoop: {
        type: Array
    },
	'scoop.$': {
		type: String,
		label: "scoop",
		max: 50,
		required: true,
		autoform : { 
			options: [
				{label: 'Business', value: 'Business'},
				{label: 'TAE', value: 'TAE'},
				{label: 'Opérationnel', value: 'Opérationnel'},
				{label: 'Factéo-Tracéo', value: 'Factéo-Tracéo'},
				{label: 'International', value: 'International'},
				{label: 'Maintenance', value: 'Maintenance'},
				{label: 'Portail interne', value: 'Portail interne'},
				{label: 'Presse', value: 'Presse'},
				{label: 'RAN', value: 'RAN'},
				{label: 'SSIF', value: 'SSIF'},
				{label: 'Support', value: 'Support'},
				{label: 'Indus', value: 'indus'},
				{label: 'Other', value: 'other'}
			]
		}
    },
    application: {
        type: Array
    },
	'application.$': {
		type: String,
		label: "Applications",
		max: 150,
		required: true,
	},
	comment: {
		type: String,
		label: "Comment",
		max: 255,
		required: false
	},
	isServer: {
		type: Boolean,
		required: false
	},
	info: {
		type: Object,
		required: false,
		blackbox: true
	},
}, { tracker: Tracker });
