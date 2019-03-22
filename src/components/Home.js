import React from 'react';
import { Consumer } from '../context/AppProvider';

class Home extends React.Component {
  seeContext = () => {
    const { users, currentUser } = this.context;
    const user = users.find(obj => obj.uid === currentUser.uid);
    console.log(user);
  };

  render() {
    if (!this.context.loading) {
      return <div />;
    }
    return <div />;
  }
}

Home.contextType = Consumer;

export default props => <Consumer>{context => <Home {...props} />}</Consumer>;
