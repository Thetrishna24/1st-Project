/*
  Project: Did I Pass, Part 1 and 2

  Author: Trishna Niraula
  Created on: Feb 11, 2023
*/

import express, { Express } from 'express';
// import { notImplemented } from './controllers/NotImplementedController';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 8021;

app.get('/api/students', StudentController.getAllStudents);
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName/', StudentController.getStudentByName);
app.get('/api/students/:studentName/finalExam', StudentController.getFinalExamScores);
app.post('/api/students/:studentName/finalExam', StudentController.calcFinalExamScore);
app.post('/api/students/:studentName/grades/:assignmentName', StudentController.updateGrade);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
