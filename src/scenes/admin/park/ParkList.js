import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';

class ParkListRender extends React.Component {
  componentDidMount() {
    document.title = 'Parks < Project Rode';
  }

  render() {
    const { parks } = this.context;
    const editLink = ({ original }) => (
      <span>
        <Link to={`/admin/parks/edit/${original.uid}`}>Edit</Link>
      </span>
    );

    const viewLink = ({ original }) => (
      <span>
        <Link to={`/park/${original.id}`}>View</Link>
      </span>
    );

    const columns = [
      {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
      },
      {
        Header: 'City',
        accessor: 'city', // String-based value accessors!
      },
      {
        Header: 'Country',
        accessor: 'country', // String-based value accessors!
      },
      {
        Header: 'Options',
        maxWidth: 100,
        Cell: props => (
          <div>
            {editLink(props)} {viewLink(props)}
          </div>
        ),
      },
    ];
    return (
      <div className="container" style={{ width: '95%' }}>
        <Link to="/admin/parks/add">Add Park</Link>
        <ReactTable data={parks} columns={columns} />
      </div>
    );
  }
}

ParkListRender.contextType = Consumer;
const AttractionList = props => (
  <Consumer>{() => <ParkListRender {...props} />}</Consumer>
);

export default AttractionList;
