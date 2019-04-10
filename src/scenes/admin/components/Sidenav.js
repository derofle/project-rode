import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const sidebarStyle = css`
  background-color: #68368c;
`;

const linkStyle = css`
  color: white !important;
`;

class Sidenav extends Component {
  componentDidMount() {
    const elem = document.querySelector('.sidenav');
    M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250,
    });
  }

  render() {
    return (
      <div style={{ position: 'absolute' }}>
        <ul id="slide-out" className="sidenav sidenav-fixed" css={sidebarStyle}>
          <li />
          <li>
            <Link to="/" css={linkStyle}>
              <i className="material-icons" css={linkStyle}>
                home
              </i>
              Project Rode
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <Link className="waves-effect" to="/admin/parks" css={linkStyle}>
              Parken
            </Link>
          </li>
          <li>
            <Link
              className="waves-effect"
              to="/admin/attractions"
              css={linkStyle}
            >
              Attracties
            </Link>
          </li>
          <li>
            <a className="waves-effect" href="#!" css={linkStyle}>
              Shows
            </a>
          </li>
          <li>
            <a className="waves-effect" href="#!" css={linkStyle}>
              Faciliteiten
            </a>
          </li>
          <li>
            <div className="divider" />
          </li>
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

export default Sidenav;
