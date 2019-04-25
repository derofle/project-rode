import React from 'react';
import 'cropperjs/dist/cropper.css';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Cropper from 'react-cropper';
import { storage, firebaseRoot } from 'services/firebase/components/firebase';
import { firebase } from 'services/firebase';
import { Consumer } from 'services/context';

const headerImageStyle = css`
  width: 100%;
`;

class MediaCrop extends React.Component {
  state = {
    src: null,
    cropResult: null,
    cropRaw: null,
    imageCropped: true,
  };

  handleChange = e => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      // eslint-disable-next-line prefer-destructuring
      files = e.dataTransfer.files;
    } else if (e.target) {
      // eslint-disable-next-line prefer-destructuring
      files = e.target.files;
    }
    console.log(files);
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
    this.setState({
      imageCropped: false,
    });
  };

  cropImage = () => {
    const { src, imageCropped } = this.state;
    if (src === null || imageCropped === true) {
      return;
    }

    this.setState(
      {
        cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        cropRaw: this.cropper.getCroppedCanvas({ width: 1920, height: 1080 }),
        imageCropped: true,
      },
      () => {
        this.handleRaw();
      }
    );
  };

  blobToFile = (theBlob, fileName) => {
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    this.handleUpload(theBlob);
  };

  handleRaw = () => {
    const { cropRaw } = this.state;
    console.log(cropRaw);
    cropRaw.toBlob(blob => {
      this.blobToFile(blob, 'headerImage');
    }, 'image/jpeg');
  };

  handleUpload = blob => {
    const component = this;
    const { cropResult } = this.state;
    const storageRef = storage.ref(
      `media/${component.props.category}/${component.props.location}/${
        component.props.fileName
      }`
    );
    const task = storageRef.put(blob);

    task.on(
      'state_changed',
      function progress() {},
      function error(err) {},
      function complete() {
        const downloadUrl = storageRef.getDownloadURL();
        downloadUrl.then(function(url) {
          component.setState({
            url,
          });
          const newMedia = {
            src: url,
            type: 'image',
            path: storageRef.fullPath,
          };
          console.log(newMedia);
          firebase.db
            .collection('media')
            .add({
              ...newMedia,
              timestamp: firebaseRoot.firestore.Timestamp.fromDate(new Date()),
            })
            .then(ref => {
              component.context.updateContext();
              component.props.passImage(ref.id, cropResult);
            });
        });
      }
    );
  };

  render() {
    const { src, imageCropped } = this.state;
    const { previewImage } = this.props;
    return (
      <div>
        <div style={{ width: '100%' }}>
          {imageCropped ? (
            <div>
              <img src={previewImage} alt="headerFile" css={headerImageStyle} />
              <input type="file" onChange={this.handleChange} />
            </div>
          ) : (
            <div>
              <Cropper
                style={{ height: '350px', width: '100%' }}
                aspectRatio={16 / 9}
                src={src}
                ref={cropper => {
                  this.cropper = cropper;
                }}
                viewMode={1}
              />
              <button onClick={this.cropImage} type="button">
                Crop Image
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

MediaCrop.contextType = Consumer;
export default props => <Consumer>{() => <MediaCrop {...props} />}</Consumer>;
