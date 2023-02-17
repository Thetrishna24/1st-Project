type CourseGrades = {
  assignmentWeight: Array<CourseGrade>;
  finalExamWeight: number;
};

type CourseGrade = {
  name: string;
  weight: number;
  grade: number;
};

type Student = {
  name: string;
  weight: CourseGrades;
  currentAverage: number;
};

type NewStudentRequest = {
  name: string;
  weights: CourseGrades;
};

type AssignmentGrade = {
  grade = number;
};

type FinalGrade = {
  overallScore: number;
  letterGrade: string;
};

type FinalExamScores = {
  ForA: number;
  ForB: number;
  ForC: number;
  ForD: number;
}

type StudentNameParams = {
  studentName: string;
};

type GradeUpdateParams = {
  studentName: string;
  asignmentName: string;
};

type StudentManager = Record<string, Student>;
