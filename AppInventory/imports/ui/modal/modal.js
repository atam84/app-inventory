import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import './modal.html';



Template.inModal.helpers({
    'alertMessage': () => {
        let alerting = Session.get('inModalOnResult');
        if(alerting === undefined) {
            return undefined;
        } else if(alerting.action === 'show') {
            html = '<div class="' + alerting.class +' '+alerting.action+'" role="alert">';
            html = html + '<button type="button" class="close dissim-alert-message" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html = html + '<strong>'+alerting.label+'</strong> ' + alerting.message;
            html = html + '</div>';
            return Spacebars.SafeString(html);
        }
    },
    'thisModalTitle': function () {
        let _inModal = Session.get('inModalTemplete');
        if(_inModal === undefined) {
            return undefined;
        } else {
            return _inModal.label;
        }
    },
    'thisInModal': function () {
        let _inModal = Session.get('inModalTemplete');
        if(_inModal === undefined) {
            return undefined;
        } else {
            return _inModal.template;
        }
    }
});



Template.inModal.events({
    'click .dissim-alert-message': () => {
        console.log('dissim alert message')
        Session.set('inModalOnResult', {});
    },
    'click .close-modal': () => {
        console.log('close modal');
        Session.set('inModalOnResult', {});
    }
});



AutoForm.addHooks(null, {
    before: {
        formType: (doc) => {
            console.log('before hook, i will cancel');
            console.dir(doc),
            this.result(false);
        }
    },
    onSubmit: (insertDoc, updateDoc, currentDoc) => {
        console.dir(this);
        console.log('onSubmit action');
        this.done();
    },
    onSuccess: (formType, result) => {
        Session.set('inModalOnResult', {
            label: formType + ' success.',
            message: result,
            class: 'alert alert-success alert-dismissible fade',
            action: 'show',
            type: 'success'
        });
        console.log(formType + ' success : ' + result);
    },
    onError: (formType, result) => {
        Session.set('inModalOnResult', {
            label: formType + ' error !',
            message: result.message,
            class: 'alert alert-danger alert-dismissible fade',
            action: 'show',
            type: 'error'
        });
        console.log(formType + ' error : ');
        console.dir(result);
    }
});


