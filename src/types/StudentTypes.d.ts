type CourseGrades = {
  assignmentWeight: Array<CourseGrade>;
  finalExamWeight: number;
};

type CourseGrade = {
  name: string;
  weight: number;
  grade: number;
  assignmentWeights: number;
  finalExamWeight: number;
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
  grade: number;
};

type FinalGrade = {
  overallScore: number;
  letterGrade: string;
};

type FinalExamScores = {
  forA: number;
  forB: number;
  forC: number;
  forD: number;
}

type StudentNameParams = {
  studentName: string;
};

type GradeUpdateParams = {
  studentName: string;
  assignmentName: string;
};

type StudentManager = Record<string, Student>;
