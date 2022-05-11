const getLogin = (req, res) => {
	res.render('pages/auth/login');
};

const login = (req, res) => {
	const { email, password } = req.body;
	const user = firebase.auth().currentUser;

	console.log(req.body);
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// ...
			req.userCredential = user;
			res.redirect('/');
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('tese');
			res.render('pages/auth/login', { errorMessage });
		});
	// console.log(user);
};

const getRegister = (req, res) => {
	res.render('pages/auth/register');
};

const register = (req, res) => {
	// console.log(req.body);
	const user = firebase.auth().currentUser;
	const { email, password, first_name, last_name, username } = req.body;
	console.log(first_name, last_name, username, req.body);
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in
			const { uid } = userCredential.user;
			const adminData = {
				id: uid,
				first_name,
				last_name,
				email,
				photoURL: '',
				phone: '',
			};

			const adminDoc = admin.firestore().collection('admin');

			adminDoc
				.doc(uid)
				.set(adminData)
				.then(() => {
					res.render('pages/auth/register');
				})
				.catch((err) => {
					const errorMessage = err.message;
					res.render('pages/auth/register', { errorMessage });
				});
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			res.render('pages/auth/register', { errorMessage });
		});
};

const logout = (req, res) => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			// Sign-out successful.
			res.redirect('/auth/login');
		})
		.catch((error) => {
			// An error happened.
		});
};

export { getLogin, login, getRegister, register, logout };
