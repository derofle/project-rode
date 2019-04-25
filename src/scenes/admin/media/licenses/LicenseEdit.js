import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import { updateDocInFirebase } from 'services/utilities';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

class LicenseAdd extends React.Component {
  state = {
    uid: '',
    name: '',
    abbreviated: '',
    url: '',
    slug: '',
  };

  componentDidMount() {
    document.title = 'Edit License < Project Rode';
    const { mediaLicenses } = this.context;
    const { match } = this.props;
    const license =
      mediaLicenses && mediaLicenses.find(lic => lic.uid === match.params.Id);
    this.setState({
      uid: license.uid,
      name: license.name,
      abbreviated: license.abbreviated,
      url: license.url,
      slug: license.slug,
    });
  }

  handleSubmit = e => {
    const { updateContext } = this.context;
    const { abbreviated, uid } = this.state;
    const objSlug = abbreviated
      .toLowerCase()
      .replace(/ /g, '-')
      .replace('.', '');
    const updatedDoc = { ...this.state, slug: objSlug };
    delete updatedDoc.uid;
    e.preventDefault();
    updateDocInFirebase('mediaLicenses', uid, updatedDoc);
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
            Edit License
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
                Update License
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
