export const setNavLocalstorage = (data) => {
	localStorage.v_navs = JSON.stringify(data)
}

export const setExpressLocalstorage = (data) => {
	localStorage.v_express = JSON.stringify(data)
}
export const getExpressLocalstorage = () => {
	return JSON.parse(localStorage.v_express)
}
