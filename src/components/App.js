import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { AppProvider, Consumer } from '../context/AppProvider';

import NavBar from './layout/NavBar';
import Footer from './layout/Footer';

import Home from './Home';
import Login from './auth/Signin';
import Signup from './auth/Signup';
import Admin from './admin/Admin';

import Park from './park/Park';
import Attraction from './attraction/Attraction';
import AttractionList from './attraction/AttractionList';

import ParkList from './park/ParkList';
import AddAttraction from './admin/add/AddAttraction';

/*
import Manufacturer from './manufacturer/Manufacturer';

*/

class AppRender extends React.Component {
  render() {
    const { loading } = this.context;
    if (!loading) {
      return (
        <BrowserRouter>
          <div className="root-app">
            <header>
              <NavBar />
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={Admin} />
                <Route path="/park/:Id" component={Park} />
                <Route path="/attractie/:Id" component={Attraction} />
                <Route path="/attracties" component={AttractionList} />
                <Route path="/parken" component={ParkList} />
                <Route
                  path="/admin/toevoegen/attractie"
                  component={AddAttraction}
                />
                {/* }
                
                
                
                
                <Route path="/fabrikant/:Id" component={Manufacturer} />
                
                */}
                <Route exact path="/login" component={() => <Login />} />
                <Route exact path="/aanmelden" component={() => <Signup />} />
                <Route
                  exact
                  path="/signedOut"
                  component={() => (
                    <h1 className="content">You're now signed out.</h1>
                  )}
                />
                <Route
                  exact
                  path="/accountCreated"
                  component={() => (
                    <h1 className="content">
                      Account created.{' '}
                      <Link to="/login">Proceed to Dashboard</Link>
                    </h1>
                  )}
                />
              </Switch>
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </BrowserRouter>
      );
    }
    return <p>Loading ...</p>;
  }
}

AppRender.contextType = Consumer;
const App = props => (
  <AppProvider>
    <Consumer>{() => <AppRender {...props} />}</Consumer>
  </AppProvider>
);

export default App;
