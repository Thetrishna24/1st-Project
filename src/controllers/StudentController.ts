import { Request, Response } from 'express';
import { getStudentData,
         getStudent,
         addstudent,
         calcFinalScore,
         getLetterGrade,
         updateStudentGrade} from '../models/StudentModels';

function getAllStudents(req: Request, res: Response): void {
  res.json(getStudentData());
}

function validateWeight(assignments: CourseGrades): boolean {
  let sum = assignments.finalExamWeight;

  for (const weight of assignments.assignmentWeights) {
    sum += weight.weight;
  }
  return sum == 100;
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
    ForA: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 98),
    ForB: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 88),
    ForC: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 78),
    ForD: calculateFinalExamScore(currentAverage, weights.finalExamWeight, 68),
  };
  res.json(finalScores);
}

function calcFinalScore(req: Request, res: Response): void {
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
  calcFinalScore,
  updateGrade
};
