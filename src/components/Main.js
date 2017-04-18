import About from './about';
import Topics from './topics';
import $ from 'n-zepto';
import React from 'react';
import Home from './Home';
import { Router, Route, IndexRoute, browserHistory }  from 'react-router';

// 全局名称空间
(function(G, ua) {
    // Base path
    G.base = location.href.match(/[^?#]*\//)[0];
    // 是否调试
    G.debug = !!location.port || location.hostname === 'localhost' || location.hostname === '172.20.15.78' || ~location.hostname.indexOf('192.168') || /proxy.qqbrowser.cc/.test(location.hostname);
    /*if(location.hostname.indexOf('172.20.10.37') > -1) {
        G.debug = false;
    }*/
    //过渡环境
    G.tEnv = !!~location.hostname.indexOf('172.20') || ~location.hostname.indexOf('172.20.10.37') || ~location.hostname.indexOf('120.132.144.122');
    //正式环境

    // 运行环境
    G.os = {
        weixin: /MicroMessenger/.test(ua),
        xuntong: /Qing\/.*;(iPhone|Android).*/.test(ua),
        hybrid: /kdbapp$/.test(ua),
        android: /(Android);?[\s\/]+([\d.]+)?/.test(ua),
        ios: /iP(hone|ad|od);/.test(ua),
        ie: document.documentMode || +(ua.match(/MSIE (\d+)/) && RegExp.$1)
    };
    //G.os.xuntong = true;
    G.env = !G.os.hybrid ? !G.os.weixin ? !G.os.xuntong ? 'other' : 'xuntong' : 'weixin' : 'hybrid';

    // 添加环境class
    $('html').addClass($.map(G.os, function(v, k) {
        if (v && k !== 'version') return 'os-' + k }).join(' '));
    // 隐藏标题栏
    if (G.os.weixin || G.os.xuntong) $('html').addClass('hide-title');

   
})(window.G = {}, navigator.userAgent);


class AppComponent extends React.Component {
  render() {
      return (
        	<Router history={browserHistory}>
        		<Route path="/" component={Home}>
      	      	<IndexRoute component={Home} />
      	      	<Route path="/about" component={About}/>
            		<Route path="/topics" component={Topics}/>
                <Route path="/m/topics" component={Topics}/>
      	    </Route>
        	</Router>
      )
    }

}



export default AppComponent