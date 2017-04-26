import React from 'react';
import Head from '../Head';
import Foot from '../Foot';
import Step from '../Step';
import Input from '../Input';
export default  class material extends React.Component {
	render() {
	   return (
			<div className="transition-item p-animate material page-material">
				<Head title="录入申贷资料" />
				<Content />
				<Foot  />
		  	</div>
	   );
	}
}

class Content extends React.Component {
	constructor(props) {
	    super(props);
	    this.legalnameValid = this.legalnameValid.bind(this);
	    this.idCardNoValid = this.idCardNoValid.bind(this);
	    this.submit = this.submit.bind(this);
	    this.state = {
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

	submit() {
		if(this.state.legalname.valid&&this.state.idCardNo.valid) {
			alert('通过');
		}else{
			alert('不通过');
		}
	}

	render() {
	return (
	   	<div className="app-content">
	   		<Step />
	   		<section className="info">
	   			<h2><i className="icon icon-cust"></i><span className="fs30 text-black">公司基本信息</span></h2>
	   	        <div className="name-box list-item">
	   	            <div className="content" htmlFor="custname">
	   	                <label className="label mr1">企业名称</label>
	   	                <input type="text" readOnly="readonly" name="custname" placeholder="请输入姓名" id="custname" className="custname text-black" />
	   	            </div>
	   	        </div>
	   	        <div className="name-box list-item">
	   	            <div className="content" htmlFor="code">
	   	                <label className="label mr1">企业对公账号</label>
	   	                <input type="text" readOnly="readonly" name="code" placeholder="请输入企业对公账号" id="code" className="code text-black" />
	   	            </div>
	   	        </div>
	   	        <div className="name-box list-item">
	   	            <div className="content" htmlFor="code">
	   	                <label className="label mr1">企业对公账号银行</label>
	   	                <input type="text" readOnly="readonly" name="code" placeholder="企业对公账号银行" id="code" className="code text-black" />
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
	   			<h2><i className="icon icon-person"></i><span className="fs30 text-black">法定代表人信息</span></h2>
	   			<Input rule="required;chinese"  range={this.state.legalname} name="legalname" cnName="姓名" onValid={this.legalnameValid} />
	   			<Input rule="required;idcard"  range={this.state.idCardNo}  name="idCardNo" cnName="身份证号码" onValid={this.idCardNoValid} />
	   		</section>
	   		<div className="btn-box">
	   			<div className="btn-mask bun-blue" id="submit" onClick={this.submit}>下一步</div>
	   		</div>
	   	</div>
	   	)
	}
}