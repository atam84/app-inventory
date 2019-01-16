import { _ } from 'underscore';
import { collections } from "../../datastructure/datastructure.js"
import { Template } from 'meteor/templating'


/**
 * Function used by all selector to retrive option returned to autoForm field options
 * @param {*} _collection 
 * @param {*} _searchCriteria 
 * @param {*} _filter 
 * @param {*} _limitation 
 */
export const optionSelect = (_collection, _searchCriteria, _filter, _limitation=0) => {
    let _options = [];
	_.each(_collection.find(_searchCriteria, {fields: _filter}).fetch(), (_object) => {
		let value = _object._id;
		let _keys = _.without(_.keys(_object), "_id");
		let label = "";
		let counter = 0;
		_.each(_keys, (val) => {
			if (counter > 0) {
				label = label + " ";
			}
			label = label + _object[val];
			counter++;
		});
		_options.push({value: value, label: label});
	});
	return _options;
}

Template.registerHelper('optionSelectProjects', () => {
    let _options = optionSelect(collections.projects, {}, {_id:1, project: 1});
    return _options;
});

Template.registerHelper('optionSelectRessources', (_isResponsible=false) => {
    if (_isResponsible === true) {
        _filter = {isResponsible: true};
    } else {
        _filter = {};
    }
    let _options = optionSelect(collections.ressources, _filter, {_id:1, firstName: 1, lastName: 1});
    return _options;
});

Template.registerHelper('optionSelectEnvs', () => {
    let _options = optionSelect(collections.envs, {}, {_id:1, name: 1});
    return _options;
});

Template.registerHelper('optionSelectJobs', () => {
    let _options = optionSelect(collections.jobs, {}, {_id:1, jobTitle: 1});
    return _options;
});

Template.registerHelper('optionSelectLocalizations', () => {
    let _options = optionSelect(collections.localizations, {}, {_id:1, label: 1});
    return _options;
});

Template.registerHelper('optionSelectOsType', () => {
    let _options = optionSelect(collections.os, {}, {_id:1, osType: 1});
    return _options;
});

Template.registerHelper('optionSelectOsName', (_osType) => {
    if (_osType === undefined) {
        _filter = {};
    } else {
        _filter = {osType: _osType};
    }
    let _options = optionSelect(collections.os, _filter, {_id:1, osName: 1});
    return _options;
});

Template.registerHelper('optionSelectOsVersion', (_osName) => {
    if (_osName === undefined) {
        _filter = {};
    } else {
        _filter = {_osName: _osName};
    }
    let _options = optionSelect(collections.os, _filter, {_id:1, osName: 1});
    return _options;
});
