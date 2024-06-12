## Rock Paper Scissors Lizard Spock - Frontend

This project is the frontend implementation for the Rock Paper Scissors Lizard Spock game, using Vue.js. The frontend interacts with a backend API to fetch game choices, play the game, and display the scoreboard.

#API
The frontend communicates with the backend API to fetch game choices, play the game, and display the scoreboard. Ensure the backend server is running at https://localhost:7020/api.

```sh
GET /choices: Fetch all game choices.
GET /choice: Fetch a random game choice.
POST /game/play: Play a game round against the computer.
GET /game/scores: Fetch the scoreboard.
POST /game/scores/reset: Reset the scoreboard.
```
##Components

#ChoicesComponent
Fetches game choices from the API.
Allows the user to select a choice and play a game round.
Displays the result of the game round.

#ScoreboardComponent
Fetches and displays the scoreboard from the API.
Allows the user to reset the scoreboard.