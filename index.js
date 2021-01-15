require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const campus = require('./src/routes/campus');
const student = require('./src/routes/student');

app.use(cors());
app.use(express.json());

app.use('/api/campus', campus);
app.use('/api/student', student);

app.listen(process.env.API_LISTENING_PORT, () => {
    console.log(`Server listening on port ${process.env.API_LISTENING_PORT}`);
});
