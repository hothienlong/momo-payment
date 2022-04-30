import Momo from '../../momo/momo';

export default async (req, res) => {
	console.log('getSignaturePaymentController');

	var orderId = req.body.orderId;
	var partnerCode = req.body.partnerCode;
	var requestId = req.body.requestId;

	console.log(req.body);

	const response = await Momo.getInstance().getSignaturePayment(
		orderId,
		partnerCode,
		requestId
	);

	console.log(response);
	//console.log(error);

	if (!response.isSuccess) return res.status(500).json(response);
	return res.status(200).json(response);
};
