import express, { Express } from 'express';
import { notImplemented } from './controllers/NotImplementedController';

const app: Express = express();
const PORT = 8021;

app.get('/api/patients', notImplemented);
app.post('/api/patients', notImplemented);
app.get('/api/patients/:patientName', notImplemented);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
