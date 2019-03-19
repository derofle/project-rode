import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Slide } from 'react-materialize';

const ParkOverview = props => {
  const { park } = props;
  const slideArray =
    park.slides &&
    park.slides.map(slide => (
      <Slide key={park.slides.indexOf(slide)} src={slide.img} />
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
              {park.description}
              <blockquote>
                <a
                  href={park.descriptionSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {park.descriptionSource}
                </a>
              </blockquote>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

ParkOverview.propTypes = {
  park: PropTypes.object,
};

export default ParkOverview;
