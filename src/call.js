import { v4 as uuid } from 'uuid';

export const createCall = () => {
  const answered = Boolean(Math.floor(Math.random() * 2));
  let duration = 0;
  if (answered) {
    duration = Math.floor(Math.random() * (10 - 2) + 2); // 2-10 seconds
  }

  return {
    id: uuid(),
    duration,
    answered
  };
}
