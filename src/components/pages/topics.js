import React from 'react';
import Head from '../Head';
import Foot from '../Foot';
import { Link }  from 'react-router';

export default   class Topics extends React.Component {
	render() {
	   return (
   			<div className="transition-item topic-page p-animate">
   				<Head title="topic" />
   				<div className="app-content">
					<div>
						<Link to="/about" > about</Link>
					    <h2>Topics</h2>
					</div>
				</div>
   				<Foot  />
   		  	</div>
	   );
	}
}