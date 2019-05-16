import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'services/context';
import { addType } from 'services/utilities';
import Select from 'react-select';

class TypeAdd extends React.Component {
  state = {
    uid: '',
    name: '',
    category: '',
  };

  componentDidMount() {
    document.title = 'Edit Type | Admin Panel | Project Rode';
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { updateContext } = this.context;
    const { name, category } = this.state;
    const { history } = this.props;
    const objSlug = name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace('.', '');
    const newDoc = { name, slug: objSlug, category: category.value };

    addType(newDoc).then(resp => {
      updateContext();
      if (resp) {
        history.push('/admin/attractions/types');
      } else {
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
    const { name, category } = this.state;
    const { attractionsInfo } = this.context;
    const { attractionCategories } = attractionsInfo;
    const categorySelection = attractionCategories
      .map(cat => ({
        value: cat.uid,
        label: cat.name,
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
              <p>Category: </p>
              <Select
                value={category}
                onChange={e => this.handleSelectChange(e, 'category')}
                options={categorySelection}
                placeholder="Choose Category"
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
                Update Type
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TypeAdd.propTypes = {
  match: PropTypes.object,
};

TypeAdd.contextType = Consumer;
export default props => <Consumer>{() => <TypeAdd {...props} />}</Consumer>;
