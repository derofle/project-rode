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
        <div>
          <div className="big-picture-div">
            <img src={attraction.img} className="attraction-big-image" />
          </div>
          <div className="container" style={{ width: '80%' }}>
            <div className="row" style={{ marginBottom: '30px' }} />
            <div className="row">
              <div className="col s12" style={{ position: 'relative' }}>
                <div className="name-div">
                  <span className="glow" style={{ fontSize: '1.5em' }}>
                    Rapid River
                  </span>
                  <h2 className="glow">{attraction.name}</h2>
                  <span className="glow" style={{ fontSize: '1.5em' }}>
                    Reis door het Incarijk.
                  </span>
                </div>
                <div className="card z-depth-2" style={{ borderRadius: '8px' }}>
                  <div
                    className="card-image attraction-header"
                    style={{
                      position: 'relative',
                      height: '60vh',
                      overflow: 'hidden',
                      zIndex: 1,
                      width: '100%',
                      borderRadius: '8px 8px 0 0',
                    }}
                  >
                    <div className="overlay" />
                    {match.path === '/park/:parkId/attractie/:attractionId' &&
                    match.isExact === true ? (
                      <Overview attraction={attraction} />
                    ) : null}
                  </div>
                  <div
                    className="card-content"
                    style={{ padding: '8px', backgroundColor: '#F6F6F3' }}
                  />
                  <div className="card-content" style={{ padding: '0 12px' }}>
                    <ul className="tabs">
                      <li className="tab col s3 collection-item">
                        <a href="#test1">Overzicht</a>
                      </li>
                      <li className="tab col s3 collection-item">
                        <a className="active" href="#test2">
                          Informatie
                        </a>
                      </li>
                      <li className="tab col s3 disabled collection-item">
                        <a href="#test3">Statistieken</a>
                      </li>
                      <li className="tab col s3 collection-item">
                        <a href="#test4">Beoordelingen</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="card" />
              </div>
            </div>
            <div className="row" />
            <div className="row" />
            <div className="row" />
            <div className="row" />
            <div className="row" />
            <div className="row" />
            <div className="row" />
            <div className="row" />
            <div className="row" />
          </div>
        </div>
      );
    }
    return null;
  }
}

Attraction.contextType = Consumer;
export default props => <Consumer>{() => <Attraction {...props} />}</Consumer>;
