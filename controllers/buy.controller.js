const buy_gas = async (req, res) => {
	if (!req.is('application/json'))
		return res
			.status(400)
			.json({ error: 'Bad data format, ONLY SEND JSON' });

	const data = req.body;
	console.log(data);
	console.log();

	res.json(data);
};

module.exports = {
	buy_gas,
};
