import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MediaBox } from 'react-materialize';
import { AppConsumer } from '../context/appContext';

import AttractionOverview from './pages/AttractionOverview';
import AttractionInformation from './pages/AttractionInformation';
import AttractionStatistics from './pages/AttractionStatistics';
import AttractionNews from './pages/AttractionNews';
import AttractionReviews from './pages/AttractionReviews';

class Attraction extends React.Component {
  propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const { attractions } = this.context;
    console.log(attractions);
    const { match, location } = this.props;
    return (
      <AppConsumer>
        {context => {
          if (!context.loading && context.attraction && context.park) {
            const { attraction, park, manufacturer } = context;
            return (
              <div className="container">
                <div className="row" style={{ marginBottom: '6px' }} />
                <div className="row">
                  <div className="col s12 m3">
                    <div className="card" style={{ borderRadius: '6px' }}>
                      <div
                        className="card-image"
                        style={{ borderRadius: '8px' }}
                      >
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
                          {attraction.type
                            ? attraction.type.toUpperCase()
                            : 'TYPE ONBEKEND'}{' '}
                          •{' '}
                          {manufacturer ? (
                            <Link
                              to={`/fabrikant/${manufacturer.uid}`}
                              style={{ color: '#5c6672' }}
                            >
                              {manufacturer.name_short.toUpperCase()}
                            </Link>
                          ) : (
                            'FABRIKANT ONBEKEND'
                          )}
                        </p>
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
                        <p className="grey-text">
                          <Link
                            to={`/park/${park.id}`}
                            style={{ color: '#5c6571' }}
                          >
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
                    {match.path === '/attractie/:Id' &&
                    match.isExact === true ? (
                      <AttractionOverview />
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
        }}
      </AppConsumer>
    );
  }
}

Attraction.contextType = AppConsumer;
export default props => (
  <AppConsumer>{() => <Attraction {...props} />}</AppConsumer>
);
