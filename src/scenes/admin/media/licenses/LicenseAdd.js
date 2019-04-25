import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import { createLicense } from 'services/utilities';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

class LicenseAdd extends React.Component {
  state = {
    name: '',
    abbreviated: '',
    url: '',
  };

  componentDidMount() {
    document.title = 'Add License < Project Rode';
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { updateContext } = this.context;
    const { abbreviated } = this.state;
    const objSlug = abbreviated
      .toLowerCase()
      .replace(/ /g, '-')
      .replace('.', '');
    const newDoc = { ...this.state, slug: objSlug };

    createLicense(newDoc).then(resp => {
      updateContext();
      console.log(resp);
    });
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
    const { name, abbreviated, url } = this.state;
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
            Add a new License
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
                Abbreviated:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <input
                  id="abbreviated"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  required
                  value={abbreviated}
                />
              </div>
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Url:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <input
                  id="url"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  required
                  value={url}
                />
              </div>
            </div>
            <div className="col s12 m4" />
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
                Add License
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LicenseAdd.propTypes = {
  match: PropTypes.object,
};

LicenseAdd.contextType = Consumer;
export default props => <Consumer>{() => <LicenseAdd {...props} />}</Consumer>;
