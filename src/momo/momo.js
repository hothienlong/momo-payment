import { v4 as uuidv4 } from 'uuid';
import sendRequest from '../util/api';
import config from '../../config.json';
import Crypto from './crypto';

class Momo {
	static #instance = null;

	static getInstance() {
		if (this.#instance === null) {
			return new Momo();
		}

		console.log('New Momo');

		return this.#instance;
	}

	getNewRequest(options = {}) {
		console.log('options: ' + JSON.stringify(options));
		var requestId = uuidv4();
		var orderId = uuidv4();
		var orderInfo = 'Thanh toán cho đơn hàng\n' + orderId;

		var requestType = 'captureWallet';
		var extraData = ''; //pass empty value if your merchant does not have stores

		const order = {
			//amount: amount,
			extraData: extraData,
			//ipnUrl: ipnUrl,
			orderId: orderId,
			orderInfo: orderInfo,
			partnerCode: config.partnerCode,
			//redirectUrl: redirectUrl,
			requestId: requestId,
			requestType: requestType,
		};
		const dataSignature = {
			accessKey: config.accessKey,
			...order,
			...options, // thêm field để ký
		};

		console.log('dataSignature');
		console.log(dataSignature);

		const signature = Crypto.getInstance().compute(dataSignature);

		return {
			partnerName: config.partnerName,
			signature: signature,
			lang: 'vi',
			...order,
		};
	}

	getNewOrder(redirectUrl, ipnUrl, amount) {
{/*
 		var requestId = uuidv4();
 		var orderId = uuidv4();
 		var orderInfo = 'Thanh toán cho đơn hàng\n' + orderId;
 
 		var requestType = 'captureWallet';
 		var extraData = ''; //pass empty value if your merchant does not have stores
  
*/}
		const newRequest = this.getNewRequest({ redirectUrl, ipnUrl, amount });
{/*
 
 		const order = {
 			amount: amount,
 			extraData: extraData,
 			ipnUrl: ipnUrl,
 			orderId: orderId,
 			orderInfo: orderInfo,
 			partnerCode: config.partnerCode,
 			redirectUrl: redirectUrl,
 			requestId: requestId,
 			requestType: requestType,
 		};
 		const dataSignature = {
 			accessKey: config.accessKey,
 			...order,
 		};
 
 		const signature = Crypto.getInstance().compute(dataSignature); 
*/}

		return {
			amount: amount,
			ipnUrl: ipnUrl,
			redirectUrl: redirectUrl,
			...newRequest,
		};
	}

	async createOrder(redirectUrl, ipnUrl, amount) {
		const order = this.getNewOrder(redirectUrl, ipnUrl, amount);
		console.log('create order');
		console.log(order);

		const response = await sendRequest('POST', {
			url: config.api.createOrder,
			data: JSON.stringify(order),
		});

		return response;
	}
}

export default Momo;
