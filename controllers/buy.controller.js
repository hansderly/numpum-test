const buy_gas = async (req, res) => {
	if (!req.is('application/json'))
		return res
			.status(400)
			.json({ error: 'Bad data format, ONLY SEND JSON' });

	const {
		transaction_id,
		amount,
		phone,
		name,
		message,
		pumpattended_id,
		payment_date,
		status,
		username,
	} = req.body;

	console.log(transaction_id, amount, phone);

	res.json(data);
};

module.exports = {
	buy_gas,
};
