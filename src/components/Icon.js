import React, { Component } from 'react';
import { WiDaySunny, 
		WiThunderstorm, 
		WiRainMix, 
		WiCloudy, 
		WiNA,
		WiDayCloudy,
		WiNightAltCloudy
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

		// console.log(this.state.code);
		// https://najens.github.io/weather-icons-react/

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
			case 37:
			case 38:
			case 39:
			case 45:
			case 47:
				return ( <WiThunderstorm size={this.state.size} color={this.state.color} /> );

			case 32:
			case 34:
			case 35:
			case 36:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 46:
				return ( <WiDayCloudy size={this.state.size} color={this.state.color} /> );

			case 11:
			case 12:
				return ( <WiRainMix size={this.state.size} color={this.state.color} /> );

			case 27:
				return ( <WiDayCloudy size={this.state.size} color={this.state.color} /> );

			case 28:
				return ( <WiNightAltCloudy size={this.state.size} color={this.state.color} /> );

			case 24:
			case 25:
			case 26:
			case 29:
			case 30:
				return ( <WiCloudy size={this.state.size} color={this.state.color} /> );

			case 3200:
				return ( <WiNA size={this.state.size} color={this.state.color} /> );

			default:
				return ( <WiNA size={this.state.size} color={this.state.color} /> );
					
		}
	}

}

export default Icon;

/** 
	// Yahoo Weather Codes
	// https://www.webdesignerdepot.com/2012/12/how-to-harness-yahoos-weather-api/
	// https://gist.github.com/coryetzkorn/d537887aa917f1e1dcb0


	<yahoo-weather-codes>
	  <code number="0" description="tornado"/>
	  <code number="1" description="tropical storm"/>
	  <code number="2" description="hurricane"/>
	  <code number="3" description="severe thunderstorms"/>
	  <code number="4" description="thunderstorms"/>
	  <code number="5" description="mixed rain and snow"/>
	  <code number="6" description="mixed rain and sleet"/>
	  <code number="7" description="mixed snow and sleet"/>
	  <code number="8" description="freezing drizzle"/>
	  <code number="9" description="drizzle"/>
	  <code number="10" description="freezing rain"/>
	  <code number="11" description="showers"/>
	  <code number="12" description="showers"/>
	  <code number="13" description="snow flurries"/>
	  <code number="14" description="light snow showers"/>
	  <code number="15" description="blowing snow"/>
	  <code number="16" description="snow"/>
	  <code number="17" description="hail"/>
	  <code number="18" description="sleet"/>
	  <code number="19" description="dust"/>
	  <code number="20" description="foggy"/>
	  <code number="21" description="haze"/>
	  <code number="22" description="smoky"/>
	  <code number="23" description="blustery"/>
	  <code number="24" description="windy"/>
	  <code number="25" description="cold"/>
	  <code number="26" description="cloudy"/>
	  <code number="27" description="mostly cloudy (night)"/>
	  <code number="28" description="mostly cloudy (day)"/>
	  <code number="29" description="partly cloudy (night)"/>
	  <code number="30" description="partly cloudy (day)"/>
	  <code number="31" description="clear (night)"/>
	  <code number="32" description="sunny"/>
	  <code number="33" description="fair (night)"/>
	  <code number="34" description="fair (day)"/>
	  <code number="35" description="mixed rain and hail"/>
	  <code number="36" description="hot"/>
	  <code number="37" description="isolated thunderstorms"/>
	  <code number="38" description="scattered thunderstorms"/>
	  <code number="39" description="scattered thunderstorms"/>
	  <code number="40" description="scattered showers"/>
	  <code number="41" description="heavy snow"/>
	  <code number="42" description="scattered snow showers"/>
	  <code number="43" description="heavy snow"/>
	  <code number="44" description="partly cloudy"/>
	  <code number="45" description="thundershowers"/>
	  <code number="46" description="snow showers"/>
	  <code number="47" description="isolated thundershowers"/>
	  <code number="3200" description="not available"/>
	</yahoo-weather-codes>

*/