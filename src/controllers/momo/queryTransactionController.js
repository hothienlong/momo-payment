import Momo from '../../momo/momo';

export default async (req, res) => {
	console.log('queryTransactionController');

	const orderId = req.body.orderId;

	const response = await Momo.getInstance().queryTransaction(orderId);

	//console.log(response);
	//console.log(error);

	if (!response.isSuccess) return res.status(500).json(response);
	return res.status(200).json(response);
};
