const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'pokemon.db');
const db = new sqlite3.Database(dbPath);

const seedPokemon = [
  {
    name: 'Oddish',
    type: 'Grass',
    subtype: 'Poison',
    battle_style: 'support',
    role: 'support',
    color: 'Green',
    generation: 1,
    attack: 52,
    defense: 54,
    speed: 50,
    special: 75,
    stamina: 70,
    description: 'A patient forest companion that brings calm support and unusual resilience.'
  },
  {
    name: 'Vulpix',
    type: 'Fire',
    subtype: 'Fox',
    battle_style: 'offense',
    role: 'striker',
    color: 'Orange',
    generation: 1,
    attack: 76,
    defense: 52,
    speed: 70,
    special: 70,
    stamina: 60,
    description: 'A nimble fire partner that warms up the team and strikes with clever timing.'
  },
  {
    name: 'Shellder',
    type: 'Water',
    subtype: 'Bivalve',
    battle_style: 'defense',
    role: 'tank',
    color: 'Blue',
    generation: 1,
    attack: 65,
    defense: 100,
    speed: 40,
    special: 75,
    stamina: 80,
    description: 'A sturdy shell specialist built for long, defensive battles and controlled pacing.'
  },
  {
    name: 'Sandshrew',
    type: 'Ground',
    subtype: 'Digging',
    battle_style: 'defense',
    role: 'tank',
    color: 'Tan',
    generation: 1,
    attack: 75,
    defense: 85,
    speed: 55,
    special: 40,
    stamina: 80,
    description: 'A tough desert guardian that thrives in gritty, ground-heavy matchups.'
  },
  {
    name: 'Mankey',
    type: 'Fighting',
    subtype: 'Monkey',
    battle_style: 'offense',
    role: 'striker',
    color: 'Brown',
    generation: 1,
    attack: 80,
    defense: 40,
    speed: 70,
    special: 45,
    stamina: 65,
    description: 'An energetic fighter who likes to push fast and be first to act.'
  },
  {
    name: 'Geodude',
    type: 'Rock',
    subtype: 'Stone',
    battle_style: 'defense',
    role: 'tank',
    color: 'Brown',
    generation: 1,
    attack: 70,
    defense: 95,
    speed: 20,
    special: 45,
    stamina: 85,
    description: 'A stern, grounded battler that turns every exchange into a durable contest.'
  },
  {
    name: 'Gastly',
    type: 'Ghost',
    subtype: 'Poison',
    battle_style: 'offense',
    role: 'striker',
    color: 'Purple',
    generation: 1,
    attack: 65,
    defense: 45,
    speed: 90,
    special: 85,
    stamina: 50,
    description: 'A mischievous ghostly duelist that slips in with clever pressure.'
  },
  {
    name: 'Ekans',
    type: 'Poison',
    subtype: 'Snake',
    battle_style: 'defense',
    role: 'tank',
    color: 'Purple',
    generation: 1,
    attack: 75,
    defense: 70,
    speed: 60,
    special: 50,
    stamina: 72,
    description: 'A sly poison specialist that thrives on patient pressure and control.'
  },
  {
    name: 'Dratini',
    type: 'Dragon',
    subtype: 'Serpent',
    battle_style: 'balance',
    role: 'support',
    color: 'Blue',
    generation: 1,
    attack: 64,
    defense: 45,
    speed: 50,
    special: 60,
    stamina: 75,
    description: 'A curious dragon that grows with patience and turns style into strength.'
  },
  {
    name: 'Espeon',
    type: 'Psychic',
    subtype: 'Fox',
    battle_style: 'support',
    role: 'support',
    color: 'Purple',
    generation: 2,
    attack: 65,
    defense: 60,
    speed: 110,
    special: 110,
    stamina: 70,
    description: 'A calm psychic partner who reads the field and responds with elegant precision.'
  },
  {
    name: 'Houndour',
    type: 'Dark',
    subtype: 'Fire',
    battle_style: 'offense',
    role: 'striker',
    color: 'Red',
    generation: 2,
    attack: 90,
    defense: 50,
    speed: 80,
    special: 65,
    stamina: 62,
    description: 'An intense, fast hunter that thrives on chasing down momentum.'
  },
  {
    name: 'Scizor',
    type: 'Bug',
    subtype: 'Steel',
    battle_style: 'balance',
    role: 'striker',
    color: 'Red',
    generation: 2,
    attack: 130,
    defense: 100,
    speed: 80,
    special: 55,
    stamina: 80,
    description: 'A disciplined bug-type brawler with brutal offense and excellent control.'
  },
  {
    name: 'Skarmory',
    type: 'Flying',
    subtype: 'Steel',
    battle_style: 'defense',
    role: 'tank',
    color: 'Gray',
    generation: 2,
    attack: 80,
    defense: 140,
    speed: 70,
    special: 40,
    stamina: 90,
    description: 'A razorwing defender built for strategic control and steady point denial.'
  },
  {
    name: 'Miltank',
    type: 'Normal',
    subtype: 'Dairy',
    battle_style: 'support',
    role: 'support',
    color: 'Pink',
    generation: 2,
    attack: 80,
    defense: 95,
    speed: 50,
    special: 60,
    stamina: 96,
    description: 'A dependable all-round teammate whose steadiness keeps everyone calm.'
  },
  {
    name: 'Mudkip',
    type: 'Water',
    subtype: 'Mud',
    battle_style: 'balance',
    role: 'support',
    color: 'Blue',
    generation: 3,
    attack: 70,
    defense: 50,
    speed: 65,
    special: 70,
    stamina: 72,
    description: 'A versatile water partner that balances offense with quiet stability.'
  },
  {
    name: 'Sableye',
    type: 'Dark',
    subtype: 'Ghost',
    battle_style: 'support',
    role: 'support',
    color: 'Purple',
    generation: 3,
    attack: 75,
    defense: 75,
    speed: 50,
    special: 70,
    stamina: 70,
    description: 'A clever trickster that brings clever utility and deep tactical awareness.'
  },
  {
    name: 'Aggron',
    type: 'Steel',
    subtype: 'Rock',
    battle_style: 'defense',
    role: 'tank',
    color: 'Gray',
    generation: 3,
    attack: 110,
    defense: 180,
    speed: 30,
    special: 60,
    stamina: 95,
    description: 'A steel wall with relentless armor and an almost impossible endurance curve.'
  },
  {
    name: 'Meditite',
    type: 'Fighting',
    subtype: 'Psychic',
    battle_style: 'balance',
    role: 'striker',
    color: 'Blue',
    generation: 3,
    attack: 90,
    defense: 55,
    speed: 95,
    special: 80,
    stamina: 78,
    description: 'A sharp and focused fighter whose footwork makes every exchange feel controlled.'
  },
  {
    name: 'Rotom',
    type: 'Electric',
    subtype: 'Ghost',
    battle_style: 'support',
    role: 'support',
    color: 'White',
    generation: 4,
    attack: 65,
    defense: 60,
    speed: 95,
    special: 105,
    stamina: 70,
    description: 'A playful electric ghost that fights with flexible, tactical flair.'
  },
  {
    name: 'Leafeon',
    type: 'Grass',
    subtype: 'Forest',
    battle_style: 'defense',
    role: 'tank',
    color: 'Green',
    generation: 4,
    attack: 95,
    defense: 90,
    speed: 75,
    special: 70,
    stamina: 85,
    description: 'A grounded and resilient grass partner with plenty of staying power.'
  },
  {
    name: 'Glaceon',
    type: 'Ice',
    subtype: 'Frost',
    battle_style: 'support',
    role: 'support',
    color: 'Blue',
    generation: 4,
    attack: 60,
    defense: 65,
    speed: 100,
    special: 110,
    stamina: 74,
    description: 'A cool-headed precision specialist that thrives in layered, calculated play.'
  },
  {
    name: 'Sandile',
    type: 'Ground',
    subtype: 'Dark',
    battle_style: 'offense',
    role: 'striker',
    color: 'Brown',
    generation: 5,
    attack: 72,
    defense: 65,
    speed: 82,
    special: 48,
    stamina: 80,
    description: 'A fierce sand runner that stays aggressive and hard to pin down.'
  },
  {
    name: 'Blitzle',
    type: 'Electric',
    subtype: 'Horse',
    battle_style: 'offense',
    role: 'striker',
    color: 'Yellow',
    generation: 5,
    attack: 80,
    defense: 55,
    speed: 105,
    special: 50,
    stamina: 70,
    description: 'A blazing-fast thunder partner built for elevated momentum and constant motion.'
  },
  {
    name: 'Espurr',
    type: 'Psychic',
    subtype: 'Mystic',
    battle_style: 'support',
    role: 'support',
    color: 'Pink',
    generation: 6,
    attack: 63,
    defense: 48,
    speed: 68,
    special: 101,
    stamina: 62,
    description: 'A thoughtful psychic companion who brings elegance and calm control.'
  },
  {
    name: 'Fletchling',
    type: 'Flying',
    subtype: 'Fire',
    battle_style: 'offense',
    role: 'striker',
    color: 'Red',
    generation: 6,
    attack: 74,
    defense: 45,
    speed: 100,
    special: 50,
    stamina: 59,
    description: 'A sharp aerial attacker with delightful burst potential.'
  },
  {
    name: 'Litten',
    type: 'Fire',
    subtype: 'Cat',
    battle_style: 'offense',
    role: 'striker',
    color: 'Orange',
    generation: 7,
    attack: 81,
    defense: 48,
    speed: 80,
    special: 55,
    stamina: 68,
    description: 'A confident spark partner built for direct attacks and combative pressure.'
  },
  {
    name: 'Rowlet',
    type: 'Grass',
    subtype: 'Flying',
    battle_style: 'support',
    role: 'support',
    color: 'Green',
    generation: 7,
    attack: 60,
    defense: 55,
    speed: 75,
    special: 78,
    stamina: 75,
    description: 'A thoughtful, observant partner that prefers clean strategies over chaos.'
  },
  {
    name: 'Dreepy',
    type: 'Dragon',
    subtype: 'Ghost',
    battle_style: 'offense',
    role: 'striker',
    color: 'Purple',
    generation: 8,
    attack: 80,
    defense: 50,
    speed: 125,
    special: 70,
    stamina: 52,
    description: 'A quick, mysterious dragon that jumps into action with spontaneous energy.'
  },
  {
    name: 'Wooloo',
    type: 'Normal',
    subtype: 'Sheep',
    battle_style: 'support',
    role: 'support',
    color: 'White',
    generation: 8,
    attack: 40,
    defense: 55,
    speed: 45,
    special: 40,
    stamina: 86,
    description: 'A gentle, steady helper who keeps workflows calm and comfortable.'
  },
  {
    name: 'Sprigatito',
    type: 'Grass',
    subtype: 'Cute',
    battle_style: 'support',
    role: 'support',
    color: 'Green',
    generation: 9,
    attack: 65,
    defense: 45,
    speed: 83,
    special: 75,
    stamina: 60,
    description: 'A playful new-generation teammate with a surprisingly strategic mind.'
  },
  {
    name: 'Quaxly',
    type: 'Water',
    subtype: 'Proud',
    battle_style: 'balance',
    role: 'support',
    color: 'Blue',
    generation: 9,
    attack: 75,
    defense: 60,
    speed: 83,
    special: 70,
    stamina: 65,
    description: 'A polished partner who knows how to stay balanced and efficient.'
  },
  {
    name: 'Fidough',
    type: 'Fairy',
    subtype: 'Puppy',
    battle_style: 'support',
    role: 'support',
    color: 'Tan',
    generation: 9,
    attack: 70,
    defense: 55,
    speed: 60,
    special: 65,
    stamina: 72,
    description: 'A cheerful, comforting teammate that makes teamwork feel effortless.'
  }
];

