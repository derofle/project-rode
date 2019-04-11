import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import { uidToName, uidToId, getPropertyByUid } from 'services/utilities';
import { css, jsx } from '@emotion/core';
/** @jsx jsx */

const chipStyle = css`
  height: 24px !important;
  line-height: 24px !important;
`;

class AttractionListRender extends React.Component {
  render() {
    const { attractionsInfo, parks } = this.context;
    const {
      attractions,
      attractionTypes,
      attractionCategories,
    } = attractionsInfo;
    const editLink = ({ original }) => (
      <span>
        <Link to={`/admin/attractions/edit/${original.uid}`}>Edit</Link>
      </span>
    );

    const viewLink = ({ original }) => (
      <span>
        <Link
          to={`/park/${uidToId(original.park, parks)}/attractie/${original.id}`}
        >
          View
        </Link>
      </span>
    );

    const columns = [
      {
        Header: 'Naam',
        accessor: 'name', // String-based value accessors!
      },
      {
        Header: 'Park',
        id: 'park',
        accessor: d => uidToName(d.park, parks),
      },
      {
        Header: 'Categorie',
        accessor: 'category',
        Cell: props => (
          <div>
            {props.value.map(val => (
              <div
                className="chip"
                css={chipStyle}
                key={val}
                style={{
                  backgroundColor: getPropertyByUid(
                    val,
                    attractionCategories,
                    'color'
                  ),
                  color: 'white',
                }}
              >
                {uidToName(val, attractionCategories)}
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
            {props.value.map(val => (
              <div className="chip" css={chipStyle} key={val}>
                {uidToName(val, attractionTypes)}
              </div>
            ))}
          </div>
        ),
      },
      {
        Header: 'Opties',
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
        <Link to="/admin/attractions/add">Add Attraction</Link>
        <ReactTable data={attractions} columns={columns} />
      </div>
    );
  }
}

AttractionListRender.contextType = Consumer;
const AttractionList = props => (
  <Consumer>{() => <AttractionListRender {...props} />}</Consumer>
);

export default AttractionList;
