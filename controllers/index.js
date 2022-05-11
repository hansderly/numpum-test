const { buy_gas } = require('./buy.controller');

const {
	getAllRedeem,
	addRedeem,
	editRedeem,
	deleteRedeem,
} = require('./redeem.controller');

const {
	getLogin,
	login,
	getRegister,
	register,
	logout,
} = require('./auth.controller');

const { getTranfer, postTransfer } = require('./transfer.controllers');

module.exports = {
	// buy controller export
	buy_gas,

	// redeem controller export
	getAllRedeem,
	addRedeem,
	editRedeem,
	deleteRedeem,

	// auth controller export
	getLogin,
	login,
	getRegister,
	register,
	logout,

	// transfer controller export
	getTranfer,
	postTransfer,
};
