import React from 'react';
import Head from '../Head';
import Foot from '../Foot';
import Step from '../Step';
export default  class Sign extends React.Component {
	render() {
	   return (
			<div className="transition-item p-animate material page-sign">
				<Head title="签约" />
				<div className="app-content">
					<Step />
					<section className="middle-content">
						<h2>亲爱的韦小宝：</h2>
						<div>请确认您的贷款信息。</div>
						<div className="table">
							<table>
								<thead>
									<tr>
										<th>贷款类型</th>
										<th>金额</th>
										<th>期限</th>
										<th>还款方式</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>质押带</td>
										<td>12.9</td>
										<td>12</td>
										<td>等本等息</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="notice">为了资金安全，上传您的手持身份证照片完成审批。</div>
						<div className="upload-part new-flex-layout">
							<label className="new-flex relative">
								<div className="idCard idCardFrontSP">
									<div className="add">
										<img src="/m/img/not_data/icon-add.png" />
									</div>
									<div className="add-text">点击上传</div>
								</div>
								<input className="inputFiles" id="idCardFront" type="file" name="idCardFront" accept="image/*" capture="camera" />
							</label>
							<div className="new-flex example">
								<img src="/m/img/authentication/frontIdCard.png" />
							</div>
						</div>
						<div className="agree-box">
							<input type="checkbox" className="checkbox" />
							<span className="text">我已阅读并同意签署《借款合同》，如果资料有误，可能会影响您的审批。</span>
						</div>
					</section>
					<div className="btn-box">
						<div className="btn-mask bun-blue" id="submit">下一步</div>
					</div>
				</div>
				<Foot  />
		  	</div>
	   );
	}
}