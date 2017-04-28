import React from 'react';
import Head from '../Head';
import Step from '../Step';
export default  class Approve extends React.Component {
	render() {
	   return (
			<div className="transition-item p-animate material page-approve">
				<Head title="完成申请" />
				<div className="app-content">
					<Step n="3" />
					<div className="tac">
						<div className="finish-notice inline-block">
							您已完成贷款申请，我们会在24小时内审批受理放款，请保持手机号码畅通
						</div>
					</div>
					<div className="info">
						<h3>贷款信息</h3>
						<div className="clearfix detail">
							<div className="fl">贷款金额：10万元</div>
							<div className="fl">月利率：0.5%</div>
							<div className="fl">贷款期限：12个月</div>
							<div className="fl">还款方式：等本等息</div>
							<div className="fl">贷款用途：   支付金蝶货款</div>
						</div>
					</div>
					<div className="info">
						<h3>还款信息：</h3>
						<div className="detail">
							<div className="item">还款银行卡号：254102484512000</div>
							<div className="item">还款主体：金蝶互联网金融服务有限公司</div>
							<div className="item">还款方式：          每月主动还款</div>
						</div>
					</div>
					<div className="notice tac">关注微信公众号查看还款计划，请按时还款</div>
					<div className="tac">
						<div className="inline-block qrcode">
							<img src="img/kdjr_8.png" />
						</div>
						<div className="text">长按扫描二维码</div>
					</div>
				</div>
		  	</div>
	   );
	}
}