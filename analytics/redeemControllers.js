const admin = require('../admin');
const redeemRef = admin.firestore().collection('redeemList');

module.exports = {
	getAll: async () => {
		const data = await redeemRef.get();
		let redeemList = [];
		data.forEach((redeem) => redeemList.push(redeem.data()));
		return redeemList;
	},
};
