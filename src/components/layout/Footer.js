import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context/AppProvider';

const FooterRender = props => {
  const { context } = props;
  const { currentUser, users } = context;
  let user;
  if (currentUser && currentUser.uid) {
    user = users.find(obj => obj.uid === currentUser.uid);
  }
  console.log(user);

  return (
    <footer
      className="page-footer z-depth-1"
      style={{
        borderRadius: '6px 6px 0px 0px',
        backgroundColor: '#f2f2f2',
      }}
    >
      <div style={{ width: '90%', margin: 'auto' }} />
      <div
        className="footer-copyright z-depth-1"
        style={{ backgroundColor: '#596a79' }}
      >
        <div className="container">
          <div style={{ width: '90%', margin: 'auto' }}>
            <p>
              © 2019 Evilife -
              {user && user.uid ? (
                <Link to="/admin" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {' '}
                  Admin Paneel
                </Link>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Footer = props => (
  <Consumer>
    {context => <FooterRender {...props} context={context} />}
  </Consumer>
);

export default Footer;
