import express from 'express';

import { students } from './students.js';

let mentors = [
    {
        "id": 1,
        "name": "John",
        "expertise": "Standard",
        "gender": "Female",
        "students": [] 
    },
    {
        "id": 2,
        "name": "Vimal",
        "expertise": "Standard",
        "gender": "Male",
        "students": []
    },
    {
        "id": 3,
        "name": "Sri",
        "expertise": "Standard",
        "gender": "Female",
        "students": []
    }
];

const mentorRouter = express.Router();


{/*the mentorRouer get requst method*/}
mentorRouter.get('/', (req, res) => {

    const { id } = req.query;

    let filterMentors = mentors;

    if(id) {
        filterMentors = mentors.filter((ment)=>ment.id == id)
    }
    res.send(filterMentors);
});


{/* Add a new route to retrieve all students for a particular mentor by mentor name */}
mentorRouter.get('/:mentorName/students', (req, res) => {

    const mentorName = req.params.mentorName;

    // Filter students based on the mentor's name
    const studentsWithMentor = students.filter((stud) => stud.mentor === mentorName);

    if (studentsWithMentor.length === 0) {
        return res.status(404).json({ message: 'No students found for this mentor' });
    }

    res.json({
        message: 'Students for the mentor',
        mentor: mentorName,
        students: studentsWithMentor,
    });
});


{/*the mentorRouer post requst method*/}
mentorRouter.post('/', (req, res) => {

    const newMentor = req.body;

    const newMentorId = mentors.length + 1;

    newMentor.id = newMentorId;

    mentors.push(newMentor);

    res.send(mentors);
});


{/*the mentorRouer put requst method*/}
mentorRouter.put('/:mentorId', (req, res) => {

    const { mentorId } = req.params;

    const newMentor = req.body;

    const oldMentor = mentors.find(mentor=> mentor.id === mentorId);

    mentors = mentors.filter(mentor => mentor.id !== oldMentor);

    mentors.push(newMentor)

    res.send(mentors);
});


{/*the mentorRouer delete requst method*/}
mentorRouter.delete('/:mentorId', (req, res) => {

    const { mentorId } = req.params;

const oldMentorIndex = mentors.findIndex (mentor => mentor.id === parseInt(mentorId));

if(oldMentorIndex === -1){
    res.status(404).json({ error: 'Student not found' });
}else{
mentors = mentors.filter(mentor => mentor.id !== parseInt(mentorId));
res.send(mentors);
}

});

export default mentorRouter;
