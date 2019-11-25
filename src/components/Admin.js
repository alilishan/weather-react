import React, { Component } from 'react';
import QueryString from 'query-string'; 
import { Link } from "react-router-dom";


class Admin extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			params: QueryString.parse(this.props.location.search)
		};
	}

	componentDidMount() {
	}

	render(){
		let qstring = QueryString.stringify(this.state.params);

		return ( 
			<div>

				<span>Admin</span>
				<Link to={`/?${qstring}`} className="link-fixed">App</Link>
			</div>
		)
	}
}

export default Admin;