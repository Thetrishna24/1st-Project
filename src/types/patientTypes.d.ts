type Day = {
  date: string;
  mood: number;
  anxietyLevel: number;
  stressLevel: number;
  sleepQuality: number;
};

type TrackerData = {
  name: string;
  days: Day[];
};
