import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const sidebarStyle = css`
  background-color: #68368c;
  padding-top: 56px;
  z-index: 8;
  transform: translateX(0%) !important;
  width: 200px;
`;

const linkStyle = css`
  color: white !important;
`;

const sidebarTrigger = css`
  @media (max-width: 600px) {
    line-height: 56px !important;
    position: absolute;
    color: black;
    z-index: 10 !important;
    margin-top: -56px;
  }
`;

const sidebarIcon = css`
  @media (max-width: 600px) {
    height: 56px;
    display: block;
    font-size: 24px;
    line-height: 56px;
    margin-left: 10px;
  }
  @media (min-width: 600px) {
    display: none;
  }
`;

class Sidebar extends React.Component {
  state = {
    active: true,
  };

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

    this.reloadCollapsibles();

    if (document.documentElement.clientWidth < 600) {
      this.setState({
        active: false,
      });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 600) {
        this.setState({
          active: false,
        });
      } else {
        this.setState({
          active: true,
        });
        this.reloadCollapsibles();
      }
    });
  }

  reloadCollapsibles = () => {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {});
  };

  render() {
    const { active } = this.state;
    return (
      <div style={{ position: 'absolute' }}>
        {active ? (
          <ul className="sidenav sidenav-fixed" css={sidebarStyle}>
            <li />
            <ul className="collapsible">
              <li>
                <div className="collapsible-header" css={linkStyle}>
                  Parks
                </div>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <Link to="/admin/parks">All Parks</Link>
                    </li>
                    <li>
                      <Link to="/admin/parks/add">Add New</Link>
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
                      <Link to="/admin/attractions">All Attractions</Link>
                    </li>
                    <li>
                      <Link to="/admin/attractions/add">Add New</Link>
                    </li>
                    <li>
                      <Link to="/admin/attractions/categories">Categories</Link>
                    </li>
                    <li>
                      <Link to="/admin/attractions/types">Types</Link>
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
                      <Link to="/admin">All Shows</Link>
                    </li>
                    <li>
                      <Link to="/admin">Add New</Link>
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
                      <Link to="/admin/media">Library</Link>
                    </li>
                    <li>
                      <Link to="/admin/media/add">Add New</Link>
                    </li>
                    <li>
                      <Link to="/admin/media/providers">Providers</Link>
                    </li>
                    <li>
                      <Link to="/admin/media/licenses">Licenses</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </ul>
        ) : null}

        <a
          href="#!"
          css={sidebarTrigger}
          onClick={() => {
            this.setState({ active: !active }, () => {
              this.reloadCollapsibles();
            });
          }}
        >
          <i className="material-icons" css={sidebarIcon}>
            menu
          </i>
        </a>
      </div>
    );
  }
}

export default Sidebar;
