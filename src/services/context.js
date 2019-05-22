import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebase, database } from './firebase';

export const Context = React.createContext();
export const { Consumer, Provider } = Context;

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
    this.setState(
      {
        countries: await database.getCollectionData('countries'),
        parks: await database.getCollectionData('parks'),
        attractions: await database.getCollectionData('attractions'),
        attractionCategories: await database.getCollectionData(
          'attractionCategories'
        ),
        attractionTypes: await database.getCollectionData('attractionTypes'),
        media: await database.getCollectionData('media'),
        mediaProviders: await database.getCollectionData('mediaProviders'),
        mediaLicenses: await database.getCollectionData('mediaLicenses'),
        shows: await database.getCollectionData('shows'),
        manufacturers: await database.getCollectionData('manufacturers'),
        users: await database.getCollectionData('users'),
      },
      () => {
        firebase.auth.onAuthStateChanged(
          user =>
            user &&
            this.setState({
              currentUser: {
                ...user,
                profile: this.state.users.find(i => i.uid === user.uid),
              },
              loading: false,
            })
        );
        console.log(this.state);
      }
    );
  }

  updateContext = async () => {
    console.log('Context Updated!');
    this.setState(
      {
        countries: await database.getCollectionData('countries'),
        parks: await database.getCollectionData('parks'),
        attractions: await database.getCollectionData('attractions'),
        attractionCategories: await database.getCollectionData(
          'attractionCategories'
        ),
        attractionTypes: await database.getCollectionData('attractionTypes'),
        media: await database.getCollectionData('media'),
        mediaProviders: await database.getCollectionData('mediaProviders'),
        mediaLicenses: await database.getCollectionData('mediaLicenses'),
        shows: await database.getCollectionData('shows'),
        manufacturers: await database.getCollectionData('manufacturers'),
        users: await database.getCollectionData('users'),
      },
      () => {
        this.setState({
          currentUser: {
            ...this.state.currentUser,
            profile: this.state.users.find(
              i => i.uid === this.state.currentUser.uid
            ),
          },
          loading: false,
        });
      }
    );
  };

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
      mediaLicenses,
      countries,
    } = this.state;
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          loading,
          countries,
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
          mediaLicenses,
          addData: this.addData,
          updateData: this.updateData,
          updateSingleCollection: this.updateSingleCollection,
          destroySession: () =>
            this.setState({
              currentUser: null,
            }),
          updateContext: this.updateContext,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
