import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import ParkTable from './components/Table';

class ParkList extends React.Component {
  state = {
    search: '',
    filteredArray: [],
  };

  componentDidMount() {
    const { parks } = this.context;
    this.setState({
      filteredArray: parks,
    });
  }

  filterParks = (param, input) => {
    const { parks } = this.context;
    const filter = input.toUpperCase();
    const filtered = parks.filter(item => {
      if (item[param].toUpperCase().includes(filter)) {
        return item;
      }
      return null;
    });
    this.setState({
      filteredArray: filtered,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    const { search } = this.state;
    e.preventDefault();
    this.filterParks('name', search);
  };

  render() {
    const { filteredArray } = this.state;
    const { history } = this.props;
    return (
      <div className="container">
        <div className="row" />
        <div className="row">
          <div className="col s12 m3">
            <div className="card">
              <div className="card-content grey lighten-2 georgia bold-text grey-text text-darken-2">
                <p className="park-name" style={{ fontSize: '1.5em' }}>
                  Zoek Parken{' '}
                </p>
              </div>

              <div className="card-content">
                <div className="row">
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field col">
                      <label htmlFor="search">
                        <input
                          id="search"
                          type="text"
                          className="validate"
                          onChange={this.handleChange}
                        />
                        Zoek park...
                      </label>
                      <button
                        type="button"
                        className="waves-effect waves-light btn"
                      >
                        <i className="material-icons left">search</i>
                        Zoeken
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m9">
            <ParkTable parks={filteredArray} history={history} name="NAAM" />
          </div>
        </div>
      </div>
    );
  }
}

ParkList.propTypes = {
  history: PropTypes.object,
};

ParkList.contextType = Consumer;
export default props => <Consumer>{() => <ParkList {...props} />}</Consumer>;
