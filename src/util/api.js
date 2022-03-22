import { ROOT_API } from './../../constant';
import axios from 'axios';

const createParams = (data) => {
	if (!data) return '';

	let searchParams = new URLSearchParams(data);

	return '?' + searchParams;
};

const handleFetch = async (url, options) => {
	try {
		let response = await axios({ url: url, ...options });

		let jsonData = await response.data;

		return { res: jsonData };
	} catch (error) {
		console.log('Error');
		console.log(error);
		return { res: null, message: error.message };
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
	const { message, res } = await handleFetch(
		ROOT_API + '/' + url + params,
		restOptions
	);

	return { message, res };
};

export default sendRequest;
