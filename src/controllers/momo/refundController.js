import Momo from '../../momo/momo';

export default async (req, res) => {
	console.log('refundController');

	var amount = req.body.amount;
	var transId = req.body.transId;

	console.log('amount: ' + amount);

	const response = await Momo.getInstance().refund(amount, transId);

	console.log(response);
	//console.log(error);

	if (!response.isSuccess) return res.status(500).json(response);
	return res.status(200).json(response);
};
