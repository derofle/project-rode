import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import { Consumer } from '../services/context';
/** @jsx jsx */

const footerWrapper = css`
  padding-bottom: 24px;
  display: block;
  margin: 0;
  clear: both !important;
  border-top: 0 !important;
  font-size: 14px !important;
  color: #222 !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans',
    'Segoe UI', 'Helvetica', Arial, sans-serif;
  line-height: 1.4;
  text-align: left;
  background-color: #faf9f5;
`;

const footerBorder = css`
  border-top: 2px solid #e1e3df;
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: #e1e3df;
`;

const linkWrapper = css`
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const linkRow = css`
  padding-bottom: 24px;
  padding-top: 24px;
  font-size: 85.71%;
  padding-left: 18px;
  padding-right: 18px;
  float: none;
  position: relative;
`;

const columnOne = css`
  margin-bottom: 12px;
  margin-left: 8.33333%;
  width: 25%;
  padding-left: 18px;
  padding-right: 18px;
  float: left;
  box-sizing: border-box;
  font-size: 85.71%;
  color: #222 !important;
`;

const columnTwo = css`
  margin-bottom: 12px;
  width: 25%;
  padding-left: 18px;
  padding-right: 18px;
  float: left;
  box-sizing: border-box;
  font-size: 85.71%;
`;

const columnThree = css`
  margin-bottom: 12px;
  width: 25%;
  padding-left: 18px;
  padding-right: 18px;
  float: left;
  box-sizing: border-box;
  font-size: 85.71%;
`;

const columnFour = css`
  margin-bottom: 12px;
  width: 16, 66667%;
  padding-left: 18px;
  padding-right: 18px;
  float: left;
  box-sizing: border-box;
  font-size: 85.71%;
`;

const headerColumn = css`
  margin-bottom: 12px;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
`;

const footerLink = css`
  text-decoration: none !important;
  width: 100%;
  padding-bottom: 6px;
  padding-top: 6px;
  display: block;
  color: #222;
  background: transparent;
  list-style: none;
  font-size: 12px;
  &:hover {
    color: #595959 !important;
    text-decoration: underline !important;
  }
`;

const FooterRender = props => {
  const { context } = props;
  const { currentUser, users } = context;
  let user;
  if (currentUser && currentUser.uid) {
    user = users.find(obj => obj.uid === currentUser.uid);
  }

  return (
    <footer css={footerWrapper}>
      <div css={footerBorder}>
        <div css={linkWrapper}>
          <div css={linkRow}>
            <div css={columnOne}>
              <h3 css={headerColumn}>Rode</h3>
              <ul>
                <li>
                  <Link to="/" css={footerLink}>
                    Project Rode
                  </Link>
                </li>
                {user && user.role === 'admin' ? (
                  <li>
                    <Link to="/admin" css={footerLink}>
                      Admin Panel
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
            <div css={columnTwo}>
              <h3 css={headerColumn}>Help</h3>
              <ul>
                <li>
                  <Link to="/" css={footerLink}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div css={columnThree}>
              <h3 css={headerColumn}>Over ons</h3>
              <ul>
                <li>
                  <Link to="/" css={footerLink}>
                    Team
                  </Link>
                </li>
              </ul>
            </div>
            <div css={columnFour}>
              <h3 css={headerColumn}>Volg Rode</h3>
              <ul>
                <li>
                  <a href="http://facebook.com" css={footerLink}>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="http://instagram.com" css={footerLink}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="http://twitter.com" css={footerLink}>
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

FooterRender.propTypes = {
  context: PropTypes.object,
};

const Footer = props => (
  <Consumer>
    {context => <FooterRender {...props} context={context} />}
  </Consumer>
);

export default Footer;
