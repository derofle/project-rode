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
      {slideArray ? (
        <div>
          <div className="card" style={{ borderRadius: '6px 6px 6px 6px' }}>
            <Slider>{slideArray}</Slider>
            <div
              className="card-content white"
              style={{ borderRadius: '0px 0px 6px 6px' }}
            >
              {attraction.description}
              <blockquote>
                <a
                  href={attraction.descriptionSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {attraction.descriptionSource}
                </a>
              </blockquote>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

AttractionOverview.propTypes = {
  attraction: PropTypes.object,
};

export default AttractionOverview;
