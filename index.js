import express from 'express';

import mentorRouter from './routes/mentors.js';  //mentor import file
import studentRouter from './routes/students.js';  //student import file

const app = express();
const PORT = 5050;  //port number

app.use(express.json());


app.use('/mentors', mentorRouter);  //mentor routes path

app.use('/students', studentRouter);    //student routes path


app.listen(PORT, () => console.log('Server is running on port', PORT));
