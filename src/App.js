import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider, Consumer } from './services/context';

import NavBar from './components/Header';
import Footer from './components/Footer';

import Home from './scenes/Home';
import Attraction from './scenes/Attraction';
/*
import Login from './auth/Signin';
import Signup from './auth/Signup';
import Admin from './admin/Admin';

import Park from './park/Park';

import AttractionList from './attraction/AttractionList';

import ParkList from './park/ParkList';
import AddAttraction from './admin/add/AddAttraction';


import Manufacturer from './manufacturer/Manufacturer';

*/

class AppRender extends React.Component {
  render() {
    const { loading } = this.context;
    if (loading) {
      return <p>Loading ...</p>;
    }
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
                <Route
                  path="/park/:parkId/attractie/:attractionId"
                  component={Attraction}
                />
                {/*
                <Route exact path="/admin" component={Admin} />
                <Route path="/park/:Id" component={Park} />
                
                <Route path="/attracties" component={AttractionList} />
                <Route path="/parken" component={ParkList} />
                <Route
                  path="/admin/toevoegen/attractie"
                  component={AddAttraction}
                />
                 }
                
                
                
                
                <Route path="/fabrikant/:Id" component={Manufacturer} />
                
                
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
                */}
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
