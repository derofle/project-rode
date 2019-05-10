import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import { deleteDoc } from 'services/utilities';

class LicensesRender extends React.Component {
  componentDidMount() {
    document.title = 'Licenses < Project Rode';
  }

  render() {
    const { mediaLicenses, updateContext } = this.context;
    const editLink = ({ original }) => (
      <span>
        <Link to={`/admin/media/licenses/edit/${original.uid}`}>
          <i className="material-icons">edit</i>
        </Link>
      </span>
    );

    const deleteLink = ({ original }) => (
      <span>
        <a
          onClick={() => {
            deleteDoc('mediaLicenses', original.uid);
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
        accessor: 'name', // String-based value accessors!
      },
      {
        Header: 'Abbreviated',
        maxWidth: 150,
        accessor: 'abbreviated', // String-based value accessors!
      },
      {
        Header: 'Url',
        accessor: 'url', // String-based value accessors!
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
          Licenses{' '}
          <Link
            to="/admin/media/licenses/add"
            className="btn-small grey"
            style={{ padding: '0 8px' }}
          >
            <i className="material-icons left" style={{ margin: 0 }}>
              add
            </i>
            Add License
          </Link>
        </h4>

        <ReactTable
          data={mediaLicenses}
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

LicensesRender.contextType = Consumer;
const MediaLicenses = props => (
  <Consumer>{() => <LicensesRender {...props} />}</Consumer>
);

export default MediaLicenses;
