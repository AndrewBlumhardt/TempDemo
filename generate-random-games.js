const fs = require("fs");
const path = require("path");

const root = process.cwd();
const gamesDir = path.join(root, "random-html-games");
const rootGalleryPath = path.join(root, "index.html");
const nestedGalleryPath = path.join(gamesDir, "index.html");
const rootReadmePath = path.join(root, "README.md");
const totalGames = 100;

const themePacks = [
  {
    theme: "Spy Ops",
    inspiration: "classic spy fiction",
    goals: ["extract intel", "disable alarms", "secure dossiers", "evade patrols"],
    enemies: ["agents", "guards", "interceptors", "lasers"],
    names: ["Cipher", "Shadow", "Mirage", "Velvet", "Midnight"],
    palette: ["#09111b", "#1f3a5f"]
  },
  {
    theme: "Dungeon Crawler",
    inspiration: "retro maze-and-monster adventures",
    goals: ["loot relics", "break seals", "escape chambers", "recover runes"],
    enemies: ["slimes", "skeletons", "mimics", "wardens"],
    names: ["Rune", "Crypt", "Torch", "Obsidian", "Labyrinth"],
    palette: ["#160f29", "#5b3f9b"]
  },
  {
    theme: "Heroic Fantasy Quest",
    inspiration: "muscle-fantasy adventure cartoons",
    goals: ["shatter idols", "rescue villagers", "claim crystals", "cross badlands"],
    enemies: ["warlords", "raiders", "beast riders", "serpent fiends"],
    names: ["Titan", "Sunblade", "Savage", "Thunder", "Skull"],
    palette: ["#2f1608", "#b86712"]
  },
  {
    theme: "Arena Brawler",
    inspiration: "arcade tournament fighters",
    goals: ["win rounds", "land counters", "break combos", "outlast rivals"],
    enemies: ["challengers", "champions", "sparring bots", "heavy hitters"],
    names: ["Strike", "Impact", "Rush", "Knuckle", "Fury"],
    palette: ["#260708", "#b11f31"]
  },
  {
    theme: "Space Patrol",
    inspiration: "arcade star battles",
    goals: ["clear sectors", "close rifts", "escort freighters", "gather fuel"],
    enemies: ["drones", "pirates", "frigates", "void swarms"],
    names: ["Nova", "Pulse", "Nebula", "Vector", "Comet"],
    palette: ["#070d22", "#2157d9"]
  },
  {
    theme: "Cyber Runner",
    inspiration: "neon chase platformers",
    goals: ["hack gates", "escape grids", "snag cores", "outrace hunters"],
    enemies: ["trackers", "sentinels", "turrets", "sweepers"],
    names: ["Neon", "Glitch", "Chrome", "Signal", "Circuit"],
    palette: ["#12061b", "#52208d"]
  },
  {
    theme: "Sky Raider",
    inspiration: "airship adventure serials",
    goals: ["capture beacons", "map skies", "salvage cargo", "dodge storms"],
    enemies: ["corsairs", "zeppelins", "hawks", "tempests"],
    names: ["Aether", "Gale", "Cloud", "Drift", "Skylance"],
    palette: ["#12233a", "#f97352"]
  },
  {
    theme: "Haunted Escape",
    inspiration: "ghostly survival games",
    goals: ["light candles", "seal portals", "unlock wings", "survive midnight"],
    enemies: ["phantoms", "wraiths", "dolls", "echoes"],
    names: ["Whisper", "Raven", "Hollow", "Ash", "Cinder"],
    palette: ["#111827", "#374151"]
  },
  {
    theme: "Jungle Relic",
    inspiration: "treasure-hunt adventures",
    goals: ["recover idols", "cross ruins", "follow maps", "dodge traps"],
    enemies: ["guardians", "rivals", "snakes", "traps"],
    names: ["Temple", "Canopy", "Emerald", "Vine", "Jaguar"],
    palette: ["#0d311e", "#4f7a2d"]
  },
  {
    theme: "Ocean Frontier",
    inspiration: "underwater explorer games",
    goals: ["scan reefs", "repair subs", "recover cargo", "avoid predators"],
    enemies: ["sharks", "raiders", "mines", "squalls"],
    names: ["Tide", "Abyss", "Coral", "Current", "Trident"],
    palette: ["#0b3440", "#1296d1"]
  }
];

