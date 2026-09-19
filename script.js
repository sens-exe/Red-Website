const audio = document.getElementById('audio');
audio.volume = 0.3;

document.addEventListener("click", () => {
  audio.play().catch(error => {
    console.log("Music playback blocked:", error);
  });
}, { once: true });

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

const DISCORD_ID = "445372100946165761";

async function updateDiscordStatus() {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_ID}`
    );

    const result = await response.json();
    const data = result.data;

    const name = document.getElementById("discord-name");
    const avatar = document.getElementById("discord-avatar");

if (data.discord_user.avatar) {
  avatar.src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`;
}
    const activityText = document.getElementById("discord-activity");
    const statusText = document.getElementById("discord-status");
    const dot = document.getElementById("discord-dot");

    const statusNames = {
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
      offline: "Offline"
    };

    const status = data.discord_status || "offline";

    name.textContent = data.discord_user.global_name ||
      data.discord_user.username;

    statusText.textContent = statusNames[status] || "Offline";

    dot.style.background =
      status === "online" ? "#43b581" :
      status === "idle" ? "#faa61a" :
      status === "dnd" ? "#f04747" :
      "#747f8d";

    const game = data.activities.find(
      activity => activity.type === 0
    );

    if (game) {
      activityText.textContent =
        `${game.name}${game.details ? " • " + game.details : ""}`;
    } else {
      activityText.textContent = "No active game";
    }

  } catch (error) {
    console.error("Discord status error:", error);
  }
}

updateDiscordStatus();

setInterval(updateDiscordStatus, 15000);
