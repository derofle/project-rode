import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { db } from '../firebase/firebase';

export const { Provider, Consumer } = createContext();

export class AppProvider extends Component {
  state = {
    loading: true,
    collections: ['parks', 'attractions', 'shows', 'manufacturers', 'users'],
    collectionsProcessed: 0,
    parks: [],
    attractions: [],
    shows: [],
    manufacturers: [],
    users: [],
    currentUser: null,
  };

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  componentDidMount() {
    firebase.auth.onAuthStateChanged(
      user =>
        user &&
        this.setState({
          currentUser: user,
        })
    );
    const prevState = this.state;

    prevState.collections.forEach(collection => {
      this.loadData(collection);
    });
  }

  loadData = collection => {
    db.collection(collection).onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      let itemsProcessed = 0;
      changes.forEach(change => {
        const prevState = this.state;
        itemsProcessed += 1;
        if (change.type === 'added') {
          const newDoc = { ...change.doc.data(), uid: change.doc.id };
          this.setState({
            [collection]: [...prevState[collection], newDoc],
          });
        } else if (change.type === 'removed') {
          const filteredArray = prevState[collection].filter(function(obj) {
            return obj.uid !== change.doc.id;
          });
          this.setState({
            [collection]: filteredArray,
          });
        } else if (change.type === 'modified') {
          const modArray = prevState[collection];
          const modDoc = prevState[collection].findIndex(
            obj => obj.uid === change.doc.id
          );
          modArray[modDoc] = change.doc.data();
          this.setState({
            [collection]: modArray,
          });
        }
        if (itemsProcessed === changes.length) {
          this.setState({
            collectionsProcessed: prevState.collectionsProcessed + 1,
          });
          const newState = this.state;
          if (newState.collectionsProcessed === prevState.collections.length) {
            this.setState({
              loading: false,
            });
          }
        }
      });
    });
  };

  addData = (object, collection) => {
    db.collection(collection).add({
      ...object,
      AddedAt: new Date(),
    });
  };

  updateData = (object, collection) => {
    delete object.uid;
    db.collection(collection)
      .doc(object.uid)
      .update({
        ...object,
      });
  };

  /*
  filterData = (originalData, toFilterState, param, input) => {
    console.log(originalData, toFilterState, param, input);

    const filter = input.toUpperCase();
    const backupState = `${toFilterState}Backup`;
    console.log(filter);

    if (!this.state[backupState]) {
      const backupArray = `${toFilterState}Original`;
      const filtered = this.state[originalData].filter(item => {
        if (item[param].toUpperCase().includes(filter)) {
          return item;
        }
        return null;
      });
      this.setState({
        [backupArray]: this.state[originalData],
        [toFilterState]: filtered,
        [backupState]: true,
      });
    }
    if (this.state[backupState]) {
      const backupArray = `${toFilterState}Original`;
      const filtered = this.state[backupArray].filter(item => {
        if (item[param].toUpperCase().includes(filter)) {
          return item;
        }
        return null;
      });
      this.setState({
        [toFilterState]: filtered,
      });
    }
  };
*/
  render() {
    const {
      loading,
      parks,
      attractions,
      shows,
      manufacturers,
      users,
      currentUser,
    } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{
          loading,
          parks,
          attractions,
          shows,
          manufacturers,
          users,
          currentUser,
          addData: this.addData,
          updateData: this.updateData,
          destroySession: () =>
            this.setState({
              currentUser: null,
            }),
        }}
      >
        {children}
      </Provider>
    );
  }
}
