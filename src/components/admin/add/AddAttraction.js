/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Consumer } from '../../../context/AppProvider';

class AddAttraction extends React.Component {
  state = {
    id: '',
    name: '',
    type: '',
    park_id: '',
    category: '',
    img: '',
    description: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addData } = this.context;
    const { name } = this.state;
    const { history } = this.props;
    const objId = name.toLowerCase().replace(/ /g, '-');
    this.setState(
      {
        id: objId,
      },
      () => {
        addData(this.state, 'attractions');
        this.setState({
          id: '',
          name: '',
          type: '',
          park_id: '',
          category: '',
          img: '',
          description: '',
        });
      }
    );
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { parks } = this.context;
    const {
      name,
      park_id: parkId,
      type,
      category,
      img,
      description,
    } = this.state;
    return (
      <div className="container">
        <div className="row" />
        <div className="card" style={{ borderRadius: '6px' }}>
          <div
            className="card-content"
            style={{ borderBottom: '2px solid #f3f5f8' }}
          >
            <span
              className="card-title"
              style={{ fontWeight: 'bold', color: '#62676a' }}
            >
              Voeg attractie toe
            </span>
          </div>
          <div className="card-content">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col s12 m4">Attractie</div>
                <div className="col s12 m8">
                  <div className="row">
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input
                          id="name"
                          type="text"
                          className="validate"
                          onChange={this.handleChange}
                          required
                          value={name}
                        />
                        <label htmlFor="name">Naam Attractie</label>
                      </div>
                      <div className="input-field col s12 m6">
                        <select
                          className="browser-default"
                          onChange={this.handleChange}
                          id="park_id"
                          required
                          value={parkId}
                        >
                          <option value="" disabled selected>
                            Kies Park
                          </option>
                          {parks &&
                            parks.map(park => (
                              <option key={park.id} value={park.id}>
                                {park.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6">
                      <input
                        id="type"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        required
                        value={type}
                      />
                      <label htmlFor="type">Type Attractie</label>
                    </div>
                    <div className="input-field col s12 m6">
                      <select
                        className="browser-default"
                        onChange={this.handleChange}
                        id="category"
                        required
                        value={category}
                      >
                        <option value="" disabled selected>
                          Kies Categorie
                        </option>
                        <option value="roller-coaster">Achtbaan</option>
                        <option value="thrill-ride">Spannende Attractie</option>
                        <option value="water-ride">Water Attractie</option>
                        <option value="gentle-ride">Familie Attractie</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ borderBottom: '2px solid #f3f5f8' }}
                >
                  <div className="col s12 m4">Informatie</div>
                  <div className="row">
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">description</i>
                      <textarea
                        id="description"
                        className="materialize-textarea"
                        onChange={this.handleChange}
                        required
                        value={description}
                      />
                      <label htmlFor="description">Beschrijving</label>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ borderBottom: '2px solid #f3f5f8' }}
                >
                  <div className="col s12 m4">Afbeeldingen</div>
                  <div className="row">
                    <div className="input-field col s12 m6">
                      <i className="material-icons prefix">image</i>
                      <input
                        id="img"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        required
                        value={img}
                      />
                      <label htmlFor="img">Afbeelding URL</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button
                    className="waves-effect waves-light btn"
                    type="submit"
                    value="Submit"
                  >
                    Opslaan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddAttraction.propTypes = {};

AddAttraction.contextType = Consumer;
export default props => (
  <Consumer>{() => <AddAttraction {...props} />}</Consumer>
);
