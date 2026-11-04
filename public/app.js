const form = document.getElementById('partner-form');
const resultCard = document.getElementById('result-card');
const alternativeList = document.getElementById('alternative-list');

function updateSliderValue(input) {
  const label = input.parentElement.querySelector('.slider-value');
  label.textContent = input.value;
}

async function fetchPokemonRoster() {
  const response = await fetch('/api/pokemon');
  const pokemon = await response.json();
  return pokemon;
}

function formatPreferenceLabel(value, fallback = 'any') {
  if (!value || value === 'Any') {
    return fallback;
  }
  return value;
}

function renderPartner(partner, preferences) {
  resultCard.classList.remove('empty');
  resultCard.innerHTML = `
    <h3 class="result-name">${partner.name}</h3>
    <div class="tag-row">
      <span class="tag">${partner.type}</span>
      <span class="tag">${partner.role}</span>
      <span class="tag">${partner.battle_style}</span>
      <span class="tag">${partner.color || 'Color'}</span>
      <span class="tag">Gen ${partner.generation || 'N/A'}</span>
    </div>
    <p class="compatibility">Compatibility: ${partner.compatibility}%</p>
    <p>${partner.description}</p>
    <p><strong>Best stats:</strong> ATK ${partner.attack}, DEF ${partner.defense}, SPD ${partner.speed}</p>
    <p><strong>Trainer style:</strong> ${preferences.trainerName || 'Trainer'} likes ${preferences.battleStyle} play with ${formatPreferenceLabel(preferences.preferredType, 'any')} energy, a ${formatPreferenceLabel(preferences.preferredColor, 'flexible')} palette, and a ${formatPreferenceLabel(preferences.favoriteStat, 'well-rounded')} focus.</p>
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
        `<li><strong>${pokemon.name}</strong> — ${pokemon.type} · ${pokemon.compatibility}% match · Gen ${pokemon.generation || 'N/A'}</li>`
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
    preferredColor: formData.get('preferredColor') === 'Any' ? 'Any' : formData.get('preferredColor'),
    favoriteStat: formData.get('favoriteStat') === 'Any' ? 'Any' : formData.get('favoriteStat'),
    generation: formData.get('generation') === 'Any' ? 'Any' : String(formData.get('generation')),
    teamRole: formData.get('teamRole')
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
