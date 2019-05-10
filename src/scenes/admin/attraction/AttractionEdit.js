import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Consumer } from 'services/context';
import ReactQuill from 'react-quill';
import {
  uidToName,
  updateAttraction,
  uidToSlug,
  deleteDoc,
} from 'services/utilities';
import MediaCrop from '../components/MediaCrop';
import 'react-quill/dist/quill.snow.css';

const statusSelection = [
  { value: 'operating', label: 'Geopend' },
  { value: 'constructing', label: 'In opbouw' },
  { value: 'defunct', label: 'Afgebroken' },
  { value: 'in-storage', label: 'In opslag' },
  { value: 'moved', label: 'Verhuisd' },
];

class EditAttraction extends React.Component {
  state = {
    name: '',
    description: '<p>5</p>',
  };

  componentDidMount() {
    document.title = 'Edit Attraction | Admin Panel | Project Rode';
    const { attractionsInfo, parks, media } = this.context;
    const {
      attractions,
      attractionCategories,
      attractionTypes,
    } = attractionsInfo;
    const { match } = this.props;

    const attraction =
      attractions && attractions.find(attr => attr.uid === match.params.Id);

    const category =
      attraction &&
      attraction.category &&
      attraction.category.map(cat => ({
        label: uidToName(cat, attractionCategories),
        value: cat,
      }));

    const type =
      attraction &&
      attraction.type &&
      attraction.type.map(obj => ({
        label: uidToName(obj, attractionTypes),
        value: obj,
      }));

    const status =
      attraction &&
      attraction.status &&
      statusSelection.find(st => st.value === attraction.status);

    const headerImageFile =
      media && media.find(med => med.uid === attraction.headerImage);
    this.setState({
      name: attraction.name,
      slug: attraction.slug,
      description: attraction.description ? attraction.description : '',
      park: {
        label: uidToName(attraction.park, parks),
        value: attraction.park,
      },
      category,
      type,
      status,
      headerImage: attraction.headerImage,
      uid: attraction.uid,
      previewImage: headerImageFile && headerImageFile.src,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { updateContext } = this.context;
    const {
      name,
      category,
      type,
      park,
      uid,
      status,
      headerImage,
      description,
    } = this.state;
    const { history } = this.props;
    const objSlug = name.toLowerCase().replace(/ /g, '-');
    const objCat = category && category.map(obj => obj.value);
    const objTyp = type && type.map(obj => obj.value);

    const updatedAttraction = {
      uid,
      name,
      headerImage,
      description,
      slug: objSlug,
      park: park.value,
      status: status.value,
      category: objCat,
      type: objTyp,
    };

    console.log(updatedAttraction);

    updateAttraction(updatedAttraction);
    updateContext();
    history.push('/admin/attractions');
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleEditor = val => {
    this.setState({ description: val });
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

  passImage = (uid, url) => {
    console.log(uid);
    this.setState(
      {
        headerImage: uid,
      },
      () => {
        this.renderImage(url);
      }
    );
  };

  renderImage = url => {
    this.setState({
      previewImage: url,
    });
  };

  render() {
    const {
      parks,
      attractionsInfo,
      manufacturers,
      updateContext,
    } = this.context;
    const { attractionCategories, attractionTypes } = attractionsInfo;
    const {
      name,
      park,
      category,
      type,
      manufacturerId,
      coasterMaterial,
      status,
      uid,
      previewImage,
      slug,
      description,
    } = this.state;
    const parkSelection = parks
      .map(obj => ({
        value: obj.id,
        label: obj.name,
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
                Edit Attraction{' '}
                <Link
                  to="/admin/attractions/add"
                  className="btn-small grey"
                  style={{ padding: '0 8px', marginLeft: '10px' }}
                >
                  <i className="material-icons left" style={{ margin: 0 }}>
                    add
                  </i>
                  Add Attraction
                </Link>
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
              <p style={{ margin: '0 0 16px 8px' }}>
                Permalink:{' '}
                <Link
                  to={`/park/${park &&
                    uidToSlug(park.value, parks)}/attractie/${slug}`}
                >{`http://www.projectrode.nl/park/${park &&
                  uidToSlug(park.value, parks)}/attractie/${slug}`}</Link>
              </p>
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
                  <p>Published on: Feb 3, 2019 @ 00:56</p>
                </div>
                <div
                  className="card-action"
                  style={{ backgroundColor: '#f5f5f5', padding: '24px 20px' }}
                >
                  <a
                    onClick={() => {
                      deleteDoc('attractions', uid);
                      updateContext();
                    }}
                    style={{
                      cursor: 'pointer',
                      textTransform: 'none',
                      color: 'red',
                      textDecoration: 'underline',
                    }}
                  >
                    Delete Permanently
                  </a>
                  <button
                    className="btn right"
                    type="button"
                    onClick={this.handleSubmit}
                    style={{ marginTop: '-8px' }}
                  >
                    Update
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
                  <MediaCrop
                    passImage={this.passImage}
                    category="attractions"
                    location={uid}
                    fileName="headerImage"
                    previewImage={previewImage}
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
      </div>
    );
  }
}

EditAttraction.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

EditAttraction.contextType = Consumer;
export default props => (
  <Consumer>{() => <EditAttraction {...props} />}</Consumer>
);
