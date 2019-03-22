/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Consumer } from '../../context/AppProvider';

class AdminRender extends Component {
  render() {
    const { currentUser, users } = this.context;
    let user;
    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }
    if (user && user.role !== 'admin') return <Redirect to="/" />;
    return (
      <div className="container">
        <div className="row" />
        <div className="container">
          <div className="container">
            <div className="card" style={{ borderRadius: '6px' }}>
              <div
                className="card-content"
                style={{
                  backgroundColor: '#596a79',
                  borderRadius: '6px 6px 0 0',
                  height: '12px',
                  padding: 0,
                }}
              />
              <div className="card-content">
                <h5
                  className="grey-text text-darken-3 bold-text"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  Admin Paneel
                </h5>
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  Kies hier wat je wil toevoegen
                </p>
                <div
                  className="input-field"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Link
                    className="btn z-depth-0 center"
                    to="/admin/toevoegen/park"
                    style={{
                      backgroundColor: '#596a79',
                      width: '85%',
                    }}
                  >
                    Nieuw Park
                  </Link>
                </div>
                <div
                  className="input-field"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Link
                    className="btn z-depth-0 center"
                    to="/admin/toevoegen/attractie"
                    style={{
                      backgroundColor: '#596a79',
                      width: '85%',
                    }}
                  >
                    Nieuwe Attractie
                  </Link>
                </div>
                <div
                  className="input-field"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Link
                    className="btn z-depth-0 center"
                    to="/admin/toevoegen/show"
                    style={{
                      backgroundColor: '#596a79',
                      width: '85%',
                    }}
                  >
                    Nieuwe Show
                  </Link>
                </div>
                <div
                  className="input-field"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Link
                    className="btn z-depth-0 center"
                    to="/admin/toevoegen/fabrikant"
                    style={{
                      backgroundColor: '#596a79',
                      width: '85%',
                    }}
                  >
                    Nieuwe Fabrikant
                  </Link>
                </div>
              </div>
              <div
                className="card-content"
                style={{
                  backgroundColor: '#f1ebe9',
                  borderRadius: '0 0 6px 6px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminRender.contextType = Consumer;
const Admin = props => <Consumer>{() => <AdminRender {...props} />}</Consumer>;

export default Admin;
