import About from './pages/about';
import Topics from './pages/topics';
import Product from './pages/product';
import Material from './pages/material';
import $ from 'n-zepto';
import React from 'react';
import Home from './Home';
import { Router, Route, IndexRoute, hashHistory }  from 'react-router';

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

    //默认的ajax , post 请求
    $.ajaxPost = $.ajaxDefault = function(url, data, success, err, get) {
        if (typeof data === 'function') {
            $.ajaxPost(url, {}, data, success, err);
            return;
        }
        if(!err) {
            err = window.console.log;
        }
        if(G.debug) {
            url = 'http://172.20.111.91' + url;
        }
        $.ajax({
            url: url,
            data: data,
            type: get ? 'get' :'post',
            dataType: 'json',
            success: function(d) {
                if (!d) {
                    d = {status: 600, msg: '服务器错误'};
                }
                
                // 成功
                if (d.status === 200 || d.status === 250 || d.status === 8005) { //8005账号审核不通过
                    d.ok = true;
                    if (typeof d.data === 'undefined') {d.data = {};}
                    // 执行done，结束请求
                    
                    success(d);
                    return;
                }
                
                // 登录超时
                if (d.status === 6002 || d.status === 502) {
                    var redirect = encodeURIComponent(location.hash);
                    location.href = '/m/#login/login?redirect=' + redirect;

                } else {
                    // 执行done，结束请求
                    success(d);
                }
            },
            error: function(d) {
                err(d);
            }
        });
    }

    // 全局超时时间
    $.ajaxSettings.timeout = 120*1000;
    var app = {
        showError: showError,       //提示错误
        showMsg: showMsg,           //提示消息
        hideMsg: hideMsg,           //隐藏消息
        showConfirm: showConfirm,   //提示确认
        showLoading: showLoading,   //提示加载中
        hideLoading: hideLoading,
        post: $.ajaxPost   //隐藏加载中
    };
    window.app = app;
    // 全局 ajax 事件
    $(document)
        .on('ajaxComplete', function() {
            /*var i;*/
            clearTimeout(app.loadingTicket);
            if (app.errorMsg) { // && jqXHR.status!=400
                if(/参数错误/.test(app.errorMsg) ){
                    app.errorMsg = '输入有误';
                }
                if(/权限认证失败/.test(app.errorMsg) && $('.page-b-backup').length !== 0){
                    app.errorMsg = null;
                    /*i = app.$xhr.length;
                    while(i--) {
                        if (xhr === app.$xhr[i]) {app.$xhr.splice(i-1, 1);}
                    }*/
                    return;
                }
                showError(app.errorMsg);
            }
            app.errorMsg = null;
            /*i = app.$xhr.length;
            while(i--) {
                if (xhr === app.$xhr[i]) {app.$xhr.splice(i-1, 1);}
            }*/
        })
        .on('ajaxStart', function() {
            // 超过 300ms 才显示 loading
            app.loadingTicket = setTimeout(function(){
                showLoading();
            }, 300);
        })
        .on('ajaxStop', function() {
            app.pageloading = false;
            if($('#app_msg .app-msg-loading').length > 0) {
                $('#app_msg').hide();
            }
            hideLoading();
        });

        // 提示一般消息
        function showMsg(msg, timer, callback, type, options) {
            if (typeof timer === 'function') {
                callback = timer;
                timer = undefined;
            }
            
            var $el = $('#app_msg');
            if (!$el.length) {
                $el = $('<div id="app_msg" class="app-msg"></div>').appendTo(document.body);
            }


            if (showMsg.timer) {
                clearTimeout(showMsg.timer);
            }
            if (timer === undefined) {
                timer = 3000;
            }
            if (timer && typeof timer === 'number') {
                showMsg.timer = setTimeout(function(){
                    hideMsg();
                    if (typeof callback === 'function') {
                        callback();
                    }
                }, timer);
            }
            if(!msgType[type]) {
                $el.html( msgType.default(msg) );
            }else{
                if(typeof options === 'object') {
                    options.$el = $el;
                }
                $el.html( msgType[type](type, msg, callback, options) );
            }
            
            $el.show();
            //$el.html( '<div class="app-msg-box app-msg-'+ (type || 'info') +'">' + msg + '</div>' );
        }


        var msgType = {
            default: function(msg) {
                return '<div class="pop-up"><article class="modal"><p class="content fs26 text-light">' + msg + '</p><footer class="fs28 li-mask text-blue" id="popClose">关闭</footer></article></div>';
            },
            loading: function(type, msg) {
                return '<div class="app-msg-box app-msg-'+ (type || 'info') +'">' + msg + '</div>';
            },
            confirm: function(type, msg, callback, options) {
                options.$el.on('click','.ok', options.ok);
                return '<div class="pop-up"><article class="modal"><p class="content fs26 text-light">' + msg + '</p><footer class="fs28 li-mask text-blue ok" id="popClose">'+options.okValue+'</footer></article></div>';
            }
        };
        $('body').on('click','#popClose',function() {
            $('#app_msg').html('').hide();
        });
        // 提示错误消息
        function showError(msg, timer, callback) {
            showMsg(msg, timer, callback, 'error');
        }
        // 自定义控制区(确认)
        function showConfirm(msg, options) {
            showMsg(msg, '0', $.noop, 'confirm', options);
        }
        // 提示加载中
        function showLoading() {
            showMsg('<div class="spinner"><i></i></div><div class="loading">加载中</div>', null, null, 'loading');
        }
        function hideLoading() {
            $('#app_msg .app-msg-loading').remove();
            //$('#app_msg').remove();
        }
        // 隐藏消息
        function hideMsg() {
            $('#app_msg').html('').hide();
        }

})(window.G = {}, navigator.userAgent);


class AppComponent extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home}>
                    <IndexRoute component={About} />
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                    <Route path="/product" component={Product}/>
                    <Route path="/material" component={Material}/>
                </Route>
            </Router>
        )
    }
}

export default AppComponent