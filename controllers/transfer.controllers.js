const baseURL = 'https://nupeye.com/recharge_services/v1';

const authApi = async () => {
	try {
		const infos = {
			user_name: process.env.API_USER_NAME,
			authentication_key: process.env.API_KEY_NUPEYE,
		};
		const header = {
			headers: {
				'x-api-key': process.env.X_API_KEY,
			},
		};
		const { data } = await axios.post(
			baseURL + '/auth/login',
			infos,
			header
		);
		if (data.message === 'Token has been expired')
			return refreshToken(data);

		return data;

		// res.render('pages/transfer', { token: authentication_token });
	} catch (error) {
		console.log('error root');
	}
};

// if token is expired
const refreshToken = async (value) => {
	try {
		const test = value;
		const infos = {
			user_name: process.env.API_USER_NAME,
			refresh_token: test.refresh_token,
			authentication_key: process.env.X_API_KEY,
		};
		const header = {
			headers: {
				'x-api-key': process.env.X_API_KEY,
				'authentication-token': test.refresh_token,
			},
		};
		const { data } = await axios.post(
			baseURL + '/auth/refresh_authentication',
			infos,
			header
		);
		return data;
	} catch (error) {
		console.log('error refresh', error);
	}
};

const getTranfer = async (req, res) => {
	const user = firebase.auth().currentUser;
	console.log(user.email);

	const { refresh_token, authentication_token } = await authApi();
	const api = {
		refresh_token,
		authentication_token,
	};
	const data = JSON.stringify(api);
	const { message, amount, transaction_id } = req.query;
	let forModal = { message, amount, transaction_id };
	message === undefined
		? res.render('pages/transfer', { data })
		: res.render('pages/transfer', { data, forModal });
};

const postTransfer = async (req, res) => {
	const { username, password, phone, amount } = req.body;
	const api = JSON.parse(req.body.token);
	try {
		const infos = {
			user_name: username,
			user_password: password,
			mobile_no: phone,
			amount,
			app_id: process.env.APP_ID,
			authentication_key: process.env.API_KEY_NUPEYE,
		};
		const header = {
			headers: {
				'x-api-key': process.env.X_API_KEY,
				'authentication-token': api.refresh_token,
			},
		};
		const { data } = await axios.post(
			baseURL + '/transfer_amount',
			infos,
			header
		);
		if (data.message === 'Success') {
			const { uid, email } = firebase.auth().currentUser;
			const idGen = nanoid();
			const newTransfer = {
				idGen,
				idUser: uid,
				user: email,
				transferDate: data.payment_date,
				transferAmount: data.amount,
			};
			await firebase
				.firestore()
				.collection('transferToNupeye')
				.doc(idGen)
				.set(newTransfer)
				.then(() => {
					console.log({ data });
					res.json({ success: true, res: data });
				})
				.catch((err) => {
					const errorMessage = err.message;
					console.log(errorMessage);
					res.json({ success: false, res: errorMessage });
				});
		}
	} catch (error) {
		console.log('error ');
	}
};

export { getTranfer, postTransfer };
