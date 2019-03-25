import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MediaBox } from 'react-materialize';
import { Consumer } from '../../context/AppProvider';

import ParkOverview from './scenes/Overview';
import ParkAttractions from './scenes/Attractions';
import ParkShows from '../../components/park/components/ParkShows';

class Park extends React.Component {
  propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const { attractions, parks } = this.context;
    const { match, location, history } = this.props;

    const park = parks.find(obj => obj.uid === match.params.Id);
    const parkAttractions = attractions.filter(
      attraction => attraction.park_id === park.id
    );

    return (
      <div className="container">
        <div className="row" style={{ marginBottom: '6px' }} />
        <div className="row">
          <div className="col s12 m3">
            <div className="card" style={{ borderRadius: '6px' }}>
              <div className="card-image" style={{ borderRadius: '8px' }}>
                <i
                  className="material-icons small"
                  style={{
                    position: 'absolute',
                    zIndex: '10',
                    right: '3%',
                    bottom: '5%',
                    color: 'white',
                    textShadow: '0 0 10px black',
                  }}
                >
                  favorite_border
                </i>
                <MediaBox
                  src={park.img}
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
                  className="park-name bold-text"
                  style={{
                    fontSize: '1.5em',
                    lineHeight: '100%',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    color: '#222f40',
                  }}
                >
                  {park.name.toUpperCase()}{' '}
                </p>
                <p className="grey-text">{park.location}</p>
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
                  to={`/park/${match.params.Id}`}
                  className="collection-item"
                  style={{
                    borderBottom: '2px solid #f3f5f8',
                    padding: '12px 16px 12px 16px',
                  }}
                >
                  Overzicht
                </Link>
                <Link
                  to={`/park/${match.params.Id}/informatie`}
                  className="collection-item"
                  style={{
                    borderBottom: '2px solid #f3f5f8',
                    padding: '12px 16px 12px 16px',
                  }}
                >
                  Informatie
                </Link>
                <Link
                  to={`/park/${match.params.Id}/attracties`}
                  className="collection-item"
                  style={{
                    borderBottom: '2px solid #f3f5f8',
                    padding: '12px 16px 12px 16px',
                  }}
                >
                  Attracties
                </Link>
                <Link
                  to={`/park/${match.params.Id}/shows`}
                  className="collection-item"
                  style={{
                    borderBottom: '2px solid #f3f5f8',
                    padding: '12px 16px 12px 16px',
                  }}
                >
                  Shows
                </Link>
                <Link
                  to={`/park/${match.params.Id}/horeca`}
                  className="collection-item"
                  style={{
                    borderBottom: '2px solid #f3f5f8',
                    padding: '12px 16px 12px 16px',
                  }}
                >
                  Horeca
                </Link>
                <Link
                  to={`/park/${match.params.Id}/faciliteiten`}
                  className="collection-item"
                  style={{
                    borderBottom: '2px solid #f3f5f8',
                    padding: '12px 16px 12px 16px',
                  }}
                >
                  Faciliteiten
                </Link>
                <Link
                  to={`/park/${match.params.Id}/nieuws`}
                  className="collection-item"
                  style={{
                    borderBottom: '2px solid #f3f5f8',
                    padding: '12px 16px 12px 16px',
                  }}
                >
                  Nieuws
                </Link>
                <Link
                  to={`/park/${match.params.Id}/beoordelingen`}
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
            {match.path === '/park/:Id' && match.isExact === true ? (
              <ParkOverview park={park} />
            ) : null}
            {location.pathname.includes('/attracties') === true ? (
              <ParkAttractions
                attractions={parkAttractions}
                history={history}
              />
            ) : null}
            {location.pathname.includes('/shows') === true ? (
              <ParkShows />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Park.contextType = Consumer;
export default props => <Consumer>{() => <Park {...props} />}</Consumer>;
