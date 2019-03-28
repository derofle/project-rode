/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Consumer } from '../../services/context';

class Home extends React.Component {
  seeContext = () => {
    console.log(this.context);
  };

  render() {
    if (!this.context.loading) {
      return <div className="container" />;
    }
    return null;
  }
}

Home.contextType = Consumer;

export default props => (
  <Consumer>{context => <Home {...props} context={context} />}</Consumer>
);
