import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import { updateDocInFirebase } from 'services/utilities';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const headerImageStyle = css`
  width: 100%;
`;

class ParkEdit extends React.Component {
  state = {
    uid: '',
    name: '',
    subtitle: '',
    headerImage: '',
  };

  componentDidMount() {
    const { parks } = this.context;
    const { match } = this.props;

    const park = parks && parks.find(attr => attr.uid === match.params.Id);

    this.setState({
      uid: park.uid,
      name: park.name,
      subtitle: park.subtitle,
      headerImage: park.headerImage,
      city: park.city,
      country: park.country,
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

  render() {
    const { name, subtitle, headerImage, country, city } = this.state;

    const { media } = this.context;
    const headerImageFile = media && media.find(med => med.uid === headerImage);
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
              <img
                src={headerImageFile && headerImageFile.src}
                alt="headerFile"
                css={headerImageStyle}
              />
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Header Image File UID:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <input
                  id="headerImage"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  required
                  value={headerImage}
                />
              </div>
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
