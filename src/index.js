import express from 'express';
import { v4 as uuid } from 'uuid';

const app = express();

const activities = [];

app.get('/', (req, res) => {
  res.send('Daktela mock api!');
});

app.get('/activities.json', (req, res) => {
  res.json(activities);
});

app.post('/activities.json', (req, res) => {
  const activity = {
    name: uuid(),
  };

  activities.push(activity);

  res.status(201).json(activity);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
