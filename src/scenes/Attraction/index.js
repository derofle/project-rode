/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MediaBox } from 'react-materialize';
import { Consumer } from '../../services/context';

import Category from './components/Category';

import Overview from './scenes/Overview';
/*
import AttractionInformation from '../../components/attraction/pages/AttractionInformation';
import AttractionStatistics from '../../components/attraction/pages/AttractionStatistics';
import AttractionNews from '../../components/attraction/pages/AttractionNews';
import AttractionReviews from '../../components/attraction/pages/AttractionReviews';
*/

class Attraction extends React.Component {
  state = {
    loading: true,
    editMode: false,
    attraction: {},
    attractionType: {},
    park: {},
  };

  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentDidMount() {
    const { parks, manufacturers, attractionsInfo } = this.context;
    const { attractions, attractionTypes } = attractionsInfo;
    const { match } = this.props;
    console.log(attractions);
    console.log(match.params.attractionId);
    const attraction =
      attractions &&
      attractions.find(obj => obj.id === match.params.attractionId);
    console.log(attraction);
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
      park,
      loading: false,
    });
    console.log(attraction);
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
        <div className="container" style={{ width: '100%' }}>
          <div className="row" style={{ marginBottom: '30px' }} />
          <div className="row">
            <div className="col s12 m6 l4">
              <div
                className="card z-depth-2"
                style={{
                  borderRadius: '8px',
                  backgroundColor: '#F8F8F9',
                  zIndex: 10,
                }}
              >
                <div
                  className="card-image"
                  style={{ borderRadius: '6px', position: 'relative' }}
                >
                  <Category categoryId={attraction.categoryId} />

                  <div
                    style={{
                      position: 'absolute',
                      zIndex: '10',
                      right: '10%',
                      top: '-5%',
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
                    className="materialboxed attraction-img"
                    style={{
                      borderRadius: '6px',
                      position: 'relative',
                      margin: '0 auto',
                    }}
                  />
                </div>
                <div
                  className="card-content"
                  style={{
                    padding: '16px 24px 24px 24px',
                    borderRadius: '8px 8px 8px 8px',
                    marginTop: '-20px',
                  }}
                >
                  <p
                    className="bold-text"
                    style={{ fontSize: '1em', color: '#7C8EAE' }}
                  >
                    Dive Coaster • Bolliger & Mabillard
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
                        fontSize: '2em',
                        lineHeight: '100%',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        color: '#1D131D',
                      }}
                    >
                      {attraction.name.toUpperCase()}
                    </p>
                  )}

                  {}
                  <p className="grey-text">
                    <Link to={`/park/${park.id}`} style={{ color: '#1D131D' }}>
                      {park.name}
                    </Link>
                  </p>
                </div>
              </div>
              <div
                style={{
                  padding: '0 20px 0 20px',
                  top: '-40px',
                  position: 'relative',
                  zIndex: 7,
                }}
              >
                <div
                  className="card z-depth-2"
                  style={{
                    borderRadius: '8px',
                    backgroundColor: '#f8f8f9',
                  }}
                >
                  <div
                    className="card-content"
                    style={{ padding: '24px 0 12px 0' }}
                  >
                    <div className="collection no-border no-margin bold-text">
                      <Link
                        to={`/park/${match.params.parkId}/attractie/${
                          match.params.attractionId
                        }`}
                        className="collection-item"
                        style={{
                          padding: '12px 16px 12px 16px',
                        }}
                      >
                        Overzicht
                      </Link>
                      <Link
                        to={`/park/${match.params.parkId}/attractie/${
                          match.params.attractionId
                        }/informatie`}
                        className="collection-item"
                        style={{
                          padding: '12px 16px 12px 16px',
                        }}
                      >
                        Informatie
                      </Link>
                      <Link
                        to={`/park/${match.params.parkId}/attractie/${
                          match.params.attractionId
                        }/statistieken`}
                        className="collection-item"
                        style={{
                          padding: '12px 16px 12px 16px',
                        }}
                      >
                        Statistieken
                      </Link>
                      <Link
                        to={`/park/${match.params.parkId}/attractie/${
                          match.params.attractionId
                        }/niews`}
                        className="collection-item"
                        style={{
                          padding: '12px 16px 12px 16px',
                        }}
                      >
                        Nieuws
                      </Link>
                      <Link
                        to={`/park/${match.params.parkId}/attractie/${
                          match.params.attractionId
                        }/beoordelingen`}
                        className="collection-item"
                        style={{
                          borderBottom: '1px solid #e0e0e0',
                          padding: '12px 16px 12px 16px',
                        }}
                      >
                        Beoordelingen
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 m6 l8">
              {match.path === '/park/:parkId/attractie/:attractionId' &&
              match.isExact === true ? (
                <Overview attraction={attraction} />
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
