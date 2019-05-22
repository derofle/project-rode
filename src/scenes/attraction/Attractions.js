import React from 'react';
import PropTypes from 'prop-types';
import { Context } from 'services/context';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { getProperty, addFavorite } from 'services/utilities';
import { Link } from 'react-router-dom';

const fullContainer = css`
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
`;

const breadcrumbsWrapper = css`
  padding-left: 36px;
  padding-right: 36px;
`;

const breadcrumbsContent = css`
  font-size: 85.71%;
  color: #595959;
  height: 20px;
`;

const breadcrumbsList = css`
  margin-right: 6px;
  float: left;
  list-style: none;
  padding-left: 0;
`;

const breadcrumbItem = css`
  display: inline-block;
`;

const breadcrumbLink = css`
  color: #595959;
  text-decoration: underline;
  background: transparent;
  box-sizing: border-box;
  padding-right: 6px;
  padding-left: 6px;
`;

const breadcrumbArrow = css`
  font-size: 14px;
  line-height: 1.4;
  display: inline-block;
  text-decoration: none;
  font-style: normal;
  font-weight: 600;
  white-space: nowrap;
`;

const contentContainer = css`
  margin-top: 12px;
`;

const topContent = css`
  padding-right: 36px;
  padding-left: 36px;
  padding-top: 24px;
  height: 60px;
`;

const titleContainer = css`
  float: left;
`;

const titleStyle = css`
  font-weight: 500;
  font-size: 26px;
  line-height: 1.2;
  margin: 0;
`;

const sortingTopContainer = css`
  margin-top: 6px;
  float: right;
`;

const sortingContainer = css`
  margin-right: -12px;
  font-size: 85.71%;
  display: inline-block;
  position: relative;
`;

const searchContainer = css`
  margin-top: 12px;
  color: #222;
`;

const searchButton = css`
  padding-right: 25px;
  position: relative;
  background-color: transparent !important;
  border: 0px;
  box-shadow: none;
  font-weight: 400;
  height: auto;
  font-size: 14px;
  color: #222;
  outline: auto 5px -webkit-focus-ring-color;
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const dropdownMenu = css`
  position: absolute;
  z-index: 10;
  right: 0;
  padding-right: 25px;
  z-index: 10;
`;

const filterWrapper = css`
  float: left;
  padding-left: 18px;
  padding-right: 18px;
  position: relative;
  margin: 0;
`;

const filterContainer = css`
  width: 250px;
  padding-right: 0px;
  display: block;
  padding-left: 18px;
  float: left;
  margin: 0;
`;

const filterContent = css`
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 3px;
  background-color: #fff;
  border: 1px solid #e1e3df;
  border-bottom-color: #cbccc9;
  margin: 0 0 12px;
`;

const cardWrapper = css`
  padding-left: 0px;
  padding-right: 18px;
  float: none;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
`;

const cardContainer = css`
  padding-left: 18px;
  width: 100%;
  padding-right: 18px;
  float: left;
`;

const list = css`
  margin: -9px;
  padding-left: 0px;
  justify-content: flex-start !important;
  list-style-position: outside;
  display: flex !important;
  flex-wrap: wrap !important;
  list-style-type: disc;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

const listCard = css`
  padding: 9px;
  flex-grow: 1;
  flex-basis: 25%;
  max-width: 25%;
  order: 1 !important;
  margin: 0;
  @media only screen and (max-width: 900px) {
    flex-basis: 33.33333%;
    max-width: 33.33333%;
  }
`;

const card = css`
  position: relative;
  flex: 0 0 auto !important;
  box-sizing: border-box;
  margin: 0;
  display: block;
  &:hover {
    .favorite {
      opacity: 1;
    }
    .image-wrapper {
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
    }
  }
`;

const favoriteIcon = css`
  position: absolute;
  color: #fff;
  z-index: 9;
  right: 5px;
  top: 5px;
  font-size: 26px;
  cursor: pointer;
  transition: 0.2s;
  opacity: 0;
  &:hover {
    font-size: 30px;
  }
`;

