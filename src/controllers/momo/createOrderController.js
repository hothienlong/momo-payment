import Momo from '../../momo/momo';

export default async (req, res) => {
	console.log('createOrderController');

	var redirectUrl = req.body.redirectUrl;
	var ipnUrl = req.body.ipnUrl;
	var amount = req.body.amount;
	var extraData = req.body.extraData;

	console.log(req.body);

	const response = await Momo.getInstance().createOrder(
		redirectUrl,
		ipnUrl,
		amount,
		extraData
	);

	console.log(response);
	//console.log(error);

	if (!response.isSuccess) return res.status(500).json(response);
	return res.status(200).json(response);
};
