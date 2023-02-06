type Day = {
  date: number;
  mood: number;
  anxietyLevel: number;
  stressLevel: number;
  sleepQuality: number;
};

type Tracker = {
  name: string;
  days: Day[];
  entry: number;
};

type TrackerManager = Record<string, Tracker>;

type NewTrackerRequest = {
  name: string;
  days: Day[];
};

type TrackerNameParam = {
  trackerName: string;
};
