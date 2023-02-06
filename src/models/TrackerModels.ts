const trackerManager: TrackerManager = {};

function getTrackerData(): TrackerManager {
  return trackerManager;
}

function addTrackerEntry(entry: Entry): boolean {
  // If the entry is already in the dataset
  if (entry.date in trackerManager) {
    return false; // exit the function immediately
  }

  // Add the new entry
  trackerManager[entry.date] = entry;
  return true;
}

function getTrackerEntry(date: number): Entry | undefined {
  // If the entry does not exist
  if (!(date in trackerManager)) {
    return undefined; // then exit immediately
  }

  // The entry is in the dataset
  return trackerManager[date];
}

export { getTrackerData, addTrackerEntry, getTrackerEntry };