const mechanicPacks = [
  { mode: "collector", summary: "collect shards and avoid threats", token: "shards", enemySpeed: 1.0, spawnBias: 1.0 },
  { mode: "survival", summary: "stay alive while pressure ramps up", token: "beacons", enemySpeed: 1.15, spawnBias: 1.2 },
  { mode: "duel", summary: "strike enemies and survive close quarters", token: "charges", enemySpeed: 1.05, spawnBias: 0.95 },
  { mode: "rescue", summary: "grab capsules and pull them back to center", token: "capsules", enemySpeed: 0.95, spawnBias: 1.05 },
  { mode: "race", summary: "hit checkpoints before the swarm closes in", token: "checkpoints", enemySpeed: 1.2, spawnBias: 1.0 },
  { mode: "gauntlet", summary: "clear waves and push your score", token: "sigils", enemySpeed: 1.25, spawnBias: 1.25 },
  { mode: "stealth", summary: "thread through patrol routes and secure objectives", token: "files", enemySpeed: 0.9, spawnBias: 0.9 },
  { mode: "breaker", summary: "smash targets while dodging counterattacks", token: "cores", enemySpeed: 1.1, spawnBias: 1.15 },
  { mode: "expedition", summary: "explore the field and bag discoveries", token: "relics", enemySpeed: 0.98, spawnBias: 1.05 },
  { mode: "arena", summary: "hold the arena against successive rushes", token: "crowns", enemySpeed: 1.18, spawnBias: 1.22 }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function ensureCleanDirectory(targetDir) {
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });
}

function pick(list, index) {
  return list[index % list.length];
}

function buildSeed(index) {
  const theme = themePacks[index % themePacks.length];
  const mechanic = mechanicPacks[Math.floor(index / themePacks.length) % mechanicPacks.length];
  const name = pick(theme.names, index * 3 + 1);
  const goal = pick(theme.goals, index * 5 + 2);
  const enemy = pick(theme.enemies, index * 7 + 3);
  const title = `${name} ${theme.theme}`;
  const slug = `${String(index + 1).padStart(3, "0")}-${slugify(title)}`;

  return {
    id: index + 1,
    title,
    slug,
    theme: theme.theme,
    inspiration: theme.inspiration,
    goal,
    enemy,
    mechanic,
    colorA: theme.palette[0],
    colorB: theme.palette[1]
  };
}

