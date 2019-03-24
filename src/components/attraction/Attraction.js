/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MediaBox } from 'react-materialize';
import { Consumer } from '../../context/AppProvider';

import AttractionOverview from './pages/AttractionOverview';
import AttractionInformation from './pages/AttractionInformation';
import AttractionStatistics from './pages/AttractionStatistics';
import AttractionNews from './pages/AttractionNews';
import AttractionReviews from './pages/AttractionReviews';

class Attraction extends React.Component {
  state = {
    loading: true,
    editMode: false,
    attraction: {},
    attractionType: {},
    park: {},
  };

  propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentDidMount() {
    const { attractionsInfo, parks, manufacturers } = this.context;
    const { attractions, attractionTypes } = attractionsInfo;
    const { match } = this.props;
    const attraction = attractions.find(obj => obj.uid === match.params.Id);
    const attractionType = attractionTypes.find(
      obj => obj.id === attraction.typeId
    );
    console.log(attractionType);
    const park = parks.find(obj => obj.id === attraction.parkId);
    const manufacturer = manufacturers.find(
      obj => obj.id === attraction.manufacturerId
    );
    this.setState({
      attraction,
      attractionType,
      park,
      manufacturer,
      loading: false,
    });
  }

  handleChange = e => {
    const { attraction } = this.state;
    console.log(e.target.value);

    this.setState({
      attraction: {
        ...attraction,
        [e.target.id]: e.target.value,
      },
    });
  };

  toggleEditMode = () => {
    const { editMode } = this.state;
    if (editMode) {
      this.updateAttraction();
    }
    this.setState({
      editMode: !editMode,
    });
  };

  updateAttraction = () => {
    const { updateData, manufacturers } = this.context;
    const { attraction } = this.state;
    updateData(attraction, 'attractions');
    const manufacturer = manufacturers.find(
      obj => obj.id === attraction.manufacturer_id
    );
    this.setState({
      manufacturer,
    });
  };

