import { Meteor } from 'meteor/meteor';
import { collections } from '../imports/datastructure/datastructure.js';

let connection = undefined;

Meteor.methods({
    'get.collection': (collection) => {
        console.log(' > send data collection ' + collection);
        return collections[collection].find({}).fetch();
    },
    'removeUser': (_userId) => {
        console.log(' ++ removeing user ' + _userId + ' by ' + connection);
        userDas = collections.myid.findOne({_id: _userId}, {das: 1});
        if(userDas && userDas.das) {
            userDas = userDas.das;
        } else {
            return undefined;
        }
        console.log('User Das : ' + userDas);
        /**
         * tag multi vdis as removed
         */
        collections.myvdi.update({das: userDas}, {$set: {'das': '', 'info.isDetached': true, 'info.oldOwner': userDas}}, {multi: true}, (err, counter) => {
            if (err) {
                console.log('err at detaching vdis from user');
            } else {
                console.log(counter + ' vdis not used now');
            }
        });
        collections.myid.update({_id: _userId}, {$set: {'info.removed': true }}, (err, count) => {
            if(err) {
                console.log(' * cannot remove user _id: ' + _userId);
            } else {
                console.log(' * mark user _id : ' + _userId + ' as removed');
            }
        });
    },
    'detachVdi': (_vdiId) => {
        /**
         * Action performed item by item (click by click :P )
         */
        userDas = collections.myvdi.findOne({_id: _vdiId});
        console.log(' ++ detache vdi' + _vdiId + ' from user : ' + userDas.das);
        if(userDas && userDas.das) {
            userDas = userDas.das;
        } else {
            return undefined;
        }
        collections.myvdi.update({_id: _vdiId}, {$set: {'das': '', 'info.isDetached': true, 'info.oldOwner': userDas}}, (err, count) => {
            if(err) {
                console.log(' * cannot detach vdi ' + _vdiId);
            } else {
                console.log(' * vdi id: ' + _vdiId + ' is now detached.');
            }
        });
    },
    
});

collections.myid.before.insert((userId, doc) => {
    doc.das = doc.das.toUpperCase();
    doc.info = {
        createdAt: Date.now(),
        removed: false,
        createBy: {
            ip: connection
        },
        updateAt: 0,
        updateBy: {
            ip: connection
        }
    }
    console.log('[' + connection + '] ++ new user added ' + doc.das);
});

collections.myvdi.before.insert((userId, doc) => {
    doc.info = {
        createdAt: Date.now(),
        createBy: {
            ip: connection
        },
        updateAt: 0,
        updateBy: {
            ip: connection
        },
        removed: false,
        isDetached: false
    }
    console.log('[' + connection + '] ++ new vdi ' + doc.ip + ' added for: ' + doc.das );
});

collections.myservers.before.insert((userId, doc) => {
    doc.info = {
        createBy: {
            ip: connection
        },
        updateBy: {
            ip: connection
        },
        owner: '',
        createdAt: Date.now(),
        updateAt: 0,
        removed: false,
        isDetached: false,
        isServer: true
    }
    console.log('[' + connection + '] ++ new server ' + doc.ip + '[' + doc.hostname + '] added for: ' + doc.scoop );
});

collections.applications.before.insert((userId, doc) => {
    doc.info = {
        createBy: {
            ip: connection
        },
        updateBy: {
            ip: connection
        },
        owner: '',
        createdAt: Date.now(),
        updateAt: 0,
        removed: false,
        isApplication: true
    }
    console.log('[' + connection + '] ++ new application ' + doc.appName + '[' + doc.code + '] added scope: ' + doc.scoop); 
});

Meteor.onConnection(function(conn) {
    connection = conn.clientAddress;
    console.log('+ new connecion detected from addr : ' + connection);
});



/**
 { id: 'tRdHuaKhRkSYS9cGS',
  close: [Function: close],
  onClose: [Function: onClose],
  clientAddress: '193.56.47.8',
  httpHeaders:
   { referer: 'http://10.94.202.119:8080/my-id/my-vdi/A648914',
     'x-forwarded-for': 'unknown,193.56.47.8',
     'x-forwarded-host': '10.94.202.119:8080',
     'x-forwarded-port': '8080',
     via: '1.1 w3p2.atos-infogerance.fr (squid/3.5.20)',
     'x-forwarded-proto': 'http',
     host: '10.94.202.119:8080',
     'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:62.0) Gecko/20100101
**/

