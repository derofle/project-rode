import React from 'react';
import { css, jsx } from '@emotion/core';
import Video from './components/Video';
/** @jsx jsx */

const cardStyle = css`
  background-color: transparent !important;
  box-shadow: none !important;
`;

const footageTitleStyle = css`
  text-align: center;
  color: #4c1971;
  font-weight: bold !important;
  font-size: 2rem !important;
  padding: 0 0 10px 0;
`;

const textStyle = css`
  padding: 0 0 36px 0;
  text-align: center;
`;

const Footage = attraction => {
  const { videoFootage } = attraction.attraction;
  return (
    <div className="footage">
      <div className="row">
        <div className="card" css={cardStyle}>
          <div className="card-content">
            <span className="card-title" css={footageTitleStyle}>
              ONRIDES & OFFRIDES
            </span>
            <div className="container">
              <p css={textStyle}>
                Hieronder vind u verschillende onrides en offrides van
                verschillende content creators omtrent de attractie. Alle
                video's zijn op Project Rode geplaatst met de toestemming van de
                eigenaars.
              </p>
            </div>

            {videoFootage &&
              videoFootage.map(video => (
                <div className="col s6">
                  <Video video={video} />
                </div>
              ))}

            <div className="row" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footage;