  render() {
    const { manufacturers, currentUser, users } = this.context;
    const {
      attraction,
      attractionType,
      park,
      manufacturer,
      loading,
    } = this.state;
    const { match, location } = this.props;
    const { editMode } = this.state;
    let user;
    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }
    if (!loading) {
      return (
        <div className="container">
          <div className="row" style={{ marginBottom: '6px' }} />
          <div className="row">
            <div className="col s12 m3">
              <div className="card" style={{ borderRadius: '6px' }}>
                <div className="card-image" style={{ borderRadius: '8px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: '10',
                      right: '3%',
                      bottom: '5%',
                    }}
                  >
                    <i
                      className="material-icons small"
                      style={{
                        color: 'white',
                        textShadow: '0 0 10px black',
                      }}
                    >
                      favorite_border
                    </i>
                    {user && user.role === 'admin' ? (
                      <i
                        className="material-icons small"
                        style={{
                          color: 'white',
                          textShadow: '0 0 10px black',
                          cursor: 'pointer',
                        }}
                        onClick={this.toggleEditMode}
                      >
                        edit
                      </i>
                    ) : null}
                  </div>
                  <MediaBox
                    src={attraction.img}
                    alt="park-logo"
                    className="materialboxed"
                    style={{ borderRadius: '6px 6px 0px 0px' }}
                  />
                </div>

                <div
                  className="card-content"
                  style={{
                    padding: '16px 16px 12px 16px',
                    borderRadius: '8px 8px 8px 8px',
                  }}
                >
                  <p
                    className="bold-text"
                    style={{ fontSize: '0.8em', color: '#5c6672' }}
                  >
                    {editMode ? (
                      <div className="input-field">
                        <input
                          value={attraction.typeId}
                          id="type"
                          type="text"
                          className="validate bold-text"
                          onChange={this.handleChange}
                          style={{ color: 'rgb(92, 102, 114)' }}
                        />
                      </div>
                    ) : attractionType.name ? (
                      attractionType.name.toUpperCase()
                    ) : (
                      'TYPE ONBEKEND'
                    )}
                    {editMode ? null : ' • '}
                    {editMode ? (
                      <div className="input-field">
                        <select
                          className="browser-default bold-text"
                          onChange={this.handleChange}
                          id="manufacturer_id"
                          required
                          value={attraction.manufacturerId}
                          style={{ color: 'rgb(92, 102, 114)' }}
                        >
                          {attraction.manufacturerId ||
                          attraction.manufacturerId === '' ? null : (
                            <option key="empty" value="" selected>
                              Fabrikant Onbekend
                            </option>
                          )}
                          {manufacturers &&
                            manufacturers.map(manu => {
                              if (manu.id === attraction.manufacturer_id) {
                                return (
                                  <option value={manu.id} selected>
                                    {manu.name}
                                  </option>
                                );
                              }
                              return (
                                <option key={manu.id} value={manu.id}>
                                  {manu.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    ) : manufacturer ? (
                      <Link
                        to={`/fabrikant/${manufacturer.uid}`}
                        style={{ color: '#5c6672' }}
                      >
                        {manufacturer.name_short.toUpperCase()}
                      </Link>
                    ) : (
                      'FABRIKANT ONBEKEND'
                    )}
                    {}
                  </p>
                  {editMode ? (
                    <div className="input-field">
                      <input
                        value={attraction.name}
                        id="name"
                        type="text"
                        className="validate bold-text"
                        onChange={this.handleChange}
                        style={{ color: 'rgb(92, 102, 114)' }}
                      />
                    </div>
                  ) : (
                    <p
                      className="park-name bold-text"
                      style={{
                        fontSize: '1.5em',
                        lineHeight: '100%',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        color: '#222f40',
                      }}
                    >
                      {attraction.name.toUpperCase()}{' '}
                    </p>
                  )}

                  {}
                  <p className="grey-text">
                    <Link to={`/park/${park.uid}`} style={{ color: '#5c6571' }}>
                      {park.name}
                    </Link>
                  </p>
                </div>

                <div
                  className="card-content"
                  style={{
                    borderTop: '2px solid #f3f5f8',
                    padding: '0px 16px 0px 16px',
                  }}
                />
                <div className="collection no-border no-margin bold-text">
                  <Link
                    to={`/attractie/${match.params.Id}`}
                    className="collection-item"
                    style={{
                      borderBottom: '2px solid #f3f5f8',
                      padding: '12px 16px 12px 16px',
                    }}
                  >
                    Overzicht
                  </Link>
                  <Link
                    to={`/attractie/${match.params.Id}/informatie`}
                    className="collection-item"
                    style={{
                      borderBottom: '2px solid #f3f5f8',
                      padding: '12px 16px 12px 16px',
                    }}
                  >
                    Informatie
                  </Link>
                  <Link
                    to={`/attractie/${match.params.Id}/statistieken`}
                    className="collection-item"
                    style={{
                      borderBottom: '2px solid #f3f5f8',
                      padding: '12px 16px 12px 16px',
                    }}
                  >
                    Statistieken
                  </Link>
                  <Link
                    to={`/attractie/${match.params.Id}/niews`}
                    className="collection-item"
                    style={{
                      borderBottom: '2px solid #f3f5f8',
                      padding: '12px 16px 12px 16px',
                    }}
                  >
                    Nieuws
                  </Link>
                  <Link
                    to={`/attractie/${match.params.Id}/beoordelingen`}
                    className="collection-item"
                    style={{
                      borderBottom: '2px solid #f3f5f8',
                      padding: '12px 16px 12px 16px',
                    }}
                  >
                    Beoordelingen
                  </Link>
                </div>
                <div
                  className="card-content"
                  style={{
                    borderRadius: '0px 0px 6px 6px',
                    backgroundColor: '#f8f9fa',
                  }}
                />
              </div>
            </div>
            <div className="col s12 m9">
              {match.path === '/attractie/:Id' && match.isExact === true ? (
                <AttractionOverview attraction={attraction} />
              ) : null}
              {location.pathname.includes('/informatie') === true ? (
                <AttractionInformation />
              ) : null}
              {location.pathname.includes('/statistieken') === true ? (
                <AttractionStatistics />
              ) : null}
              {location.pathname.includes('/nieuws') === true ? (
                <AttractionNews />
              ) : null}
              {location.pathname.includes('/beoordelingen') === true ? (
                <AttractionReviews />
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

Attraction.contextType = Consumer;
export default props => <Consumer>{() => <Attraction {...props} />}</Consumer>;
