import React from 'react';
import PropTypes from 'prop-types';

const AttractionTable = props => {
  const { attractions, name, history } = props;
  return (
    <table className="z-depth-1 highlight" style={{ borderRadius: '6px' }}>
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
          <th>{name}</th>
          <th style={{ borderRadius: '0 6px 0 0' }}>Type</th>
        </tr>
      </thead>
      <tbody>
        {attractions.map(attraction => (
          <tr
            style={{
              backgroundColor: 'white',
              borderBottom: '2px solid #edf1f3',
            }}
            className="table-item"
            key={attraction.uid}
            onClick={() => {
              history.push(`/attractie/${attraction.uid}`);
            }}
          >
            <td style={{ padding: '10px' }}>
              <img
                src={attraction.img}
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
                <p
                  style={{
                    fontSize: '1.5em',
                    lineHeight: '100%',
                    color: '#030e18',
                    margin: 0,
                  }}
                >
                  {attraction.name}
                </p>
                <p
                  style={{
                    color: '#586878',
                    margin: 0,
                    paddingTop: '4px',
                  }}
                >
                  {attraction.type}
                </p>
              </div>
            </td>
            <td />
          </tr>
        ))}
        <tr
          style={{
            backgroundColor: '#f2f5f7',
            borderRadius: '0 0 6px 6px',
          }}
        >
          <td style={{ borderRadius: '0 0 0 6px' }} />
          <td />
          <td style={{ borderRadius: '0 0 6px 0' }} />
        </tr>
      </tbody>
    </table>
  );
};

AttractionTable.propTypes = {
  attractions: PropTypes.array,
  name: PropTypes.string,
};

export default AttractionTable;
