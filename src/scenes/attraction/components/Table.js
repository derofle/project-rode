import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import Category from '../../../components/Category';
import { Consumer } from '../../../services/context';
import {
  idToName,
  uidToName,
  uidToId,
  idToSlug,
  getCategoryIdByTypeId,
} from '../../../services/utilities';
/** @jsx jsx */

const tableStyle = css`
  border-radius: 6px;
`;
const chipStyle = css`
  height: 24px !important;
  line-height: 24px !important;
`;

const tableBottomStyle = css`
  background-color: #f2f5f7;
  border-radius: 0 0 8px 8px;
`;

class TableRender extends React.Component {
  render() {
    const { attractions, media } = this.props;
    const { parks, loading, attractionsInfo } = this.context;
    const { attractionTypes, attractionCategories } = attractionsInfo;
    if (!loading) {
      return (
        <table className="z-depth-1 highlight" css={tableStyle}>
          <thead
            style={{
              backgroundColor: '#f2f5f7',
              borderRadius: '6px 6px 0 0 ',
            }}
          >
            <tr
              style={{
                borderRadius: '6px 6px 0 0',
                borderBottom: '2px solid #edf1f3',
              }}
            >
              <th style={{ width: '8vw', borderRadius: '6px 0 0 0' }} />
              <th>NAAM</th>
              <th>CATEGORIE</th>
              <th>PARK</th>
            </tr>
          </thead>
          <tbody>
            {attractions
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(attraction => (
                <tr
                  style={{
                    backgroundColor: 'white',
                    borderBottom: '2px solid #edf1f3',
                  }}
                  className="table-item"
                  key={attraction.uid}
                >
                  <td style={{ padding: '10px' }}>
                    <img
                      src={
                        media.find(med => med.uid === attraction.headerImage)
                          .src
                      }
                      alt={attraction.id}
                      style={{
                        display: 'block',
                        width: '6vw',
                        borderRadius: '6px',
                      }}
                    />
                  </td>
                  <td>
                    <div>
                      <Link
                        style={{
                          fontSize: '1.5em',
                          lineHeight: '100%',
                          color: '#030e18',
                          margin: 0,
                        }}
                        to={`/park/${uidToId(
                          attraction.park,
                          parks
                        )}/attractie/${attraction.id}`}
                      >
                        {attraction.name}
                      </Link>
                      <br />
                      {attraction &&
                        attraction.typeIds.map(type => (
                          <Link
                            to={`/categorie/${idToSlug(
                              getCategoryIdByTypeId(
                                type,
                                attractionTypes,
                                attractionCategories
                              ),
                              attractionCategories
                            )}/type/${idToSlug(type, attractionTypes)}`}
                            key={`${attraction.uid}:${type}`}
                          >
                            <div className="chip" css={chipStyle}>
                              {idToName(type, attractionTypes)}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </td>
                  <td>
                    <Category categoryIds={attraction.categoryIds} />
                  </td>
                  <td>
                    <p>{uidToName(attraction.park, parks)}</p>
                  </td>
                </tr>
              ))}
            <tr css={tableBottomStyle}>
              <td css={tableBottomStyle} />
              <td />
              <td />
              <td css={tableBottomStyle} />
            </tr>
          </tbody>
        </table>
      );
    }
  }
}

TableRender.propTypes = {
  attractions: PropTypes.array,
  name: PropTypes.string,
  history: PropTypes.object,
};

TableRender.contextType = Consumer;
const Table = props => <Consumer>{() => <TableRender {...props} />}</Consumer>;

export default Table;
