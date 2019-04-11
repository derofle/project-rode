import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import { updateDocInFirebase } from 'services/utilities';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import MediaUpload from '../components/MediaUpload';

const headerImageStyle = css`
  width: 100%;
`;

class ParkEdit extends React.Component {
  state = {
    uid: '',
    name: '',
    subtitle: '',
    headerImage: '',
    previewImage: '',
  };

  componentDidMount() {
    const { parks, media } = this.context;
    const { match } = this.props;

    const park = parks && parks.find(attr => attr.uid === match.params.Id);
    const headerImageFile =
      media && media.find(med => med.uid === park.headerImage);

    this.setState({
      uid: park.uid,
      name: park.name,
      subtitle: park.subtitle,
      headerImage: park.headerImage,
      city: park.city,
      country: park.country,
      previewImage: headerImageFile && headerImageFile.src,
    });
  }

  handleSubmit = e => {
    const { name, uid } = this.state;
    const { updateContext } = this.context;
    e.preventDefault();
    updateDocInFirebase('parks', uid, this.state);
    updateContext();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSelectChange = (input, state) => {
    this.setState({
      [state]: input,
    });
  };

  passImage = (uid, url) => {
    this.setState(
      {
        headerImage: uid,
      },
      () => {
        this.renderImage(url);
      }
    );
  };

  renderImage = url => {
    this.setState({
      previewImage: url,
    });
  };

  render() {
    const { name, subtitle, country, city, previewImage } = this.state;

    return (
      <div className="container" style={{ width: '95%' }}>
        <div
          className="card-content"
          style={{ borderBottom: '2px solid #f3f5f8' }}
        >
          <p
            className="center bold-text grey-text text-darken-2"
            style={{ fontSize: '1.5em' }}
          >
            Edit: {name}
          </p>
        </div>
        <div
          className="card-action"
          style={{ borderBottom: '2px solid #f3f5f8' }}
        >
          <div className="row" />
          <div className="row">
            <div className="col s12 m2">
              <p className="bold-text grey-text text-darken-2">General</p>
            </div>
            <div className="col s12 m4">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Name:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <input
                  id="name"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  required
                  value={name}
                />
              </div>
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Subtitle:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <input
                  id="subtitle"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  required
                  value={subtitle}
                />
              </div>
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Country:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <input
                  id="country"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  required
                  value={country}
                />
              </div>
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                City:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <input
                  id="city"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  required
                  value={city}
                />
              </div>
            </div>
            <div className="col s12 m4">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Header Image:
              </p>
              <img src={previewImage} alt="headerFile" css={headerImageStyle} />
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Header Image File UID:
              </p>
              <MediaUpload passImage={this.passImage} />
            </div>
          </div>
        </div>

        <div className="card-action">
          <div className="row">
            <div className="col s12 m8" />
            <div className="col s12 m4">
              <button
                className="btn right"
                type="button"
                onClick={this.handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ParkEdit.propTypes = {
  match: PropTypes.object,
};

ParkEdit.contextType = Consumer;
export default props => <Consumer>{() => <ParkEdit {...props} />}</Consumer>;
