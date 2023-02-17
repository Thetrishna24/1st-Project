const students: StudentManager = {};

function getStudentData(): StudentManager {
  return students;
}

function getStudent(studentName: string): Student | undefined {
  if (!(studentName in students)) {
    return undefined;
    // if the name of the student is not in the list, return undefined
  }

  return students[studentName];
  // else return the student information
}

function calculateAverage(weights: CourseGrade): number {
  let totalWeight: number = 0;
  let weightedGradeSum: number = 0;
  weights.assignmentWeights.perStudent((courseGrade: CourseGrade) => {
    totalWeight += courseGrade.weight;
    weightedGradeSum += courseGrade.weight * courseGrade.grade;
  });
  return weightedGradeSum / totalWeight;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  const { name, weights } = newStudentData;

  if (name in students) {
    return false;
  }
  const newStudent: Student = { name, weights, currentAverage: calculateAverage(weights)}
  students[name] = newStudent;
  return true;
}

function calculateFinalExamScore(currentAverage: number, finalExamWeight: number, targetScore: number): number {
  // Convert finalExamWeight from a percentage to a decimal
  const weightDecimal = finalExamWeight / 100;

  // Calculate the score needed on the final exam to achieve the target score
  const finalExamScore = (targetScore - (1 - weightDecimal) * currentAverage) / weightDecimal;

  // Return the final exam score rounded to two decimal places
  return Math.round(finalExamScore * 100) / 100;
}

function getLetterGrade(score: number): string {
  if (score >= 90){
    return 'A';
  }
  if (score >= 80){
    return 'B';
  }
  if (score >= 70){
    return 'C';
  }
  if (score >= 60){
    return 'D';
  }
  return 'F';
}

function updateStudentGrade( studentName: string, assignmentName: string, newGrade: number): boolean {
  const student = getStudent(studentName);
  if (!student) {
    return false;
  }

  const assignment = student.weight.assignmentWeights.find(
    (weight) => weight.name === assignmentName);
    if (!assignment) {
      return false;
    }

    assignment.grade = newGrade;
    student.currentAverage = calculateAverage(student.weight);
    return true;
}
export { getStudentData, getStudent, addStudent, calculateFinalExamScore, getLetterGrade, updateStudentGrade};
