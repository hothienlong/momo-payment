// import { ROOT_API } from './../../constant';
import axios from 'axios';
import { getResponse } from './response';
const ROOT_API = 'https://test-payment.momo.vn/v2/gateway/api';

const createParams = (data) => {
	if (!data) return '';

	let searchParams = new URLSearchParams(data);

	return '?' + searchParams;
};

const handleFetch = async (url, options) => {
	try {
		let response = await axios({ url: url, ...options });

		let jsonData = await response.data;

		let body = getResponse(jsonData, false);

		return body;
	} catch (error) {
		console.log('Error');
		console.log(error);
		let response = getResponse(error, true);
		return response;
	}
};

const sendRequest = async (method, options) => {
	const { url, data = {}, ...restOptions } = options;

	restOptions.method = method;
	restOptions.headers = { 'Content-Type': 'application/json' };

	let params = '';

	switch (method) {
		case 'POST':
		case 'post':
		case 'PUT':
		case 'put':
			restOptions.data = data;
			//console.log("post body: ", data)
			break;
		case 'GET':
		case 'get':
		case 'DELETE':
		case 'delete':
			params = data ? createParams(data) : '';
			break;
		default:
			break;
	}
	console.log(data);
	const response = await handleFetch(
		ROOT_API + '/' + url + params,
		restOptions
	);

	return response;
};

export default sendRequest;
