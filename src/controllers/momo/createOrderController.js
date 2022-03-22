import Momo from '../../momo/momo';

export default async (req, res) => {
	console.log('createOrderController');

	var redirectUrl = req.body.redirectUrl;
	var ipnUrl = req.body.ipnUrl;
	var amount = req.body.amount;

	const { res: response, message } = await Momo.getInstance().createOrder(
		redirectUrl,
		ipnUrl,
		amount
	);

	console.log(response);
	console.log(message);

	if (!response) return res.status(500).json(message);
	return res.status(200).json(response);
};