function makeGameHtml(seed) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seed.title}</title>
  <style>
    :root {
      --bg-a: ${seed.colorA};
      --bg-b: ${seed.colorB};
      --panel: #0a141dcc;
      --text: #f8fafc;
      --accent: #f4b860;
      --accent-2: #8df0cc;
      --danger: #ff6b6b;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: "Segoe UI", Tahoma, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 18% 16%, #ffffff14 0%, transparent 28%),
        radial-gradient(circle at 82% 12%, #ffffff0e 0%, transparent 32%),
        linear-gradient(145deg, var(--bg-a), var(--bg-b));
      display: grid;
      place-items: center;
      padding: 16px;
    }
    .wrap {
      width: min(1020px, 100%);
      background: var(--panel);
      border: 1px solid #ffffff24;
      border-radius: 18px;
      padding: 14px;
      box-shadow: 0 20px 50px #00000066;
      backdrop-filter: blur(3px);
    }
    .top {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: end;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    h1 {
      margin: 0;
      font-size: clamp(1.25rem, 2vw, 1.9rem);
      line-height: 1.1;
    }
    .subtitle {
      margin-top: 4px;
      color: #dbeafe;
      font-size: 0.95rem;
    }
    .hud {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }
    .chip {
      background: #ffffff14;
      border: 1px solid #ffffff28;
      border-radius: 999px;
      padding: 6px 10px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .layout {
      display: grid;
      grid-template-columns: 1fr 250px;
      gap: 12px;
    }
    canvas {
      width: 100%;
      height: auto;
      display: block;
      background: #07111b;
      border-radius: 14px;
      border: 2px solid #ffffff1f;
    }
    .panel {
      border: 1px solid #ffffff20;
      border-radius: 14px;
      padding: 12px;
      background: #0b1520ba;
      font-size: 0.92rem;
      line-height: 1.45;
    }
    .panel p { margin: 0 0 8px; }
    .panel strong { color: var(--accent-2); }
    button, a.button {
      display: inline-block;
      width: 100%;
      border: 0;
      border-radius: 10px;
      padding: 10px 12px;
      background: linear-gradient(180deg, #f5cb7c, #e59a28);
      color: #281400;
      text-decoration: none;
      font-weight: 800;
      cursor: pointer;
      text-align: center;
      margin-top: 8px;
    }
    .status {
      margin-top: 10px;
      min-height: 1.2em;
      color: #fef3c7;
      font-size: 0.95rem;
    }
    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <div class="top">
      <div>
        <h1>${seed.title}</h1>
        <div class="subtitle">Inspired by ${seed.inspiration}, rendered as a generic ${seed.mechanic.mode} arcade challenge.</div>
      </div>
      <a class="button" href="../../index.html">Back To Gallery</a>
    </div>
    <div class="hud">
      <div class="chip">Score: <span id="score">0</span></div>
      <div class="chip">Lives: <span id="lives">3</span></div>
      <div class="chip">Level: <span id="level">1</span></div>
      <div class="chip">Mode: ${seed.mechanic.mode}</div>
    </div>
    <section class="layout">
      <canvas id="game" width="940" height="540" aria-label="${seed.title}"></canvas>
      <aside class="panel">
        <p><strong>Objective:</strong> ${seed.goal} while dealing with ${seed.enemy}.</p>
        <p><strong>Controls:</strong> Move with WASD or Arrow keys. Press Space to pulse or strike.</p>
        <p><strong>Loop:</strong> ${seed.mechanic.summary}.</p>
        <p><strong>Challenge:</strong> Every 100 points raises enemy pressure.</p>
        <button id="restart" type="button">Restart Run</button>
      </aside>
    </section>
    <div class="status" id="status">Run live. Secure the field.</div>
  </main>
  <script>
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const scoreEl = document.getElementById("score");
    const livesEl = document.getElementById("lives");
    const levelEl = document.getElementById("level");
    const statusEl = document.getElementById("status");
    const restartBtn = document.getElementById("restart");
    const keys = new Set();

    const config = {
      enemySpeed: ${seed.mechanic.enemySpeed.toFixed(2)},
      spawnBias: ${seed.mechanic.spawnBias.toFixed(2)}
    };

    const game = {
      running: true,
      score: 0,
      lives: 3,
      level: 1,
      enemies: [],
      tokens: [],
      particles: []
    };

    const player = {
      x: 140,
      y: canvas.height / 2,
      r: 15,
      speed: 245,
      attackTimer: 0,
      cooldown: 0,
      facing: 1
    };

    function rand(min, max) { return Math.random() * (max - min) + min; }
    function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
    function distance(ax, ay, bx, by) { return Math.hypot(ax - bx, ay - by); }

    function spawnEnemy() {
      const side = Math.floor(Math.random() * 4);
      let x = 0;
      let y = 0;
      if (side === 0) { x = -24; y = rand(0, canvas.height); }
      if (side === 1) { x = canvas.width + 24; y = rand(0, canvas.height); }
      if (side === 2) { x = rand(0, canvas.width); y = -24; }
      if (side === 3) { x = rand(0, canvas.width); y = canvas.height + 24; }
      game.enemies.push({ x, y, r: rand(12, 20), speed: rand(70, 125) * config.enemySpeed + game.level * 8, hue: rand(0, 360) });
    }

    function spawnToken() {
      game.tokens.push({ x: rand(60, canvas.width - 60), y: rand(60, canvas.height - 60), r: rand(7, 12), pulse: rand(0, Math.PI * 2) });
    }

    function emit(x, y, color) {
      for (let index = 0; index < 8; index += 1) {
        game.particles.push({ x, y, vx: rand(-140, 140), vy: rand(-140, 140), life: rand(0.25, 0.6), color });
      }
    }

    function reset() {
      game.running = true;
      game.score = 0;
      game.lives = 3;
      game.level = 1;
      game.enemies = [];
      game.tokens = [];
      game.particles = [];
      player.x = 140;
      player.y = canvas.height / 2;
      player.attackTimer = 0;
      player.cooldown = 0;
      statusEl.textContent = "Run live. Secure the field.";
      for (let index = 0; index < 4; index += 1) spawnToken();
      for (let index = 0; index < 2; index += 1) spawnEnemy();
    }

    function update(dt) {
      if (!game.running) return;

      let dx = 0;
      let dy = 0;
      if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) dx -= 1;
      if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) dx += 1;
      if (keys.has("ArrowUp") || keys.has("w") || keys.has("W")) dy -= 1;
      if (keys.has("ArrowDown") || keys.has("s") || keys.has("S")) dy += 1;

      const magnitude = Math.hypot(dx, dy) || 1;
      player.x += (dx / magnitude) * player.speed * dt;
      player.y += (dy / magnitude) * player.speed * dt;
      if (dx !== 0) player.facing = Math.sign(dx);
      player.x = clamp(player.x, player.r, canvas.width - player.r);
      player.y = clamp(player.y, player.r, canvas.height - player.r);

      player.cooldown = Math.max(0, player.cooldown - dt);
      player.attackTimer = Math.max(0, player.attackTimer - dt);

      if ((keys.has(" ") || keys.has("Space")) && player.cooldown <= 0) {
        player.cooldown = 0.5;
        player.attackTimer = 0.16;
        emit(player.x, player.y, "#f4b860");
      }

      if (Math.random() < (0.011 + game.level * 0.0018) * config.spawnBias) {
        spawnEnemy();
      }
      if (game.tokens.length < 5 && Math.random() < 0.03) {
        spawnToken();
      }

      for (let index = game.tokens.length - 1; index >= 0; index -= 1) {
        const token = game.tokens[index];
        token.pulse += dt * 4;
        if (distance(player.x, player.y, token.x, token.y) < player.r + token.r + 2) {
          game.tokens.splice(index, 1);
          game.score += 20;
          emit(token.x, token.y, "#8df0cc");
          if (game.score % 100 === 0) {
            game.level += 1;
            statusEl.textContent = "Level " + game.level + ". Pressure rising.";
          }
        }
      }

      for (let index = game.enemies.length - 1; index >= 0; index -= 1) {
        const enemy = game.enemies[index];
        const vx = player.x - enemy.x;
        const vy = player.y - enemy.y;
        const vm = Math.hypot(vx, vy) || 1;
        enemy.x += (vx / vm) * enemy.speed * dt;
        enemy.y += (vy / vm) * enemy.speed * dt;

        if (player.attackTimer > 0 && distance(player.x, player.y, enemy.x, enemy.y) < player.r + enemy.r + 28) {
          game.enemies.splice(index, 1);
          game.score += 15;
          emit(enemy.x, enemy.y, "hsl(" + enemy.hue + ", 90%, 65%)");
          continue;
        }

        if (distance(player.x, player.y, enemy.x, enemy.y) < player.r + enemy.r) {
          game.enemies.splice(index, 1);
          game.lives -= 1;
          emit(player.x, player.y, "#ff6b6b");
          player.x = 140;
          player.y = canvas.height / 2;
          statusEl.textContent = game.lives > 0 ? "You took a hit. Recenter and push." : "Run failed.";
          if (game.lives <= 0) {
            game.running = false;
          }
        }
      }

      for (let index = game.particles.length - 1; index >= 0; index -= 1) {
        const particle = game.particles[index];
        particle.life -= dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        if (particle.life <= 0) {
          game.particles.splice(index, 1);
        }
      }
    }

    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#07111b");
      gradient.addColorStop(1, "#0c1a26");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#ffffff10";
      for (let x = 0; x <= canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function draw() {
      drawBackground();

      for (const token of game.tokens) {
        const radius = token.r + Math.sin(token.pulse) * 1.5;
        ctx.fillStyle = "#8df0cc";
        ctx.beginPath();
        ctx.arc(token.x, token.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const enemy of game.enemies) {
        ctx.fillStyle = "hsl(" + enemy.hue + ", 80%, 60%)";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const particle of game.particles) {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = Math.max(particle.life, 0);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = "#f8d58a";
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
      ctx.fill();

      if (player.attackTimer > 0) {
        ctx.strokeStyle = "#f4b860";
        ctx.lineWidth = 6;
        ctx.beginPath();
        const start = player.facing > 0 ? -0.7 : Math.PI - 2.4;
        const end = player.facing > 0 ? 0.7 : Math.PI + 2.4;
        ctx.arc(player.x, player.y, 36, start, end);
        ctx.stroke();
      }

      if (!game.running) {
        ctx.fillStyle = "#000000aa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f8fafc";
        ctx.textAlign = "center";
        ctx.font = "700 46px Segoe UI";
        ctx.fillText("Run Over", canvas.width / 2, canvas.height / 2 - 12);
        ctx.font = "500 22px Segoe UI";
        ctx.fillText("Press Restart Run to go again", canvas.width / 2, canvas.height / 2 + 26);
      }

      scoreEl.textContent = String(game.score);
      livesEl.textContent = String(game.lives);
      levelEl.textContent = String(game.level);
    }

    let lastTime = performance.now();
    function tick(now) {
      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;
      update(dt);
      draw();
      requestAnimationFrame(tick);
    }

    addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Space"].includes(event.key)) {
        event.preventDefault();
      }
      keys.add(event.key);
    });
    addEventListener("keyup", (event) => keys.delete(event.key));
    restartBtn.addEventListener("click", reset);
    reset();
    requestAnimationFrame(tick);
  </script>
</body>
</html>
`;
}

function makeGameReadme(seed) {
  return `# ${seed.title}

Standalone HTML mini-game generated as part of a 100-game vibe-coding challenge.

- Theme: ${seed.theme}
- Inspiration class: ${seed.inspiration}
- Objective: ${seed.goal}
- Opposition: ${seed.enemy}
- Gameplay mode: ${seed.mechanic.mode}

Open index.html in any browser to play.
`;
}

function makeGalleryHtml(games, prefix) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibe Arcade Gallery</title>
  <style>
    :root {
      --bg: #081018;
      --bg-2: #112131;
      --panel: #0d1722dd;
      --text: #f8fafc;
      --accent: #f4b860;
      --muted: #c8d4e3;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      color: var(--text);
      background:
        radial-gradient(circle at 15% 10%, #2d4c63 0%, transparent 30%),
        radial-gradient(circle at 80% 15%, #67401e 0%, transparent 28%),
        linear-gradient(155deg, var(--bg), var(--bg-2));
      min-height: 100vh;
      padding: 18px;
    }
    .shell {
      width: min(1200px, 100%);
      margin: 0 auto;
      background: var(--panel);
      border: 1px solid #ffffff22;
      border-radius: 20px;
      padding: 18px;
      box-shadow: 0 24px 60px #00000055;
    }
    h1 {
      margin: 0;
      font-size: clamp(1.8rem, 4vw, 3.3rem);
      letter-spacing: 0.02em;
    }
    .lede {
      max-width: 70ch;
      color: var(--muted);
      line-height: 1.5;
      font-size: 1rem;
      margin: 10px 0 18px;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .toolbar-left {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    input, select, button {
      border-radius: 12px;
      border: 1px solid #ffffff24;
      background: #ffffff10;
      color: var(--text);
      padding: 10px 12px;
      font: inherit;
    }
    option { color: #111827; }
    button {
      background: linear-gradient(180deg, #f5cb7c, #e59a28);
      color: #271400;
      font-weight: 700;
      cursor: pointer;
    }
    .meta {
      color: var(--muted);
      font-size: 0.95rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
    }
    .card {
      background: #101d2b;
      border: 1px solid #ffffff1f;
      border-radius: 16px;
      overflow: hidden;
      display: grid;
      grid-template-rows: 120px 1fr;
      min-height: 260px;
    }
    .stamp {
      position: relative;
      padding: 12px;
      border-bottom: 1px solid #ffffff18;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #fff8ea;
    }
    .stamp::after {
      content: "";
      position: absolute;
      inset: 10px;
      border: 1px dashed #ffffff55;
      border-radius: 12px;
      pointer-events: none;
    }
    .stamp small {
      font-size: 0.8rem;
      opacity: 0.9;
    }
    .stamp strong {
      font-size: 1.05rem;
      line-height: 1.15;
      max-width: 14ch;
    }
    .body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .pill {
      font-size: 0.77rem;
      background: #ffffff12;
      border: 1px solid #ffffff18;
      border-radius: 999px;
      padding: 3px 8px;
      color: #d9e6f2;
    }
    .body p {
      margin: 0;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.4;
      flex: 1;
    }
    .body a {
      display: inline-block;
      text-decoration: none;
      background: linear-gradient(180deg, #f5cb7c, #e59a28);
      color: #271400;
      font-weight: 700;
      border-radius: 10px;
      padding: 8px 10px;
      text-align: center;
    }
    .pager {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 18px;
      align-items: center;
    }
    .empty {
      padding: 30px;
      text-align: center;
      color: var(--muted);
      border: 1px dashed #ffffff2b;
      border-radius: 16px;
    }
  </style>
</head>
<body>
  <main class="shell">
    <h1>Vibe Arcade Gallery</h1>
    <p class="lede">A personal challenge: generate 100 playable HTML mini-games in a reasonable amount of time using vibe coding and GitHub Copilot. These games riff on broad arcade, fantasy, spy, adventure, and brawler genres without reproducing copyrighted characters or worlds.</p>
    <section class="toolbar">
      <div class="toolbar-left">
        <input id="search" type="search" placeholder="Search games, themes, or modes">
        <select id="themeFilter"><option value="all">All themes</option></select>
        <select id="modeFilter"><option value="all">All modes</option></select>
        <button id="randomPick" type="button">Random Pick</button>
      </div>
      <div class="meta" id="meta"></div>
    </section>
    <section id="grid" class="grid"></section>
    <div id="empty" class="empty" hidden>No games match the current filters.</div>
    <nav class="pager">
      <button id="prev" type="button">Previous</button>
      <span id="pageLabel" class="meta"></span>
      <button id="next" type="button">Next</button>
    </nav>
  </main>
  <script>
    const gameData = __GAME_DATA__;
    const pageSize = 12;
    let page = 1;

    const grid = document.getElementById("grid");
    const empty = document.getElementById("empty");
    const meta = document.getElementById("meta");
    const search = document.getElementById("search");
    const themeFilter = document.getElementById("themeFilter");
    const modeFilter = document.getElementById("modeFilter");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const pageLabel = document.getElementById("pageLabel");
    const randomPick = document.getElementById("randomPick");

    function unique(values) { return [...new Set(values)].sort((a, b) => a.localeCompare(b)); }
    function fillSelect(select, values) {
      for (const value of values) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      }
    }

    fillSelect(themeFilter, unique(gameData.map((game) => game.theme)));
    fillSelect(modeFilter, unique(gameData.map((game) => game.mode)));

    function filteredGames() {
      const query = search.value.trim().toLowerCase();
      return gameData.filter((game) => {
        const matchesQuery = !query || [game.title, game.theme, game.mode, game.goal, game.enemy].join(" ").toLowerCase().includes(query);
        const matchesTheme = themeFilter.value === "all" || game.theme === themeFilter.value;
        const matchesMode = modeFilter.value === "all" || game.mode === modeFilter.value;
        return matchesQuery && matchesTheme && matchesMode;
      });
    }

    function render() {
      const filtered = filteredGames();
      const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
      page = Math.min(page, totalPages);
      const start = (page - 1) * pageSize;
      const slice = filtered.slice(start, start + pageSize);

      grid.innerHTML = "";
      empty.hidden = slice.length > 0;

      for (const game of slice) {
        const article = document.createElement("article");
        article.className = "card";
        article.innerHTML =
          '<div class="stamp" style="background: linear-gradient(135deg, ' + game.colorA + ', ' + game.colorB + ');">' +
            '<small>' + game.id + '</small>' +
            '<strong>' + game.title + '</strong>' +
            '<small>' + game.theme + '</small>' +
          '</div>' +
          '<div class="body">' +
            '<div class="pill-row">' +
              '<span class="pill">' + game.mode + '</span>' +
              '<span class="pill">' + game.enemy + '</span>' +
            '</div>' +
            '<p>' + game.goal + '. ' + game.summary + '.</p>' +
            '<a href="' + prefix + game.slug + '/index.html">Play</a>' +
          '</div>';
        grid.appendChild(article);
      }

      meta.textContent = filtered.length + " games found across " + gameData.length + " total.";
      pageLabel.textContent = "Page " + page + " of " + totalPages;
      prev.disabled = page <= 1;
      next.disabled = page >= totalPages;
    }

    function rerenderFromFirstPage() {
      page = 1;
      render();
    }

    search.addEventListener("input", rerenderFromFirstPage);
    themeFilter.addEventListener("change", rerenderFromFirstPage);
    modeFilter.addEventListener("change", rerenderFromFirstPage);
    prev.addEventListener("click", () => { page -= 1; render(); });
    next.addEventListener("click", () => { page += 1; render(); });
    randomPick.addEventListener("click", () => {
      const filtered = filteredGames();
      if (!filtered.length) return;
      const game = filtered[Math.floor(Math.random() * filtered.length)];
      window.location.href = prefix + game.slug + "/index.html";
    });

    render();
  </script>
</body>
</html>
`;
}

function makeGalleryHtmlResolved(games, prefix) {
  return makeGalleryHtml(games, prefix).replace("__GAME_DATA__", JSON.stringify(games, null, 2));
}

function makeRootReadme(games) {
  return `# Vibe Arcade Hundred

This repository is a personal challenge and a bit of a lark.

The question was simple: how hard would it be to create 100 random, playable HTML games, put them into one repository, and do it in a reasonable amount of time using vibe coding with GitHub Copilot?

The answer is this repo.

## What Is Here

- 100 standalone HTML mini-games
- A root gallery page in index.html with postage-stamp browsing, filters, search, and pagination
- A generator script that can recreate the collection
- Broad genre riffs including spy fiction, dungeon crawlers, heroic fantasy quests, arena brawlers, cyber chases, sky raids, haunted escapes, jungle hunts, and more

## Copyright Approach

Some prompts were inspired by familiar pop-culture lanes such as spy thrillers, heroic fantasy, and arcade fighters. The generated games stay generic and avoid copyrighted characters, names, settings, and storylines.

## Naming Ideas

### Repository Names

- Vibe Arcade Hundred
- Hundred Tiny Games
- Copilot Arcade Lab
- HTML Game Sprint 100
- Hundred Game Challenge

### Parent Application Names

- Arcade Atlas
- Game Stamp Gallery
- Playgrid 100
- Pocket Arcade Browser
- Vibe Cabinet

## Run It

1. Open the root index.html in a browser to browse the gallery.
2. Open any game card to play that title.
3. Open any game's index.html directly if you want to jump into a specific folder.

## Generator

Run this from the repo root:

  node .\\generate-random-games.js

This regenerates the gallery and all game folders.

## Current Total

${games.length} generated games.
`;
}

function main() {
  ensureCleanDirectory(gamesDir);

  const games = [];
  for (let index = 0; index < totalGames; index += 1) {
    const seed = buildSeed(index);
    const gameDir = path.join(gamesDir, seed.slug);
    fs.mkdirSync(gameDir, { recursive: true });
    fs.writeFileSync(path.join(gameDir, "index.html"), makeGameHtml(seed), "utf8");
    fs.writeFileSync(path.join(gameDir, "README.md"), makeGameReadme(seed), "utf8");
    games.push({
      id: String(seed.id).padStart(3, "0"),
      slug: seed.slug,
      title: seed.title,
      theme: seed.theme,
      mode: seed.mechanic.mode,
      goal: seed.goal,
      enemy: seed.enemy,
      summary: seed.mechanic.summary,
      colorA: seed.colorA,
      colorB: seed.colorB
    });
  }

  fs.writeFileSync(rootGalleryPath, makeGalleryHtmlResolved(games, "random-html-games/"), "utf8");
  fs.writeFileSync(nestedGalleryPath, makeGalleryHtmlResolved(games, ""), "utf8");
  fs.writeFileSync(rootReadmePath, makeRootReadme(games), "utf8");

  console.log(`Created ${games.length} games in ${gamesDir}`);
  console.log(`Created gallery at ${rootGalleryPath}`);
  console.log(`Created gallery at ${nestedGalleryPath}`);
  console.log(`Created README at ${rootReadmePath}`);
}

main();
