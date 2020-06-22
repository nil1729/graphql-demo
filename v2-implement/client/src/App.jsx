import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Componenets
import logo from './logo.png';
import Launches from './components/Launches';
import SingleLaunch from './components/SingleLaunch';

// Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
	uri: '/graphql', //!Production
	// uri: 'http://localhost:5000/graphql' //!Development
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className='container'>
					<img
						src={logo}
						alt='GraphQL'
						style={{ width: 300, display: 'block', margin: 'auto' }}
					/>
					<Switch>
						<Route path='/' exact component={Launches} />
						<Route path='/launch/:id' exact component={SingleLaunch} />
					</Switch>
				</div>
			</Router>
		</ApolloProvider>
	);
};

export default App;
