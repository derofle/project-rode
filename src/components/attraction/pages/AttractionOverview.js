import React from 'react';
import { Slider, Slide } from 'react-materialize';
import PropTypes from 'prop-types';

const AttractionOverview = props => {
  const { attraction } = props;
  const slideArray =
    attraction.slides &&
    attraction.slides.map(slide => (
      <Slide key={attraction.slides.indexOf(slide)} src={slide.img} />
    ));
  return (
    <div>
      <div>
        <div className="card" style={{ borderRadius: '6px 6px 6px 6px' }}>
          {slideArray ? <Slider>{slideArray}</Slider> : null}
          <div
            className="card-content white"
            style={{ borderRadius: '0px 0px 6px 6px' }}
          >
            {attraction.description}
            <blockquote>
              <a
                href={attraction.description_source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attraction.description_source}
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

AttractionOverview.propTypes = {
  attraction: PropTypes.object,
};

export default AttractionOverview;
