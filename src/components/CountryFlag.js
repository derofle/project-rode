import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Consumer } from 'services/context';
import { getCountryId } from 'services/utilities';

const CountryFlag = props => (
    <Consumer>
      {context => (
        <ReactCountryFlag code={getCountryId(props.park, context.parks)} svg />
      )}
    </Consumer>
  );

export default CountryFlag;
