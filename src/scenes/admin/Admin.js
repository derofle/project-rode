/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import { Consumer } from 'services/context';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Sidenav from './components/Sidenav';
import Header from './components/Header';

import AttractionAdd from './attraction/AttractionAdd';
import AttractionEdit from './attraction/AttractionEdit';
import AttractionList from './attraction/AttractionList';

const adminPageStyle = css`
  padding-left: 300px;
`;

class AdminRender extends Component {
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
        <Sidenav />
        <div css={adminPageStyle}>
          <Switch>
            <Route exact path="/admin/attractions" component={AttractionList} />
            <Route path="/admin/attractions/add" component={AttractionAdd} />
            <Route
              path="/admin/attractions/edit/:Id"
              component={AttractionEdit}
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
