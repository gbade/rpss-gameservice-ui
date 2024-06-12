const baseURL = 'https://localhost:7020/api';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default {
  getChoices() {
    return fetch(`${baseURL}/choices`, { headers }).then(handleResponse);
  },
  getRandomChoice() {
    return fetch(`${baseURL}/choice`, { headers }).then(handleResponse);
  },
  playGame(playerChoice) {
    return fetch(`${baseURL}/game/play`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ id: playerChoice }),
    }).then(handleResponse);
  },
  getScores() {
    return fetch(`${baseURL}/game/scores`, { headers }).then(handleResponse);
  },
  resetScores() {
    return fetch(`${baseURL}/game/scores/reset`, {
      method: 'POST',
      headers,
    }).then(handleResponse);
  },
};
