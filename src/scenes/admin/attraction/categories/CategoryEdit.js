import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import { updateLicense } from 'services/utilities';
import { SketchPicker } from 'react-color';

class CategoryEdit extends React.Component {
  state = {
    uid: '',
    name: '',
  };

  componentDidMount() {
    document.title = 'Edit Category | Admin Panel | Project Rode';
    const { attractionsInfo } = this.context;
    const { attractionCategories } = attractionsInfo;
    const { match } = this.props;
    const category =
      attractionCategories &&
      attractionCategories.find(cat => cat.uid === match.params.Id);

    this.setState({
      uid: category.uid,
      name: category.name,
      color: category.color,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { updateContext } = this.context;
    const { abbreviated } = this.state;
    const { history } = this.props;
    const objSlug = abbreviated
      .toLowerCase()
      .replace(/ /g, '-')
      .replace('.', '');
    const updatedDoc = { ...this.state, slug: objSlug };

    updateLicense(updatedDoc).then(resp => {
      updateContext();
      if (resp === true) {
        history.push('/admin/media/licenses');
      } else if (resp === false) {
        alert('Something went wrong, try again!');
      }
    });
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
    const { name, color } = this.state;
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
            Edit Category
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
              <SketchPicker
                color={color || '#000000'}
                onChangeComplete={this.handleChangeComplete}
              />
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
                Update Category
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CategoryEdit.propTypes = {
  match: PropTypes.object,
};

CategoryEdit.contextType = Consumer;
export default props => (
  <Consumer>{() => <CategoryEdit {...props} />}</Consumer>
);
