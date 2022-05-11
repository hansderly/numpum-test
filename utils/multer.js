const multer = require('multer');
const random = require('random');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		let extension;
		file.mimetype === 'image/jpeg'
			? (extension = '.jpg')
			: (extension = '.png');
		const date = new Date();
		const month = date.getUTCMonth() + 1;
		const day = date.getUTCDate();
		const year = date.getUTCFullYear();
		const fullDate = year.toString() + month.toString() + day.toString();
		cb(
			null,
			'IMG-' +
				fullDate +
				'-' +
				random.int((min = 0), (max = 900)) +
				extension
		);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage });

module.exports = upload;
