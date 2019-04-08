import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { firebase, database } from '../firebase';

export const { Provider, Consumer } = createContext();

export class AppProvider extends Component {
  state = {
    loading: true,
    parks: [],
    attractions: [],
    attractionCategories: [],
    attractionTypes: [],
    shows: [],
    manufacturers: [],
    users: [],
    currentUser: null,
  };

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    console.log(await database.getCollectionData('mediaCreators'));
    firebase.auth.onAuthStateChanged(
      user =>
        user &&
        this.setState({
          currentUser: user,
        })
    );
    this.setState(
      {
        parks: await database.getCollectionData('parks'),
        attractions: await database.getCollectionData('attractions'),
        attractionCategories: await database.getCollectionData(
          'attractionCategories'
        ),
        attractionTypes: await database.getCollectionData('attractionTypes'),
        licenses: await database.getCollectionData('licenses'),
        media: await database.getCollectionData('media'),
        mediaProviders: await database.getCollectionData('mediaProviders'),
        shows: await database.getCollectionData('shows'),
        manufacturers: await database.getCollectionData('manufacturers'),
        users: await database.getCollectionData('users'),
      },
      () => {
        console.log(this.state);
        this.setState({
          loading: false,
        });
      }
    );
    /*
    const prevState = this.state;

    prevState.collections.forEach(collection => {
      this.loadData(collection);
    });
    */
  }

  /*
  loadData = collection => {
    database.collection(collection).onSnapshot(snapshot => {
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
    database.collection(collection).add({
      ...object,
      AddedAt: new Date(),
    });
  };

  updateData = (object, collection) => {
    delete object.uid;
    database
      .collection(collection)
      .doc(object.uid)
      .update({
        ...object,
      });
  };

 */
  render() {
    const {
      loading,
      parks,
      attractions,
      attractionCategories,
      attractionTypes,
      shows,
      manufacturers,
      users,
      currentUser,
      media,
      mediaProviders,
      licenses,
    } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{
          loading,
          parks,
          attractionsInfo: {
            attractions,
            attractionCategories,
            attractionTypes,
          },
          shows,
          manufacturers,
          users,
          currentUser,
          media,
          mediaProviders,
          licenses,
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
