module.exports = (userInfo) => (req, res, next) => {
	console.log(userInfo);
	console.log('========================');
	console.log(req.userCredential);
	console.log('========================');
	// if (userInfo === null) return res.redirect('/auth/login');

	next();
};
