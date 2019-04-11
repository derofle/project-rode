import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Category from 'components/Category';
import { Consumer } from 'services/context';

import Overview from './scenes/Overview';
import Footage from './scenes/Footage';

const bigPictureDivStyle = css`
  position: relative;
  height: 70vh;
  width: 100%;
  overflow: hidden;
  z-index: 1;
`;

const overlayStyle = css`
  position: absolute;
  background-image: radial-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  width: 100%;
  height: 100%;
  z-index: 3;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.9);
`;

const attractionBigImageStyle = css`
  position: absolute;
  width: 100%;
  top: -9999px;
  left: -9999px;
  right: -9999px;
  bottom: -9999px;
  margin: auto;
  z-index: 2;
`;

const textOverImageStyle = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  width: 80vw;
  text-align: center;
`;

const attractionNameStyle = css`
  color: white;
  text-transform: uppercase;
  font-size: 6rem;
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
  line-height: 1.15 !important;
`;

const attractionSubtitleStyle = css`
  color: white;
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
  line-height: 1.5 !important;
  font-style: oblique;
`;

const attractionTypeStyle = css`
  color: white;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
  line-height: normal !important;
`;

const attractionMenuStyle = css`
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #f8f8f8;
  padding: 10px 20px 10px 20px;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

const menuLinkStyle = css`
  background-color: #f8f8f8;
  z-index: 6;
  color: #4c1971 !important;
  font-weight: bold;
  &:hover {
    color: #f8f8f8 !important;
    background-color: #4c1971 !important;
  }
`;

const creditBox = css`
  position: absolute;
  z-index: 9;
  bottom: 2%;
  right: 1%;
  padding: 6px 10px 6px 10px;
  color: white;
  text-align: right;
  font-size: 0.9rem;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
`;

const creditUrl = css`
  color: white;
  font-style: italic;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
`;

const parkBoxStyle = css`
  position: absolute;
  z-index: 9;
  bottom: 2%;
  left: 1%;
  padding: 6px 10px 6px 10px;
  color: white;
  text-align: right;
  font-size: 0.9rem;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
`;
const parkLinkStyle = css`
  color: white;
  font-style: italic;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
`;

const editButtonStyle = css`
  position: absolute;
  color: white;
  z-index: 10;
  right: 2%;
  top: 3%;
  cursor: pointer;
  background-color: black;
  padding: 6px;
  border-radius: 50%;
  transition: 0.2s;
  &:hover {
    color: black !important;
    background-color: white !important;
  }
`;

class AttractionRender extends React.Component {
  state = {
    loading: true,
    attraction: {},
    attractionType: [],
    park: {},
  };

  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentDidMount() {
    // TODO: Add park check, otherwise redirect to NotFound page
    const { parks, manufacturers, attractionsInfo } = this.context;
    const { attractions, attractionTypes } = attractionsInfo;
    const { match } = this.props;

    const attraction =
      attractions &&
      attractions.find(obj => obj.id === match.params.attractionId);

    // eslint-disable-next-line no-unused-expressions
    attraction &&
      attraction.typeIds.forEach(type => {
        const newType = attractionTypes.find(obj => obj.id === type);
        this.setState(prevState => ({
          attractionType: [...prevState.attractionType, newType],
        }));
      });

    const park = attraction && parks.find(obj => obj.uid === attraction.park);

    const manufacturer =
      attraction &&
      manufacturers.find(obj => obj.id === attraction.manufacturerId);

    this.setState({
      attraction,
      park,
      manufacturer,
      loading: false,
    });
  }

  render() {
    const {
      currentUser,
      users,
      media,
      mediaProviders,
      licenses,
    } = this.context;
    const { attraction, attractionType, loading, park } = this.state;

    const { match, location } = this.props;

    let user;
    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }

    const headerImageFile =
      media && media.find(med => med.uid === attraction.headerImage);

    const license =
      headerImageFile &&
      licenses.find(lic => lic.id === headerImageFile.licenseId);

