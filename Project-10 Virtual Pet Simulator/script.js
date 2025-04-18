const feedSound = new Audio('sounds/feed.mp3');
const playSound = new Audio('sounds/play.mp3');
const restSound = new Audio('sounds/rest.mp3');

let hunger = 50;
let happiness = 50;
let energy = 50;

function updateBars() {
  document.getElementById('hungerBar').style.width = hunger + '%';
  document.getElementById('happinessBar').style.width = happiness + '%';
  document.getElementById('energyBar').style.width = energy + '%';

  const petEmoji = document.getElementById('pet');
  const mood = (hunger < 30 || happiness < 30 || energy < 30)
    ? 'sad'
    : (hunger > 70 && happiness > 70 && energy > 70)
    ? 'happy'
    : 'neutral';

  let emoji = selectedPetEmoji;

  if (selectedPetEmoji === '😺') {
    emoji = mood === 'sad' ? '😿' : mood === 'happy' ? '😸' : '😼';
  } else if (selectedPetEmoji === '🐶') {
    emoji = mood === 'sad' ? '🐶😢' : mood === 'happy' ? '🐶😄' : '🐶😐';
  } else if (selectedPetEmoji === '🐰') {
    emoji = mood === 'sad' ? '🐰😢' : mood === 'happy' ? '🐰😄' : '🐰😐';
  }

  petEmoji.textContent = emoji;

  document.getElementById('hungerBar').style.background = getColor(hunger);
  document.getElementById('happinessBar').style.background = getColor(happiness);
  document.getElementById('energyBar').style.background = getColor(energy);
}

function getColor(value) {
  if (value > 70) return '#4caf50'; // green
  if (value > 40) return '#ff9800'; // orange
  return '#f44336'; // red
}

// Decrease stats over time
setInterval(() => {
  hunger = Math.max(hunger - 2, 0);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);
  updateBars();
}, 5000);

updateBars();

function feedPet() {
  hunger = Math.min(hunger + 20, 100);
  energy = Math.min(energy + 5, 100);
  feedSound.play();
  updateBars();
}

function playWithPet() {
  if (energy >= 10) {
    happiness = Math.min(happiness + 15, 100);
    hunger = Math.max(hunger - 10, 0);
    energy = Math.max(energy - 10, 0);
    playSound.play();
  }
  updateBars();
}

function restPet() {
  energy = Math.min(energy + 20, 100);
  hunger = Math.max(hunger - 5, 0);
  restSound.play();
  updateBars();
}

function changePet() {
  selectedPetEmoji = document.getElementById('petSelect').value;
  updateBars();
}


updateBars();
changePet();

