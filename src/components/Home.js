import React, { Component } from 'react';
import QueryString from 'query-string'; 
import { Link } from "react-router-dom";

import '../assets/css/app-main.min.css';

import Weather from './Weather.js';
import Forecast from './Forecast.js';
import Service from './Weather-Service.js';


// import logo from './logo.svg';
// import './App.css';
// https://najens.github.io/weather-icons-react/


// const getWeather = () => 
// 	fetch("https://jsonplaceholder.typicode.com/users")
// 	    .then(res => (res.ok ? res : Promise.reject(res)))
// 	    .then(res => res.json())


class Home extends Component {
	_isMounted = false;
	_refreshTimer = 0;


	constructor(props) {
		super(props);
		// console.log(this.props.config);
		
		this.state = {
			isLoading: true,
			hasErrors: false,
			textColor: '#000',
			bgImage: '',
			showDate: true,
			data: {},
			config: {},
			params: QueryString.parse(this.props.location.search)
		};
	}


	componentDidMount() {
		this._isMounted = true;
		this.getConfig();
	}


	componentWillUnmount() {
		this._isMounted = false;

		if (this._refreshTimer) {                      
			clearTimeout(this._refreshTimer); 
			this._refreshTimer = 0;           
		} 
	}


	getWeather = async() => {

	 	try {
			//const resp = await fetch("https://www.screenplify.com/api/weather/getWeather-mock.php");
			//const data = await resp.json();
			let appDefaults = this.state.config.defaults;
			let	appData = (this.state.params.widget_id in this.state.config)? this.state.config[this.state.params.widget_id] : appDefaults;
			let appRefresh = 'interval' in appData ? appData.interval : appDefaults.interval;	

			console.log(`Dataset Used:`, appData);

			let resp = await Service.getWeather(appDefaults, appData.woeid);
			let data = resp;
	 		
	 		if (this._isMounted){
				await this.setState({ 
					isLoading: false, 
					textColor: 'textColor' in appData ? appData.textColor : appDefaults.textColor,
					bgImage: 'backgroundImage' in appData ? appData.backgroundImage : appDefaults.backgroundImage,
					showDate: 'showDate' in appData ? appData.showDate : appDefaults.showDate,
					data: data 
				});
	 		}

			this._refreshTimer = setTimeout(() => {
				this.getWeather();
			}, appRefresh);
			
			console.log(`Dataset Refresh at:`, appRefresh / (1000*60*60) % 24 + 'Hrs');
			
	 	} catch (e) {
	 		console.log(e);

	 		if (this._isMounted){
				this.setState({ 
					isLoading: false, 
					hasErrors: true 
				});
	 		}
	 	}

	}


	getConfig = async() => {
		try{
			const resp = await fetch("/data.json");
			const config = await resp.json();
			
			if (this._isMounted){
				this.setState({config: config});
				this.getWeather();
			}

		} catch(e) {
			console.log(e);
		}
	}


	render(){
		const {isLoading, hasErrors, data} = this.state;
		const stylesObj = {
			color: this.state.textColor,
			backgroundImage: `url(${this.state.bgImage})`
	    }
		
		let qstring = QueryString.stringify(this.state.params);

		if(isLoading)
			return ( <div className="alert alert-info">Loading ... </div> );

		if(hasErrors && !isLoading)
			return ( <div className="alert alert-danger">Error</div> );

		if(!isLoading && !hasErrors) {
			return ( 
				<div id="app-wrap" className="d-flex align-items-center" style={stylesObj}>
					
					<div className="container-fluid">
						<div className="row">
							<div className="col-5">
								<Weather data={data} color={this.state.textColor} showDate={this.state.showDate} />
							</div>

							<div className="col-7 align-self-center">
								<Forecast data={data} color={this.state.textColor} />
							</div>
						</div>
					</div>
					
					<Link to={`/admin?${qstring}`} className="link-fixed">Admin</Link>	
				</div>
			)	
		}
	}


}

export default Home;
