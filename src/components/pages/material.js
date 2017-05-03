import React from 'react';
import Head from '../Head';
import Foot from '../Foot';
import Step from '../Step';
import Input from '../form/Input';
import $ from 'n-zepto';
export default  class material extends React.Component {
	constructor(props) {
	    super(props);
	    //console.log(props);
	    this.legalnameValid = this.legalnameValid.bind(this);
	    this.idCardNoValid = this.idCardNoValid.bind(this);
	    this.mobileValid = this.mobileValid.bind(this);
	    this.captchaValid = this.captchaValid.bind(this);
	    this.submit = this.submit.bind(this);
	    this.state = {
	    	captcha: {
	    		valid: false,
	    		value: '',
	    		isChanged: false
	    	},
	    	mobile: {
	    		valid: false,
	    		value: '',
	    		isChanged: false
	    	},
	    	legalname: {
	    		valid: false, //必填元素，非必填或者回填过就设置为true
	    		value: '',
	    		isChanged: false //关闭首次校验
	    	},
	    	idCardNo: {
	    		valid: false, //必填元素，非必填或者回填过就设置为true
	    		value: '',
	    		isChanged: false //关闭首次校验
	    	}
	    };
	}

	legalnameValid(obj) {
		this.setState({
			legalname:obj
		});
	}

	idCardNoValid(obj) {
		this.setState({
			idCardNo:obj
		});
	}

	mobileValid(obj) {
		this.setState({
			mobile:obj
		});
	}

	captchaValid(obj) {
		this.setState({
			captcha:obj
		});
	}

	submit() {
		/*if(this.state.legalname.valid&&this.state.idCardNo.valid) {
			alert('通过');
			this.nameElement.focus();
		}else{
			.serializeArray()
			alert('不通过');
			this.idElement.focus();
		}*/

		//const me = this;
		//-----------检验--------
		//-----------提交--------
		$.ajaxPost('/selfLoanAction.do?action=syncSaicInfo', $('#form').serialize() , function(d) {
			console.log(d);
		});
	}

	sendCaptha() {
		$.ajaxPost('', {} , function() {

		});
	}

	render() {
		//console.log(this.props);
	   	return (
			<div className="transition-item p-animate material page-material">
				<Head title="录入申贷资料" />
				<div className="app-content">
			   		<Step n="1" />
			   		<form id="form" ref={el => this.formEl = el} >
				   		<section className="info">
				   			<h2><i className="icon icon-bar-graph"></i><span className="fs30 text-black">公司基本信息</span></h2>
				   	        <div className="name-box list-item">
				   	            <div className="content" htmlFor="custname">
				   	                <label className="label mr1">企业名称</label>
				   	                <input type="text" readOnly="readonly" name="custname" placeholder="请输入姓名" id="custname" className="custname text-black" value="镇江金蝶软件有限公司" />
				   	            </div>
				   	        </div>
				   	        <div className="name-box list-item">
				   	            <div className="content" htmlFor="code">
				   	                <label className="label mr1">企业对公账号</label>
				   	                <input type="text" readOnly="readonly" name="companyBankNo" placeholder="请输入企业对公账号" id="code" className="code text-black" value="6222600810010710887" />
				   	            </div>
				   	        </div>
				   	        <div className="name-box list-item">
				   	            <div className="content" htmlFor="code">
				   	                <label className="label mr1">企业对公账号银行</label>
				   	                <input type="text" readOnly="readonly" name="companyBankName" placeholder="企业对公账号银行" id="code" className="code text-black" value="交通银行" />
				   	            </div>
				   	        </div>
				   	        <div className="list-item">
				   	        	<div className="content">
				   	        		<label htmlFor="three">
				   	        			<input id="three" type="checkbox" className="checkbox" />
				   	        			<span>企业已三证合一</span>
				   	        		</label>
				   	        	</div>
				   	        </div>
				   		</section>
				   		<section className="info">
				   			<h2><i className="icon icon-head"></i><span className="fs30 text-black">法定代表人信息</span></h2>
				   			<Input rule="required;chinese" inputRef={el => this.nameElement = el}  range={this.state.legalname} name="legalname" cnName="姓名" onValid={this.legalnameValid} />
				   			<Input rule="required;idcard" inputRef={el => this.idElement = el}  range={this.state.idCardNo}  name="idCardNo" cnName="身份证号码" onValid={this.idCardNoValid} />
				   			<Input rule="required;mobile" inputRef={el => this.mobileElement = el}  range={this.state.mobile}  name="mobile" cnName="手机号码" onValid={this.mobileValid} />
				   			<div className="relative">
				   				<Input rule="required;/^\d{4}$/" inputRef={el => this.captchaElement = el}  range={this.state.captcha}  name="captcha" cnName="验证码" onValid={this.captchaValid} />
				   				<div className="absolute btn-get-captcha btn-mask" onClick={this.sendCaptha} >
				   					获取
				   				</div>
				   			</div>
				   		</section>
				   	</form>
			   		<div className="btn-box">
			   			<div className="btn-mask bun-blue" id="submit" onClick={this.submit}>下一步</div>
			   		</div>
			   	</div>
				<Foot  />
		  	</div>
	   	);
	}
}

