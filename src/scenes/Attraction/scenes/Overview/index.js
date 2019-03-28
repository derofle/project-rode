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
        className="z-depth-2"
      />
    ));
  return (
    <div>
      <div>
        <div
          className="card z-depth-1"
          style={{
            borderRadius: '8px',
            width: '95%',
            margin: '0 auto',
            backgroundColor: '#F8F8F9',
          }}
        >
          {slideArray ? (
            <Slider style={{ borderRadius: '8px' }}>{slideArray}</Slider>
          ) : null}
          <div
            className="card-content"
            style={{ borderRadius: '8px', color: '#363949' }}
          >
            {attraction.description}
            <blockquote>
              <a
                href={attraction.descriptionSource}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#00A1DB' }}
              >
                <p style={{ color: '#00A1DB' }} />
                {attraction.descriptionSource}
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
