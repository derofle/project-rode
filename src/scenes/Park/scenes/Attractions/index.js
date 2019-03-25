import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../../context/AppProvider';

import AttractionTable from '../../attraction/AttractionTable';

class ParkAttractions extends React.Component {
  render() {
    const { attractions, history } = this.props;
    const coasters = attractions.filter(
      attraction => attraction.category === 'roller-coaster'
    );
    const thrills = attractions.filter(
      attraction => attraction.category === 'thrill-ride'
    );
    const waterrides = attractions.filter(
      attraction => attraction.category === 'water-ride'
    );
    const gentle = attractions.filter(
      attraction => attraction.category === 'gentle-ride'
    );
    return (
      <div>
        {coasters.length > 0 ? (
          <div className="card" style={{ borderRadius: '6px' }}>
            <AttractionTable
              attractions={coasters}
              history={history}
              name="ACHTBANEN"
            />
          </div>
        ) : null}
        {thrills.length > 0 ? (
          <div className="card" style={{ borderRadius: '6px' }}>
            <AttractionTable
              attractions={thrills}
              history={history}
              name="SPANNENDE ATTRACTIES"
            />
          </div>
        ) : null}
        {waterrides.length > 0 ? (
          <div className="card" style={{ borderRadius: '6px' }}>
            <AttractionTable
              attractions={waterrides}
              history={history}
              name="WATER ATTRACTIES"
            />
          </div>
        ) : null}
        {gentle.length > 0 ? (
          <div className="card" style={{ borderRadius: '6px' }}>
            <AttractionTable
              attractions={gentle}
              history={history}
              name="FAMILIE ATTRACTIES"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ParkAttractions.propTypes = {
  attractions: PropTypes.array,
};

ParkAttractions.contextType = Consumer;
export default ParkAttractions;
