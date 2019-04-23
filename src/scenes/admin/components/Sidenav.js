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

    const trigger = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(trigger, {
      container: elem,
      coverTrigger: false,
      alignment: 'center',
    });

    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {});
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
          <ul className="collapsible">
            <li>
              <div className="collapsible-header" css={linkStyle}>
                Parks
              </div>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link className="waves-effect" to="/admin/parks">
                      All Parks
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/admin/parks/add">
                      Add New
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="collapsible-header" css={linkStyle}>
                Attractions
              </div>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link className="waves-effect" to="/admin/attractions">
                      All Attractions
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/admin/attractions/add">
                      Add New
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/#">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/#">
                      Types
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <div className="collapsible-header" css={linkStyle}>
                Shows
              </div>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link className="waves-effect" to="/admin">
                      All Shows
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/admin">
                      Add New
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="collapsible-header" css={linkStyle}>
                Media
              </div>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link className="waves-effect" to="/admin/media">
                      Library
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/admin/media/add">
                      Add New
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/admin/media/providers">
                      Providers
                    </Link>
                  </li>
                  <li>
                    <Link className="waves-effect" to="/admin/media/licenses">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

export default Sidenav;
