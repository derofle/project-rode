import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import { deleteDoc, getProperty } from 'services/utilities';
import { css, jsx } from '@emotion/core';
import CountryFlag from 'components/CountryFlag';
import matchSorter from 'match-sorter';
/** @jsx jsx */

const chipStyle = css`
  height: 24px !important;
  line-height: 24px !important;
  box-shadow: 2px 2px 5px -5px rgba(0, 0, 0, 0.75);
`;

class AttractionListRender extends React.Component {
  state = {
    sorted: [],
    page: 0,
    pageSize: 25,
    expanded: {},
    resized: [],
    filtered: [],
  };

  componentDidMount() {
    document.title = 'Attraction List | Admin Panel | Project Rode';
  }

  renderStatus = (status, type) => {
    if (type === 'color') {
      if (status === 'defunct') {
        return '#ff2e00';
      }
      if (status === 'constructing') {
        return '#ffbf00';
      }
      if (status === 'operating') {
        return '#57d500';
      }
      return '#ffffff';
    }
    if (type === 'text') {
      if (status === 'defunct') {
        return 'Defunct';
      }
      if (status === 'constructing') {
        return 'Under Construction';
      }
      if (status === 'operating') {
        return 'Operating';
      }
      return 'Unknown';
    }
  };

  render() {
    const { attractionsInfo, parks, updateContext } = this.context;
    const {
      attractions,
      attractionTypes,
      attractionCategories,
    } = attractionsInfo;
    const editLink = ({ original }) => (
      <span>
        <Link to={`/admin/attractions/edit/${original.uid}`}>
          <i className="material-icons">edit</i>
        </Link>
      </span>
    );

    const viewLink = ({ original }) => (
      <span>
        <Link
          to={`/park/${getProperty(
            original.park,
            'uid',
            'slug',
            parks
          )}/attractie/${original.slug}`}
        >
          <i className="material-icons">visibility</i>
        </Link>
      </span>
    );

    const deleteLink = ({ original }) => (
      <span>
        <a
          onClick={() => {
            deleteDoc('attractions', original.uid);
            updateContext();
          }}
          role="button"
          tabIndex="-1"
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
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: ['name'],
          }),
        filterAll: true,
      },
      {
        Header: 'Park',
        accessor: 'park',
        minWidth: 125,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: [data => getProperty(data.park, 'uid', 'name', parks)],
          }),
        filterAll: true,
        Cell: props => (
          <div>
            <CountryFlag park={props.value} />
            {'  '}
            <span style={{ verticalAlign: 'middle' }}>
              {getProperty(props.value, 'uid', 'name', parks)}
            </span>
          </div>
        ),
      },
      {
        Header: 'Category',
        accessor: 'category',
        maxWidth: 200,
        Cell: props => (
          <div>
            {props.value &&
              props.value.map(val => (
                <div
                  className="chip"
                  css={chipStyle}
                  style={{
                    color: 'white',
                    backgroundColor: getProperty(
                      val,
                      'uid',
                      'color',
                      attractionCategories
                    ),
                    opacity: 0.8,
                    textShadow: '1px 1px 4px #000000',
                  }}
                  key={val}
                >
                  {getProperty(val, 'uid', 'name', attractionCategories)}
                </div>
              ))}
          </div>
        ),
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: props => (
          <div>
            {props.value &&
              props.value.map(val => (
                <div className="chip" css={chipStyle} key={val}>
                  {getProperty(val, 'uid', 'name', attractionTypes)}
                </div>
              ))}
          </div>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        maxWidth: 175,
        filterMethod: (filter, row) => {
          if (filter.value === 'all') {
            return true;
          }
          if (filter.value === 'operating') {
            return row[filter.id] === 'operating';
          }
          if (filter.value === 'constructing') {
            return row[filter.id] === 'constructing';
          }
          if (filter.value === 'defunct') {
            return row[filter.id] === 'defunct';
          }
          return row[filter.id] === '';
        },
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}
          >
            <option value="all">Show All</option>
            <option value="operating">Operating</option>
            <option value="constructing">Under Construction</option>
            <option value="defunct">Defunct</option>
          </select>
        ),
        Cell: row => (
          <span>
            <span
              style={{
                color: this.renderStatus(row.value, 'color'),
                transition: 'all .3s ease',
              }}
            >
              &#x25cf;
            </span>{' '}
            {this.renderStatus(row.value, 'text')}
          </span>
        ),
      },
      {
        Header: '',
        maxWidth: 100,
        Filter: () => null,
        Cell: props => (
          <div style={{ textAlign: 'center' }}>
            {editLink(props)} {viewLink(props)} {deleteLink(props)}
          </div>
        ),
      },
    ];
    return (
      <div className="container" style={{ width: '95%' }}>
        <h4>
          Attractions{' '}
          <Link
            to="/admin/attractions/add"
            className="btn-small grey"
            style={{ padding: '0 8px' }}
          >
            <i className="material-icons left" style={{ margin: 0 }}>
              add
            </i>
            Add Attraction
          </Link>
        </h4>
        <ReactTable
          data={attractions}
          columns={columns}
          defaultSorted={[
            {
              id: 'name',
              asc: true,
            },
          ]}
          defaultPageSize={10}
          filterable
          sorted={this.state.sorted}
          page={this.state.page}
          pageSize={this.state.pageSize}
          expanded={this.state.expanded}
          resized={this.state.resized}
          filtered={this.state.filtered}
          // Calbacks
          onSortedChange={sorted => this.setState({ sorted })}
          onPageChange={page => this.setState({ page })}
          onPageSizeChange={(pageSize, page) =>
            this.setState({ page, pageSize })
          }
          onExpandedChange={expanded => this.setState({ expanded })}
          onResizedChange={resized => this.setState({ resized })}
          onFilteredChange={filtered => this.setState({ filtered })}
        />
      </div>
    );
  }
}

AttractionListRender.contextType = Consumer;
const AttractionList = props => (
  <Consumer>{() => <AttractionListRender {...props} />}</Consumer>
);

export default AttractionList;
