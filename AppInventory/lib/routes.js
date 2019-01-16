/*
FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('mainLayout', { main: 'navigationBar'} );
    },
    name: 'dashboard_global'
});
*/

FlowRouter.route('/', {
    name: 'home',
    action: function() {
    BlazeLayout.render('appViews', {main: 'myidCheck'});
    }
});




/********* for tests *********/





