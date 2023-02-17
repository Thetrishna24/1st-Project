import { Request, Response } from 'express';
import { getStudentData,
         getStudent,
         addStudent,
         calculateFinalExamScore,
         getLetterGrade,
         updateStudentGrade} from '../models/StudentModels';

function getAllStudents(req: Request, res: Response): void {
  res.json(getStudentData());
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest;

  const didAddStudent: boolean = addStudent(studentData);
  if(! didAddStudent) {
    res.sendStatus(409);
    return;
  }

  res.sendStatus(201);
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;

  const student = getStudent(studentName);

  if(! student) {
    res.sendStatus(404);
    return;
  }
  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;

  const student = getStudent(studentName);
  if(! student) {
    res.sendStatus(404);
    return;
  }

  const { currentAverage, weights } = student;

  const finalScores: FinalExamScores = {
    forA: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 90),
    forB: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 80),
    forC: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 70),
    forD: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 60),
  };
  res.json(finalScores);
}

function calculateFinalExamScore(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;

  const student = getStudent(studentName);

  if(! student) {
    res.sendStatus(404);
    return;
  }

  const { grade } = req.body as AssignmentGrade;
  const { currentAverage, weights } = student;

  const finalWeightProportion = weights.finalExamWeight / 100;
  const currentWeightProportion = 1 - finalWeightProportion;

  const overallScore = (grade * finalWeightProportion) + (currentAverage * currentWeightProportion);
  const letterGrade = getLetterGrade(overallScore);

  const finalScore: FinalGrade = { overallScore, letterGrade };
  res.json(finalScore);
}

function updateGrade(req: Request, res: Response): void {
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  const { grade } = req.body as AssignmentGrade;

  const update = updateStudentGrade(studentName, assignmentName, grade);
  if (! update) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(200);
}

export default {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calculateFinalExamScore,
  updateGrade
};
