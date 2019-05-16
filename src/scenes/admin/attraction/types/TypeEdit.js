import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import { updateType } from 'services/utilities';
import { SketchPicker } from 'react-color';

class CategoryEdit extends React.Component {
  state = {
    uid: '',
    name: '',
  };

  componentDidMount() {
    document.title = 'Edit Type | Admin Panel | Project Rode';
    const { attractionsInfo } = this.context;
    const { attractionTypes } = attractionsInfo;
    const { match } = this.props;
    const type =
      attractionTypes &&
      attractionTypes.find(typ => typ.uid === match.params.Id);

    this.setState({
      uid: type.uid,
      name: type.name,
      description: type.description,
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { updateContext } = this.context;
    const { name } = this.state;
    const { history } = this.props;
    const objSlug = name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace('.', '');
    const updatedDoc = { ...this.state, slug: objSlug };

    updateType(updatedDoc).then(resp => {
      updateContext();
      if (resp === true) {
        history.push('/admin/attractions/types');
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
    const { name, description } = this.state;
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
              <p
                className="bold-text grey-text text-darken-2"
                style={{ marginTop: 0 }}
              >
                Description:
              </p>
              <div className="input-field">
                <textarea
                  id="description"
                  value={description}
                  onChange={this.handleChange}
                  className="materialize-textarea"
                />
              </div>
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
                Update Type
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
