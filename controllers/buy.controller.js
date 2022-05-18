const axios = require('axios');
const { nanoid } = require('nanoid');
const admin = require('../admin');
const { firebase } = require('../firebase');
const DayJs = require('dayjs');
const LocalizedFormat = require('dayjs/plugin/localizedFormat');

DayJs.extend(LocalizedFormat);

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

	const data = {
		id: pumpattended_id,
		amount,
		name,
		dateToShow: DayJs().format('lll') + '  - From Nupeye',
		dateToSort: DayJs().format(),
		dateToReport: DayJs().format('l'),
	};

	const date = new Date();
	console.log(
		`trigger at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
	);

	const requestSellerAmount = await firebase
		.firestore()
		.collection('wallet')
		.doc(pumpattended_id)
		.get();

	const { amount: oldAmount } = requestSellerAmount.data();
	const newAmount = +oldAmount + +amount;
	console.log(oldAmount, amount, newAmount);

	try {
		await firebase
			.firestore()
			.collection('sellerTransactions')
			.doc(pumpattended_id + ' ' + Date.now())
			.set(data);

		await firebase
			.firestore()
			.collection('wallet')
			.doc(pumpattended_id)
			.update({
				amount: newAmount,
			});
		res.status(201).json({ success: true });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	buy_gas,
};
