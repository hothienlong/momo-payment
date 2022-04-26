import paypal from 'paypal-node-sdk';

export default async (req, res) => {
	console.log('createOrderController');

	paypal.configure({
		mode: 'sandbox', //sandbox or live
		client_id:
			'Abfqgu4wl6zC9sA2UJ9CQLmZPTaEVCJ91yd5LfIK2nz0dS8MCyaT-Fas5Zc7ETE8vgsXISg9mZRAa-3i',
		client_secret:
			'ENDqn14Nx4fsFg05IsGyo7wOK6YUTtmY_8smYFX_bjvNAFTz2Safk6YRS-6zKbdXG7JhpMXtVZGnfxWk',
	});

	var newPayment = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal',
		},
		redirect_urls: {
			return_url: 'http://return.url',
			cancel_url: 'http://cancel.url',
		},
		transactions: [
			{
				item_list: {
					items: [
						{
							name: 'item',
							sku: 'item',
							price: '1.00',
							currency: 'USD',
							quantity: 1,
						},
					],
				},
				amount: {
					currency: 'USD',
					total: '1.00',
				},
				description: 'This is the payment description.',
			},
		],
	};

	var payment = await paypal.payment.create(newPayment);

	console.log(payment);

	console.log(payment);
	//console.log(error);

	//if (!response.isSuccess) return res.status(500).json(response);
	return res.status(200).json(payment);
};
