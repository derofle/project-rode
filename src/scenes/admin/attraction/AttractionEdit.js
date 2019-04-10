import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Consumer } from 'services/context';
import { idToName } from 'services/utilities';

class EditAttraction extends React.Component {
  state = {
    id: '',
    name: '',
    parkId: '',
    categoryIds: '',
    manufacturerId: '',
    typeIds: '',
    img: '',
    description: '',
    selectedOption: null,
  };

  componentDidMount() {
    const { attractionsInfo, parks } = this.context;
    const {
      attractions,
      attractionCategories,
      attractionTypes,
    } = attractionsInfo;
    const { match } = this.props;

    const attraction =
      attractions && attractions.find(attr => attr.uid === match.params.Id);

    const categoryIds =
      attraction &&
      attraction.categoryIds.map(cat => ({
        label: idToName(cat, attractionCategories),
        value: cat,
      }));

    const typeIds =
      attraction &&
      attraction.typeIds.map(type => ({
        label: idToName(type, attractionTypes),
        value: type,
      }));
    this.setState({
      name: attraction.name,
      parkId: {
        label: idToName(attraction.parkId, parks),
        value: attraction.parkId,
      },
      categoryIds,
      typeIds,
    });
  }

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
          categoryIds: '',
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
    const {
      name,
      parkId,
      categoryIds,
      typeIds,
      manufacturerId,
      coasterMaterial,
      status,
    } = this.state;
    const parkSelection = parks
      .map(park => ({
        value: park.id,
        label: park.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));

    const categorySelection = attractionCategories
      .map(category => ({
        value: category.id,
        label: category.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));

    const typeSelection = attractionTypes
      .filter(
        el => categoryIds && categoryIds.some(f => f.value === el.categoryId)
      )
      .map(el => ({
        value: el.id,
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
              <p>(verplicht)</p>
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
          <div className="row">
            <div className="col s12 m2">
              <p className="bold-text grey-text text-darken-2" />
            </div>
            <div className="col s12 m5">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Park:
              </p>
              <Select
                value={parkId}
                onChange={e => this.handleSelectChange(e, 'parkId')}
                options={parkSelection}
              />
            </div>
            <div className="col s12 m5">
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
          </div>
          <div className="row">
            <div className="col s12 m2">
              <p className="bold-text grey-text text-darken-2" />
            </div>
            <div className="col s12 m10">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Categorie:
              </p>
              <Select
                value={categoryIds}
                onChange={e => this.handleSelectChange(e, 'categoryIds')}
                options={categorySelection}
                isMulti
                placeholder="Kies een of meerdere categoriën"
              />
            </div>
          </div>
          <div className="row">
            <div className="col s12 m2">
              <p className="bold-text grey-text text-darken-2" />
            </div>
            <div className="col s12 m10">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Type:
              </p>
              <Select
                value={typeIds}
                onChange={e => this.handleSelectChange(e, 'typeIds')}
                options={typeSelection}
                isMulti
              />
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="row">
            <div className="col s12 m2">
              <p className="bold-text grey-text text-darken-2">
                Bouweigenschappen
              </p>
            </div>
            <div className="col s12 m10">
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Fabrikant:
              </p>
              <div className="input-field" style={{ marginBottom: 0 }}>
                <Select
                  value={manufacturerId}
                  onChange={e => this.handleSelectChange(e, 'manufacturerId')}
                  isMulti
                  options={manufacturersSelection}
                  placeholder="Kies een of meerdere fabrikanten"
                />
              </div>
            </div>
          </div>
        </div>
        {categoryIds && categoryIds.some(e => e.value === 'roller-coaster') ? (
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
                    value={coasterMaterial}
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
              <button className="btn right" type="button">
                Bewerken
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditAttraction.propTypes = {
  match: PropTypes.object,
};

EditAttraction.contextType = Consumer;
export default props => (
  <Consumer>{() => <EditAttraction {...props} />}</Consumer>
);
