import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Consumer } from 'services/context';
import { Link } from 'react-router-dom';
import { deleteDoc, getProperty } from 'services/utilities';
import { css, jsx } from '@emotion/core';
/** @jsx jsx */

const chipStyle = css`
  height: 24px !important;
  line-height: 24px !important;
  box-shadow: 2px 2px 5px -5px rgba(0, 0, 0, 0.75);
`;

class TypesRender extends React.Component {
  componentDidMount() {
    document.title = 'Types | Admin Panel | Project Rode';
  }

  countArray = (array, field, value) => {
    let count = 0;
    array.forEach(v => v[field].forEach(f => f === value && count++));
    return count;
  };

  render() {
    const { attractionsInfo, updateContext } = this.context;
    const {
      attractions,
      attractionTypes,
      attractionCategories,
    } = attractionsInfo;

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: props => (
          <div>
            <span>{props.value}</span>
            <br />
            <p
              style={{
                fontSize: '13px',
                lineHeight: '1.5em',
                margin: 0,
              }}
              className="rowControls"
            >
              <Link
                style={{ color: '#0073aa' }}
                to={`/admin/attractions/types/edit/${props.original.uid}`}
              >
                Edit
              </Link>{' '}
              |{' '}
              <a
                onClick={() => {
                  deleteDoc('attractionTypes', props.original.uid);
                  updateContext();
                }}
                style={{ color: '#a00', cursor: 'pointer' }}
              >
                Delete
              </a>{' '}
              | View
            </p>
          </div>
        ),
      },
      {
        Header: 'Description',
        id: 'description',
        accessor: d => (d.description ? d.description : '--'),
      },

      {
        Header: 'Category',
        accessor: 'category',
        maxWidth: 150,
        Cell: props => (
          <div
            className="chip"
            css={chipStyle}
            style={{
              color: 'white',
              backgroundColor: getProperty(
                props.value,
                'uid',
                'color',
                attractionCategories
              ),
              opacity: 0.8,
              textShadow: '1px 1px 4px #000000',
            }}
            key={props.value}
          >
            {getProperty(props.value, 'uid', 'name', attractionCategories)}
          </div>
        ),
      },
      {
        Header: 'Count',
        id: 'amount',
        accessor: d => this.countArray(attractions, 'type', d.uid),
        maxWidth: 60,
        Cell: props => (
          <div style={{ textAlign: 'right', paddingRight: '8px' }}>
            {props.value}
          </div>
        ),
      },
    ];
    return (
      <div className="container" style={{ width: '95%' }}>
        <h4>
          Types{' '}
          <Link
            to="/admin/attractions/types/add"
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
