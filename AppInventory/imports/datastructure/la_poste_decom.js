import { Tracker } from 'meteor/tracker'
import SimpleSchema from 'simpl-schema'
import { collections } from './datastructure.js'


SimpleSchema.debug = true;
SimpleSchema.extendOptions(['autoform']);

export const lapostesrv = new SimpleSchema({
    "Hostname": {
		type: String,
		label: "First Name",
		required: false
    },
    "last_access": {
        type: Date,
        label: "last access",
        required: false,
    },
    "is_plus_10y": {
        type: Boolean,
        label: "is +10yo",
        required: false,
    },
    "Messiv2": {
        type: Boolean,
        label: "is Messi v2",
        required: false,
    },
    "TMA": {
        type: String,
        label: "TMA",
        required: false,
    },
    "code_appli": {
        type: String,
        label: "Code Appli",
        required: false,
    },
    "plan_conex_migration": {
        type: String,
        label: "plan conex migration",
        required: false,
    },
    "plan_itaas_migration": {
        type: String,
        label: "plan itaas migration",
        required: false,
    },
    "planned_remove":  {
        type: String,
        label: "Planed remove",
        required: false,
    },
    "Modele":  {
        type: String,
        label: "Model",
        required: false,
    },
    "Environnement": {
		type: String,
		label: "Environnement",
		required: false
    },
    "Systeme": {
		type: String,
		label: "System",
		required: false
    },
    "Description_Serveur": {
		type: String,
		label: "Description",
		max: 128,
		required: false
    },
    "Commentaire_Serveur": {
		type: String,
		label: "Comment",
		max: 512,
		required: false
    },
    "can_remove": {
        type: Boolean,
        label: "CI can by removed",
        required: false,
    },
    "tma_comment": {
		type: String,
		label: "TMA Comment",
		max: 512,
		required: false
    },
    "user_validation": {
        type: String,
        label: "User DAS validation",
		required: true
	}
}, { tracker: Tracker });

