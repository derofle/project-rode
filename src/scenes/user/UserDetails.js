import React from 'react';
import PropTypes from 'prop-types';
import { Context } from 'services/context';
import { getProperty } from 'services/utilities';

class UserDetails extends React.Component {
  static contextType = Context;

  static propTypes = {
    match: PropTypes.object,
  };

  state = {
    user: {},
    loading: true,
  };

  componentDidMount() {
    const { users } = this.context;
    const { match } = this.props;
    const user = users && users.find(obj => obj.uid === match.params.userId);
    document.title = `${user.firstName} ${user.lastName} | Project Rode`;
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    const { attractionsInfo } = this.context;
    const { attractions } = attractionsInfo;
    if (!loading) {
      return (
        <div>
          This is the user profile of {user.firstName}
          <div>
            He has {user.favorites ? user.favorites.length : 'no'} favorites,
            which are:{' '}
            {user.favorites &&
              user.favorites.map(fav => (
                <p>{getProperty(fav, 'uid', 'name', attractions)}</p>
              ))}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default UserDetails;
