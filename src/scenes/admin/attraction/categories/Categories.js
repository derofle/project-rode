import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import { deleteDoc } from 'services/utilities';

class CategoriesRender extends React.Component {
  componentDidMount() {
    document.title = 'Categories | Admin Panel | Project Rode';
  }

  render() {
    const { attractionsInfo, updateContext } = this.context;
    const { attractionCategories } = attractionsInfo;
    const editLink = ({ original }) => (
      <span>
        <Link to={`/admin/attractions/categories/edit/${original.uid}`}>
          <i className="material-icons">edit</i>
        </Link>
      </span>
    );

    const deleteLink = ({ original }) => (
      <span>
        <a
          onClick={() => {
            deleteDoc('attractionCategories', original.uid);
            updateContext();
          }}
          style={{ cursor: 'pointer' }}
        >
          <i className="material-icons" style={{ color: 'red' }}>
            delete
          </i>
        </a>
      </span>
    );

    const columns = [
      {
        Header: 'Icon',
        accessor: 'icon',
        maxWidth: 55,
        Cell: props => (
          <div
            className="category-icon"
            style={{
              backgroundColor: props.original.color,
              height: '44px',
              margin: '0',
            }}
            onClick={console.log(props)}
          >
            <img
              src={props.value}
              alt="category-icon"
              style={{ height: '24px' }}
            />
          </div>
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: '',
        maxWidth: 100,
        Cell: props => (
          <div>
            {editLink(props)} {deleteLink(props)}
          </div>
        ),
      },
    ];
    return (
      <div className="container" style={{ width: '95%' }}>
        <h4>
          Categories{' '}
          <Link
            to="/admin/media/licenses/add"
            className="btn-small grey"
            style={{ padding: '0 8px' }}
          >
            <i className="material-icons left" style={{ margin: 0 }}>
              add
            </i>
            Add Category
          </Link>
        </h4>

        <ReactTable
          data={attractionCategories}
          columns={columns}
          defaultSorted={[
            {
              id: 'name',
              asc: true,
            },
          ]}
        />
      </div>
    );
  }
}

CategoriesRender.contextType = Consumer;
const Categories = props => (
  <Consumer>{() => <CategoriesRender {...props} />}</Consumer>
);

export default Categories;
