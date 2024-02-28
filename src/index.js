import express from 'express';
import { v4 as uuid } from 'uuid';
import {sendRequest} from "./callback.js";
import 'dotenv/config';
import {createCall} from "./call.js";

const app = express();

const activities = [];

app.get('/', (req, res) => {
  res.send('Daktela mock api on /api/v6/');
});

app.get('/api/v6/activities.json', (req, res) => {
  res.json({ result: activities });
});

app.post('/api/v6/activities.json', (req, res) => {
  const activity = {
    name: uuid(),
  };

  activities.push(activity);

  const call = createCall();
  const ringTime = 3; // seconds
  setTimeout(() => {
    activity.call = call;
    sendRequest({ id: call.id });
  }, (ringTime + call.duration) * 1000);

  res.status(201).json({ result: activity });
});

app.get('/api/v6/activitiesCall/:id.json', (req, res) => {
  const activity = activities.find((activity) => activity?.call?.id === req.params.id);

  if (activity) {
    res.json({
      result: {
        ...activity.call,
        activities: [{
          name: activity.name,
        }],
      }
    });
  } else {
    res.status(404).json({ error: 'Activity not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
