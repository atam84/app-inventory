import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import { collections } from './datastructure.js'

SimpleSchema.debug = true;
SimpleSchema.extendOptions(['autoform']);


export const myapplications = new SimpleSchema({
	appName: {
		type: String,
		label: "Application name",
		max: 25,
		required: true,
		custom() {
			console.log('+++ check appName duplication : ' + this.field('appName').value);
			if(!this.field('appName').value && !this.value) {
				return 'required';
			}
			if(Meteor.isServer) {
				console.log('+++ [srv] - check appName duplication : ' + this.field('appName').value);
				let targetCheck = collections.applications.find({appName: this.field('appName').value}).fetch();
				if (targetCheck !== undefined && targetCheck.length > 0) {
					return 'errIpDuplicate';
				} else {
					return undefined;
				}
			}
		}
	},
	code: {
		type: String,
		label: "Code",
		max: 8,
        required: true,
	},
	cp: {
		type: String,
		label: "CP first and last name"
    },
    ra: {
		type: String,
		label: "RA first and last name"
	},
	scoop: {
		type: String,
		label: "Scoop",
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
    configURL: {
        type: Array
    },
    'configURL.$': {
        type: String,
		label: "Config Url",
		max: 255,
		required: true
    },
    staff: {
        type: Array
    },
	'staff.$': {
		type: String,
		label: "Devs staff",
		max: 150,
        required: true,
        autoform: {
            options: () => {
                let _result = collections.myid.find({}).fetch();
                let _options = [];
                for(let i=0; i<_result.length; i++) {
                    _options.push({
                        label: _result[i].firstName + ' ' + _result[i].lastName,
                        value: _result[i].das
                    });
                }
                return _options;
            }
        }
	},
	comment: {
		type: String,
		label: "Comment",
		max: 255,
		required: false
	}
}, { tracker: Tracker });
