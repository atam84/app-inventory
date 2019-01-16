//import { Template } from 'meter/Template';
import './body.html';

Template.appViews.events({
    'click .add-servers': function(e, template) {
        FlowRouter.go('/servers/add/');
    },
    'click .add-vdis': function(e, template) {
        FlowRouter.go('/');
    },
    'click .dashboard': function(e, template) {
        FlowRouter.go('/controle/');
    },
    'click .laposte-data': function(e, template) {
        FlowRouter.go('/laposte/data/server/decom')
    },
    'click .exports-objects': function(e, template) {
        FlowRouter.go('/exports/');
    },
    'click .list-applications': function(e, template) {
        FlowRouter.go('/applications/lists');
    }
});