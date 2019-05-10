/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Consumer } from 'services/context';
import { uidToName } from 'services/utilities';

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

const attractionTypeStyle = css`
  color: white;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
  line-height: normal !important;
`;

class ParkDetailsRender extends React.Component {
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
    const { parks } = this.context;
    const { match } = this.props;
    const park = parks && parks.find(obj => obj.slug === match.params.parkId);
    document.title = `${park.name} < Project Rode`;
    this.setState({
      park,
      loading: false,
    });
  }

  render() {
    const {
      currentUser,
      users,
      media,
      mediaProviders,
      mediaLicenses,
      countries,
    } = this.context;
    const { attraction, loading, park } = this.state;

    const { match } = this.props;

    let user;
    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }

    const headerImageFile =
      media && media.find(med => med.uid === park.headerImage);

    const license =
      headerImageFile &&
      mediaLicenses.find(lic => lic.id === headerImageFile.licenseId);

    const provider =
      headerImageFile &&
      mediaProviders.find(prov => prov.id === headerImageFile.providerId);

    if (!loading) {
      // if (park === undefined) return <Redirect to="/404" />;
      return (
        <div>
          <div css={bigPictureDivStyle}>
            <div css={overlayStyle} />
            <img
              src={headerImageFile && headerImageFile.src}
              css={attractionBigImageStyle}
              alt={attraction.id}
            />
            <div css={creditBox}>
              Foto door:{' '}
              <a
                href={provider && provider.url}
                target="_blank"
                rel="noopener noreferrer"
                css={creditUrl}
              >
                {provider && provider.name}
              </a>
              <br />
              Gedistribueerd onder:{' '}
              <a
                href={license && license.url}
                target="_blank"
                rel="noopener noreferrer"
                css={creditUrl}
              >
                {license && license.abbreviated}
              </a>
            </div>
            <div css={textOverImageStyle}>
              <p css={attractionTypeStyle}>
                {park.city}, {uidToName(park.country, countries)}
              </p>
              <p css={attractionNameStyle}>{park.name}</p>
              <p css={attractionSubtitleStyle}>{park.subtitle}</p>
            </div>
            {user && user.role === 'admin' ? (
              <Link to={`/admin/parks/edit/${park.uid}`}>
                <i
                  className="material-icons small z-depth-1"
                  css={editButtonStyle}
                  onClick={this.toggleEditMode}
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
                      to={`/park/${match.params.parkId}`}
                      css={menuLinkStyle}
                    >
                      Overzicht
                    </Link>
                  </li>
                  <li className="tab col s3 collection-item">
                    <Link
                      to={`/park/${match.params.parkId}/informatie`}
                      css={menuLinkStyle}
                    >
                      Informatie
                    </Link>
                  </li>
                  <li className="tab col s3 collection-item">
                    <Link
                      to={`/park/${match.params.parkId}/beeldmateriaal`}
                      css={menuLinkStyle}
                    >
                      Beeldmateriaal
                    </Link>
                  </li>
                  <li className="tab col s3 collection-item">
                    <Link
                      to={`/park/${match.params.parkId}/beoordelingen`}
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
          <div className="container" />
        </div>
      );
    }
    return null;
  }
}

ParkDetailsRender.contextType = Consumer;
const Attraction = props => (
  <Consumer>{() => <ParkDetailsRender {...props} />}</Consumer>
);

export default Attraction;
