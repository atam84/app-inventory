FlowRouter.route('/my-id', {
    name: 'myid',
    action: function() {
        BlazeLayout.render('appViews', {main: 'myidCheck'});
    }
});
FlowRouter.route('/my-id/my-vdi/:_das', {
    name: 'myvdi',
    action: function() {
        BlazeLayout.render('appViews', {main: 'myvdi'});
    }
});
FlowRouter.route('/my-id/adduser', {
    name: 'myvdi.create',
    action: function() {
        BlazeLayout.render('appViews', {main: 'myidCreate'});
    }
});
FlowRouter.route('/controle', {
    name: 'controle',
    action: function() {
        BlazeLayout.render('appViews', {main: 'controle'});
    }
});
FlowRouter.route('/check', {
    name: 'controle',
    action: function() {
        BlazeLayout.render('appViews', {main: 'check'});
    }
});

FlowRouter.route('/exports', {
    name: 'exports',
    action: function() {
        BlazeLayout.render('appViews', {main: 'controle-exports'});
    }
});

FlowRouter.route('/servers/add', {
    name: 'servers.add',
    action: function() {
        BlazeLayout.render('appViews', {main: 'servers'});
    }
});

FlowRouter.route('/servers/list', {
    name: 'servers.list',
    action: function() {
        BlazeLayout.render('appViews', {main: 'serverslist'});
    }
});

FlowRouter.route('/laposte/data/server/decom', {
    name: 'laposte.servers',
    action: function() {
        BlazeLayout.render('appViews', {main: 'laposte'});
    }
});
FlowRouter.route('/laposte/server/informations/:_id', {
    name: 'laposte.servers.infos',
    action: function() {
        BlazeLayout.render('appViews', {main: 'lpserverinfo'});
    }
});
/***********/
FlowRouter.route('/applications/add', {
    name: 'apps.add',
    action: function() {
        BlazeLayout.render('appViews', {main: 'addApps'});
    }
});
FlowRouter.route('/applications/lists', {
    name: 'apps.lists',
    action: function() {
        BlazeLayout.render('appViews', {main: 'listApps'});
    }
});
FlowRouter.route('/applications/details/:_id', {
    name: 'apps.details',
    action: function() {
        BlazeLayout.render('appViews', {main: 'viewApps'});
    }
});