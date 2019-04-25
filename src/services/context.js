import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { firebase, database } from './firebase';

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
        media: await database.getCollectionData('media'),
        mediaProviders: await database.getCollectionData('mediaProviders'),
        mediaLicenses: await database.getCollectionData('mediaLicenses'),
        shows: await database.getCollectionData('shows'),
        manufacturers: await database.getCollectionData('manufacturers'),
        users: await database.getCollectionData('users'),
      },
      () => {
        this.setState({
          loading: false,
        });
      }
    );
  }

  updateContext = async () => {
    console.log('Context Updated!');
    this.setState(
      {
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
          mediaLicenses,
          addData: this.addData,
          updateData: this.updateData,
          destroySession: () =>
            this.setState({
              currentUser: null,
            }),
          updateContext: this.updateContext,
        }}
      >
        {children}
      </Provider>
    );
  }
}
