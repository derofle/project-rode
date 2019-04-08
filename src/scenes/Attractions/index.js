import React from 'react';
import { Consumer } from '../../services/context';
import Table from './components/Table';

class AttractionList extends React.Component {
  state = {
    search: '',
    filteredArray: [],
  };

  componentDidMount() {
    const { attractionsInfo } = this.context;
    this.setState({
      filteredArray: attractionsInfo.attractions,
    });
  }

  filterAttractions = (param, input) => {
    const { attractionsInfo } = this.context;
    const filter = input.toUpperCase();
    const filtered = attractionsInfo.attractions.filter(item => {
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
    this.filterAttractions('name', search);
  };

  render() {
    const { filteredArray } = this.state;
    const { media } = this.context;
    const { history } = this.props;
    return (
      <div className="container">
        <div className="row" />
        <div className="row">
          <div className="col s12 m3">
            <div className="card">
              <div className="card-content grey lighten-2 georgia bold-text grey-text text-darken-2">
                <p className="park-name" style={{ fontSize: '1.5em' }}>
                  Zoek Attracties
                </p>
              </div>
              <div className="card-content">
                <div className="row">
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field col">
                      <input
                        id="search"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="search">Zoek attractie...</label>
                      <button
                        type="button"
                        className="waves-effect waves-light btn"
                        onClick={this.handleSubmit}
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
            <Table
              attractions={filteredArray}
              history={history}
              name="NAAM"
              media={media}
            />
          </div>
        </div>
      </div>
    );
  }
}

AttractionList.contextType = Consumer;
export default props => (
  <Consumer>{() => <AttractionList {...props} />}</Consumer>
);
