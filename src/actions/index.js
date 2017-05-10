export function setRoute(value) {
	return {
		type: 'ROUTE_SET',
		route: value
	}
}


export function setHash(value) {
	return {
		type: 'ROUTE_HASH',
		route: value
	}
}

export function getProductSJ(data) {
	return {
		type: 'GetProductSJ',
		data
	}
}

export function materialVals(values) {
	return {
		type: 'MaterialForm',
		values
	}
}

export function materialValid(values) {
	return {
		type: 'MaterialValid',
		values
	}
}

export function signData(data) {
	return {
		type: 'SignData',
		data
	}
}

export function signState(data) {
	return {
		type: 'SignState',
		data
	}
}

export function approve(data) {
	return {
		type: 'getData',
		data
	}
}

export const formVals =  data => ({ type: 'LOAD', data });
