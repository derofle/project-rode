import React from 'react';
import { Slider, Slide } from 'react-materialize';
import PropTypes from 'prop-types';

const AttractionOverview = props => {
  const { attraction } = props;
  return (
    <div>
      <p>{attraction.description}</p>
    </div>
  );
};

AttractionOverview.propTypes = {
  attraction: PropTypes.object,
};

export default AttractionOverview;
