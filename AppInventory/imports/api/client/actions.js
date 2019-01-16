import { Session } from "meteor/session"

export const currentDas = () => {
    return Session.get('DAS').myDas;
}

export const setCurrentDas = (das) => {
    Session.set('DAS', {
        myDas: das
    });
}

export const loadDocuments = (MongoCollection) => {
    return MongoCollection.find({}).fetch();
}

export const removeDocument = (MongoCollection, docId) => {
    MongoCollection.remove({_id: docId}, (err) => {
        if(err) {
            console.log('Error: ' + err);
        }
    });
}
