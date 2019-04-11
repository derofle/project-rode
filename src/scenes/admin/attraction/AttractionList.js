import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import {
  idToName,
  uidToName,
  uidToId,
  getPropertyById,
} from 'services/utilities';
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
        accessor: 'categoryIds',
        Cell: props => (
          <div>
            {props.value.map(val => (
              <div
                className="chip"
                css={chipStyle}
                style={{
                  backgroundColor: getPropertyById(
                    val,
                    attractionCategories,
                    'color'
                  ),
                  color: 'white',
                }}
              >
                {idToName(val, attractionCategories)}
              </div>
            ))}
          </div>
        ),
      },
      {
        Header: 'Type',
        accessor: 'typeIds',
        Cell: props => (
          <div>
            {props.value.map(val => (
              <div className="chip" css={chipStyle}>
                {idToName(val, attractionTypes)}
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
