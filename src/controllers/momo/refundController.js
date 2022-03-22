import axios from 'axios';
import crypto from 'crypto';
import account from '../../util/account';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
	console.log('refundController');

	var requestId = uuidv4();
	var orderId = uuidv4();
	var orderInfo = 'Yêu cầu hoàn tiền\n' + orderId;
	var redirectUrl = req.body.redirectUrl;
	var ipnUrl = req.body.ipnUrl;
	// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
	var amount = req.body.amount;
	var transId = req.body.transId;

	var requestType = 'captureWallet';
	var extraData = ''; //pass empty value if your merchant does not have stores

	//before sign HMAC SHA256 with format
	//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
	var rawSignature =
		'accessKey=' +
		account.accessKey +
		'&amount=' +
		amount +
		'&extraData=' +
		extraData +
		'&ipnUrl=' +
		ipnUrl +
		'&orderId=' +
		orderId +
		'&orderInfo=' +
		orderInfo +
		'&partnerCode=' +
		account.partnerCode +
		'&redirectUrl=' +
		redirectUrl +
		'&requestId=' +
		requestType;
	//puts raw signature
	console.log('--------------------RAW SIGNATURE----------------');
	console.log(rawSignature);
	//signature
	var signature = crypto
		.createHmac('sha256', account.secretkey)
		.update(rawSignature)
		.digest('hex');
	console.log('--------------------SIGNATURE----------------');
	console.log(signature);

	//json object send to MoMo endpoint

	const data = JSON.stringify({
		partnerCode: account.partnerCode,
		orderId: orderId,
		requestId: requestId,
		amount: amount,
		transId: transId,
		description: '',
		redirectUrl: redirectUrl,
		ipnUrl: ipnUrl,
		signature: signature,
		lang: 'vi',
	});

	console.log(data);

	try {
		const result = await axios({
			method: 'POST',

			url: 'https://test-payment.momo.vn/v2/gateway/api/refund',

			headers: {
				'Content-Type': 'application/json',
			},

			data: data,
		});

		console.log(`statusCode: ${result.status}`);
		console.log(result);

		return res.status(200).json(result.data);
	} catch (error) {
		console.log('Error');
		console.log(error);
		return res.status(500).json(error.message);
	}
};
