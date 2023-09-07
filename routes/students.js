import express from 'express';



let students = [
    {
        "id": 1,
        "name": "Vimal",
        "age": 25,
        "grade": 10,
        "mentor": "Sri",

    },
    {
        "id": 2,
        "name": "Sri",
        "age": 22,
        "grade": 8,
        "mentor": "Vimal"
    },
    {
        "id": 3,
        "name": "Vijayakumar",
        "age": 21,
        "grade": 6,
        "mentor": "Vimal"
    },
    {
        "id": 4,
        "name": "Vijay",
        "age": 25,
        "grade": 7,
        "mentor": "John"
    },
];

const studentRouter = express.Router();


{/*the studentRouer get requst method*/}
studentRouter.get('/', (req, res) => {
    
    const { name } = req.query;         /*filter the name of studentRouter*/

    let filterStudents = students;
    if (name) {
        filterStudents = students.filter((stud) => stud.name == name);
    }
    res.send(filterStudents); 
});

{/*the studentRouer get to previous-mentor requst method*/}
studentRouter.get('/:studentId/previous-mentor', (req, res) => {

    const { studentId } = req.params;

    const student = students.find(student => student.id === parseInt(studentId));

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const previousMentor = student.previousMentor || null;

    res.json({ studentId: student.id, previousMentor });
});


{/*the studentRouer post requst method*/}
studentRouter.post('/', (req, res) => {

    const newStudent = req.body;

    const newStudentId = students.length + 1;

    newStudent.id = newStudentId;

    students.push(newStudent);

    res.send(students);
});


{/*the studentRouer put requst method*/}
studentRouter.put('/', (req, res) => {

    const { studentId } = req.params;

    const newStudent = req.body;

    const oldStudent = students.find(student=> student.id === studentId);

    students = students.filter(student => student.id !== oldStudent);

    students.push(newStudent)

    res.send(students);
});



{/*the studentRouer delete requst method*/}
studentRouter.delete('/:studentId', (req, res) => {

    const { studentId } = req.params;

    const oldStudentIndex = students.findIndex(student => student.id === parseInt(studentId));

    if (oldStudentIndex === -1) {
        res.status(404).json({ error: 'Student not found' });
    } else {
        students = students.filter(student => student.id !== parseInt(studentId));
        res.send(students);
    }
});

export { students };

export default studentRouter;
