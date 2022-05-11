const admin = require('../admin');
const dayJs = require('dayjs');

const userRef = admin.firestore().collection('users');
const sellerTransactionRef = admin.firestore().collection('sellerTransactions');
const transferToNupeyeRef = admin.firestore().collection('transferToNupeye');

module.exports = {
	// Number of client
	numberOfClient: async () => {
		const doc = await userRef.get();
		return doc._size;
	},
	incomeActualMonth: async () => {
		const transcationSeller = await sellerTransactionRef.get();
		let data = [];
		// transcationSeller.forEach(
		// 	(transaction) =>
		// 		dayJs(transaction.data().dateToSort).month() ===
		// 			dayJs().month() && data.push(transaction.data().amount)
		// );

		transcationSeller.forEach((transaction) =>
			console.log(transaction.data())
		);

		let total = data.reduce((prev, cur) => {
			console.log({ prev }, { cur });
			return prev + cur;
		}, 0);
		return total;
	},
	listTransferToNupeye: async () => {
		const transferList = await transferToNupeyeRef.get();
		let data = [];
		transferList.forEach((transfer) => data.push(transfer.data()));
		return data;
	},
};
