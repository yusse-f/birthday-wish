// Matrix-style Happy Birthday in pink
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "HAPPY BIRTHDAY 💖".split("");
const fontSize = 18;
let columns = Math.floor(canvas.width / fontSize);

// Drops: one per column
let drops = Array(columns).fill(1);

// Draw function
function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff69b4"; 
  ctx.font = '${fontSize}px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop randomly
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 60);

// Update on resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});
// Countdown then Happy Birthday then Video
let count = 3;
const countEl = document.getElementById("count");
const videoWrapper = document.getElementById("videoWrapper");
const video = document.getElementById("birthdayVideo");
const tapToStart = document.getElementById("tapToStart");

const countdown = setInterval(() => {
  count--;
  if (count > 0) {
    countEl.textContent = count;
  } else {
    clearInterval(countdown);

    // Show "Happy Birthday"
    countEl.textContent = "🎉 Happy Birthday!";
    countEl.style.fontSize = "4rem";

    // Wait 2s, then show video
    setTimeout(() => {
      countEl.style.display = "none";
      videoWrapper.style.display = "block";
      video.muted = false;
      const play = video.play();

      // if autoplay blocked by browser, show button instead
      if (play !== undefined) {
        play.catch(() => {
          tapToStart.style.display = "block";
        });
      }
    }, 2000);
  }
}, 1000);

// Handle user tap if autoplay is blocked
tapToStart.addEventListener("click", () => {
  tapToStart.style.display = "none";
  video.muted = false;
  video.play();
});
