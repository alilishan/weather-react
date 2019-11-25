import React, { Component } from 'react';
import Moment from 'react-moment';
import Icon from './Icon';

class Weather extends Component {
	_isMounted = false;
	_timeInterval = 0;

	constructor(props) {
		super(props);
		
		this.state = {
			color: props.color,
			showDate: props.showDate,
			condition: props.data.current_observation.condition,
			forecasts: props.data.forecasts,
			location: props.data.location,
		};

		// console.log(this.state);
	}


	componentDidMount() {
		this._isMounted = true;
		this.getDate();
	}



	componentWillUnmount() {
		this._isMounted = false;

		if (this._timeInterval) {                      
			clearInterval(this._timeInterval); 
			this._timeInterval = 0;           
		} 
	}


	getDate = () => {
		// Setinterval to update
		if(this._isMounted && this.state.showDate){
			this._timeInterval = setInterval(() => {
				this.setState({
					todayDate: new Date()
				});
			}, 60000);
		}
	}


	render(){
		const iconStyle = {width: '100%', maxWidth: '128px'}

		return (
			<div className="weather text-center">
				<div className="weather-content">
					<div className="svg-icon" style={iconStyle}>
						<div className="svg-icon-inner">
							<Icon color={this.state.color} code={this.state.condition.code} />
						</div>
					</div>

					<p className="weather-text lead m-0 p-0 border-bottom w-100 pb-2">{this.state.condition.text}</p>
					
					<p className="weather-info lead text-uppercase m-0 py-3">
						{this.state.showDate && <span className="d-none d-md-inline-block"><Moment format="dddd, MMM DD" >{this.state.condition.todayDate}</Moment></span>}
						{this.state.showDate && <span className="px-3 d-none d-md-inline-block">&bull;</span>}
						<span>{this.state.location.city}</span>
					</p>
					
					<div className="weather-temp display-2">{this.state.condition.temperature}&deg;C</div>

					<p className="weather-hl py-3">
						<span className="pr-2 font-weight-bold">H</span>
						<span className="pr-2">{this.state.forecasts[0].high}&deg;</span>
						<span className="px-3 font-weight-bold">L</span>
						<span className="pr-2">{this.state.forecasts[0].low}&deg;</span>
					</p>

				</div>
			</div>
		)
	}

}

export default Weather;
