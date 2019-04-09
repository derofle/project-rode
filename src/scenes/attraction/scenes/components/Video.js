import React from 'react';
import { css, jsx } from '@emotion/core';
/** @jsx jsx */
import { Consumer } from '../../../../services/context';

const creditStyle = css`
  text-align: center;
  padding: 8px;
`;
class VideoRender extends React.Component {
  render() {
    const { video } = this.props;
    const { media, mediaProviders } = this.context;
    const videoFile = media && media.find(med => med.uid === video);
    const provider =
      mediaProviders &&
      videoFile &&
      mediaProviders.find(prov => prov.id === videoFile.providerId);
    return (
      <div>
        <div className="video-container">
          <iframe
            src={`${videoFile.src}?rel=0`}
            frameBorder="0"
            allowFullScreen
            title={videoFile.src}
          />
        </div>
        <div css={creditStyle}>
          Video door:{' '}
          <a href={provider.url} target="_blank" rel="noopener noreferrer">
            {provider.name}
          </a>
        </div>
      </div>
    );
  }
}

VideoRender.contextType = Consumer;
const Video = props => <Consumer>{() => <VideoRender {...props} />}</Consumer>;

export default Video;
