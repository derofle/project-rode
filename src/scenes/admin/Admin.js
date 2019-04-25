/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Consumer } from 'services/context';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

import AttractionAdd from './attraction/AttractionAdd';
import AttractionEdit from './attraction/AttractionEdit';
import AttractionList from './attraction/AttractionList';

import ParkList from './park/ParkList';
import ParkEdit from './park/ParkEdit';
import ParkAdd from './park/ParkAdd';

import MediaUpload from './media/MediaUpload';
import MediaLibrary from './media/MediaLibrary';

import Licenses from './media/licenses/Licenses';
import LicenseAdd from './media/licenses/LicenseAdd';
import LicenseEdit from './media/licenses/LicenseEdit';

const adminPageStyle = css`
  @media (min-width: 600px) {
    padding-left: 200px;
  }
`;

class AdminRender extends React.Component {
  render() {
    const { currentUser, users } = this.context;
    let user;
    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }
    if (user && user.role !== 'admin') return <Redirect to="/" />;
    return (
      <div>
        <Header />
        <Sidebar />
        <div css={adminPageStyle}>
          <Switch>
            <Route exact path="/admin/parks" component={ParkList} />
            <Route path="/admin/parks/edit/:Id" component={ParkEdit} />
            <Route path="/admin/parks/add/" component={ParkAdd} />
            <Route path="/admin/media/upload/" component={MediaUpload} />
            <Route exact path="/admin/attractions" component={AttractionList} />
            <Route path="/admin/attractions/add" component={AttractionAdd} />
            <Route
              path="/admin/attractions/edit/:Id"
              component={AttractionEdit}
            />
            <Route exact path="/admin/media" component={MediaLibrary} />
            <Route exact path="/admin/media/licenses" component={Licenses} />
            <Route path="/admin/media/licenses/add" component={LicenseAdd} />
            <Route
              path="/admin/media/licenses/edit/:Id"
              component={LicenseEdit}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

AdminRender.contextType = Consumer;
const Admin = props => <Consumer>{() => <AdminRender {...props} />}</Consumer>;

export default Admin;
