import React from 'react';
import PageTransition from 'react-router-page-transition';
export default   class about extends React.Component {
	render() {
	   return (
  	<div className="home">
      <PageTransition
        timeout={500}
      >
        {this.props.children}
      </PageTransition>
   	</div>
	   );
	}
}