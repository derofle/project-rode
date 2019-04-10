import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Consumer } from 'services/context';
import { idToName, updatePropertyInFirebase } from 'services/utilities';

class ParkEdit extends React.Component {
  state = {
    uid: '',
    name: '',
  };

  componentDidMount() {
    const { parks } = this.context;
    const { match } = this.props;

    const park = parks && parks.find(attr => attr.uid === match.params.Id);

    this.setState({
      name: park.name,
      uid: park.uid,
    });
  }

  handleSubmit = e => {
    const { name, uid } = this.state;
    const { updateContext } = this.context;
    e.preventDefault();
    updatePropertyInFirebase('parks', uid, 'name', name, this.context);
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

  handleRadio = e => {
    this.setState({
      status: e.target.value,
    });
  };

  render() {
    const { name } = this.state;

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
            Bewerk: {name}
          </p>
        </div>
        <div
          className="card-action"
          style={{ borderBottom: '2px solid #f3f5f8' }}
        >
          <div className="row">
            <div className="col s12 m2">
              <p className="bold-text grey-text text-darken-2">Algemeen</p>
            </div>
            <div className="col s12 m10">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Naam:
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
                Bewerken
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
