import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { collections } from './datastructure.js'

SimpleSchema.debug = true;
SimpleSchema.extendOptions(['autoform']);

export const myvdi = new SimpleSchema({
    das: {
        type: String,
        max: 8,
        required: false,
        autoform : { 
			type: 'hidden'
		}
    },
	ip: {
		type: String,
		label: "IP",
		max: 50,
		regEx: SimpleSchema.RegEx.IPv4,
		required: true,
		custom() {
			console.log('check ip duplication : ' + this.field('ip').value);
			if(!this.field('ip').value && !this.value) {
				return 'required';
			}
			if(Meteor.isServer) {
				//console.log('[srv] - check ip duplication : ' + this.field('ip').value);
				let targetCheck = collections.myvdi.find({ip: this.field('ip').value}).fetch();
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
				{label: "Windows 7", value: "windows 7"},
				{label: "Windows 10", value: "windows 10"},
				{label: "Windows XP", value: "windows xp"},
				{label: "Windows 8", value: "windows 8"},
				{label: "Windows 2000", value: "windows 2000"},
				{label: "Windows 2003", value: "windows 2003"}, 
				{label: "Windows 2008", value: "windows 2008"},
				{label: "Windows 2012", value: "windows 2012"},
				{label: "Other", value: "other"},
			]
		}
	},
	scoop: {
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
				{label: 'Unknow', value: 'Unknow'},
				{label: 'Indus', value: 'indus'},
			]
		}
	},
	application: {
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
	info: {
		type: Object,
		required: false,
		blackbox: true
	},
}, { tracker: Tracker });
