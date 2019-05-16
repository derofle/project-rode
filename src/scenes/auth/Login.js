/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { signIn } from '../../services/firebase/components/auth';
import { Consumer, Context } from '../../services/context';

class SigninRender extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    signIn(this.state);
  };

  render() {
    const { currentUser } = this.context;
    if (currentUser && currentUser.uid) return <Redirect to="/" />;
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
                <form className="white" onSubmit={this.handleSubmit}>
                  <h5
                    className="grey-text text-darken-3 bold-text"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    Account Login
                  </h5>
                  <div className="input-field">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password">Wachtwoord</label>
                    <input
                      type="password"
                      id="password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div
                    className="input-field"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <button
                      className="btn z-depth-0 center"
                      type="submit"
                      style={{
                        backgroundColor: '#596a79',
                        width: '85%',
                      }}
                    >
                      Login
                    </button>
                    <div className="center red-text" />
                  </div>
                </form>
              </div>
              <div
                className="card-content"
                style={{
                  backgroundColor: '#f1ebe9',
                  borderRadius: '0 0 6px 6px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <p className="bold-text" style={{ color: '#8e8580' }}>
                  Heb je geen account?{' '}
                  <Link to="/aanmelden" style={{ color: '#332a24' }}>
                    Maak er dan een aan!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SigninRender.contextType = Context;
const Signin = props => (
  <Consumer>{() => <SigninRender {...props} />}</Consumer>
);

export default Signin;
