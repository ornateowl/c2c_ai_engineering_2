const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'pokemon.db');
const db = new sqlite3.Database(dbPath);

const seedPokemon = [
  {
    name: 'Pikachu',
    type: 'Electric',
    subtype: 'Lightning',
    battle_style: 'offense',
    role: 'support',
    attack: 55,
    defense: 40,
    speed: 90,
    special: 65,
    stamina: 45,
    description: 'A fast, cheerful spark partner that thrives in quick battles and keeps the team moving.'
  },
  {
    name: 'Charizard',
    type: 'Fire',
    subtype: 'Flying',
    battle_style: 'offense',
    role: 'striker',
    attack: 84,
    defense: 78,
    speed: 100,
    special: 85,
    stamina: 70,
    description: 'Explosive power and strong aerial control make Charizard a fierce battle companion.'
  },
  {
    name: 'Bulbasaur',
    type: 'Grass',
    subtype: 'Poison',
    battle_style: 'balance',
    role: 'support',
    attack: 62,
    defense: 63,
    speed: 45,
    special: 80,
    stamina: 75,
    description: 'Reliable and steady, Bulbasaur brings patience, resilience, and healing-style energy.'
  },
  {
    name: 'Squirtle',
    type: 'Water',
    subtype: 'Defense',
    battle_style: 'defense',
    role: 'tank',
    attack: 48,
    defense: 65,
    speed: 43,
    special: 60,
    stamina: 90,
    description: 'A durable guardian that excels in long fights and defensive team setups.'
  },
  {
    name: 'Gengar',
    type: 'Ghost',
    subtype: 'Poison',
    battle_style: 'offense',
    role: 'striker',
    attack: 65,
    defense: 60,
    speed: 110,
    special: 90,
    stamina: 55,
    description: 'Sneaky and unpredictable, Gengar punishes careless opponents with relentless pressure.'
  },
  {
    name: 'Lucario',
    type: 'Fighting',
    subtype: 'Steel',
    battle_style: 'balance',
    role: 'striker',
    attack: 90,
    defense: 70,
    speed: 78,
    special: 75,
    stamina: 72,
    description: 'Balanced offense and precision make Lucario a loyal battle strategist.'
  },
  {
    name: 'Gardevoir',
    type: 'Psychic',
    subtype: 'Fairy',
    battle_style: 'support',
    role: 'support',
    attack: 65,
    defense: 55,
    speed: 80,
    special: 120,
    stamina: 60,
    description: 'Calm and powerful, Gardevoir supports team momentum with strategic care and flair.'
  },
  {
    name: 'Dragonite',
    type: 'Dragon',
    subtype: 'Flying',
    battle_style: 'balance',
    role: 'tank',
    attack: 95,
    defense: 85,
    speed: 80,
    special: 80,
    stamina: 88,
    description: 'A majestic powerhouse that blends offense and resilience with fearless energy.'
  },
  {
    name: 'Mew',
    type: 'Psychic',
    subtype: 'Mystic',
    battle_style: 'support',
    role: 'support',
    attack: 100,
    defense: 100,
    speed: 100,
    special: 100,
    stamina: 100,
    description: 'Unmatched versatility and adaptability, ideal for any training style or battle plan.'
  },
  {
    name: 'Blastoise',
    type: 'Water',
    subtype: 'Heavy',
    battle_style: 'defense',
    role: 'tank',
    attack: 83,
    defense: 100,
    speed: 60,
    special: 85,
    stamina: 92,
    description: 'A steady wall that dominates long battles and controls the map with calm precision.'
  },
  {
    name: 'Umbreon',
    type: 'Dark',
    subtype: 'Shadow',
    battle_style: 'defense',
    role: 'tank',
    attack: 65,
    defense: 110,
    speed: 65,
    special: 60,
    stamina: 95,
    description: 'Low-key but intensely resilient, Umbreon thrives when the battle demands patience.'
  },
  {
    name: 'Sylveon',
    type: 'Fairy',
    subtype: 'Grace',
    battle_style: 'support',
    role: 'support',
    attack: 60,
    defense: 65,
    speed: 70,
    special: 110,
    stamina: 80,
    description: 'Gentle but strategic, Sylveon keeps the team stable and full of momentum.'
  }
];

