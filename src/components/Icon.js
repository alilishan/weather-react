import React, { Component } from 'react';
import { WiDaySunny, 
		WiThunderstorm, 
		WiRainMix, 
		WiCloudy, 
		WiNA 
	} from "weather-icons-react";

class Icon extends Component {

	constructor(props) {
		super(props);

		this.state = {
			size: props.size,
			color: props.color,
			code: props.code
		}

		// console.log(props)
	}


	componentDidMount() { }


	render(){

		switch(this.state.code){
			case 1:
			case 2:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
				return ( <WiDaySunny size={this.state.size} color={this.state.color} /> );

			case 3:
			case 4:
				return ( <WiThunderstorm size={this.state.size} color={this.state.color} /> );

			case 11:
			case 12:
				return ( <WiRainMix size={this.state.size} color={this.state.color} /> );

			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
				return ( <WiCloudy size={this.state.size} color={this.state.color} /> );

			default:
				return ( <WiNA size={this.state.size} color={this.state.color} /> );
					
		}
	}

}

export default Icon;