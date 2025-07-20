// Matrix effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "HAPPY BIRTHDAY 💖".split("");
const fontSize = 18;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff69b4";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}
setInterval(draw, 60);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

// Countdown + videos
let count = 3;
const startButton = document.getElementById("startButton");
const countEl = document.getElementById("count");
const videoWrapper = document.getElementById("videoWrapper");
const video = document.getElementById("birthdayVideo");
const giftButton = document.getElementById("giftButton");

// Start on button click
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  countEl.style.display = "block";

  const countdown = setInterval(() => {
    count--;
    if (count > 0) {
      countEl.textContent = count;
    } else {
      clearInterval(countdown);
      countEl.style.display = "none";

      // Start video 1 (autoplay muted, then unmute)
      videoWrapper.style.display = "block";
      video.src = "0720.mp4";
      video.muted = true;

      video.play()
        .then(() => {
          setTimeout(() => {
            video.muted = false;
          }, 300);
        })
        .catch((e) => {
          console.log("Autoplay failed:", e);
        });
    }
  }, 1000);
});

// When video 1 ends, show gift button
video.addEventListener("ended", () => {
  if (video.src.includes("0720.mp4")) {
    giftButton.style.display = "block";
  }
});

// On click, play video 2 (MUTED)
giftButton.addEventListener("click", () => {
  giftButton.style.display = "none";
  video.src = "a36c649c7eed5789c78241ad98e3cd4a_720w.mp4";
  video.muted = true;
  video.play();
});
