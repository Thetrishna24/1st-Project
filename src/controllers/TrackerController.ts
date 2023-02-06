import { Request, Response } from 'express';
import { getTrackerData } from '../models/TrackerModels';

function getAllTrackerEntries(req: Request, res: Response): void {
  res.json(getTrackerData());
}

export default { getAllTrackerEntries };
