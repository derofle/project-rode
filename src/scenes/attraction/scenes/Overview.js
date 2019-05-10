import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const AttractionOverview = props => {
  const { attraction } = props;
  return <div>{ReactHtmlParser(attraction.description)}</div>;
};

AttractionOverview.propTypes = {
  attraction: PropTypes.object,
};

export default AttractionOverview;
