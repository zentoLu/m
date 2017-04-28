import React from 'react';
import $ from 'n-zepto';
class Head extends React.Component {
	constructor(props) {
	    super(props);
	    //this.state = {title: props.title};
	}

	setTitle(title) {
	    if (typeof title !== 'string') return;
	    $('h1.app-title').html(title);
	    document.title = title;

	    // 微信IOS环境不显示标题的bug
	    if(window.G.os.weixin) {
	        $('<iframe src="offline.html" style="display:none"></iframe>').on('load', function() {
	            var iframe = this;
	            setTimeout(function() {
	                $(iframe).off('load').remove();
	            }, 0);
	        }).appendTo('body');
	    }
	}

	componentDidMount() {
		this.setTitle(this.props.title);
	}
  	render() {
    	return 	!window.G.os.weixin && !window.G.os.xuntong && <div className="app-header ">
					<h1 className="app-title" id="bTitle">{this.props.title}</h1>
				</div>
  	}
}

export default Head