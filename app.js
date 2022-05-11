require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const authMiddleware = require('./middleware/auth');
const { firebase } = require('./firebase');
const admin = require('./admin');
const crypto = require('crypto');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/auth', require('./routes/auth.routes'));
app.use(require('./routes/redeem.routes'));
app.use(require('./routes/transfer.routes'));
app.use('/api', require('./routes/buy.routes'));

// Analytics
const analytics = require('./analytics/analitycsHome');

app.get('/', async (req, res) => {
	const user = firebase.auth().currentUser;
	if (!user) return res.redirect('/auth/login');

	const numberOfClient = await analytics.numberOfClient();
	const incomeActualMonth = await analytics.incomeActualMonth();
	const listTransferToNupeye = await analytics.listTransferToNupeye();

	console.log(incomeActualMonth);
	const data = {
		numberOfClient,
		incomeActualMonth,
		listTransferToNupeye,
	};
	res.render('pages/index', { data });
});

app.post('/getAuthToken', (req, res) => {
	const { email } = req.body;
	console.log('tes', email);
	const hmac = crypto
		.createHmac('sha256', process.env.ONESIGNAL_APP_ID)
		.update(email)
		.digest('hex');
	console.log(hmac);
	res.status(202).send({ hmac });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
