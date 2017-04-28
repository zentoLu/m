import React from 'react';
export default  class Msg extends React.Component {
	render() {
		return (
			<div className="msg-box">
			    <i className="icon icon-error"></i>
			    <span className="msg-text text-red">请输入正确的{this.props.cnName}</span>
			</div>
		);
	}
}
