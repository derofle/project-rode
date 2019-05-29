import React from 'react';
import PropTypes from 'prop-types';
import { Context } from 'services/context';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  getProperty,
  addFavorite,
  sortArray,
  getAvarageRating,
} from 'services/utilities';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import RatingStars from 'components/RatingStars';

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

const filterTitle = css`
  margin-bottom: 6px;
  margin-top: 0;
  font-size: 85.71%;
  font-weight: 500;
  line-height: 1.2;
`;

const filterCheckbox = css`
  position: inherit !important;
  opacity: 1 !important;
  margin-right: 2px;
  pointer-events: auto !important;
  height: 16px;
  vertical-align: middle;
  width: 16px;
`;

const filterCheckboxLink = css`
  text-decoration: none !important;
  color: #222 !important;
  font-size: 85.71%;
  display: inline-block;
  vertical-align: middle;
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
    categoryFilter: [],
    typeFilter: [],
  };

  componentDidMount() {
    document.title = `Parken | Project Rode`;
    const { parks } = this.context;
    const newArray = parks.map(park => ({
      ...park,
    }));
    this.setState({
      filteredArray: sortArray(newArray, 'name', 'desc'),
    });
  }

  filterAttractions = () => {
    const { attractionsInfo } = this.context;
    const { attractions } = attractionsInfo;
    const { categoryFilter, typeFilter } = this.state;
    const filteredCategories = attractions.filter(({ category }) =>
      category.some(() => categoryFilter.every(l => category.includes(l)))
    );
    const filteredArray = filteredCategories.filter(({ type }) =>
      type.some(() => typeFilter.every(l => type.includes(l)))
    );
    const newArray = filteredArray.map(attr => ({
      ...attr,
      ratingAvg: attr.reviews ? getAvarageRating(attr.reviews) : undefined,
    }));
    this.setState({
      filteredArray: newArray,
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

  renderCategories = () => {
    const { attractionsInfo } = this.context;
    const { attractionCategories } = attractionsInfo;
    const sortedArray = sortArray(attractionCategories, 'name', 'desc');
    const categorieElements = sortedArray.map(cat => (
      <div key={cat.uid}>
        <label htmlFor={cat.uid} css={filterCheckboxLink}>
          <input
            type="checkbox"
            value={cat.uid}
            name={cat.uid}
            id={cat.uid}
            className="browser-default"
            css={filterCheckbox}
            checked={this.props.checkBoxDefaultStatus}
            onChange={this.handleCheckbox}
          />
          {cat.name}
        </label>
      </div>
    ));
    return categorieElements;
  };

  renderTypes = () => {
    const { attractionsInfo } = this.context;
    const { attractionTypes } = attractionsInfo;
    const sortedArray = sortArray(attractionTypes, 'name', 'desc');
    const TypeElements = sortedArray.map(type => (
      <div key={type.uid}>
        <input
          type="checkbox"
          value={type.uid}
          name={type.uid}
          className="browser-default"
          css={filterCheckbox}
          checked={this.props.checkBoxDefaultStatus}
          onChange={this.handleCheckboxType}
        />
        <a css={filterCheckboxLink}>{type.name}</a>
      </div>
    ));
    return TypeElements;
  };

  handleCheckbox = e => {
    if (e.target.checked === true) {
      this.setState(
        prevState => ({
          categoryFilter: [...prevState.categoryFilter, e.target.value],
        }),
        () => this.filterAttractions()
      );
    } else if (e.target.checked === false) {
      this.setState(
        prevState => ({
          categoryFilter: prevState.categoryFilter.filter(
            i => i !== e.target.value
          ),
        }),
        () => this.filterAttractions()
      );
      this.filterAttractions();
    }
    console.log(e.target.checked);
    console.log(e.target.value);
  };

  handleCheckboxType = e => {
    if (e.target.checked === true) {
      this.setState(
        prevState => ({
          typeFilter: [...prevState.typeFilter, e.target.value],
        }),
        () => this.filterAttractions()
      );
    } else if (e.target.checked === false) {
      this.setState(
        prevState => ({
          typeFilter: prevState.typeFilter.filter(i => i !== e.target.value),
        }),
        () => this.filterAttractions()
      );
      this.filterAttractions();
    }
    console.log(e.target.checked);
    console.log(e.target.value);
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
        filteredArray: sortArray(filteredArray, 'name', 'desc'),
        filterMethod: 'Naam A - Z',
      });
    }
    if (type === 'name-asc') {
      this.setState({
        filteredArray: sortArray(filteredArray, 'name', 'asc'),
        filterMethod: 'Naam Z - A',
      });
    }
  };

  render() {
    const { filteredArray, showMenu, filterMethod } = this.state;
    const { media, countries } = this.context;
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
                <a css={breadcrumbLink}>Parken</a>
              </li>
            </ul>
          </div>
        </div>
        <div css={contentContainer}>
          <div css={topContent}>
            <div css={titleContainer}>
              <h1 css={titleStyle} style={{ display: 'inline' }}>
                Parken
              </h1>
              <p style={{ display: 'inline', paddingLeft: '4px' }}>
                - Aantal resultaten: {filteredArray.length}
              </p>
            </div>
            <div css={sortingTopContainer}>
              <div css={sortingContainer}>
                <p style={{ display: 'inherit', margin: 0 }}>Sorteer op:</p>
                <button
                  onClick={this.showMenu}
                  css={searchButton}
                  type="button"
                >
                  {filterMethod}{' '}
                  <i css={ratingIcon} className="material-icons">
                    arrow_drop_down
                  </i>
                </button>
                {showMenu ? (
                  <div className="sorting-menu" css={dropdownMenu}>
                    <button
                      type="button"
                      style={{ float: 'right' }}
                      onClick={() => this.sortArray('name-desc')}
                    >
                      Naam A - Z
                    </button>
                    <button
                      type="button"
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
                  <div style={{ marginBottom: '24px' }}>
                    <fieldset style={{ padding: 0, border: 0 }}>
                      <legend>
                        <h3 css={filterTitle}>Categorie:</h3>
                      </legend>
                      <div>Categorie was here</div>
                    </fieldset>
                  </div>
                  <fieldset style={{ padding: 0, border: 0 }}>
                    <legend>
                      <h3 css={filterTitle}>Types:</h3>
                    </legend>
                    <div>Types was here</div>
                  </fieldset>

                  <form action="" />
                </div>
              </div>
            </div>
            <div css={cardWrapper}>
              <div css={cardContainer}>
                <ul css={list}>
                  {filteredArray &&
                    filteredArray.map(park => (
                      <li css={listCard} key={park.uid}>
                        <div css={card}>
                          <i
                            css={favoriteIcon}
                            className="material-icons favorite"
                            onClick={() => this.favoriteToggle(park.uid)}
                            onKeyDown={() => this.favoriteToggle(park.uid)}
                            role="button"
                            tabIndex="0"
                            style={{
                              color: this.renderFavorite(park.uid, 'color'),
                              filter: this.renderFavorite(park.uid, 'shadow'),
                            }}
                          >
                            {this.renderFavorite(park.uid, 'icon')}
                          </i>
                          <Link to={`/park/${park.slug}`} style={{ zIndex: 9 }}>
                            <div css={imageWrapper} className="image-wrapper">
                              <img
                                css={image}
                                alt=""
                                src={
                                  media &&
                                  park.headerImage &&
                                  media.find(
                                    med => med.uid === park.headerImage
                                  ).src
                                }
                              />
                            </div>
                            <div css={cardInfo}>
                              <h2 css={cardTitle}>{park.name}</h2>
                              <div>
                                <ReactCountryFlag code={park.country} svg />
                                <p
                                  style={{ paddingLeft: '4px' }}
                                  css={cardPark}
                                >
                                  {park.city}
                                </p>
                                <span css={cardPark}>
                                  ,{' '}
                                  {getProperty(
                                    park.country,
                                    'uid',
                                    'name',
                                    countries
                                  )}
                                </span>
                              </div>
                              <div>
                                <span>
                                  <RatingStars rating={park.ratingAvg} />

                                  <span css={ratingAmount}>
                                    ({park.reviews ? park.reviews.length : '0'})
                                  </span>
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
