import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import { deleteDoc } from 'services/utilities';
import Category from 'components/Category';

class TypesRender extends React.Component {
  componentDidMount() {
    document.title = 'Types | Admin Panel | Project Rode';
  }

  render() {
    const { attractionsInfo, updateContext } = this.context;
    const { attractionTypes } = attractionsInfo;
    const editLink = ({ original }) => (
      <span>
        <Link to={`/admin/attractions/types/edit/${original.uid}`}>
          <i className="material-icons">edit</i>
        </Link>
      </span>
    );

    const deleteLink = ({ original }) => (
      <span>
        <a
          onClick={() => {
            deleteDoc('attractionTypes', original.uid);
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
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Category',
        accessor: 'category',
        maxWidth: 75,
        Cell: props => (
          <div>
            <Category category={[props.value]} height={40} margin={0} />
          </div>
        ),
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
          Types{' '}
          <Link
            to="/admin/media/licenses/add"
            className="btn-small grey"
            style={{ padding: '0 8px' }}
          >
            <i className="material-icons left" style={{ margin: 0 }}>
              add
            </i>
            Add Type
          </Link>
        </h4>

        <ReactTable
          data={attractionTypes}
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

TypesRender.contextType = Consumer;
const Types = props => <Consumer>{() => <TypesRender {...props} />}</Consumer>;

export default Types;
