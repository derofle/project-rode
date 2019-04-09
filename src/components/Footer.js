import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../services/context';

const FooterRender = props => {
  const { context } = props;
  const { currentUser, users } = context;
  let user;
  if (currentUser && currentUser.uid) {
    user = users.find(obj => obj.uid === currentUser.uid);
  }

  return (
    <footer
      className="page-footer z-depth-1"
      style={{
        backgroundColor: '#EEF1ED',
        borderTop: '5px solid #9A999B',
      }}
    >
      <div style={{ width: '90%', margin: 'auto' }} />
      <div
        className="footer-copyright z-depth-1"
        style={{ backgroundColor: '#9A999B' }}
      >
        <div className="container">
          <div style={{ width: '90%', margin: 'auto' }}>
            <p style={{ color: '#323037', opacity: '0.8' }}>
              © 2019 Evilife
              {user && user.uid ? (
                <Link to="/admin"> - Admin Paneel</Link>
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
