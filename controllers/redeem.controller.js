const getAllRedeem = async (req, res) => {
	const data = await redeem.getAll();
	//console.log(data);
	res.render('pages/redeem', { data });
};

const addRedeem = async (req, res) => {
	//const data = await redeem.getAll();
	const dataPost = req.body;
	console.log(dataPost);
	if (dataPost.action == 'Add') {
		//ADD REEDEM
		console.log('ADD REEDEM ', dataPost);
		try {
			const uploadRes = await cloudinary.uploader.upload(req.file.path, {
				upload_preset: 'nupump',
			});
			const { redeemName, points, remember } = req.body;
			let redeemStatus;
			console.log(redeemName, points, remember);
			remember === 'on' ? (redeemStatus = true) : (redeemStatus = false);
			const idGen = nanoid();
			const newRedeem = {
				idGen,
				name: redeemName,
				points,
				img: uploadRes.secure_url,
				status: redeemStatus,
			};
			await firebase
				.firestore()
				.collection('redeemList')
				.doc(idGen)
				.set(newRedeem)
				.then(() => {
					res.redirect('/redeem');
				});
		} catch (error) {
			const errorMessage = error.message;
			res.render('pages/redeem', { data, errorMessage });
		}
	} else if (dataPost.action == 'Eddit') {
		console.log('EDDIT REEDEM ', dataPost);
		let linkToImage = req.body.OldIMG; //OLD LINK
		let status = false;
		if (req.body.ifAvailable) {
			status = true;
		}
		if (req.file) {
			const uploadRes = await cloudinary.uploader.upload(req.file.path, {
				upload_preset: 'nupump',
			});
			linkToImage = uploadRes.secure_url;
		}

		const { redeemName, points, id } = req.body;
		//console.log({ redeemName }, { points }, { id }, req.file);
		const newRedeem = {
			id: id,
			name: redeemName,
			points,
			img: linkToImage,
			status,
		};
		try {
			console.log(req.body);
			const response = await firebase
				.firestore()
				.collection('redeemList')
				.doc(id)
				.update(newRedeem)
				.then(() => {
					res.redirect('/redeem');
				});
		} catch (error) {
			console.log(error);
			const errorMessage = error.message;
			//res.render('pages/redeem', { errorMessage });
			res.redirect('/redeem');
		}
	} else {
		console.log('DELETE REEDEM ', dataPost);
		try {
			const uid = req.body.ItemToDelete;
			const response = await firebase
				.firestore()
				.collection('redeemList')
				.doc(uid)
				.delete()
				.then(() => {
					res.redirect('/redeem');
				});
		} catch (error) {
			// const errorMessage = error.message;
			// console.log(error);
			// res.render('pages/redeem', { errorMessage });
		}
	}
};

const editRedeem = async (req, res) => {
	const { redeemName, points, id } = req.body;
	//console.log({ redeemName }, { points }, { id }, req.file);
	const newRedeem = {
		id: idGen,
		name: redeemName,
		points,
		img: uploadRes.secure_url,
		status: redeemStatus,
	};
	try {
		console.log(req.body);
		const response = await firebase
			.firestore()
			.collection('redeemList')
			.doc(id)
			.update(newRedeem)
			.then(() => {
				res.redirect('/redeem');
			});
	} catch (error) {
		console.log(error);
		const errorMessage = error.message;
		//res.render('pages/redeem', { errorMessage });
		res.redirect('/redeem');
	}
};

const deleteRedeem = async (req, res) => {
	try {
		const { uid } = req.body;
		const response = await firebase
			.firestore()
			.collection('redeemList')
			.doc(uid)
			.delete()
			.then(() => {
				res.redirect('/redeem');
			});
	} catch (error) {
		// const errorMessage = error.message;
		// console.log(error);
		// res.render('pages/redeem', { errorMessage });
	}
};

export { getAllRedeem, addRedeem, editRedeem, deleteRedeem };
