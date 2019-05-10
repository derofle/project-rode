import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Consumer } from 'services/context';
import { addAttraction } from 'services/utilities';
import ReactQuill from 'react-quill';
import MediaCrop from '../components/MediaCrop';

class AddAttraction extends React.Component {
  state = {
    name: '',
    park: '',
    category: '',
    type: '',
    status: '',
    description: '',
  };

  static propTypes = {
    history: PropTypes.object,
  };

  componentDidMount() {
    document.title = 'Add Attraction | Admin Panel | Project Rode';
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { name, park, category, type, status } = this.state;
    const { history } = this.props;
    const { updateContext } = this.context;

    const objSlug = name.toLowerCase().replace(/ /g, '-');
    const objCat = category.map(obj => obj.value);
    const objTyp = type.map(obj => obj.value);

    const newDoc = {
      name,
      status: status.value,
      slug: objSlug,
      park: park.value,
      category: objCat,
      type: objTyp,
    };

    addAttraction(newDoc);
    updateContext();
    history.push('/admin/attractions');
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
    const { parks, attractionsInfo } = this.context;
    const { attractionCategories, attractionTypes } = attractionsInfo;
    const { name, park, category, type, status, description } = this.state;

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

    /* const manufacturersSelection = manufacturers
      .map(manu => ({
        value: manu.id,
        label: manu.name,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));
      */

    return (
      <div className="container" style={{ width: '95%' }}>
        <div className="row">
          <div className="col s12">
            <div
              className="card-content"
              style={{ borderBottom: '2px solid #f3f5f8' }}
            >
              <p
                className="bold-text grey-text text-darken-2"
                style={{ fontSize: '1.5em' }}
              >
                Add Attraction
              </p>
            </div>
          </div>
        </div>
        <div
          className="card-action"
          style={{ borderBottom: '2px solid #f3f5f8' }}
        >
          <div className="row">
            <div className="col s12 m8">
              <div className="input-field" style={{ margin: 0 }}>
                <input
                  id="name"
                  type="text"
                  onChange={this.handleChange}
                  required
                  value={name}
                  style={{
                    backgroundColor: 'hsl(0,0%,100%)',
                    borderColor: 'hsl(0,0%,80%)',
                    borderRadius: '4px',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    outline: 0,
                    padding: '4px 10px 4px 10px',
                    fontSize: '1.5em',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={this.handleEditor}
              />
            </div>
            <div className="col s12 m4">
              <div className="card z-depth-1" style={{ marginTop: 0 }}>
                <div className="card-content" style={{ padding: 0 }}>
                  <p
                    style={{
                      fontSize: '18px',
                      padding: '8px 20px',
                      lineHeight: '1.4',
                      fontWeight: 600,
                    }}
                  >
                    Publish
                  </p>
                </div>
                <div className="card-action" style={{ padding: '0px 20px' }}>
                  <p>Status: </p>
                  <Select
                    value={status}
                    onChange={e => this.handleSelectChange(e, 'status')}
                    options={statusSelection}
                    placeholder="Kies de status"
                  />
                  <p>Park:</p>
                  <Select
                    value={park}
                    onChange={e => this.handleSelectChange(e, 'park')}
                    options={parkSelection}
                  />
                </div>
                <div
                  className="card-action"
                  style={{ backgroundColor: '#f5f5f5', padding: '24px 20px' }}
                >
                  <button
                    className="btn right"
                    type="button"
                    onClick={this.handleSubmit}
                    style={{ marginTop: '-8px' }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="card">
                <div className="card-content" style={{ padding: 0 }}>
                  <p
                    style={{
                      fontSize: '18px',
                      padding: '8px 20px',
                      lineHeight: '1.4',
                      fontWeight: 600,
                    }}
                  >
                    Featured Image
                  </p>
                </div>
                <div className="card-action">
                  <p>Adding pictures in the add component not yet possible</p>
                </div>
              </div>
              <div className="card">
                <div className="card-content" style={{ padding: 0 }}>
                  <p
                    style={{
                      fontSize: '18px',
                      padding: '8px 20px',
                      lineHeight: '1.4',
                      fontWeight: 600,
                    }}
                  >
                    Categories
                  </p>
                </div>
                <div className="card-action">
                  <Select
                    value={category}
                    onChange={e => this.handleSelectChange(e, 'category')}
                    options={categorySelection}
                    isMulti
                    placeholder="Kies een of meerdere categoriën"
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-content" style={{ padding: 0 }}>
                  <p
                    style={{
                      fontSize: '18px',
                      padding: '8px 20px',
                      lineHeight: '1.4',
                      fontWeight: 600,
                    }}
                  >
                    Types
                  </p>
                </div>
                <div className="card-action">
                  <Select
                    value={type}
                    onChange={e => this.handleSelectChange(e, 'type')}
                    options={typeSelection}
                    isMulti
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card-content">
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
          </div> */}
      </div>
    );
  }
}

AddAttraction.contextType = Consumer;
export default props => (
  <Consumer>{() => <AddAttraction {...props} />}</Consumer>
);
