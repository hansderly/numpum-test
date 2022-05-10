const buy_gas = async (req, res) => {
	if (!req.is('application/json'))
		return res
			.status(400)
			.json({ error: 'Bad data format, ONLY SEND JSON' });

	if (Object.getOwnPropertyNames(req.body).length === 0)
		return res.json({ msg: 'No data has been sent' });

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
	console.log(req.body);

	res.status(201).json({ status: 'Done' });
};

module.exports = {
	buy_gas,
};
