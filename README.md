# Pokémon Partner Finder

A full-stack Pokémon-themed website built with Node.js, Express, and SQLite. Users fill out a battle profile with style, type, color, generation, and stat preferences, and the API recommends the best Pokémon partner from generations 1 through 9.

## Features
- Express API with JSON endpoints
- SQLite database for Pokémon roster and saved battle preferences
- Responsive Pokémon trainer dashboard
- Personalized partner matching based on battle style, type, color, generation, role, and stats
- Filters for no-preference mode across generation, color, type, and stat selections

## Run locally
1. Install dependencies:
   npm install
2. Start the app:
   npm start
3. Open the browser at:
   http://localhost:3000

## API endpoints
- GET /api/health — health check
- GET /api/pokemon — list all Pokémon in the database
- GET /api/preferences — recent saved trainer preferences
- POST /api/preferences — submit a trainer profile and get a recommended partner

## Example request body
```json
{
  "trainerName": "Misty",
  "battleStyle": "offense",
  "preferredType": "Water",
  "preferredColor": "Blue",
  "favoriteStat": "Speed",
  "generation": "1",
  "teamRole": "support",
  "attack": 80,
  "defense": 50,
  "speed": 90,
  "special": 70,
  "stamina": 60
}
```