const imageWrapper = css`
  background-color: #faf9f5;
  position: relative;
  border-radius: 2px;
  width: 100%;
  height: 200px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;
  transition-property: box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
`;

const image = css`
  position: absolute;
  top: -9999px;
  left: -9999px;
  right: -9999px;
  bottom: -9999px;
  margin: auto;
  height: 100%;
`;

const cardInfo = css``;

const cardTitle = css`
  font-family: 'Graphik Webfont', -apple-system, BlinkMacSystemFont, 'Roboto',
    'Droid Sans', 'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: normal;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #222;
  padding-top: 4px;
  cursor: pointer;
`;

const cardPark = css`
  display: inline-block;
  color: #595959;
  font-family: 'Graphik Webfont', -apple-system, BlinkMacSystemFont, 'Roboto',
    'Droid Sans', 'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: normal;
  margin: 0;
`;
const ratingContainer = css`
  font-size: 0;
  display: inline-block;
  position: relative;
  vertical-align: baseline;
  bottom: 2px;
  color: #222 !important;
`;

const ratingIcon = css`
  font-size: 18px;
  line-height: 1.6;
`;

const ratingAmount = css`
  display: inline-block;
  bottom: 6px;
  left: 2px;
  position: relative;
  color: #595959;
  font-family: 'Graphik Webfont', -apple-system, BlinkMacSystemFont, 'Roboto',
    'Droid Sans', 'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: normal;
`;

class Attractions extends React.Component {
  static contextType = Context;

  state = {
    search: '',
    filteredArray: [],
    showMenu: false,
    filterMethod: 'Naam A - Z',
  };

