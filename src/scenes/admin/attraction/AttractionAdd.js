import React from 'react';
import Select from 'react-select';
import { Consumer } from 'services/context';
import { createDocInFirebase } from 'services/utilities';

class AddAttraction extends React.Component {
  state = {
    name: '',
    park: '',
    category: '',
    type: '',
  };

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    const { name, park, category, type } = this.state;
    const { updateContext } = this.context;
    const objId = name.toLowerCase().replace(/ /g, '-');
    const objCat = category.map(obj => obj.value);
    const objTyp = type.map(obj => obj.value);
    const newAttraction = {
      id: objId,
      name,
      park: park.value,
      category: objCat,
      type: objTyp,
    };
    createDocInFirebase('attractions', newAttraction);
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
    const { parks, attractionsInfo, manufacturers } = this.context;
    const { attractionCategories, attractionTypes } = attractionsInfo;
    const { name, park, category, type, status } = this.state;

    const parkSelection = parks
      .map(p => ({
        value: p.uid,
        label: p.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));

    const categorySelection = attractionCategories
      .map(cat => ({
        value: cat.uid,
        label: cat.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));

    const typeSelection = attractionTypes
      .filter(el => category && category.some(f => f.value === el.category))
      .map(el => ({
        value: el.uid,
        label: el.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));

    const statusSelection = [
      { value: 'operating', label: 'Geopend' },
      { value: 'constructing', label: 'In opbouw' },
      { value: 'defunct', label: 'Afgebroken' },
      { value: 'in-storage', label: 'In opslag' },
      { value: 'moved', label: 'Verhuisd' },
    ];

    const materialSelection = [
      { value: 'wood', label: 'Hout' },
      { value: 'steel', label: 'Staal' },
      { value: 'hybrid', label: 'Hybride' },
    ];

    const manufacturersSelection = manufacturers
      .map(manu => ({
        value: manu.id,
        label: manu.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));
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
            Voeg Attractie toe aan database
          </p>
        </div>
        <div
          className="card-action"
          style={{ borderBottom: '2px solid #f3f5f8' }}
        >
          <div className="row">
            <div className="col s12 m4">
              <p className="bold-text grey-text text-darken-2">General</p>
              <p>(required)</p>
            </div>
            <div className="col s12 m8">
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
          <div className="row">
            <div className="col s12 m4">
              <p className="bold-text grey-text text-darken-2" />
            </div>
            <div className="col s12 m4">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Park:
              </p>
              <Select
                value={park}
                onChange={e => this.handleSelectChange(e, 'park')}
                options={parkSelection}
                placeholder="Kies een park"
              />
            </div>
            {/*
            <div className="col s12 m4">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Status:
              </p>
              <Select
                value={status}
                onChange={e => this.handleSelectChange(e, 'status')}
                options={statusSelection}
                placeholder="Kies de status"
              />
            </div>
            */}
          </div>
          <div className="row">
            <div className="col s12 m4">
              <p className="bold-text grey-text text-darken-2" />
            </div>
            <div className="col s12 m8">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Categorie:
              </p>
              <Select
                value={category}
                onChange={e => this.handleSelectChange(e, 'category')}
                options={categorySelection}
                isMulti
                placeholder="Kies een of meerdere categoriën"
              />
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4">
              <p className="bold-text grey-text text-darken-2" />
            </div>
            <div className="col s12 m8">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Type:
              </p>
              <Select
                value={type}
                onChange={e => this.handleSelectChange(e, 'type')}
                options={typeSelection}
                isMulti
                placeholder="Kies een of meerdere types"
              />
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="row">
            <div className="col s12 m4">
              <p className="bold-text grey-text text-darken-2">
                Bouweigenschappen
              </p>
            </div>
            <div className="col s12 m8">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Fabrikant:
              </p>
            </div>
          </div>
        </div>
        {category && category.some(e => e.value === 'roller-coaster') ? (
          <div className="card-content">
            <div className="row">
              <div className="col s12 m4">
                <p className="bold-text grey-text text-darken-2">Achtbaan</p>
              </div>
              <div className="col s12 m8">
                <p
                  className="bold-text grey-text text-darken-2"
                  style={{ marginTop: 0 }}
                >
                  Materiaal:
                </p>
                <div className="input-field" style={{ marginBottom: 0 }}>
                  <Select
                    value="placeholder"
                    onChange={e =>
                      this.handleSelectChange(e, 'coasterMaterial')
                    }
                    options={materialSelection}
                    placeholder="Kies het materiaal"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="card-action">
          <div className="row">
            <div className="col s12 m8" />
            <div className="col s12 m4">
              <button
                className="btn right"
                type="button"
                onClick={this.handleSubmit}
              >
                Toevoegen
              </button>
            </div>
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
