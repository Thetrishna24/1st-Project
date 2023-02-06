import { Request, Response } from 'express';
import { getTrackerData, addTrackerEntry, getTrackerEntry } from '../models/TrackerModels';

function getAllTrackerEntries(req: Request, res: Response): void {
  res.json(getTrackerData());
}

function validateTrackerEntry(entry: Entry): boolean {
  // Check if required fields for the entry have been provided
  if (!entry.date || !entry.mood || !entry.notes) {
    return false;
  }

  return true;
}

function createNewTrackerEntry(req: Request, res: Response): void {
  console.log('\nPOST /api/tracker');
  console.log(req.body);

  const newEntry = req.body as NewEntryRequest;

  if (!validateTrackerEntry(newEntry)) {
    res.sendStatus(400); // 400 Bad Request - The entry is missing required fields
    return;
  }

  const didAddEntry = addTrackerEntry(newEntry);

  if (!didAddEntry) {
    res.sendStatus(409); // 409 Conflict - The entry already exists in the dataset
    return;
  }

  res.sendStatus(201); // 201 Created - The entry was successfully added to the dataset
}

function getTrackerEntryByDate(req: Request, res: Response): void {
  const { date } = req.params as DateParam;
  const entry = getTrackerEntry(date);

  if (!entry) {
    res.sendStatus(404); // 404 Not Found - the entry was not in the dataset
    return;
  }

  // The entry did exist
  res.json(entry);
}

export default { getAllTrackerEntries, createNewTrackerEntry, getTrackerEntryByDate };
