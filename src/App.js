import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import generateStore from './redux/store.js';

import navbar from './components/NavBar.jsx';
import ProductContainer from './containers/ProductContainer';
import SearchComponent from './components/Search';
import NewProductComponent from './components/NewProduct';

export var store = null; // exporto el store para poder usarlo en util.js para dispatch action
function App() {
	store = generateStore();
	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Route path='/' component={navbar} />
					<Route path='/' exact component={SearchComponent} />
					<Route path='/' exact component={ProductContainer} />

					{/* <Route path='/newProduct' component={NewProductComponent} /> */}
					<Route
						path='/newProduct/:codigo'
						render={({ match }) => (
							<NewProductComponent codigo={match.params.codigo} />
						)}
					/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