    const provider =
      headerImageFile &&
      mediaProviders.find(prov => prov.id === headerImageFile.providerId);

    if (!loading) {
      if (attraction === undefined) return <Redirect to="/404" />;
      if (attraction.park !== park.uid) return <Redirect to="/404" />;
      return (
        <div>
          <div css={bigPictureDivStyle}>
            <div css={overlayStyle} />
            <img
              src={headerImageFile.src}
              css={attractionBigImageStyle}
              alt={attraction.id}
            />
            <div css={parkBoxStyle}>
              Park:{' '}
              <Link css={parkLinkStyle} to={`/park/${park.id}`}>
                {park.name}
              </Link>
            </div>
            <div css={creditBox}>
              Foto door:{' '}
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                css={creditUrl}
              >
                {provider.name}
              </a>
              <br />
              Gedistribueerd onder:{' '}
              <a
                href={license.url}
                target="_blank"
                rel="noopener noreferrer"
                css={creditUrl}
              >
                {license.abbreviated}
              </a>
            </div>
            <div css={textOverImageStyle}>
              <p css={attractionTypeStyle}>
                -
                {attractionType &&
                  attractionType.map(type => (
                    <Fragment key={type.id}>
                      {' '}
                      <Link
                        to={`/categorie/${type.categoryId}/type/${type.id}`}
                        css={attractionTypeStyle}
                      >
                        {type.name}
                      </Link>{' '}
                      -
                    </Fragment>
                  ))}
              </p>
              <p css={attractionNameStyle}>{attraction.name}</p>
              <p css={attractionSubtitleStyle}>{attraction.subtitle}</p>
              <Category categoryIds={attraction.categoryIds} />
            </div>
            {user && user.role === 'admin' ? (
              <Link to={`/admin/attractions/edit/${attraction.uid}`}>
                <i
                  className="material-icons small z-depth-1"
                  css={editButtonStyle}
                  onClick={this.toggleEditMode}
                  role="button"
                  onKeyPress={this.toggleEditMode}
                  tabIndex="-1"
                >
                  edit
                </i>
              </Link>
            ) : null}
            <div css={attractionMenuStyle}>
              <div className="card-content">
                <ul className="tabs">
                  <li className="tab col s3 collection-item">
                    <Link
                      to={`/park/${match.params.parkId}/attractie/${
                        match.params.attractionId
                      }`}
                      css={menuLinkStyle}
                    >
                      Overzicht
                    </Link>
                  </li>
                  <li className="tab col s3 collection-item">
                    <Link
                      to={`/park/${match.params.parkId}/attractie/${
                        match.params.attractionId
                      }/informatie`}
                      css={menuLinkStyle}
                    >
                      Informatie
                    </Link>
                  </li>
                  <li className="tab col s3 collection-item">
                    <Link
                      to={`/park/${match.params.parkId}/attractie/${
                        match.params.attractionId
                      }/beeldmateriaal`}
                      css={menuLinkStyle}
                    >
                      Beeldmateriaal
                    </Link>
                  </li>
                  <li className="tab col s3 collection-item">
                    <Link
                      to={`/park/${match.params.parkId}/attractie/${
                        match.params.attractionId
                      }/beoordelingen`}
                      css={menuLinkStyle}
                    >
                      Beoordelingen
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row" style={{ height: '1px', marginBottom: 0 }} />
          <div className="container">
            {match.path === '/park/:parkId/attractie/:attractionId' &&
            match.isExact === true ? (
              <Overview attraction={attraction} />
            ) : null}
            {match.path === '/park/:parkId/attractie/:attractionId' &&
            location.pathname.includes('beeldmateriaal') ? (
              <Footage attraction={attraction} />
            ) : null}
          </div>
        </div>
      );
    }
    return null;
  }
}

AttractionRender.contextType = Consumer;
const Attraction = props => (
  <Consumer>{() => <AttractionRender {...props} />}</Consumer>
);

export default Attraction;
