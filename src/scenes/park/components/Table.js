import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../../services/context';

class ParkTable extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { parks, name, history } = this.props;
    const { media } = this.context;
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
            <th style={{ borderRadius: '0 6px 0 0' }}>LOCATIE</th>
          </tr>
        </thead>
        <tbody>
          {parks &&
            parks
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(park => (
                <tr
                  style={{
                    backgroundColor: 'white',
                    borderBottom: '2px solid #edf1f3',
                  }}
                  className="table-item"
                  key={park.uid}
                  onClick={() => {
                    history.push(`/park/${park.slug}`);
                  }}
                >
                  <td style={{ padding: '10px' }}>
                    <img
                      src={
                        media &&
                        park.headerImage &&
                        media.find(med => med.uid === park.headerImage).src
                      }
                      alt={park.id}
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
                        {park.name}
                      </p>
                      <p
                        style={{
                          color: '#586878',
                          margin: 0,
                          paddingTop: '4px',
                        }}
                      >
                        {park.type}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p>{park.location}</p>
                  </td>
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
  }
}

ParkTable.propTypes = {
  parks: PropTypes.array,
  name: PropTypes.string,
  history: PropTypes.object,
};

ParkTable.contextType = Consumer;
export default props => <Consumer>{() => <ParkTable {...props} />}</Consumer>;
