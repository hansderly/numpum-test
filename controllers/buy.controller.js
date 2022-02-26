const buy_gas = async (req, res) => {
	const data = req.body;
	console.log(data);

	res.json(data);
};

module.exports = {
	buy_gas,
};
