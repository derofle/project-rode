import React from 'react';
import { css, jsx } from '@emotion/core';
/** @jsx jsx */
import { storage } from 'services/firebase/components/firebase';
import { firebase } from 'services/firebase';
import { Consumer } from 'services/context';

const uploaderStyle = css`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  margin-bottom: 10px;
`;
const fileUploaderStyle = css`
  text-align: center;
  width: auto;
`;
class MediaUpload extends React.Component {
  state = {
    percentage: 0,
    url: null,
    UID: null,
  };

  handleChange = e => {
    const file = e.target.files[0];
    const component = this;
    const storageRef = storage.ref(
      `media/${component.props.category}/${component.props.location}/${
        component.props.fileName
      }`
    );
    const task = storageRef.put(file);

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
            .then(ref => {
              component.context.updateContext();
              component.props.passImage(ref.id, component.state.url);
            });
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
          id="fileButton"
          onChange={this.handleChange}
          css={fileUploaderStyle}
        />
      </div>
    );
  }
}

MediaUpload.contextType = Consumer;
export default props => <Consumer>{() => <MediaUpload {...props} />}</Consumer>;
