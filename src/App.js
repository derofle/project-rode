import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider, Consumer } from 'services/context';

// Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import NotFound from 'components/NotFound';

// Auth
import Login from 'scenes/auth/Login';
import Signup from 'scenes/auth/Signup';

// Attraction
import AttractionDetails from 'scenes/attraction/AttractionDetails';
import Attractions from 'scenes/attraction/Attractions';

// Parks
import ParkDetails from 'scenes/park/ParkDetails';
import Parks from 'scenes/park/Parks';

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
              <Header />
              <Sidebar />
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={NotFound} />
                <Route
                  path="/park/:parkId/attractie/:attractionId"
                  component={AttractionDetails}
                />
                <Route path="/attracties" component={Attractions} />
                <Route exact path="/login" component={() => <Login />} />
                <Route path="/park/:parkId" component={ParkDetails} />
                <Route path="/parken" component={Parks} />
                <Route path="/aanmelden" component={Signup} />
                <Route path="/404" component={NotFound} />
                <Route component={NotFound} />
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
