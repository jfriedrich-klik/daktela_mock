import express from 'express';
import { v4 as uuid } from 'uuid';
import axios from "axios";
import 'dotenv/config';

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

  setTimeout(() => {
    const callId = uuid();
    activity.call = {
      id: callId
    };
    //axios.get(process.env.CALLBACK_HOST + 'daktela/call/log', { params: { id: callId }});
  }, 5000);

  res.status(201).json(activity);
});

app.get('/activitiesCall/:id.json', (req, res) => {
  const activity = activities.find((activity) => activity.call.id === req.params.id);

  if (activity) {
    res.json({
      id: activity.call.id,
      activities: [{
        name: activity.name,
      }],
      answered: true,
    });
  } else {
    res.status(404).json({ message: 'Activity not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
