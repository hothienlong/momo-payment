import Momo from '../../momo/momo';
import { getResponse } from '../../util/response';

export default async (req, res) => {
	console.log('getSignaturePaymentController');

	var orderId = req.body.orderId;
	var partnerCode = req.body.partnerCode;
	var requestId = req.body.requestId;
	var redirectUrl = req.body.redirectUrl;
	var ipnUrl = req.body.ipnUrl;
	var amount = req.body.amount;

	console.log(req.body);

	const resData = await Momo.getInstance().getSignaturePayment(
		orderId,
		partnerCode,
		requestId,
		redirectUrl,
		ipnUrl,
		amount
	);

	console.log(resData);
	//console.log(error);

	const response = getResponse(resData, false);

	if (!response.isSuccess) return res.status(500).json(response);
	return res.status(200).json(response);
};
