import React from 'react';
import { db } from '../config/fbConfig';

const initialState = {
    InformationData: [],
    attractions: []
}

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    state = initialState;

    setData = (collection, data) => {
        db.collection(collection).add({
            ...data
        })
    }

    searchData = (collection, param, criteria) => {
        db.collection(collection).where(param, '==', criteria).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                console.log(change);
                if (change.type === "added") {
                    const newDoc = {...change.doc.data()};
                    this.setState({
                        [collection]: [...this.state[collection], newDoc]
                    })
                } else if (change.type === "removed") {
                    const filteredArray = this.state[collection].filter(function( obj ) {
                        return obj.uid !== change.doc.id;
                    });
                    this.setState({
                        [collection]: filteredArray
                    })
                } else if (change.type === "modified") {
                    let modArray = this.state[collection];
                    let modDoc = this.state[collection].findIndex((obj) => {
                       return obj.id === change.doc.id
                    });
                    modArray[modDoc] = change.doc.data();
                    this.setState({
                        [collection]: modArray
                    })

                }
            })      
        })
    }

    watchData = (collection) => {
        db.collection(collection).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === "added") {
                    const newDoc = {...change.doc.data()};
                    this.setState({
                        [collection]: [...this.state[collection], newDoc]
                    })
                } else if (change.type === "removed") {
                    const filteredArray = this.state[collection].filter(function( obj ) {
                        return obj.uid !== change.doc.id;
                    });
                    this.setState({
                        [collection]: filteredArray
                    })
                } else if (change.type === "modified") {
                    let modArray = this.state[collection];
                    let modDoc = this.state[collection].findIndex((obj) => {
                       return obj.id === change.doc.id
                    });
                    modArray[modDoc] = change.doc.data();
                    this.setState({
                        [collection]: modArray
                    })

                }
            })      
        })
    }

    watchCollectionData = (collection, type, document) => {
        db.collection(collection).doc(document).collection(type).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                console.log(change);
                if (change.type === "added") {
                    const newDoc = {...change.doc.data()};
                    this.setState({
                        [type]: [...this.state[type], newDoc]
                    })
                } else if (change.type === "removed") {
                    const filteredArray = this.state[type].filter(function( obj ) {
                        return obj.uid !== change.doc.id;
                    });
                    this.setState({
                        [type]: filteredArray
                    })
                } else if (change.type === "modified") {
                    let modArray = this.state[type];
                    console.log(modArray);
                    let modDoc = this.state[type].findIndex((obj) => {
                       return obj.id === change.doc.id
                    });
                    console.log(modDoc);
                    modArray[modDoc] = change.doc.data();
                    this.setState({
                        [type]: modArray
                    })

                }
            })     
        })   
    }
    

    render() {
        return (
            <AppContext.Provider value={{
                attraction: this.state.attractions,
                information: this.state.InformationData,
                setData: this.setData,
                deleteData: this.deleteData,
                watchData: this.watchData,
                searchData: this.searchData,
                watchCollectionData: this.watchCollectionData
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}