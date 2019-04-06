import React from 'react';
import { Slider, Slide } from 'react-materialize';
import PropTypes from 'prop-types';

const AttractionOverview = props => {
  const { attraction } = props;
  const slideArray =
    attraction.slides &&
    attraction.slides.map(slide => (
      <Slide
        key={attraction.slides.indexOf(slide)}
        style={{ borderRadius: '8px' }}
        src={slide.img}
      />
    ));
  return (
    <div>
      {slideArray ? (
        <Slider style={{ borderRadius: '8px' }}>{slideArray}</Slider>
      ) : null}
    </div>
  );
};

AttractionOverview.propTypes = {
  attraction: PropTypes.object,
};

export default AttractionOverview;
