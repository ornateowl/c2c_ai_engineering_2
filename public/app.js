const form = document.getElementById('partner-form');
const resultCard = document.getElementById('result-card');
const alternativeList = document.getElementById('alternative-list');

function updateSliderValue(input) {
  const label = input.parentElement.querySelector('.slider-value');
  label.textContent = input.value;
}

Array.from(document.querySelectorAll('input[type="range"]')).forEach((range) => {
  updateSliderValue(range);
  range.addEventListener('input', () => updateSliderValue(range));
});

async function fetchPokemonRoster() {
  const response = await fetch('/api/pokemon');
  const pokemon = await response.json();
  return pokemon;
}

function renderPartner(partner, preferences) {
  resultCard.classList.remove('empty');
  resultCard.innerHTML = `
    <h3 class="result-name">${partner.name}</h3>
    <div class="tag-row">
      <span class="tag">${partner.type}</span>
      <span class="tag">${partner.role}</span>
      <span class="tag">${partner.battle_style}</span>
    </div>
    <p class="compatibility">Compatibility: ${partner.compatibility}%</p>
    <p>${partner.description}</p>
    <p><strong>Best stats:</strong> ATK ${partner.attack}, DEF ${partner.defense}, SPD ${partner.speed}</p>
    <p><strong>Trainer style:</strong> ${preferences.trainerName || 'Trainer'} likes ${preferences.battleStyle} play with ${preferences.preferredType || 'any'} energy.</p>
  `;
}

function renderAlternatives(alternatives = []) {
  if (!alternatives.length) {
    alternativeList.innerHTML = '<li>No alternatives yet.</li>';
    return;
  }

  alternativeList.innerHTML = alternatives
    .map(
      (pokemon) =>
        `<li><strong>${pokemon.name}</strong> — ${pokemon.type} · ${pokemon.compatibility}% match</li>`
    )
    .join('');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    trainerName: formData.get('trainerName'),
    battleStyle: formData.get('battleStyle'),
    preferredType: formData.get('preferredType') === 'Any' ? 'Any' : formData.get('preferredType'),
    teamRole: formData.get('teamRole'),
    attack: Number(formData.get('attack')),
    defense: Number(formData.get('defense')),
    speed: Number(formData.get('speed')),
    special: Number(formData.get('special')),
    stamina: Number(formData.get('stamina'))
  };

  try {
    const response = await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Could not generate partner');
    }

    renderPartner(result.partner, result.preferences);
    renderAlternatives(result.alternatives || []);
  } catch (error) {
    resultCard.classList.remove('empty');
    resultCard.innerHTML = `<p>Something went wrong while choosing your partner.</p><p>${error.message}</p>`;
    alternativeList.innerHTML = '<li>Try again with a different profile.</li>';
  }
});

(async function init() {
  try {
    await fetchPokemonRoster();
  } catch (error) {
    resultCard.innerHTML = '<p>The Pokémon roster could not load. Please refresh the page.</p>';
  }
})();
