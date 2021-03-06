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

	getSignaturePayment(
		orderId,
		partnerCode,
		requestId,
		redirectUrl,
		ipnUrl,
		amount,
		orderInfo,
		extraData
	) {
		const accessKey = config.accessKey;

		const options = {
			redirectUrl,
			ipnUrl,
			amount,
			orderInfo: orderInfo,
			extraData: extraData,
			requestType: 'captureWallet',
		};

		const signature = Crypto.getInstance().compute({
			accessKey,
			orderId,
			partnerCode,
			requestId,
			...options,
		});

		return signature;
	}

	getNewRequest(optionsSignature = {}) {
		console.log('options: ' + JSON.stringify(optionsSignature));
		var requestId = uuidv4();
		var orderId = optionsSignature.orderId ?? uuidv4(); // query orderId hoặc tạo mới đơn hàng
		//var orderInfo = 'Thanh toán cho đơn hàng\n' + orderId;

		//var requestType = 'captureWallet';
		//var extraData = ''; //pass empty value if your merchant does not have stores

		const request = {
			//amount: amount,
			//extraData: extraData,
			//ipnUrl: ipnUrl,
			orderId: orderId,
			//orderInfo: orderInfo,
			partnerCode: config.partnerCode,
			//redirectUrl: redirectUrl,
			requestId: requestId,
			//requestType: requestType,
		};
		const dataSignature = {
			accessKey: config.accessKey,
			...request,
			...optionsSignature, // thêm field options để ký
		};

		console.log('dataSignature');
		console.log(dataSignature);

		const signature = Crypto.getInstance().compute(dataSignature);

		return {
			signature: signature,
			lang: 'vi',
			...request,
		};
	}

	getNewOrder(redirectUrl, ipnUrl, amount, extraData) {
		const options = {
			redirectUrl,
			ipnUrl,
			amount,
			extraData,
			orderInfo: 'Thanh toán đơn hàng',
			requestType: 'captureWallet',
		};
		const newRequest = this.getNewRequest(options);

		return {
			...newRequest,
			...options,
			partnerName: config.partnerName,
		};
	}

	async createOrder(redirectUrl, ipnUrl, amount, extraData) {
		const order = this.getNewOrder(redirectUrl, ipnUrl, amount, extraData);
		console.log('create order');
		console.log(order);

		const response = await sendRequest('POST', {
			url: config.api.createOrder,
			data: JSON.stringify(order),
		});

		return response;
	}

	async refund(amount, transId) {
		const options = {
			amount: amount,
			description: 'Hoàn tiền giao dịch',
			transId: transId,
		};

		const request = this.getNewRequest(options);

		console.log('refund');
		console.log(request);

		const response = await sendRequest('POST', {
			url: config.api.refund,
			data: JSON.stringify({
				...request,
				...options,
			}),
		});

		return response;
	}

	async queryTransaction(orderId) {
		const options = {
			orderId: orderId,
		};

		const request = this.getNewRequest(options);

		console.log('queryTransaction');
		console.log(request);

		const response = await sendRequest('POST', {
			url: config.api.queryTransaction,
			data: JSON.stringify({
				...request,
			}),
		});

		return response;
	}
}

export default Momo;
