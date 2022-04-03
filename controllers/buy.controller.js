const buy_gas = async (req, res) => {
	const data = req.body;
	console.log(data);
	console.log(req);

	res.json(data);
};

module.exports = {
	buy_gas,
};