const battleWeightMap = {
  offense: { attack: 0.38, defense: 0.08, speed: 0.29, special: 0.18, stamina: 0.07 },
  defense: { attack: 0.12, defense: 0.38, speed: 0.14, special: 0.12, stamina: 0.24 },
  balance: { attack: 0.25, defense: 0.22, speed: 0.22, special: 0.18, stamina: 0.13 },
  support: { attack: 0.08, defense: 0.16, speed: 0.12, special: 0.38, stamina: 0.26 }
};

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS pokemon (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT NOT NULL,
          subtype TEXT,
          battle_style TEXT,
          role TEXT,
          attack INTEGER,
          defense INTEGER,
          speed INTEGER,
          special INTEGER,
          stamina INTEGER,
          description TEXT
        )
      `, (pokemonErr) => {
        if (pokemonErr) {
          reject(pokemonErr);
          return;
        }

        db.run(`
          CREATE TABLE IF NOT EXISTS user_preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trainer_name TEXT,
            battle_style TEXT,
            preferred_type TEXT,
            team_role TEXT,
            attack INTEGER,
            defense INTEGER,
            speed INTEGER,
            special INTEGER,
            stamina INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (prefErr) => {
          if (prefErr) {
            reject(prefErr);
            return;
          }

          db.get('SELECT COUNT(*) AS count FROM pokemon', (countErr, result) => {
            if (countErr) {
              reject(countErr);
              return;
            }

            if (result.count > 0) {
              resolve();
              return;
            }

            const insertStatement = db.prepare(`
              INSERT INTO pokemon (name, type, subtype, battle_style, role, attack, defense, speed, special, stamina, description)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            seedPokemon.forEach((pokemon) => {
              insertStatement.run(
                pokemon.name,
                pokemon.type,
                pokemon.subtype,
                pokemon.battle_style,
                pokemon.role,
                pokemon.attack,
                pokemon.defense,
                pokemon.speed,
                pokemon.special,
                pokemon.stamina,
                pokemon.description
              );
            });

            insertStatement.finalize((finalizeErr) => {
              if (finalizeErr) {
                reject(finalizeErr);
                return;
              }
              resolve();
            });
          });
        });
      });
    });
  });
}

function normalizePreferences(raw = {}) {
  return {
    trainerName: raw.trainerName || 'Trainer',
    battleStyle: raw.battleStyle || 'balance',
    preferredType: raw.preferredType || 'Any',
    teamRole: raw.teamRole || 'support',
    attack: Number(raw.attack ?? 60),
    defense: Number(raw.defense ?? 60),
    speed: Number(raw.speed ?? 60),
    special: Number(raw.special ?? 60),
    stamina: Number(raw.stamina ?? 60)
  };
}

function computePartnerScore(pokemon, preferences) {
  const weightSet = battleWeightMap[preferences.battleStyle] || battleWeightMap.balance;
  let score = 0;

  Object.entries(weightSet).forEach(([key, weight]) => {
    const pokemonValue = Number(pokemon[key]);
    const userValue = Number(preferences[key]);

    score += weight * pokemonValue * 1.2;
    score += weight * (100 - Math.abs(userValue - pokemonValue));
  });

  if (preferences.preferredType && preferences.preferredType !== 'Any') {
    const typeMatch = pokemon.type === preferences.preferredType || pokemon.subtype === preferences.preferredType;
    score += typeMatch ? 35 : 8;
  }

  if (preferences.teamRole && preferences.teamRole === 'balance') {
    score += 16;
  } else if (preferences.teamRole && pokemon.role === preferences.teamRole) {
    score += 22;
  }

  if (preferences.battleStyle && pokemon.battle_style === preferences.battleStyle) {
    score += 18;
  }

  return score;
}

function choosePartner(preferences) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pokemon ORDER BY name ASC', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const ranked = rows
        .map((pokemon) => ({
          ...pokemon,
          matchScore: computePartnerScore(pokemon, preferences)
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);

      resolve(ranked);
    });
  });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Pokémon partner API is live.' });
});

app.get('/api/pokemon', (req, res) => {
  db.all('SELECT * FROM pokemon ORDER BY name ASC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Unable to fetch Pokémon roster.' });
      return;
    }

    res.json(rows);
  });
});

app.get('/api/preferences', (req, res) => {
  db.all('SELECT * FROM user_preferences ORDER BY created_at DESC LIMIT 10', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Unable to fetch saved preferences.' });
      return;
    }

    res.json(rows);
  });
});

app.post('/api/preferences', async (req, res) => {
  const preferences = normalizePreferences(req.body);

  try {
    const rankedPartners = await choosePartner(preferences);
    const partner = rankedPartners[0];

    db.run(`
      INSERT INTO user_preferences (
        trainer_name,
        battle_style,
        preferred_type,
        team_role,
        attack,
        defense,
        speed,
        special,
        stamina
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      preferences.trainerName,
      preferences.battleStyle,
      preferences.preferredType,
      preferences.teamRole,
      preferences.attack,
      preferences.defense,
      preferences.speed,
      preferences.special,
      preferences.stamina
    ], (insertErr) => {
      if (insertErr) {
        res.status(500).json({ error: 'Unable to save your battle profile.' });
        return;
      }

      res.json({
        success: true,
        preferences,
        partner: {
          ...partner,
          compatibility: Math.min(99, Math.max(60, Math.round(partner.matchScore / 2.5)))
        },
        alternatives: rankedPartners.slice(1).map((pokemon) => ({
          ...pokemon,
          compatibility: Math.min(99, Math.max(60, Math.round(pokemon.matchScore / 2.5)))
        }))
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate a Pokémon partner recommendation.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Pokémon partner site is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
