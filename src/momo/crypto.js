import crypto from 'crypto';
import config from './../../config.json';

class Mac {
	static #instance = null;

	static getInstance() {
		if (this.#instance === null) {
			return new Mac();
		}

		console.log('New MAC');

		return this.#instance;
	}

	compute(data) {
		const rawSignature = this.createMacRawSignature(data);
		const signature = crypto
			.createHmac('sha256', config.secretkey)
			.update(rawSignature)
			.digest('hex');

		return signature;
	}

	//before sign HMAC SHA256 with format
	//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
	createMacRawSignature(data) {
		const keys = Object.keys(data);
		keys.sort();
		const itemData = keys.map((key) => key + '=' + data[key]);
		return itemData.join('&');
	}
}

export default Mac;
