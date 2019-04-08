/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Consumer } from '../../services/context';

import Overview from './scenes/Overview';

import Category from './components/Category';

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

class AttractionRender extends React.Component {
  state = {
    loading: true,
    editMode: false,
    attraction: {},
    attractionType: [],
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

    const attraction =
      attractions &&
      attractions.find(obj => obj.id === match.params.attractionId);

    attraction.typeIds.forEach(type => {
      const newType = attractionTypes.find(obj => obj.id === type);
      this.setState(prevState => ({
        attractionType: [...prevState.attractionType, newType],
      }));
    });

    const park = parks.find(obj => obj.id === attraction.parkId);

    const manufacturer = manufacturers.find(
      obj => obj.id === attraction.manufacturerId
    );
    this.setState({
      attraction,
      park,
      loading: false,
    });
    console.log(this.state);
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
          <div css={bigPictureDivStyle}>
            <div css={overlayStyle} />
            <img
              src={attraction.headerImage.src}
              css={attractionBigImageStyle}
              alt={attraction.id}
            />
            <div css={creditBox}>
              Foto door:{' '}
              <a
                href={attraction.headerImage.credUrl}
                target="_blank"
                rel="noopener noreferrer"
                css={creditUrl}
              >
                {attraction.headerImage.credName}
              </a>
              <br />
              Gedistribueerd onder:{' '}
              <a
                href={attraction.headerImage.credTypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                css={creditUrl}
              >
                {attraction.headerImage.credType}
              </a>
            </div>
            <div css={textOverImageStyle}>
              <p css={attractionTypeStyle}>
                -
                {attractionType &&
                  attractionType.map(type => (
                    <Link
                      to={`/categorie/${type.categoryId}/type/${type.id}`}
                      css={attractionTypeStyle}
                    >
                      {' '}
                      {type.name} -
                    </Link>
                  ))}
              </p>
              <p css={attractionNameStyle}>{attraction.name}</p>
              <p css={attractionSubtitleStyle}>{attraction.subtitle}</p>
              <Category categoryIds={attraction.categoryIds} />
            </div>
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
                      }/statistieken`}
                      css={menuLinkStyle}
                    >
                      Statistieken
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
          <div className="row" style={{ height: '1px' }} />
          <div className="container">
            {match.path === '/park/:parkId/attractie/:attractionId' &&
            match.isExact === true ? (
              <Overview attraction={attraction} />
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
