import React from 'react';
import PropTypes from 'prop-types';

class AttractionTable extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  renderSwitch(param) {
    switch (param) {
      case 'roller-coaster':
        return 'Achtbaan';
      case 'gentle-ride':
        return 'Familie Attractie';
      case 'thrill-ride':
        return 'Spannende Attractie';
      case 'water-ride':
        return 'Water Attractie';
      default:
        return 'Onbekend';
    }
  }

  render() {
    const { attractions, name, history, media } = this.props;
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
            <th style={{ borderRadius: '0 6px 0 0' }}>CATEGORIE</th>
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
                onClick={() => {
                  history.push(
                    `/park/${attraction.parkId}/attractie/${attraction.id}`
                  );
                }}
              >
                <td style={{ padding: '10px' }}>
                  <img
                    src={
                      media.find(med => med.uid === attraction.headerImage).src
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
                <td>
                  <p>{this.renderSwitch(attraction.category)}</p>
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

AttractionTable.propTypes = {
  attractions: PropTypes.array,
  name: PropTypes.string,
  history: PropTypes.object,
};

export default AttractionTable;
