const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

playButton.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); } catch { alert('Maglagay muna ng music.mp3 sa parehong folder ng website.'); }
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => { playButton.textContent = 'Ⅱ'; });
audio.addEventListener('pause', () => { playButton.textContent = '▶'; });
audio.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(audio.duration); });
audio.addEventListener('timeupdate', () => {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});
progress.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
});
volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
audio.volume = Number(volume.value);
const music = document.getElementById("music");

music.volume = 0.3;

document.addEventListener("click", () => {
  music.play().catch(error => {
    console.log("Music playback blocked:", error);
  });
}, { once: true });
