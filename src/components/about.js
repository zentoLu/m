import React from 'react';
import Head from './Head';
import Foot from './Foot';
import { Link }  from 'react-router';
export default   class about extends React.Component {
	render() {
	   return (
   			<div className="transition-item about-page p-animate">
   				<Head title="about" />
   				<div className="app-content">
   					<div>
   					    <h2>About</h2>
   					    <Link to="/topics">topic1</Link>
   					</div>
   				</div>
   				<Foot  />
   		  	</div>
	   );
	}
}
