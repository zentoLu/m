import React from 'react';
import Msg from './Msg';
import valid from './Valid';
export default  class Input extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);

	}

	handleChange(e) {
		const value = e.target.value;
		if(valid(value, this.props.rule)) {
			this.valid = true;
		}else{
			this.valid = false;
		}
	    this.props.onValid({
    		valid: this.valid, //必填元素，非必填或者回填过就设置为true
    		value: value,
    		isChanged: true //关闭首次校验
    	});
	}

	render() {
		const  it = this.props;
		const  value = it.range.value;
		if(!it.range) {
			console.log('未设置range属性');
			return null;
		}
	   	return (
	   		<div>
				<div className={'name-box list-item item-'+it.name}>
		            <div className="content" htmlFor={it.name}>
		                <label className={'label mr1 label-'+it.name}>{it.cnName}</label>
		                <input onChange={this.handleChange} value={value} type="text" name={it.name}
		                placeholder={'请输入'+it.cnName} id={it.name} className={'text-black '+it.name} />
		            </div>
		        </div>
		        { it.range.isChanged && !it.range.valid && <Msg cnName={it.cnName} />}
	   		</div>
	   	);
	}
}

