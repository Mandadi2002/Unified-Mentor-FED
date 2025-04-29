let currentPage = 1;
const totalPages = 53;
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const playMusicButton = document.getElementById('play-music-button');
const pauseMusicButton = document.getElementById('pause-music-button');
const volumeControl = document.getElementById('volume-control');


let currentStory = 'vikram-and-betal';

function setStory(storyId) {
  currentStory = storyId;

  if (storyId === 'vikram-and-betal') {
    currentPage = 1;
    totalPages = 14;
  } else if (storyId === 'bitter-truth') {
    currentPage = 15;
    totalPages = 53;
  } else if (storyId === 'Sage-and-king') {
    currentPage = 15;
    totalPages = 15;
  }



  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const firstPage = document.getElementById(`page-${currentPage}`);
  if (firstPage) firstPage.classList.add('active');

  playNarrationForPage(currentPage);
  updateProgress();
  playBackgroundMusic?.(); // Optional: call if you want music to auto-play
}


// Background music setup
const music = new Audio('your-music-file.mp3'); // Replace with your actual file
music.loop = true;

// 🔊 Volume control
volumeControl.addEventListener("input", function () {
  music.volume = this.value;
});

// ▶️ Music toggle
function toggleMusic() {
  if (music.paused) {
    music.play();
    playMusicButton.style.display = "none";
    pauseMusicButton.style.display = "inline";
  } else {
    music.pause();
    playMusicButton.style.display = "inline";
    pauseMusicButton.style.display = "none";
  }
}

function stopMusic() {
  music.pause();
  music.currentTime = 0;
  playMusicButton.style.display = "inline";
  pauseMusicButton.style.display = "none";
}

// 📖 Play one or two narrations for a page
function playNarrationForPage(pageNum) {
  const a = document.getElementById(`narration-${pageNum}a`);
  const b = document.getElementById(`narration-${pageNum}b`);
  const c = document.getElementById(`narration-${pageNum}c`);
  const single = document.getElementById(`narration-${pageNum}`);

  if (a && b && c) {
    playNarrationsSequentially([
      `narration-${pageNum}a`,
      `narration-${pageNum}b`,
      `narration-${pageNum}c`
    ]);
  } else if (a && b) {
    playNarrationsSequentially([
      `narration-${pageNum}a`,
      `narration-${pageNum}b`
    ]);
  } else if (single) {
    single.play();
  }
}

// 🎧 Helper: Play multiple narrations sequentially
function playNarrationsSequentially(narrationIds) {
  if (narrationIds.length === 0) return;

  let index = 0;

  function playNext() {
    const audio = document.getElementById(narrationIds[index]);
    if (!audio) return;

    audio.play();
    audio.onended = () => {
      index++;
      if (index < narrationIds.length) {
        playNext();
      }
    };
  }

  playNext();
}

// ⏭ Next page
function nextPage() {
  const current = document.getElementById(`page-${currentPage}`);
  current.classList.remove('active');
  pauseNarrationsForPage(currentPage);

  currentPage++;
  if (currentPage > totalPages) {
    currentPage = 1;
  }

  const next = document.getElementById(`page-${currentPage}`);
  next.classList.add('active');
  playNarrationForPage(currentPage);

  updateProgress();
}

// ⏮ Previous page
function previousPage() {
  const current = document.getElementById(`page-${currentPage}`);
  current.classList.remove('active');
  pauseNarrationsForPage(currentPage);

  currentPage--;
  if (currentPage < 1) {
    currentPage = totalPages;
  }

  const next = document.getElementById(`page-${currentPage}`);
  next.classList.add('active');
  playNarrationForPage(currentPage);

  updateProgress();
}

// ⏯ Start the story
function startStory() {
  currentPage = 1;
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(`page-${currentPage}`).classList.add('active');
  playNarrationForPage(currentPage);
  updateProgress();
}

// 🔄 Restart the story
function restartStory() {
  currentPage = 1;
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(`page-${currentPage}`).classList.add('active');
  playNarrationForPage(currentPage);
  updateProgress();
}

// 🛑 Stop the story
function stopStory() {
  currentPage = 0;
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('audio').forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  const firstPage = document.getElementById(`page-${currentPage}`);
  if (firstPage) {
    firstPage.classList.add('active');
  }

  playNarrationForPage(currentPage);
  updateProgress();
}

// 🔃 Update progress bar
function updateProgress() {
  const progress = (currentPage / totalPages) * 100;
  progressFill.style.width = `${progress}%`;
}

// ⏸ Pause all narrations for a specific page
function pauseNarrationsForPage(pageNum) {
  const a = document.getElementById(`narration-${pageNum}a`);
  const b = document.getElementById(`narration-${pageNum}b`);
  const c = document.getElementById(`narration-${pageNum}c`);
  const single = document.getElementById(`narration-${pageNum}`);

  if (a) {
    a.pause();
    a.currentTime = 0;
  }
  if (b) {
    b.pause();
    b.currentTime = 0;
  }
  if (c) {
    c.pause();
    c.currentTime = 0;
  }
  if (single) {
    single.pause();
    single.currentTime = 0;
  }
}

function playNarration() {
  const audio1 = document.getElementById('narration-15a');
  const audio2 = document.getElementById('narration-15b');

  audio1.play();
  audio1.onended = function() {
    audio2.play();
  };
}

function goToPage() {
  const pageInput = document.getElementById('page-number');
  const pageNum = pageInput.value;

  if (pageNum >= 15 && pageNum <= 52) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show the selected page
    const selectedPage = document.getElementById(`page-${pageNum}`);
    if (selectedPage) {
      selectedPage.classList.add('active');
      // Optionally scroll into view
      selectedPage.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    alert("Please enter a valid page number between 15 and 52.");
  }
}

