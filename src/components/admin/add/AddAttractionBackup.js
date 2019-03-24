/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Select from 'react-select';
import { Consumer } from '../../../context/AppProvider';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class AddAttraction extends React.Component {
  state = {
    id: '',
    name: '',
    parkId: '',
    categoryId: '',
    manufacturerId: '',
    typeId: '',
    img: '',
    description: '',
    selectedOption: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addData } = this.context;
    const { name } = this.state;
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
          typeId: '',
          parkId: '',
          categoryId: '',
          img: '',
          description: '',
          manufacturerId: '',
        });
      }
    );
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { parks, attractionsInfo, manufacturers } = this.context;
    const { attractionCategories, attractionTypes } = attractionsInfo;
    const {
      name,
      parkId,
      categoryId,
      typeId,
      img,
      description,
      manufacturerId,
      selectedOption,
    } = this.state;
    return (
      <div className="container">
        <Select
          value={selectedOption}
          onChange={this.handleSelectChange}
          options={options}
        />
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
                Voeg attractie toe aan database
              </span>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div
                className="card-content"
                style={{ borderBottom: '2px solid #f3f5f8' }}
              >
                <div className="row">
                  <div className="col s12 m4">
                    <p
                      className="bold-text"
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    >
                      Algemeen
                    </p>
                  </div>
                  <div className="col s12 m8">
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
                          id="parkId"
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
                </div>
              </div>
              <div
                className="card-content"
                style={{ borderBottom: '2px solid #f3f5f8' }}
              >
                <div className="row">
                  <div className="col s12 m4">
                    <p
                      className="bold-text"
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    >
                      Categorie
                    </p>
                  </div>
                  <div className="col s12 m8">
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <select
                          className="browser-default"
                          onChange={this.handleChange}
                          id="categoryId"
                          required
                          multiple
                          value={categoryId}
                        >
                          <option value="" disabled selected>
                            Kies Categorie
                          </option>
                          {attractionCategories &&
                            attractionCategories.map(cat => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="input-field col s12 m6">
                        <select
                          className="browser-default"
                          onChange={this.handleChange}
                          id="typeId"
                          required
                          value={typeId}
                        >
                          <option value="" disabled selected>
                            Kies Type
                          </option>
                          {attractionTypes &&
                            attractionTypes
                              .filter(type => type.categoryId === categoryId)
                              .map(type => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card-content"
                style={{ borderBottom: '2px solid #f3f5f8' }}
              >
                <div className="row">
                  <div className="col s12 m4">
                    <p
                      className="bold-text"
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    >
                      Fabrikant
                    </p>
                  </div>
                  <div className="col s12 m8">
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <select
                          className="browser-default"
                          onChange={this.handleChange}
                          id="manufacturerId"
                          required
                          value={manufacturerId}
                        >
                          <option value="" disabled selected>
                            Kies Fabrikant
                          </option>
                          {manufacturers &&
                            manufacturers.map(manu => (
                              <option key={manu.id} value={manu.id}>
                                {manu.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div
                  className="row"
                  style={{ borderBottom: '2px solid #f3f5f8' }}
                >
                  <div className="col s12 m4">
                    <p
                      className="bold-text"
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    >
                      Informatie
                    </p>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6">
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
              </div>
              <div className="card-content">
                <div
                  className="row"
                  style={{ borderBottom: '2px solid #f3f5f8' }}
                >
                  <div className="col s12 m4">
                    <p
                      className="bold-text"
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    >
                      Afbeelding
                    </p>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6">
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
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="row" style={{ paddingRight: '50px' }}>
                    <button
                      className="waves-effect waves-light btn right"
                      type="submit"
                      value="Submit"
                      style={{ width: '20%' }}
                    >
                      Opslaan
                    </button>
                  </div>
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