const battleWeightMap = {
  offense: { attack: 0.38, defense: 0.08, speed: 0.29, special: 0.18, stamina: 0.07 },
  defense: { attack: 0.12, defense: 0.38, speed: 0.14, special: 0.12, stamina: 0.24 },
  balance: { attack: 0.25, defense: 0.22, speed: 0.22, special: 0.18, stamina: 0.13 },
  support: { attack: 0.08, defense: 0.16, speed: 0.12, special: 0.38, stamina: 0.26 }
};

function runDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function getDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

async function addMissingColumn(tableName, columnName, definition) {
  const columns = await new Promise((resolve, reject) => {
    db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });

  if (columns.some((column) => column.name === columnName)) {
    return;
  }

  await runDb(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
}

async function seedPokemonTable() {
  for (const pokemon of seedPokemon) {
    const row = await getDb('SELECT id FROM pokemon WHERE name = ?', [pokemon.name]);

    if (row) {
      await runDb(
        `UPDATE pokemon SET type = ?, subtype = ?, battle_style = ?, role = ?, color = ?, generation = ?, attack = ?, defense = ?, speed = ?, special = ?, stamina = ?, description = ? WHERE id = ?`,
        [
          pokemon.type,
          pokemon.subtype,
          pokemon.battle_style,
          pokemon.role,
          pokemon.color,
          pokemon.generation,
          pokemon.attack,
          pokemon.defense,
          pokemon.speed,
          pokemon.special,
          pokemon.stamina,
          pokemon.description,
          row.id
        ]
      );
      continue;
    }

    await runDb(
      `INSERT INTO pokemon (name, type, subtype, battle_style, role, color, generation, attack, defense, speed, special, stamina, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pokemon.name,
        pokemon.type,
        pokemon.subtype,
        pokemon.battle_style,
        pokemon.role,
        pokemon.color,
        pokemon.generation,
        pokemon.attack,
        pokemon.defense,
        pokemon.speed,
        pokemon.special,
        pokemon.stamina,
        pokemon.description
      ]
    );
  }
}

async function initializeDatabase() {
  await runDb(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      subtype TEXT,
      battle_style TEXT,
      role TEXT,
      color TEXT,
      generation INTEGER,
      attack INTEGER,
      defense INTEGER,
      speed INTEGER,
      special INTEGER,
      stamina INTEGER,
      description TEXT
    )
  `);

  await runDb(`
    CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trainer_name TEXT,
      battle_style TEXT,
      preferred_type TEXT,
      preferred_color TEXT,
      favorite_stat TEXT,
      generation INTEGER,
      team_role TEXT,
      attack INTEGER,
      defense INTEGER,
      speed INTEGER,
      special INTEGER,
      stamina INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await addMissingColumn('pokemon', 'color', 'TEXT');
  await addMissingColumn('pokemon', 'generation', 'INTEGER');
  await addMissingColumn('user_preferences', 'preferred_color', 'TEXT');
  await addMissingColumn('user_preferences', 'favorite_stat', 'TEXT');
  await addMissingColumn('user_preferences', 'generation', 'INTEGER');

  await runDb('DELETE FROM pokemon');
  await seedPokemonTable();
}

function normalizeOption(value, fallback = 'Any') {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const normalized = String(value).trim();
  return normalized || fallback;
}

function normalizePreferences(raw = {}) {
  const generationValue = normalizeOption(raw.generation, 'Any');

  return {
    trainerName: raw.trainerName || 'Trainer',
    battleStyle: normalizeOption(raw.battleStyle, 'balance'),
    preferredType: normalizeOption(raw.preferredType, 'Any'),
    preferredColor: normalizeOption(raw.preferredColor, 'Any'),
    generation: generationValue === 'Any' ? null : Number(generationValue),
    favoriteStat: normalizeOption(raw.favoriteStat, 'Any'),
    teamRole: normalizeOption(raw.teamRole, 'support'),
    attack: 60,
    defense: 60,
    speed: 60,
    special: 60,
    stamina: 60
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
    score += typeMatch ? 45 : 6;
  }

  if (preferences.preferredColor && preferences.preferredColor !== 'Any') {
    score += pokemon.color === preferences.preferredColor ? 28 : 5;
  }

  if (preferences.generation !== null && preferences.generation !== undefined && preferences.generation !== 'Any') {
    score += Number(pokemon.generation) === Number(preferences.generation) ? 40 : -18;
  }

  if (preferences.favoriteStat && preferences.favoriteStat !== 'Any') {
    const statKey = preferences.favoriteStat.toLowerCase();
    const statScore = Number(pokemon[statKey]) || 0;
    score += statScore * 0.45;
    score += statScore > 80 ? 12 : 0;
  }

  if (preferences.teamRole && preferences.teamRole === 'balance') {
    score += 16;
  } else if (preferences.teamRole && pokemon.role === preferences.teamRole) {
    score += 22;
  }

  if (preferences.battleStyle && pokemon.battle_style === preferences.battleStyle) {
    score += 18;
  }

  return Number(score.toFixed(2));
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

    db.run(
      `
        INSERT INTO user_preferences (
          trainer_name,
          battle_style,
          preferred_type,
          preferred_color,
          favorite_stat,
          generation,
          team_role,
          attack,
          defense,
          speed,
          special,
          stamina
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        preferences.trainerName,
        preferences.battleStyle,
        preferences.preferredType,
        preferences.preferredColor,
        preferences.favoriteStat,
        preferences.generation,
        preferences.teamRole,
        preferences.attack,
        preferences.defense,
        preferences.speed,
        preferences.special,
        preferences.stamina
      ],
      (insertErr) => {
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
      }
    );
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
