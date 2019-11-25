import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Home from './components/Home.js';
import Admin from './components/Admin.js';


// https://najens.github.io/weather-icons-react/
// https://codepen.io/ItScofield/pen/PNVZoQ
// http://youmightnotneedjquery.com/
// https://stackoverflow.com/questions/38402025/how-to-create-helper-file-full-of-functions-in-react-native


// const getWeather = () => 
// 	fetch("https://jsonplaceholder.typicode.com/users")
// 	    .then(res => (res.ok ? res : Promise.reject(res)))
// 	    .then(res => res.json())


class App extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			config: {}
		};
	}


	componentDidMount() { }


	render(){
		return ( 
			<Router>
				<Switch>
					<Route exact path="/admin" component={Admin} /> 

					<Route
						exact
						path='/'
						render={(props) => <Home {...props} config={this.state.config} />}
						/>

					{/*<Route exact path="/" component={Home} />*/}

				</Switch>
			</Router>
		)	
	}


}

export default App;
