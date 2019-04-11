import React from 'react';
import { css, jsx } from '@emotion/core';
/** @jsx jsx */
import { storage } from 'services/firebase/components/firebase';
import { firebase } from 'services/firebase';

const uploaderStyle = css`
  -webkit-appearance: none;
  appearance: none;
  width: 50%;
  margin-bottom: 10px;
`;
class MediaUpload extends React.Component {
  state = {
    percentage: 0,
    url: null,
    UID: null,
  };

  handleChange = e => {
    const file = e.target.files[0];
    const storageRef = storage.ref(`media/${file.name}`);
    const task = storageRef.put(file);
    const component = this;
    // const imgRef = storage.ref.child(`/media/"${file.name}`);

    task.on(
      'state_changed',
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        component.setState({
          percentage,
        });
      },
      function error(err) {},
      function complete() {
        const downloadUrl = storageRef.getDownloadURL();
        downloadUrl.then(function(url) {
          component.setState({
            url,
          });
          const newMedia = { src: url, type: 'image' };
          firebase.db
            .collection('media')
            .add(newMedia)
            .then(ref =>
              component.setState({
                UID: ref.id,
              })
            );
        });
      }
    );
  };

  render() {
    const { percentage, url } = this.state;
    return (
      <div>
        <progress
          value={percentage}
          max="100"
          id="uploader"
          css={uploaderStyle}
        >
          0%
        </progress>
        <input
          type="file"
          valye="upload"
          id="fileButton"
          onChange={this.handleChange}
        />
        {url ? (
          <div>
            <p>
              <a href={url}>{url}</a>
            </p>
            <img src={url} alt="preview" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default MediaUpload;
