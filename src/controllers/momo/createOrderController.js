import { v4 as uuidv4 } from 'uuid';
import Crypto from '../../momo/crypto';
import account from '../../util/account';
import sendRequest from '../../util/api';
import config from '../../../config.json';

export default async (req, res) => {
	console.log('createOrderController');

	var requestId = uuidv4();
	var orderId = uuidv4();
	var orderInfo = 'Thanh toán cho đơn hàng\n' + orderId;
	var redirectUrl = req.body.redirectUrl;
	var ipnUrl = req.body.ipnUrl;
	// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
	var amount = req.body.amount;
	var requestType = 'captureWallet';
	var extraData = ''; //pass empty value if your merchant does not have stores

	console.log('--------------------SIGNATURE----------------');

	var dataSignature = {
		accessKey: account.accessKey,
		amount: amount,
		extraData: extraData,
		ipnUrl: ipnUrl,
		orderId: orderId,
		orderInfo: orderInfo,
		partnerCode: account.partnerCode,
		redirectUrl: redirectUrl,
		requestId: requestId,
		requestType: requestType,
	};

	const signature = Crypto.getInstance().compute(dataSignature);
	console.log(signature);

	//json object send to MoMo endpoint

	const data = JSON.stringify({
		partnerCode: account.partnerCode,
		partnerName: account.partnerName,
		requestId: requestId,
		amount: amount,
		orderId: orderId,
		orderInfo: orderInfo,
		redirectUrl: redirectUrl,
		ipnUrl: ipnUrl,
		extraData: extraData,
		requestType: requestType,
		signature: signature,
		lang: 'vi',
	});

	//console.log(data);

	const { res: response, message } = await sendRequest('POST', {
		url: config.api.createOrder,
		data: data,
	});

	if (!response) return res.status(500).json(message);
	return res.status(200).json(response);
};