  componentDidMount() {
    const { attractionsInfo } = this.context;
    this.setState({
      filteredArray: attractionsInfo.attractions.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      ),
    });
  }

  filterAttractions = (param, input) => {
    const { attractionsInfo } = this.context;
    const filter = input.toUpperCase();
    const filtered = attractionsInfo.attractions.filter(item => {
      if (item[param].toUpperCase().includes(filter)) {
        return item;
      }
      return null;
    });
    this.setState({
      filteredArray: filtered,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    const { search } = this.state;
    e.preventDefault();
    this.filterAttractions('name', search);
  };

  favoriteToggle = attr => {
    const { currentUser, updateContext } = this.context;
    const search = currentUser.profile.favorites.some(item => item === attr);
    if (search === false) {
      const updatedDoc = {
        uid: currentUser.uid,
        favorites: currentUser.profile.favorites
          ? [...currentUser.profile.favorites, attr]
          : [attr],
      };
      addFavorite(updatedDoc);
      updateContext();
    } else {
      const filteredArray = currentUser.profile.favorites.filter(
        item => item !== attr
      );
      const updatedDoc = {
        uid: currentUser.uid,
        favorites: filteredArray,
      };
      addFavorite(updatedDoc);
      updateContext();
    }
  };

  renderFavorite = (attr, type) => {
    const { currentUser } = this.context;
    const search = currentUser.profile.favorites.some(item => item === attr);
    if (type === 'color') {
      if (search === true) {
        return 'crimson';
      }
      return 'white';
    }

    if (type === 'icon') {
      if (search === true) {
        return 'favorite';
      }
      return 'favorite_border';
    }

    if (type === 'shadow') {
      if (search === true) {
        return 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.2))';
      }
      return 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.4))';
    }
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };

  sortArray = type => {
    const { filteredArray } = this.state;
    if (type === 'name-desc') {
      this.setState({
        filteredArray: filteredArray.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        ),
        filterMethod: 'Naam A - Z',
      });
    }
    if (type === 'name-asc') {
      this.setState({
        filteredArray: filteredArray.sort((a, b) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        ),
        filterMethod: 'Naam Z - A',
      });
    }
  };

  render() {
    const { filteredArray, showMenu, filterMethod } = this.state;
    const { media, parks, countries } = this.context;
    return (
      <div css={fullContainer}>
        <div css={breadcrumbsWrapper}>
          <div css={breadcrumbsContent}>
            <ul css={breadcrumbsList}>
              <li css={breadcrumbItem}>
                <a css={breadcrumbLink} style={{ paddingLeft: 0 }}>
                  Home
                </a>
              </li>
              <li css={breadcrumbItem}>
                <span css={breadcrumbArrow}>{'>'}</span>
                <a css={breadcrumbLink}>Attracties</a>
              </li>
            </ul>
          </div>
        </div>
        <div css={contentContainer}>
          <div css={topContent}>
            <div css={titleContainer}>
              <h1 css={titleStyle}>Attracties</h1>
            </div>
            <div css={sortingTopContainer}>
              <div css={sortingContainer}>
                <label>Sorteer op:</label>
                <button onClick={this.showMenu} css={searchButton}>
                  {filterMethod}{' '}
                  <i css={ratingIcon} className="material-icons">
                    arrow_drop_down
                  </i>
                </button>
                {showMenu ? (
                  <div className="sorting-menu" css={dropdownMenu}>
                    <button
                      style={{ float: 'right' }}
                      onClick={() => this.sortArray('name-desc')}
                    >
                      Naam A - Z
                    </button>
                    <button
                      style={{ float: 'right' }}
                      onClick={() => this.sortArray('name-asc')}
                    >
                      Naam Z - A
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div css={searchContainer}>
            <div css={filterWrapper}>
              <div css={filterContainer}>
                <div css={filterContent}>
                  <form action="" />
                </div>
              </div>
            </div>
            <div css={cardWrapper}>
              <div css={cardContainer}>
                <ul css={list}>
                  {filteredArray &&
                    filteredArray.map(attr => (
                      <li css={listCard} key={attr.uid}>
                        <div css={card}>
                          <i
                            css={favoriteIcon}
                            className="material-icons favorite"
                            onClick={() => this.favoriteToggle(attr.uid)}
                            style={{
                              color: this.renderFavorite(attr.uid, 'color'),
                              filter: this.renderFavorite(attr.uid, 'shadow'),
                            }}
                          >
                            {this.renderFavorite(attr.uid, 'icon')}
                          </i>
                          <Link
                            to={`/park/${getProperty(
                              attr.park,
                              'uid',
                              'slug',
                              parks
                            )}/attractie/${attr.slug}`}
                            style={{ zIndex: 9 }}
                          >
                            <div css={imageWrapper} className="image-wrapper">
                              <img
                                css={image}
                                src={
                                  media &&
                                  attr.headerImage &&
                                  media.find(
                                    med => med.uid === attr.headerImage
                                  ).src
                                }
                              />
                            </div>
                            <div css={cardInfo}>
                              <h2 css={cardTitle}>{attr.name}</h2>
                              <div>
                                <p css={cardPark}>
                                  {getProperty(attr.park, 'uid', 'name', parks)}
                                </p>{' '}
                                <span css={cardPark}>
                                  in{' '}
                                  {getProperty(
                                    getProperty(
                                      attr.park,
                                      'uid',
                                      'country',
                                      parks
                                    ),
                                    'uid',
                                    'name',
                                    countries
                                  )}
                                </span>
                              </div>
                              <div>
                                <span>
                                  <span css={ratingContainer}>
                                    <i
                                      css={ratingIcon}
                                      className="material-icons"
                                    >
                                      star
                                    </i>
                                    <i
                                      css={ratingIcon}
                                      className="material-icons"
                                    >
                                      star
                                    </i>
                                    <i
                                      css={ratingIcon}
                                      className="material-icons"
                                    >
                                      star
                                    </i>
                                    <i
                                      css={ratingIcon}
                                      className="material-icons"
                                    >
                                      star_half
                                    </i>
                                    <i
                                      css={ratingIcon}
                                      className="material-icons"
                                    >
                                      star_border
                                    </i>
                                  </span>
                                  <span css={ratingAmount}>(59)</span>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Attractions.propTypes = {
  history: PropTypes.object,
};

export default Attractions;
