import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
function products(state = {data:{list:[]}}, action) {
	//console.log(action,state);
	switch(action.type) {
		case 'GetProductSJ':
			return {
				...state,
				data: action.data
			};
		default:
			return state;
	}
}

function materials(state = {}, action) {
	//console.log(state.values,action.values,Object.assign({},state.values, action.values));
	switch(action.type) {
		case 'MaterialForm':
			return {
				...state,
				values: Object.assign({}, state.values, action.values)
			};
		case 'MaterialValid':
			return {
				...state,
				rules: Object.assign({}, state.rules, action.values)
			};
		default:
			return state;
	}
}

function sign(state={data:{},signState:{
	captchaBtn: {
		disabled: true,
		text: '发送'
	}
}},action) {
	//console.log(state.signState,action.data,Object.assign({}, state.signState, action.data));
	switch(action.type) {
		case 'SignData':
			return {
				...state,
				data: Object.assign({}, state.data, action.data)
			};
		case 'SignState':
			return {
				...state,
				signState: Object.assign({}, state.signState, action.data)
			};
		default:
			return state;
	}
}

function contractFromVals(state={},action) {
	switch (action.type) {
    case 'LOAD':
      return {
        data: action.data
      };
    default:
      return state;
  	}
}

function approve(state={},action) {
	switch (action.type) {
    case 'getData':
      return Object.assign({}, state, action.data);
    default:
      return state;
  	}
}

function login(state={
	values: {}
}, action) {
	switch(action.type) {
		case 'LoginForm':
			return {
				...state,
				values: Object.assign({}, state.values, action.values)
			};
		default:
			return state;
	}
}

function bindMobile(state={
	values: {}
}, action) {
	switch(action.type) {
		case 'BindMobileForm':
			return {
				...state,
				values: Object.assign({}, state.values, action.values)
			};
		default:
			return state;
	}
}

function purpose(state={
	values: {}
}, action) {
	switch(action.type) {
		case 'PurposeData':
			return {
				...state,
				values: Object.assign({}, state.values, action.values)
			};
		case 'ToggleView':
			console.log('toggle', action, state);
			return state;
		default:
			return state;
	}
}

function apply(state={
	values: {}
}, action) {
	switch(action.type) {
		case 'applyForm':
			return {
				...state,
				values: Object.assign({}, state.values, action.values)
			};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
  	products,
  	materials,
  	contractFromVals,
  	sign,
  	approve,
  	login,
  	bindMobile,
  	purpose,
  	apply,
  	form: reduxFormReducer
});

export default rootReducer
