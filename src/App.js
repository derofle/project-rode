import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider, Consumer, Context } from 'services/context';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

// Components
import Header from 'components/Header/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import NotFound from 'components/NotFound';

// Admin
import Admin from 'scenes/admin/Admin';

// Auth
import Login from 'scenes/auth/Login';
import Signup from 'scenes/auth/Signup';

// Attraction
import AttractionDetails from 'scenes/attraction/AttractionDetails';
import Attractions from 'scenes/attraction/Attractions';

// Parks
import ParkDetails from 'scenes/park/ParkDetails';
import Parks from 'scenes/park/Parks';

// Users
import UserDetails from 'scenes/user/UserDetails';

const pageContainer = css`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  height: 100%;
`;

const AdminContainer = () => (
  <div className="root-app">
    <Switch>
      <Route path="/admin" component={Admin} />
    </Switch>
  </div>
);

const DefaultContainer = () => (
  <div className="root-app">
    <Header />
    <Sidebar />
    <main>
      <div css={pageContainer}>
        <Switch>
          <Route exact path="/" component={NotFound} />
          <Route
            path="/park/:parkId/attractie/:attractionId"
            component={AttractionDetails}
          />
          <Route path="/attracties" component={Attractions} />
          <Route exact path="/login" component={() => <Login />} />
          <Route path="/park/:parkId" component={ParkDetails} />
          <Route path="/gebruiker/:userId" component={UserDetails} />
          <Route path="/parken" component={Parks} />
          <Route path="/signup" component={Signup} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </main>
    <Footer />
  </div>
);

class AppRender extends React.Component {
  render() {
    const { loading } = this.context;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (!loading) {
      return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/(admin)" component={AdminContainer} />
              <Route component={DefaultContainer} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
    return <p>Loading ...</p>;
  }
}

AppRender.contextType = Context;
const App = props => (
  <AppProvider>
    <Consumer>{() => <AppRender {...props} />}</Consumer>
  </AppProvider>
);

export default App;
