import express, { Express } from 'express';
import { notImplemented } from './controllers/NotImplementedController';
import TrackerController from './controllers/TrackerController';

const app: Express = express();
const PORT = 8021;

app.get('/api/patients', TrackerController.getAllTrackerEntries);
app.post('/api/patients', notImplemented);
app.get('/api/patients/:patientName', notImplemented);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
