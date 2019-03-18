import React from 'react';
import { AppProvider } from './context/appContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';

import TestScreen from './TestScreen';
import ParkDashboard from './park/ParkDashboard';

const App = () => (
	<div>  
		<AppProvider>
      <BrowserRouter>
      <div>
      <NavBar />
      <Switch>
			<Route exact path="/" component={TestScreen} />
      <Route path="/park/:Id" component={ParkDashboard} />
      </Switch>
      <Footer />
      </div>
      </BrowserRouter>
		</AppProvider>
	</div>
);

export default App;
