import React from 'react';
import Msg from './Msg';
export default  class Input extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);

	}

	handleChange(e) {
		const value = e.target.value;
		const trim = function(str){ //删除左右两端的空格
		　　     return str.replace(/(^\s*)|(\s*$)/g, '');
		　　 }
		const valid = function(value, rule, rules) {
	        if(rule) {
	            const ruleList = rule.split(';');
	            value = trim(value);
	            for(var j = 0,rlen=ruleList.length;j < rlen;j++) {
	                var curRule = trim(ruleList[j]);
                    if(value === '') {
                        if(curRule === 'required') {
                            ////me.focusOnError($cur);
                            return false;
                        }
                    }else{
    	                if(curRule !== '') {
                            if( /^length/.test(curRule) ) {
                                var min = curRule.match(/\d+~/);
                                var max = curRule.match(/~\d+/);
                                min = min === null ? min : min[0].replace('~','');
                                max = max === null ? max : max[0].replace('~','');
                                if(min&& value.length < min) {
                                    ////me.focusOnError($cur);
                                    return false;
                                }
                                if(max&& value.length > max) {
                                    ////me.focusOnError($cur);
                                    return false;
                                }
                            }else if( /^range/.test(curRule) ) {
                                console.log('range');
                                var minR = curRule.match(/\d+~/);
                                var maxR = curRule.match(/~\d+/);
                                value = Number(value);
                                if(isNaN(value) || value < minR[0].replace('~','') || value > maxR[0].replace('~','')) {
                                    ////me.focusOnError($cur);
                                    return false;
                                }
    	                    }else if( Object.prototype.toString.call( rules[curRule] ) === '[object Array]') {
    	                        var reg = rules[curRule][0];
    	                        if( !reg.test(value) )  {
    	                            //me.focusOnError($cur);
    	                            return false;
    	                        }
    	                    }else if( typeof rules[curRule] === 'function' ) {
    	                        if( rules[curRule](value) !== true ) {
    	                            //me.focusOnError($cur);
    	                            return false;
    	                        }
                            //自定义正则规则
    	                    }else if( /^\//.test(curRule) ) {
                                var cReg = new RegExp(curRule);
                                if(!cReg.test(value)) {
                                    //me.focusOnError($cur);
                                    return false;
                                }
                            }
    	                }
                    }
	            }
	        }
		    	   
    	    return true;
    	};
		const rules = {
		    digits: [/^\d+$/, '请输入数字'],
		    email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, '请输入有效的邮箱'],
		    chinese: [/^[\u0391-\uFFE5]+$/, '请输入中文字符'],
		    password: [/^[\S]{6,16}$/, '请输入6-16位字符，不能包含空格'],
		    passwordPlus: function(val) {
		    	var value = val;
		        if(/^[\S]{6,16}$/.test(value)) {
		            var rule1 = /\d/.test(value) ? 1 : 0;
		            var rule2 = /[A-Za-z]/.test(value) ? 1 : 0;
		            var rule3 = /[^a-zA-Z0-9]/.test(value) ? 1 : 0;
		            if(rule1 + rule2 + rule3 < 2) {
		                return false;
		            }
		        }else{
		            return false;
		        }
		        
		        return true;
		    },
		    tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, '请输入有效的电话号码'],
		    money: [/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/, '请输入有效的金额'],
		    idcard: function(val) {
		        var value = val,
		            isValid = true;
		        var cityCode = {11:'北京',12:'天津',13:'河北',14:'山西',15:'内蒙古',21:'辽宁',22:'吉林',23:'黑龙江 ',31:'上海',32:'江苏',33:'浙江',34:'安徽',35:'福建',36:'江西',37:'山东',41:'河南',42:'湖北 ',43:'湖南',44:'广东',45:'广西',46:'海南',50:'重庆',51:'四川',52:'贵州',53:'云南',54:'西藏 ',61:'陕西',62:'甘肃',63:'青海',64:'宁夏',65:'新疆',71:'台湾',81:'香港',82:'澳门',91:'国外 '};
		        
		        /* 15位校验规则： (dddddd yymmdd xx g)    g奇数为男，偶数为女
		         * 18位校验规则： (dddddd yyyymmdd xxx p) xxx奇数为男，偶数为女，p校验位

		            校验位公式：C17 = C[ MOD( ∑(Ci*Wi), 11) ]
		                i----表示号码字符从由至左包括校验码在内的位置序号
		                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
		                Ci 1 0 X 9 8 7 6 5 4 3 2
		         */
		        var rFormat = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;    // 格式验证

		        if ( !rFormat.test(value) || !cityCode[value.substr(0,2)] ) {
		            isValid = false;
		        }
		        // 18位身份证需要验证最后一位校验位
		        else if (value.length === 18) {
		            var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
		            var Ci = '10X98765432'; // 校验字符
		            // 加权求和
		            var sum = 0;
		            for (var i = 0; i < 17; i++) {
		                sum += value.charAt(i) * Wi[i];
		            }
		            // 计算校验值
		            var C17 = Ci.charAt(sum % 11);
		            // 与校验位比对
		            if ( C17 !== value.charAt(17) ) {
		                isValid = false;
		            }
		        }
		        return isValid || '请输入正确的身份证号码';
		    }
		};

		if(valid(value, this.props.rule, rules)) {
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

