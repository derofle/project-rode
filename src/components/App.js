import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider, AppConsumer } from './context/appContext';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';

import Home from './Home';
import ParkList from './ParkList';
import AttractionList from './AttractionList';
import Park from './park/Park';
import Attraction from './attraction/Attraction';
import Manufacturer from './manufacturer/Manufacturer';

class App extends React.Component {
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
                <Route path="/parken" component={ParkList} />
                <Route path="/attracties" component={AttractionList} />
                <Route path="/park/:Id" component={Park} />
                <Route path="/attractie/:Id" component={Attraction} />
                <Route path="/fabrikant/:Id" component={Manufacturer} />
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

App.contextType = AppConsumer;
export default props => (
  <AppProvider>
    <AppConsumer>{() => <App {...props} />}</AppConsumer>
  </AppProvider>
);
