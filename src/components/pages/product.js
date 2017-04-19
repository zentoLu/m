import React from 'react';
import Head from '../Head';
import Foot from '../Foot';
import $ from 'n-zepto';
//import { Link }  from 'react-router';
export default  class product extends React.Component {
	constructor(props) {
	   super(props);
	   //初始状态
	   this.state = {
	   	list: [],
	   	listEl: ' '
	   };
	}
	componentDidMount() {
		$.ajaxPost('/front/indexNotLogin.do?action=getProductSJ', function(d) {
		    this.setState({
		    	list: d.data.list,
		    	listEl: d.data.list.map((d) =>
		    	<li className="item btn-mask" key={d.id}>
					<div className="title">
						<h3 className="fs28"><i className="icon icon-wangshang"></i><span>{d.partnerName} {d.name}</span></h3>
					</div>
					<div className="table">
						<ul className="info-list flex-layout">
							<div className="td em7">
								<div className="td-label fs24">月利率(%)</div>
								{ d.minRate !== d.maxRate ?
								(<div className="td-content yellow fs30">{d.minRate}-{d.maxRate}</div>) :
								(<div className="td-content yellow fs30">{d.minRate}</div>)
								}
							</div>
							<div className="td em7">
								<div className="td-label fs24">额度(万元)</div>
								{d.minLoanAmount==d.maxLoanAmount ?
								(<div className="td-content fs30">{d.maxLoanAmount}</div>) :
								(<div className="td-content fs30">{d.minLoanAmount}-{d.maxLoanAmount}</div>)
								}
							</div>
							<div className="td flex">
								<div className="td-label fs24">开放区域</div>
								<div className="td-content fs26">{d.secondHomeArea||'无'}</div>
							</div>
						</ul>
					</div>
		    	</li>
		    	)
		    });
		    
		}.bind(this));
	}
	render() {
	   return (
	   	<div className="transition-item product-page p-animate">
	   		<Head title="产品介绍" />
			<div className="product">
				<div className="tac">
					<div className="btn-group clearfix">
						<div className="btn-r fl li-mask" id="hasLoan">数据贷款</div>
						<div className="btn-r fl li-mask" id="notLoan">小微企业贷</div>
					</div>
				</div>
				<ul className="list">
					{this.state.listEl}
				</ul>
			</div>
			<Foot  />
		</div>
	   );
	}
}
