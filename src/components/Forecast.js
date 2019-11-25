import React, { Component } from 'react';
import Icon from './Icon';


class Forecast extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			color: props.color,
			forecasts: props.data.forecasts
		}

		// console.log(props);
	}


	componentDidMount() { }


	render(){
		return (
			<div className="row forcast">

				{this.state.forecasts.slice(1, 5).map((item, index) => (
					<div className="col-3 text-center" key={index}>
						<div className="svg-icon">
							<div className="svg-icon-inner">
								<Icon color={this.state.color} code={item.code} />
							</div>
						</div>
						<p className="forcast-temp lead m-0 p-0">{item.high}&deg;</p>
						<p className="forcast-day lead m-0 p-0">{item.day}</p>
					</div>
				))}

			</div>
		)
	}

}

export default Forecast;