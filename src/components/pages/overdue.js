import React from 'react';
import Head from '../Head';
import Service from '../CustomerService';
export default  class OverDue extends React.Component {
	render() {
	   return (
			<div className="transition-item p-animate material page-sealNotSuccess">
				<Head title="签约失效" />
				<div className="app-content">
					<div className="tac notice">您未及时签约，为了您的资金安全，请本人联系客服重新签约。</div>
					<Service />
				</div>
		  	</div>
	   );
	}
}