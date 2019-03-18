import React from 'react';
import { AppProvider } from './context/appContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';

import Home from './Home';
import ParkList from './ParkList';
import AttractionList from './AttractionList';
import Park from './park/Park';

import Attraction from './attraction/Attraction';

const App = () => (
	<div>  
		<AppProvider>
      <BrowserRouter>
      <div>
      <NavBar />
      <Switch>
			<Route exact path="/" component={Home} />
      <Route path="/parken" component={ParkList} />
      <Route path="/attracties" component={AttractionList} />
      <Route path="/park/:Id" component={Park} />
      <Route path="/attractie/:Id" component={Attraction} />
      </Switch>
      <Footer />
      </div>
      </BrowserRouter>
		</AppProvider>
	</div>
);

export default App;
