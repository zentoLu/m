import React from 'react';
import Head from '../Head';
import Service from '../CustomerService';
export default  class Approve extends React.Component {
	render() {
	   return (
			<div className="transition-item p-animate material page-sealNotSuccess">
				<Head title="待审批" />
				<div className="app-content">
					<div className="tac notice">公司信息不完善，无法完成在线审批请联系客服协助人工审批</div>
					<Service />
				</div>
		  	</div>
	   );
	}
}