import React from 'react';
import { db } from '../config/fbConfig';

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    state = {
        loading: true
    }

    setData = (collection, data) => {
        db.collection(collection).add({
            ...data
        })
    }

    setContextState = (state, data) => {
        this.setState({
            [state]: data
        })
    }

    loadData = () => {
        this.setState({
            loading: true
        })
    }

    filterData = (originalData, toFilterState, param, input) => {
        console.log(originalData, toFilterState, param, input);

        const filter = input.toUpperCase();
        const backupState = toFilterState + "Backup";
        console.log(filter);

        if (!this.state[backupState]) {
            const backupArray = toFilterState + "Original";
            const filtered = this.state[originalData].filter(item => {
                if (item[param].toUpperCase().includes(filter)) {
                    return item;
                } return null
            })
            this.setState({
                [backupArray]: this.state[originalData],
                [toFilterState] : filtered,
                [backupState]: true
            })
        }
        if (this.state[backupState]) {
            const backupArray = toFilterState + "Original";
            const filtered = this.state[backupArray].filter(item => {
                if (item[param].toUpperCase().includes(filter)) {
                    return item;
                } return null
            })
            this.setState({
                [toFilterState] : filtered
            })
        }
        
        
    }

    watchAttraction = (attraction) => {
        console.log(attraction);
        db.collection("attractions").where("id", "==", attraction).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            this.setState({
                attraction: {}
            })
            changes.forEach(change => {
                const attractionData = change.doc.data();
                this.setState({
                    attraction: attractionData
                })
                db.collection("parks").where("id", "==", attractionData.park_id).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        this.setState({
                            park: change.doc.data(),
                            loading: false
                        })
                    })
                })
            })      
        })
    }

    watchAllAttractions = () => {
        db.collection("attractions").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            this.setState({
                attractions: []
            })
            let itemsProcessed = 0;
            changes.forEach(change => {
                itemsProcessed++;
                this.setState({
                    attractions: [...this.state.attractions, change.doc.data()],
                })
                if (itemsProcessed === changes.length) {
                    this.setState({
                        loading: false
                    })
                }
            })
        })
    }

    watchShow = (show) => {
        console.log(show);
        db.collection("attractions").where("id", "==", show).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                const showData = change.doc.data();
                this.setState({
                    show: showData
                })
                db.collection("parks").where("id", "==", showData.park_id).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        this.setState({
                            park: change.doc.data(),
                            loading: false
                        })
                    })
                })
            })      
        })
    }

    watchPark = (park) => {
        db.collection("parks").where("id", "==", park).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                const parkData = change.doc.data();
                this.setState({
                    park: parkData
                })
                db.collection("attractions").where("park_id", "==", parkData.id).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    this.setState({
                        attractions: []
                    })
                    changes.forEach(change => {
                        console.log(change.doc.data());
                        this.setState({
                            attractions: [...this.state.attractions, change.doc.data()]
                        })
                        console.log(this.state.attractions);
                    })
                })
                db.collection("shows").where("park_id", "==", parkData.id).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    this.setState({
                        shows: []
                    })
                    changes.forEach(change => {
                        console.log(change.doc.data());
                        this.setState({
                            shows: [...this.state.shows, change.doc.data()]
                        })
                        console.log(this.state.attractions);
                    })
                })
            })      
        })
    }

    watchAllParks = () => {
        db.collection("parks").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            this.setState({
                parks: []
            })
            let itemsProcessed = 0;
            changes.forEach(change => {
                itemsProcessed++;
                this.setState({
                    parks: [...this.state.parks, change.doc.data()],
                })
                if (itemsProcessed === changes.length) {
                    this.setState({
                        loading: false
                    })
                }
            })
        })
    }
    

    watchSearchedData = (collection, param, criteria, type) => {
        console.log(collection, param, criteria, type);
        switch (type) {
            case "object" : {
                this.setState({
                    [collection]: {}
                })
                db.collection(collection).where(param, '==', criteria).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                            this.setState({
                                [collection]: change.doc.data()
                            })
                    })      
                })
                break;
            }

            case "array" : {
                this.setState({
                    [collection]: []
                })
                db.collection(collection).where(param, '==', criteria).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                            this.setState({
                                [collection]: [...this.state[collection], change.doc.data()]
                            })
                    })      
                })
                break;
            }
            default:
            // do nothing
        }

    }

    collectSearchedData = (collection, param, criteria) => {
        db.collection(collection).where(param, '==', criteria).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                console.log(change.doc.data());
                    const newDoc = {...change.doc.data()};
                    console.log(newDoc);
                    this.setState({
                        [collection]: newDoc
                    })
            })      
        })
    }

    searchSingleData = (collection, param, criteria) => {
        db.collection(collection).where(param, '==', criteria).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                console.log(change);
                    const newDoc = {...change.doc.data()};
                    console.log(newDoc);
                    this.setState({
                        [collection]: newDoc
                    })
            })      
        })
    }

    searchData = (collection, param, criteria) => {
        console.log(collection, param, criteria);
        this.setState({
            [collection]: []
        })
        db.collection(collection).where(param, '==', criteria).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            console.log(changes);
            
            changes.forEach(change => {
                console.log(change.doc.data());
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
                loading: this.state.loading,
                park: this.state.park,
                parks: this.state.parks,
                attraction: this.state.attraction,
                attractions: this.state.attractions,
                show: this.state.show,
                shows: this.state.shows,
                     
                loadData: this.loadData,
                watchPark: this.watchPark,
                watchAllParks: this.watchAllParks,
                watchAttraction: this.watchAttraction,
                watchAllAttractions: this.watchAllAttractions,
                watchShow: this.watchShow,
                setContextState: this.setContextState,
                filterData: this.filterData
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

}