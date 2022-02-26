const express = require('express');
const app = express();

app.use(express.json());

// routes
app.use('/api', require('./routes/buy.routes'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
