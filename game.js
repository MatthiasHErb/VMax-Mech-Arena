/**
 * Mech Arena – Kampfroboter bauen, kämpfen, verbessern
 */

// —— Teile-Katalog (Slot: chassis | weapon | armor)
const PARTS_CATALOG = [
  { id: 'chassis_scout', name: 'Scout-Chassis', slot: 'chassis', hp: 80, armor: 40, damage: 0, speed: 14, price: 0 },
  { id: 'chassis_tank', name: 'Panzer-Chassis', slot: 'chassis', hp: 140, armor: 120, damage: 0, speed: 6, price: 800 },
  { id: 'chassis_balanced', name: 'Balanced-Chassis', slot: 'chassis', hp: 110, armor: 80, damage: 0, speed: 10, price: 500 },
  { id: 'weapon_cannon', name: 'Leichte Kanone', slot: 'weapon', hp: 0, armor: 0, damage: 28, speed: 0, price: 0 },
  { id: 'weapon_plasma', name: 'Plasma-Werfer', slot: 'weapon', hp: 0, armor: 0, damage: 42, speed: 0, price: 600 },
  { id: 'weapon_railgun', name: 'Railgun', slot: 'weapon', hp: 0, armor: 0, damage: 72, speed: -1, price: 1200 },
  { id: 'weapon_minigun', name: 'Minigun', slot: 'weapon', hp: 0, armor: 0, damage: 38, speed: 1, price: 400 },
  { id: 'armor_light', name: 'Leichtpanzerung', slot: 'armor', hp: 0, armor: 50, damage: 0, speed: 2, price: 0 },
  { id: 'armor_heavy', name: 'Schwerpanzerung', slot: 'armor', hp: 20, armor: 110, damage: 0, speed: -3, price: 700 },
  { id: 'armor_reactive', name: 'Reaktivpanzerung', slot: 'armor', hp: 10, armor: 90, damage: 0, speed: 0, price: 500 },
];

// —— Waffen-Upgrades: Schüsse pro Salve (1–3)
const WEAPON_UPGRADE_PRICE = 250;
const MAX_SHOTS_PER_GUN = 3;

// —— Story Mode: 10 Kapitel mit fixen Gegnern und Hindernis-Themen (stärkere Gegner)
const STORY_CHAPTERS = [
  { text: 'Kapitel 1: Deine erste Prüfung in der Arena. Ein einfacher Gegner erwartet dich.', obstacleTheme: { colors: ['#3a4555', '#4a5568'], sizeRange: { minW: 25, maxW: 45, minH: 20, maxH: 40 } }, opponents: [{ name: 'Rost-Bot', hp: 95, armor: 55, damage: 26, speed: 8, weaponId: 'weapon_cannon', strategy: 'aggressive', shotCooldown: 520, reward: 400 }] },
  { text: 'Kapitel 2: Die Konkurrenz wird härter. Ein erfahrener Kämpfer stellt sich dir.', obstacleTheme: { colors: ['#4a3a35', '#5a4a45'], sizeRange: { minW: 28, maxW: 50, minH: 22, maxH: 45 } }, opponents: [{ name: 'Scrap-King', hp: 115, armor: 75, damage: 32, speed: 9, weaponId: 'weapon_cannon', strategy: 'aggressive', shotCooldown: 480, reward: 500 }] },
  { text: 'Kapitel 3: Du hast dich bewiesen. Jetzt kommt ein besser ausgerüsteter Gegner.', obstacleTheme: { colors: ['#2a4a3a', '#3a5a4a'], sizeRange: { minW: 30, maxW: 55, minH: 25, maxH: 50 } }, opponents: [{ name: 'Stahl-Wolf', hp: 135, armor: 95, damage: 40, speed: 10, weaponId: 'weapon_plasma', strategy: 'defensive', shotCooldown: 440, reward: 600 }] },
  { text: 'Kapitel 4: Zwei Gegner gleichzeitig. Nutze die Hindernisse zu deinem Vorteil.', obstacleTheme: { colors: ['#4a3545', '#5a4555'], sizeRange: { minW: 32, maxW: 58, minH: 28, maxH: 52 } }, opponents: [{ name: 'Blitz-Bot', hp: 105, armor: 65, damage: 36, speed: 11, weaponId: 'weapon_plasma', strategy: 'evasive', shotCooldown: 400, reward: 400 }, { name: 'Vulkan', hp: 125, armor: 85, damage: 42, speed: 9, weaponId: 'weapon_cannon', strategy: 'aggressive', shotCooldown: 430, reward: 600 }] },
  { text: 'Kapitel 5: Die Arena wird gefährlicher. Zwei starke Gegner warten auf dich.', obstacleTheme: { colors: ['#5a4030', '#6a5040'], sizeRange: { minW: 35, maxW: 60, minH: 30, maxH: 55 } }, opponents: [{ name: 'Titan-X', hp: 155, armor: 115, damage: 48, speed: 9, weaponId: 'weapon_railgun', strategy: 'defensive', shotCooldown: 380, reward: 700 }, { name: 'Nova', hp: 130, armor: 80, damage: 44, speed: 11, weaponId: 'weapon_plasma', strategy: 'flanker', shotCooldown: 390, reward: 600 }] },
  { text: 'Kapitel 6: Drei Gegner. Du musst taktisch vorgehen.', obstacleTheme: { colors: ['#3a3a5a', '#4a4a6a'], sizeRange: { minW: 38, maxW: 62, minH: 32, maxH: 58 } }, opponents: [{ name: 'Shadow-Mech', hp: 110, armor: 70, damage: 40, speed: 12, weaponId: 'weapon_minigun', strategy: 'evasive', shotCooldown: 350, reward: 400 }, { name: 'Iron-Fist', hp: 145, armor: 105, damage: 52, speed: 9, weaponId: 'weapon_railgun', strategy: 'aggressive', shotCooldown: 360, reward: 600 }, { name: 'Pulsar', hp: 125, armor: 85, damage: 48, speed: 10, weaponId: 'weapon_plasma', strategy: 'flanker', shotCooldown: 370, reward: 500 }] },
  { text: 'Kapitel 7: Die Elite der Arena. Drei erfahrene Kämpfer.', obstacleTheme: { colors: ['#4a2a3a', '#5a3a4a'], sizeRange: { minW: 40, maxW: 65, minH: 35, maxH: 60 } }, opponents: [{ name: 'Elite Alpha', hp: 170, armor: 125, damage: 58, speed: 10, weaponId: 'weapon_railgun', strategy: 'aggressive', shotCooldown: 330, reward: 600 }, { name: 'Elite Beta', hp: 150, armor: 110, damage: 54, speed: 11, weaponId: 'weapon_plasma', strategy: 'evasive', shotCooldown: 340, reward: 550 }, { name: 'Elite Gamma', hp: 135, armor: 95, damage: 50, speed: 12, weaponId: 'weapon_minigun', strategy: 'flanker', shotCooldown: 335, reward: 500 }] },
  { text: 'Kapitel 8: Fast am Ziel. Die härtesten Kämpfer der Liga.', obstacleTheme: { colors: ['#2a2a4a', '#3a3a5a'], sizeRange: { minW: 42, maxW: 68, minH: 38, maxH: 62 } }, opponents: [{ name: 'Champion X', hp: 185, armor: 140, damage: 65, speed: 10, weaponId: 'weapon_railgun', strategy: 'aggressive', shotCooldown: 310, reward: 700 }, { name: 'Champion Y', hp: 165, armor: 125, damage: 60, speed: 11, weaponId: 'weapon_plasma', strategy: 'defensive', shotCooldown: 320, reward: 650 }, { name: 'Champion Z', hp: 145, armor: 105, damage: 56, speed: 12, weaponId: 'weapon_minigun', strategy: 'evasive', shotCooldown: 315, reward: 600 }] },
  { text: 'Kapitel 9: Das Halbfinale. Nur die Besten überleben.', obstacleTheme: { colors: ['#5a3a2a', '#6a4a3a'], sizeRange: { minW: 45, maxW: 70, minH: 40, maxH: 65 } }, opponents: [{ name: 'Finalist A', hp: 200, armor: 155, damage: 72, speed: 11, weaponId: 'weapon_railgun', strategy: 'aggressive', shotCooldown: 290, reward: 800 }, { name: 'Finalist B', hp: 180, armor: 135, damage: 68, speed: 12, weaponId: 'weapon_plasma', strategy: 'evasive', shotCooldown: 300, reward: 750 }, { name: 'Finalist C', hp: 160, armor: 120, damage: 62, speed: 13, weaponId: 'weapon_minigun', strategy: 'flanker', shotCooldown: 295, reward: 700 }] },
  { text: 'Kapitel 10: Das Finale. Nur einer kann gewinnen. Zeig, was du draufhast!', obstacleTheme: { colors: ['#1a1a2a', '#2a2a3a'], sizeRange: { minW: 50, maxW: 75, minH: 45, maxH: 70 } }, opponents: [{ name: 'Arena-Lord', hp: 220, armor: 175, damage: 82, speed: 11, weaponId: 'weapon_railgun', strategy: 'aggressive', shotCooldown: 270, reward: 1000 }, { name: 'Stahl-Titan', hp: 200, armor: 165, damage: 75, speed: 10, weaponId: 'weapon_plasma', strategy: 'defensive', shotCooldown: 280, reward: 900 }, { name: 'Blitz-Lord', hp: 185, armor: 140, damage: 70, speed: 13, weaponId: 'weapon_minigun', strategy: 'evasive', shotCooldown: 265, reward: 800 }] },
];

// —— Spieler-Stand
const INITIAL_STATE = {
  money: 1000,
  ownedPartIds: ['chassis_scout', 'weapon_cannon', 'armor_light'],
  weaponShots: { weapon_cannon: 1, weapon_plasma: 1, weapon_railgun: 1, weapon_minigun: 1 },
  robots: [
    { name: 'Mech 1', equipped: { chassis: 'chassis_scout', weapon: 'weapon_cannon', armor: 'armor_light' } },
  ],
  activeRobotIndex: 0,
  currentEnemy: null,
  currentEnemies: null,
  arenaMode: '1v1',
  fightInProgress: false,
  lives: 3,
  score: 0,
  storyMode: false,
  storyChapter: 1,
  playerMines: 10,
  playerRockets: 10,
};

const MINE_DAMAGE = 85;
const ROCKET_DAMAGE = 55;
const MINE_RADIUS = 18;
const MINE_PLACE_COOLDOWN = 800;
const ROCKET_FIRE_COOLDOWN = 1200;
const MINE_REFILL_PRICE = 150;
const ROCKET_REFILL_PRICE = 200;
const MINE_ARMING_MS = 500;
const ROCKET_TURN_RATE = 0.06;
const METEOR_DAMAGE = 100;
const METEOR_WARNING_MS = 2000;
const METEOR_ZONE_RADIUS = 70;
const METEOR_ZONES_PER_STORM = 3;
const METEOR_STORM_MIN_DELAY = 8000;
const METEOR_STORM_MAX_DELAY = 15000;

const state = Object.assign({}, INITIAL_STATE, {
  ownedPartIds: [...INITIAL_STATE.ownedPartIds],
  weaponShots: { ...INITIAL_STATE.weaponShots },
  robots: INITIAL_STATE.robots.map((r) => ({ name: r.name, equipped: Object.assign({}, r.equipped) })),
  activeRobotIndex: 0,
  storyMode: false,
  storyChapter: 1,
});

function getWeaponShots(weaponId) {
  return Math.min(MAX_SHOTS_PER_GUN, Math.max(1, state.weaponShots?.[weaponId] ?? 1));
}

// —— Hintergrundmusik (variiert, Kampf immer „Neon Parasite Protocol“)
const MUSIC_COMBAT_TRACK = 'Neon Parasite Protocol.mp3';
const MUSIC_MENU_TRACKS = [
  'MechTech.mp3',
  'Pixel Rush (1).mp3',
  'Starlight Drive (1).mp3',
  'Starlight Drive.mp3',
];
let currentMusic = null;
let musicStarted = false;

function getRandomMenuTrack() {
  if (MUSIC_MENU_TRACKS.length === 0) return 'MechTech.mp3';
  return MUSIC_MENU_TRACKS[Math.floor(Math.random() * MUSIC_MENU_TRACKS.length)];
}

function playTrack(filename, loop = false) {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
  currentMusic = new Audio(filename);
  currentMusic.loop = loop;
  currentMusic.volume = 0.3;
  currentMusic.play().catch(() => {});
  if (!loop) {
    currentMusic.onended = () => playTrack(getRandomMenuTrack(), false);
  }
}

function playCombatMusic() {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
  currentMusic = new Audio(MUSIC_COMBAT_TRACK);
  currentMusic.loop = true;
  currentMusic.volume = 0.3;
  currentMusic.play().catch(() => {});
}

function playMenuMusic() {
  playTrack(getRandomMenuTrack(), false);
}

function startMusic() {
  if (musicStarted) return;
  playMenuMusic();
  musicStarted = true;
  document.removeEventListener('click', startMusic);
  document.removeEventListener('keydown', startMusic);
}

document.addEventListener('click', startMusic, true);
document.addEventListener('keydown', startMusic, true);

// —— Sounds (Web Audio API, keine Datei nötig)
let audioCtx = null;
function playShotSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (_) {}
}

function playMineSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.18);
  } catch (_) {}
}

function playRocketSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (_) {}
}

function playMineExplosionSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(80, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.25);
  } catch (_) {}
}

function playRocketExplosionSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (_) {}
}

// —— Hilfsfunktionen
function getPart(id) {
  return PARTS_CATALOG.find((p) => p.id === id) || null;
}

function getEquipped() {
  return state.robots[state.activeRobotIndex]?.equipped || state.robots[0].equipped;
}

function getEquippedParts() {
  const eq = getEquipped();
  return {
    chassis: getPart(eq.chassis),
    weapon: getPart(eq.weapon),
    armor: getPart(eq.armor),
  };
}

function computeRobotStats() {
  const parts = getEquippedParts();
  const sum = (key) =>
    [parts.chassis, parts.weapon, parts.armor]
      .filter(Boolean)
      .reduce((acc, p) => acc + (p[key] || 0), 0);

  return {
    // Basiswert + Ausrüstung, damit Käufe die Werte wirklich erhöhen
    hp: 200 + Math.max(0, sum('hp')),
    armor: Math.max(0, sum('armor')),
    damage: Math.max(5, sum('damage')),
    speed: Math.max(1, sum('speed')),
  };
}

function getPowerLevel(stats) {
  return stats.hp + stats.armor * 2 + stats.damage * 3 + stats.speed * 4;
}

// —— UI: Geld, Leben, Punkte
function updateMoney() {
  const el = document.getElementById('money');
  if (el) el.textContent = state.money;
}

function updateLivesDisplay() {
  const el = document.getElementById('livesDisplay');
  if (el) el.textContent = '❤'.repeat(state.lives) + '🖤'.repeat(3 - state.lives);
}

function updateScoreDisplay() {
  const el = document.getElementById('scoreDisplay');
  if (el) el.textContent = state.score;
}

// —— Navigation
function initNavigation() {
  // Warte kurz, falls DOM noch nicht vollständig geladen
  setTimeout(() => {
    const navButtons = document.querySelectorAll('.nav-btn');
    console.log('Found navigation buttons:', navButtons.length);
    
    if (!navButtons || navButtons.length === 0) {
      console.error('Navigation buttons not found! Retrying...');
      setTimeout(initNavigation, 100);
      return;
    }
    
    navButtons.forEach((btn, index) => {
      if (!btn) {
        console.error(`Button at index ${index} is null`);
        return;
      }
      
      const screen = btn.dataset.screen;
      console.log(`Setting up button for screen: ${screen}`);
      
      // Entferne alte Event-Listener falls vorhanden
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Navigation clicked: ${screen}`);
        
        try {
          // Wenn Kampf läuft und zu anderem Screen gewechselt wird, Kampf beenden
          if (state.fightInProgress && screen !== 'arena') {
            state.fightInProgress = false;
            if (gameState && gameState.animationId) {
              cancelAnimationFrame(gameState.animationId);
              gameState.animationId = null;
            }
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            const hint = document.getElementById('controlsHint');
            if (hint) hint.classList.add('hidden');
          }
          
          if (!screen) {
            console.error('Button has no data-screen attribute');
            return;
          }
          
          // Alle Buttons und Screens zurücksetzen
          document.querySelectorAll('.nav-btn').forEach((b) => {
            if (b) b.classList.remove('active');
          });
          document.querySelectorAll('.screen').forEach((s) => {
            if (s) s.classList.remove('active');
          });
          
          // Aktiven Button markieren
          newBtn.classList.add('active');
          
          // Screen anzeigen
          const panel = document.getElementById(screen);
          if (panel) {
            panel.classList.add('active');
            console.log(`Screen ${screen} activated`);
          } else {
            console.error(`Screen panel '${screen}' not found!`);
            return;
          }
          
          // Screen-spezifische Funktionen aufrufen
          if (screen === 'garage') {
            renderGarage();
          } else if (screen === 'arena') {
            initCanvas(); // Canvas sicherstellen
            renderArena();
          } else if (screen === 'shop') {
            renderShop();
          }
        } catch (error) {
          console.error('Error in navigation:', error);
          alert('Fehler beim Wechseln: ' + error.message);
        }
      });
    });
    
    console.log(`Navigation initialized with ${navButtons.length} buttons`);
  }, 50);
}

// —— GARAGE
function renderGarage() {
  const stats = computeRobotStats();
  const maxHp = 420;
  const maxArmor = 200;
  const maxDamage = 80;
  const maxSpeed = 20;

  document.getElementById('statHp').style.width = `${(stats.hp / maxHp) * 100}%`;
  document.getElementById('statArmor').style.width = `${(stats.armor / maxArmor) * 100}%`;
  document.getElementById('statDamage').style.width = `${(stats.damage / maxDamage) * 100}%`;
  document.getElementById('statSpeed').style.width = `${(stats.speed / maxSpeed) * 100}%`;

  document.getElementById('hpVal').textContent = stats.hp;
  document.getElementById('armorVal').textContent = stats.armor;
  document.getElementById('damageVal').textContent = stats.damage;
  document.getElementById('speedVal').textContent = stats.speed;

  const parts = getEquippedParts();
  const names = [
    parts.chassis?.name,
    parts.weapon?.name,
    parts.armor?.name,
  ].filter(Boolean);
  const equippedEl = document.getElementById('equippedParts');

  // Ausrüstungs-Dropdowns pro Slot
  const slots = [
    { key: 'chassis', label: 'Chassis', partIds: state.ownedPartIds.filter((id) => getPart(id)?.slot === 'chassis') },
    { key: 'weapon', label: 'Kanone', partIds: state.ownedPartIds.filter((id) => getPart(id)?.slot === 'weapon') },
    { key: 'armor', label: 'Rüstung', partIds: state.ownedPartIds.filter((id) => getPart(id)?.slot === 'armor') },
  ];
  let selectHtml = '';
  slots.forEach(({ key, label, partIds }) => {
    const current = getEquipped()[key];
    selectHtml += `<div class="equip-select"><label>${label}: </label><select data-slot="${key}">`;
    partIds.forEach((id) => {
      const p = getPart(id);
      if (!p) return;
      const sel = current === id ? ' selected' : '';
      selectHtml += `<option value="${id}"${sel}>${p.name}</option>`;
    });
    selectHtml += '</select></div>';
  });

  let robotSelectHtml = '';
  if (state.robots.length > 1) {
    robotSelectHtml = '<div class="robot-select"><label>Aktiver Roboter: </label><select id="robotSelect">';
    state.robots.forEach((r, i) => {
      const sel = state.activeRobotIndex === i ? ' selected' : '';
      robotSelectHtml += `<option value="${i}"${sel}>${r.name}</option>`;
    });
    robotSelectHtml += '</select></div>';
  }
  equippedEl.innerHTML = robotSelectHtml + '<p><strong>Ausgerüstet:</strong></p>' + names.map((n) => `<p>• ${n}</p>`).join('') + '<div class="equip-selects" id="equipSelects">' + selectHtml + '</div>';

  document.getElementById('robotSelect')?.addEventListener('change', (e) => {
    state.activeRobotIndex = parseInt(e.target.value, 10);
    renderGarage();
  });

  document.getElementById('equipSelects')?.querySelectorAll('select').forEach((sel) => {
    sel.addEventListener('change', (e) => {
      getEquipped()[e.target.dataset.slot] = e.target.value;
      renderGarage();
    });
  });

  // Garage-Canvas: Seitenansicht mit Layern rendern
  const garageCanvas = document.getElementById('garageCanvas');
  if (garageCanvas && typeof drawGaragePreview === 'function') {
    drawGaragePreview(garageCanvas);
  }
}

// —— SHOP
function renderShop() {
  const grid = document.getElementById('shopGrid');
  if (!grid) {
    console.error('shopGrid element not found!');
    return;
  }
  grid.innerHTML = '';

  PARTS_CATALOG.forEach((part) => {
    const owned = state.ownedPartIds.includes(part.id);
    const canAfford = state.money >= part.price;
    const alreadyOwned = owned;

    const div = document.createElement('div');
    div.className = 'shop-item';
    let statsText = [];
    if (part.hp) statsText.push(`HP +${part.hp}`);
    if (part.armor) statsText.push(`Rüstung +${part.armor}`);
    if (part.damage) statsText.push(`Schaden +${part.damage}`);
    if (part.speed) statsText.push(`Speed ${part.speed >= 0 ? '+' : ''}${part.speed}`);

    div.innerHTML = `
      <h4>${part.name}</h4>
      <p class="slot">${part.slot === 'chassis' ? 'Chassis' : part.slot === 'weapon' ? 'Waffe' : 'Rüstung'}</p>
      <p class="stats">${statsText.join(', ') || '—'}</p>
      <p class="price">${part.price} Credits</p>
      <button ${alreadyOwned || !canAfford ? 'disabled' : ''}>${alreadyOwned ? 'Bereits gekauft' : !canAfford ? 'Zu wenig Credits' : 'Kaufen'}</button>
    `;
    const btn = div.querySelector('button');
    if (!alreadyOwned && canAfford) {
      btn.addEventListener('click', () => {
        state.money -= part.price;
        state.ownedPartIds.push(part.id);
        updateMoney();
        renderShop();
        renderGarage();
      });
    }
    grid.appendChild(div);
  });

  // Waffen-Upgrades: Schüsse pro Salve erhöhen (max 3)
  const weaponIds = ['weapon_cannon', 'weapon_plasma', 'weapon_railgun', 'weapon_minigun'];
  weaponIds.forEach((weaponId) => {
    if (!state.ownedPartIds.includes(weaponId)) return;
    const part = getPart(weaponId);
    if (!part) return;
    const current = getWeaponShots(weaponId);
    const canUpgrade = current < MAX_SHOTS_PER_GUN && state.money >= WEAPON_UPGRADE_PRICE;
    const upgradeDiv = document.createElement('div');
    upgradeDiv.className = 'shop-item shop-item-upgrade';
    upgradeDiv.innerHTML = `
      <h4>${part.name} – Salven-Upgrade</h4>
      <p class="slot">Schüsse pro Salve: ${current} → ${Math.min(MAX_SHOTS_PER_GUN, current + 1)}</p>
      <p class="stats">Max. ${MAX_SHOTS_PER_GUN} Schüsse gleichzeitig pro Waffe</p>
      <p class="price">${WEAPON_UPGRADE_PRICE} Credits</p>
      <button ${!canUpgrade ? 'disabled' : ''}>${current >= MAX_SHOTS_PER_GUN ? 'Max. erreicht' : !canUpgrade ? 'Zu wenig Credits' : 'Upgrade kaufen'}</button>
    `;
    const upgradeBtn = upgradeDiv.querySelector('button');
    if (canUpgrade) {
      upgradeBtn.addEventListener('click', () => {
        state.money -= WEAPON_UPGRADE_PRICE;
        state.weaponShots[weaponId] = (state.weaponShots[weaponId] ?? 1) + 1;
        updateMoney();
        renderShop();
      });
    }
    grid.appendChild(upgradeDiv);
  });

  // Kampfroboter kaufen (10.000 Credits)
  const robotPrice = 10000;
  const canBuyRobot = state.money >= robotPrice && state.robots.length < 5;
  const robotDiv = document.createElement('div');
  robotDiv.className = 'shop-item shop-item-robot';
  robotDiv.innerHTML = `
    <h4>Neuer Kampfroboter</h4>
    <p class="slot">Zusätzlicher Mech-Slot</p>
    <p class="stats">Ein zweiter Roboter mit Standard-Ausrüstung (Scout-Chassis, Leichte Kanone, Leichtpanzerung)</p>
    <p class="price">${robotPrice} Credits</p>
    <button ${!canBuyRobot ? 'disabled' : ''}>${state.money < robotPrice ? 'Zu wenig Credits' : state.robots.length >= 5 ? 'Max. erreicht' : 'Kaufen'}</button>
  `;
  const robotBtn = robotDiv.querySelector('button');
  if (canBuyRobot) {
    robotBtn.addEventListener('click', () => {
      state.money -= robotPrice;
      state.robots.push({
        name: `Mech ${state.robots.length + 1}`,
        equipped: { chassis: 'chassis_scout', weapon: 'weapon_cannon', armor: 'armor_light' },
      });
      state.ownedPartIds.push('chassis_scout', 'weapon_cannon', 'armor_light');
      updateMoney();
      renderShop();
      renderGarage();
    });
  }
  grid.appendChild(robotDiv);

  // Minen-Nachschub (10 Stück)
  const mineRefillDiv = document.createElement('div');
  mineRefillDiv.className = 'shop-item shop-item-refill';
  const canRefillMines = state.money >= MINE_REFILL_PRICE && state.playerMines < 10;
  mineRefillDiv.innerHTML = `
    <h4>Minen-Nachschub</h4>
    <p class="slot">10 Minen</p>
    <p class="stats">Aktuell: ${state.playerMines}/10 · Explodieren bei Berührung</p>
    <p class="price">${MINE_REFILL_PRICE} Credits</p>
    <button ${!canRefillMines ? 'disabled' : ''}>${state.playerMines >= 10 ? 'Voll' : !canRefillMines ? 'Zu wenig Credits' : 'Auffüllen'}</button>
  `;
  const mineBtn = mineRefillDiv.querySelector('button');
  if (canRefillMines) {
    mineBtn.addEventListener('click', () => {
      state.money -= MINE_REFILL_PRICE;
      state.playerMines = 10;
      updateMoney();
      renderShop();
    });
  }
  grid.appendChild(mineRefillDiv);

  // Raketen-Nachschub (10 Stück)
  const rocketRefillDiv = document.createElement('div');
  rocketRefillDiv.className = 'shop-item shop-item-refill';
  const canRefillRockets = state.money >= ROCKET_REFILL_PRICE && state.playerRockets < 10;
  rocketRefillDiv.innerHTML = `
    <h4>Raketen-Nachschub</h4>
    <p class="slot">10 Raketen</p>
    <p class="stats">Aktuell: ${state.playerRockets}/10 · Homing-Raketen</p>
    <p class="price">${ROCKET_REFILL_PRICE} Credits</p>
    <button ${!canRefillRockets ? 'disabled' : ''}>${state.playerRockets >= 10 ? 'Voll' : !canRefillRockets ? 'Zu wenig Credits' : 'Auffüllen'}</button>
  `;
  const rocketBtn = rocketRefillDiv.querySelector('button');
  if (canRefillRockets) {
    rocketBtn.addEventListener('click', () => {
      state.money -= ROCKET_REFILL_PRICE;
      state.playerRockets = 10;
      updateMoney();
      renderShop();
    });
  }
  grid.appendChild(rocketRefillDiv);

  const ownedList = document.getElementById('ownedList');
  if (ownedList) {
    ownedList.innerHTML = '';
    state.ownedPartIds.forEach((id) => {
      const p = getPart(id);
      if (!p) return;
      const isEquipped = state.robots.some(
        (r) => r.equipped.chassis === id || r.equipped.weapon === id || r.equipped.armor === id
      );
      const tag = document.createElement('span');
      tag.className = 'owned-tag' + (isEquipped ? ' equipped' : '');
      tag.textContent = p.name + (isEquipped ? ' (ausgerüstet)' : '');
      ownedList.appendChild(tag);
    });
  }
}

// —— ARENA: Gegner generieren (Einfach / Mittel / Schwer)
function generateOpponents() {
  const myStats = computeRobotStats();
  const myPower = getPowerLevel(myStats);
  const names = ['Scrap-King', 'Rost-Ritter', 'Blitz-Bot', 'Stahl-Wolf', 'Titan-X', 'Vulkan', 'Nova', 'Shadow-Mech', 'Iron-Fist', 'Pulsar'];
  const list = [];
  const difficulties = [
    { level: 'easy', powerMult: 0.55, powerVar: 0.12, rewardMult: 0.7, shotMult: 1.4 },
    { level: 'easy', powerMult: 0.62, powerVar: 0.1, rewardMult: 0.75, shotMult: 1.35 },
    { level: 'easy', powerMult: 0.68, powerVar: 0.08, rewardMult: 0.8, shotMult: 1.3 },
    { level: 'medium', powerMult: 0.75, powerVar: 0.1, rewardMult: 0.9, shotMult: 1.15 },
    { level: 'medium', powerMult: 0.82, powerVar: 0.08, rewardMult: 0.95, shotMult: 1.1 },
    { level: 'medium', powerMult: 0.88, powerVar: 0.06, rewardMult: 1.0, shotMult: 1.05 },
    { level: 'hard', powerMult: 0.92, powerVar: 0.08, rewardMult: 1.1, shotMult: 0.95 },
    { level: 'hard', powerMult: 0.98, powerVar: 0.06, rewardMult: 1.15, shotMult: 0.9 },
    { level: 'hard', powerMult: 1.05, powerVar: 0.05, rewardMult: 1.2, shotMult: 0.85 },
  ];
  difficulties.forEach((diff, idx) => {
    const baseName = names[idx % names.length];
    const power = Math.max(35, myPower * (diff.powerMult + (Math.random() - 0.5) * diff.powerVar * 2));
    const hp = 50 + (power * 0.32) + Math.floor(Math.random() * 30);
    const armor = 2 * (15 + (power * 0.12) + Math.floor(Math.random() * 18));
    const damage = 16 + (power * 0.16) + Math.floor(Math.random() * 16);
    const speed = Math.round((5 + Math.floor(Math.random() * 8)) * (diff.level === 'easy' ? 1.0 : diff.level === 'medium' ? 1.1 : 1.15));
    const reward = Math.round((60 + power * 0.5) * diff.rewardMult + Math.random() * 40);
    const weaponIds = ['weapon_cannon', 'weapon_plasma', 'weapon_railgun', 'weapon_minigun'];
    const weaponId = weaponIds[Math.floor(Math.random() * weaponIds.length)];
    const strategies = ['aggressive', 'defensive', 'evasive', 'flanker'];
    const strategy = strategies[Math.floor(Math.random() * strategies.length)];
    const baseCooldown = diff.level === 'easy' ? 450 : diff.level === 'medium' ? 400 : 350;
    const shotCooldown = Math.round(baseCooldown * diff.shotMult + Math.random() * 80);
    list.push({
      name: baseName + ' #' + (idx + 1),
      hp: Math.round(hp),
      armor: Math.round(armor),
      damage: Math.round(damage),
      speed,
      reward,
      power: Math.round(getPowerLevel({ hp, armor, damage, speed })),
      weaponId,
      strategy,
      shotCooldown,
      difficulty: diff.level,
    });
  });
  return list;
}

function renderArena() {
  try {
    const listEl = document.getElementById('opponentList');
    const opponentSelect = document.getElementById('opponentSelect');
    const mode1v1 = document.getElementById('mode1v1');
    const mode1v3 = document.getElementById('mode1v3');
    const modeSelect = document.querySelector('.arena-mode-select');
    const btnFight = document.getElementById('btnFight');
    const btnNextOpponent = document.getElementById('btnNextOpponent');

    if (state.storyMode) {
      if (opponentSelect) opponentSelect.style.display = 'none';
      if (modeSelect) modeSelect.style.display = 'none';
      if (btnNextOpponent) btnNextOpponent.style.display = 'none';
      const chapter = STORY_CHAPTERS[state.storyChapter - 1];
      state.currentEnemies = chapter ? [...chapter.opponents] : [];
      if (btnFight) btnFight.disabled = false;
      const arenaStatusEl = document.getElementById('arenaStatus');
      const enemyNames = state.currentEnemies.map((e) => e.name).join(', ');
      if (arenaStatusEl) arenaStatusEl.innerHTML = `<p><strong>Kapitel ${state.storyChapter}</strong> — ${state.currentEnemies.length} Gegner: ${enemyNames}. Rüste dich in der Garage aus, dann "Kampf starten".</p>`;
      const enemyNameEl = document.getElementById('enemyName');
      const enemyHpTextEl = document.getElementById('enemyHpText');
      const enemyHpBarEl = document.getElementById('enemyHpBar');
      const totalHp = state.currentEnemies.reduce((s, e) => s + e.hp, 0);
      if (enemyNameEl) enemyNameEl.textContent = state.currentEnemies.length > 1 ? `${state.currentEnemies.length} Gegner` : (state.currentEnemies[0]?.name || '?');
      if (enemyHpTextEl) enemyHpTextEl.textContent = `${totalHp} / ${totalHp}`;
      if (enemyHpBarEl) enemyHpBarEl.style.width = '100%';
      const stats = computeRobotStats();
      const playerNameEl = document.getElementById('playerName');
      const playerHpTextEl = document.getElementById('playerHpText');
      const playerHpBarEl = document.getElementById('playerHpBar');
      if (playerNameEl) playerNameEl.textContent = 'Dein Mech';
      if (playerHpTextEl) playerHpTextEl.textContent = `${stats.hp} / ${stats.hp}`;
      if (playerHpBarEl) playerHpBarEl.style.width = '100%';
      return;
    }

    if (modeSelect) modeSelect.style.display = '';
    if (btnNextOpponent) btnNextOpponent.style.display = '';
    if (mode1v1 && mode1v3) {
      mode1v1.classList.toggle('active', state.arenaMode === '1v1');
      mode1v3.classList.toggle('active', state.arenaMode === '1v3');
      mode1v1.onclick = () => { state.arenaMode = '1v1'; renderArena(); };
      mode1v3.onclick = () => { state.arenaMode = '1v3'; renderArena(); };
    }

    if (state.arenaMode === '1v3') {
      if (opponentSelect) opponentSelect.style.display = 'none';
      if (btnFight) btnFight.disabled = false;
      const arenaStatusEl = document.getElementById('arenaStatus');
      if (arenaStatusEl) arenaStatusEl.innerHTML = '<p>1 vs 3 — Kampf gegen 3 Gegner. Klicke "Kampf starten".</p>';
    } else {
      if (opponentSelect) opponentSelect.style.display = 'block';
    }

    const opponents = generateOpponents();
    if (!listEl) {
      console.error('opponentList element not found!');
      return;
    }
    listEl.innerHTML = '';

    if (state.arenaMode === '1v1') {
    opponents.forEach((opp, index) => {
      const btn = document.createElement('button');
      const diffLabel = opp.difficulty === 'easy' ? 'Einfach' : opp.difficulty === 'medium' ? 'Mittel' : 'Schwer';
      btn.className = `opponent-btn opponent-diff-${opp.difficulty || 'medium'}`;
      btn.innerHTML = `${opp.name} <span class="power">(Power: ${opp.power})</span> <span class="diff-badge">${diffLabel}</span>`;
      
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Opponent selected: ${opp.name}`);
        
        try {
          state.currentEnemy = opp;
          
          const enemyNameEl = document.getElementById('enemyName');
          const enemyHpTextEl = document.getElementById('enemyHpText');
          const enemyHpBarEl = document.getElementById('enemyHpBar');
          const arenaLogEl = document.getElementById('arenaLog');
          const btnFightEl = document.getElementById('btnFight');
          
          if (enemyNameEl) {
            enemyNameEl.textContent = opp.name;
            console.log('Enemy name updated');
          } else {
            console.error('enemyName element not found');
          }
          
          if (enemyHpTextEl) {
            enemyHpTextEl.textContent = `${opp.hp} / ${opp.hp}`;
          }
          
          if (enemyHpBarEl) {
            enemyHpBarEl.style.width = '100%';
          }
          
          const arenaStatusEl = document.getElementById('arenaStatus');
          if (arenaStatusEl) {
            arenaStatusEl.innerHTML = `<p>Gegner <strong>${opp.name}</strong> ausgewählt. Klicke "Kampf starten".</p>`;
          }
          
          if (btnFightEl) {
            btnFightEl.disabled = false;
            console.log('Fight button enabled');
          } else {
            console.error('btnFight element not found');
          }
        } catch (error) {
          console.error('Error selecting opponent:', error);
          alert('Fehler beim Auswählen des Gegners: ' + error.message);
        }
      });
      
      listEl.appendChild(btn);
      console.log(`Added opponent button ${index + 1}`);
    });
    }

    const stats = computeRobotStats();
    const playerNameEl = document.getElementById('playerName');
    const playerHpTextEl = document.getElementById('playerHpText');
    const playerHpBarEl = document.getElementById('playerHpBar');
    if (playerNameEl) playerNameEl.textContent = 'Dein Mech';
    if (playerHpTextEl) playerHpTextEl.textContent = `${stats.hp} / ${stats.hp}`;
    if (playerHpBarEl) playerHpBarEl.style.width = '100%';

    if (state.arenaMode === '1v1') {
      if (!state.currentEnemy) {
        const enemyNameEl = document.getElementById('enemyName');
        const arenaStatusEl = document.getElementById('arenaStatus');
        const btnFightEl = document.getElementById('btnFight');
        if (enemyNameEl) enemyNameEl.textContent = 'Gegner wählen';
        if (arenaStatusEl) arenaStatusEl.innerHTML = '<p>Wähle einen Gegner aus der Liste.</p>';
        if (btnFightEl) btnFightEl.disabled = true;
      } else {
        const btnFightEl = document.getElementById('btnFight');
        if (btnFightEl) btnFightEl.disabled = false;
      }
    }
  } catch (error) {
    console.error('Error in renderArena:', error);
    alert('Fehler beim Laden der Arena: ' + error.message);
  }
}

// —— ECHTZEIT-KAMPF-SYSTEM
let canvas, ctx;

let gameState = {
  player: null,
  enemies: [],
  projectiles: [],
  mines: [],
  meteorWarnings: [],
  particles: [],
  obstacles: [],
  keys: {},
  animationId: null,
  lastShot: 0,
  lastMinePlace: 0,
  lastRocketFire: 0,
  enemyLastShot: 0,
  countdown: 0,
  countdownStartTime: 0,
  fightEnded: false,
  winner: null,
  nextMeteorStormAt: 0,
};

function initCanvas() {
  canvas = document.getElementById('fightCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeFightCanvas();
}

const MAX_CANVAS_WIDTH = 1280;
const MAX_CANVAS_HEIGHT = 720;

function resizeFightCanvas() {
  if (!canvas) return;
  canvas.width = Math.min(window.innerWidth, MAX_CANVAS_WIDTH);
  canvas.height = Math.min(window.innerHeight, MAX_CANVAS_HEIGHT);
  if (canvas.width < window.innerWidth || canvas.height < window.innerHeight) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.objectFit = 'contain';
  } else {
    canvas.style.width = '';
    canvas.style.height = '';
    canvas.style.objectFit = '';
  }
}

function showFightOverlay() {
  const overlay = document.getElementById('fightOverlay');
  if (overlay) overlay.classList.remove('hidden');
  resizeFightCanvas();
}

function hideFightOverlay() {
  const overlay = document.getElementById('fightOverlay');
  if (overlay) overlay.classList.add('hidden');
}

function updateHud() {
  const p = gameState.player;
  const enemies = gameState.enemies;
  if (p) {
    const bar = document.getElementById('hudPlayerHp');
    const text = document.getElementById('hudPlayerHpText');
    if (bar) bar.style.width = `${(Math.max(0, p.hp) / p.maxHp) * 100}%`;
    if (text) text.textContent = `${Math.max(0, Math.round(p.hp))} / ${p.maxHp}`;
  }
  const mineEl = document.getElementById('hudMines');
  const rocketEl = document.getElementById('hudRockets');
  if (mineEl) mineEl.textContent = `Minen: ${state.playerMines}`;
  if (rocketEl) rocketEl.textContent = `Raketen: ${state.playerRockets}`;
  if (enemies.length > 0) {
    const totalHp = enemies.reduce((s, e) => s + Math.max(0, e.hp), 0);
    const totalMax = enemies.reduce((s, e) => s + e.maxHp, 0);
    const alive = enemies.filter((e) => e.hp > 0).length;
    const bar = document.getElementById('hudEnemyHp');
    const text = document.getElementById('hudEnemyHpText');
    const label = document.getElementById('hudEnemyLabel');
    if (bar) bar.style.width = `${(totalHp / totalMax) * 100}%`;
    if (text) text.textContent = `${Math.max(0, Math.round(totalHp))} / ${totalMax}`;
    if (label) label.textContent = enemies.length > 1 ? `${alive} Gegner` : (state.currentEnemy?.name || 'Gegner');
  }
}

function exitFight() {
  state.fightInProgress = false;
  gameState.fightEnded = false;
  gameState.winner = null;
  if (gameState.animationId) {
    cancelAnimationFrame(gameState.animationId);
    gameState.animationId = null;
  }
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
  window.removeEventListener('resize', resizeFightCanvas);
  if (musicStarted) playMenuMusic();
  hideFightOverlay();
  document.getElementById('btnNextOpponent').disabled = false;
  document.getElementById('btnFight').disabled = false;
  document.getElementById('controlsHint').classList.add('hidden');
}

function drawThrusterFlame(ctx, x, y, angle, size, thrust) {
  if (thrust <= 0.05) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const flicker = 0.7 + Math.random() * 0.3;
  const len = size * (0.8 + thrust * 1.2) * flicker;
  const w = size * 0.35 * (0.6 + thrust * 0.4);

  ctx.fillStyle = '#ffdd44';
  ctx.beginPath();
  ctx.moveTo(-size * 0.5, -w * 0.5);
  ctx.lineTo(-size * 0.5 - len * 0.6, 0);
  ctx.lineTo(-size * 0.5, w * 0.5);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawMech(x, y, angle, color, size = 20, isPlayer = false, enemyIndex = 0, thrust = 0) {
  drawThrusterFlame(ctx, x, y, angle, size, thrust);

  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 4;

  if (isPlayer && typeof drawPlayerMechLayered === 'function') {
    drawPlayerMechLayered(ctx, x, y, angle, size, color);
  } else if (!isPlayer && typeof drawEnemyMechSprite === 'function' && enemySprites.length > 0) {
    drawEnemyMechSprite(ctx, x, y, angle, size, enemyIndex);
  } else {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.6, -size * 0.4, size * 1.2, size * 0.8);
    ctx.fillRect(-size * 0.8, -size * 0.3, size * 0.3, size * 0.6);
    ctx.fillRect(size * 0.5, -size * 0.3, size * 0.3, size * 0.6);
    ctx.beginPath();
    ctx.moveTo(size * 0.6, 0);
    ctx.lineTo(size * 0.3, -size * 0.2);
    ctx.lineTo(size * 0.3, size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

const MAX_PARTICLES = 45;
function spawnExplosion(x, y, color, count) {
  const n = Math.min(count || 5, 4);
  for (let i = 0; i < n; i++) {
    if (gameState.particles.length >= MAX_PARTICLES) break;
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 2.5;
    gameState.particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      decay: 0.03 + Math.random() * 0.02,
      radius: 2 + Math.random() * 3,
      color,
    });
  }
}

function updateParticles() {
  if (gameState.particles.length > MAX_PARTICLES) {
    gameState.particles = gameState.particles.slice(-MAX_PARTICLES);
  }
  gameState.particles = gameState.particles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.life -= p.decay;
    return p.life > 0;
  });
}

function drawParticles() {
  gameState.particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawProjectile(proj) {
  const x = proj.x;
  const y = proj.y;
  const color = proj.color;
  const angle = Math.atan2(proj.vy, proj.vx);
  const weaponId = proj.weaponId || 'weapon_cannon';
  const isPlayer = proj.owner === 'player';
  const flameColor = isPlayer ? '#00ff88' : '#ff6b6b'; // Für Rückstoß/Flare
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  
  if (proj.type === 'rocket') {
    const t = Date.now() / 80;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    // Raketenkörper
    ctx.fillStyle = color;
    ctx.fillRect(-10, -3, 16, 6);
    // Spitze (Nasenkonus)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(12, -2.5);
    ctx.lineTo(12, 2.5);
    ctx.closePath();
    ctx.fill();
    // Heck-Flossen (Fins)
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(-10, -3);
    ctx.lineTo(-14, -5);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-10, 3);
    ctx.lineTo(-14, 5);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    // Flamme (pulsierend, vereinfacht)
    const flameLen = 6 + Math.sin(t) * 2;
    ctx.fillStyle = 'rgba(255, 160, 60, 0.7)';
    ctx.beginPath();
    ctx.moveTo(-10, -2);
    ctx.lineTo(-10 - flameLen, 0);
    ctx.lineTo(-10, 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
    return;
  }
  
  switch (weaponId) {
    case 'weapon_plasma':
      ctx.shadowColor = '#aa44ff';
      ctx.shadowBlur = 4;
      ctx.fillStyle = '#ff66ff';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#cc88ff';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(2, -1, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'weapon_railgun':
      ctx.shadowColor = '#4488ff';
      ctx.shadowBlur = 4;
      ctx.fillStyle = '#66aaff';
      ctx.fillRect(-14, -1.5, 20, 3);
      ctx.fillStyle = '#aaddff';
      ctx.fillRect(-12, -1, 16, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-8, -0.5, 6, 1);
      ctx.shadowBlur = 0;
      ctx.fillStyle = flameColor;
      ctx.fillRect(-16, -1, 4, 2);
      break;
    case 'weapon_minigun':
      const electricBlue = isPlayer ? '#00ddff' : '#ff8844';
      const electricBright = '#aaffff';
      ctx.shadowBlur = 0;
      ctx.strokeStyle = electricBright;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(-2, -1.5);
      ctx.lineTo(2, 1);
      ctx.lineTo(6, 0);
      ctx.stroke();
      ctx.strokeStyle = electricBlue;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-4, 0.5);
      ctx.lineTo(0, -1);
      ctx.lineTo(4, 0.5);
      ctx.stroke();
      ctx.fillStyle = electricBright;
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'weapon_cannon':
    default:
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;
      ctx.fillStyle = color;
      ctx.fillRect(-8, -2, 12, 4);
      ctx.beginPath();
      ctx.moveTo(4, 0);
      ctx.lineTo(-2, -3);
      ctx.lineTo(-2, 3);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = flameColor;
      ctx.fillRect(-10, -1.5, 4, 3);
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-9, -1, 2, 2);
      break;
  }
  
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawHpBar(x, y, currentHp, maxHp, color, size = 20) {
  const barWidth = size * 2.5;
  const barHeight = 6;
  const offsetY = size * 1.3; // Abstand unter dem Roboter
  
  // Hintergrund (schwarz)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(x - barWidth / 2, y + offsetY, barWidth, barHeight);
  
  // HP-Balken
  const hpPercent = Math.max(0, Math.min(1, currentHp / maxHp));
  ctx.fillStyle = color;
  ctx.fillRect(x - barWidth / 2, y + offsetY, barWidth * hpPercent, barHeight);
  
  // Rand
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - barWidth / 2, y + offsetY, barWidth, barHeight);
  
  // HP-Text
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 10px Rajdhani';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${Math.max(0, Math.round(currentHp))}/${maxHp}`, x, y + offsetY + barHeight / 2);
}

function updatePlayer() {
  if (gameState.countdown > 0 || gameState.fightEnded) return;
  
  const p = gameState.player;
  const stats = computeRobotStats();
  const maxSpeed = stats.speed * 0.18;  // Roboter langsamer als Schüsse (projSpeed 4.5)
  const acceleration = 0.08;
  const friction = 0.97;
  const rotSpeed = 0.045;
  
  if (gameState.keys['ArrowLeft']) p.angle -= rotSpeed;
  if (gameState.keys['ArrowRight']) p.angle += rotSpeed;
  
  if (p.vx === undefined) p.vx = 0;
  if (p.vy === undefined) p.vy = 0;
  if (p.thrust === undefined) p.thrust = 0;
  
  let thrusting = false;
  
  if (gameState.keys['ArrowUp']) {
    p.vx += Math.cos(p.angle) * acceleration * maxSpeed;
    p.vy += Math.sin(p.angle) * acceleration * maxSpeed;
    thrusting = true;
  }
  if (gameState.keys['ArrowDown']) {
    p.vx -= Math.cos(p.angle) * acceleration * maxSpeed * 0.5;
    p.vy -= Math.sin(p.angle) * acceleration * maxSpeed * 0.5;
    thrusting = true;
  }
  
  // Geschwindigkeit begrenzen
  const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  if (speed > maxSpeed) {
    p.vx = (p.vx / speed) * maxSpeed;
    p.vy = (p.vy / speed) * maxSpeed;
  }
  
  p.vx *= friction;
  p.vy *= friction;
  
  // Thrust-Wert für Flammen-Visualisierung
  const targetThrust = thrusting ? Math.min(speed / maxSpeed + 0.3, 1.0) : 0;
  p.thrust += (targetThrust - p.thrust) * 0.15;
  
  const prevX = p.x;
  const prevY = p.y;
  p.x += p.vx;
  p.y += p.vy;
  
  // Wrap-Around: auf der anderen Seite wieder auftauchen
  if (p.x < 0) p.x += canvas.width;
  if (p.x > canvas.width) p.x -= canvas.width;
  if (p.y < 0) p.y += canvas.height;
  if (p.y > canvas.height) p.y -= canvas.height;

  for (let i = 0; i < gameState.obstacles.length; i++) {
    const obs = gameState.obstacles[i];
    if (circleRectCollision(p.x, p.y, 14, obs.x, obs.y, obs.w, obs.h)) {
      resolveObstacleCollision(p, 14, obs);
    }
  }

  // Schild berühren = 10s Schutz
  if (gameState.countdown === 0 && gameState.shield?.active) {
    const sh = gameState.shield;
    sh.x = canvas.width / 2;
    sh.y = canvas.height / 2;
    const dist = Math.hypot(p.x - sh.x, p.y - sh.y);
    if (dist < sh.radius + 14) {
      p.shieldUntil = Date.now() + 10000;
      gameState.shield.active = false;
      spawnExplosion(sh.x, sh.y, '#44aaff', 15);
    }
  }

  // Schießen
  const now = Date.now();
  if (gameState.keys[' '] && now - gameState.lastShot > 200) {
    gameState.lastShot = now;
    const parts = getEquippedParts();
    const weapon = parts.weapon;
    if (weapon) {
      const projSpeed = 4.5;
      const spreadAngle = 0.08;
      const baseX = p.x + Math.cos(p.angle) * 18;
      const baseY = p.y + Math.sin(p.angle) * 18;
      const count = getWeaponShots(weapon.id);
      const dmgPerProj = weapon.damage;
      for (let i = 0; i < count; i++) {
        const angleOff = (i - (count - 1) / 2) * spreadAngle;
        const angle = p.angle + angleOff;
        const posOff = (i - (count - 1) / 2) * 6;
        const projColor = gameState.playerRobotIndex === 1 ? '#ff4757' : '#00d4aa';
        const projX = baseX + Math.cos(p.angle + Math.PI / 2) * posOff;
        const projY = baseY + Math.sin(p.angle + Math.PI / 2) * posOff;
        gameState.projectiles.push({
          x: projX,
          y: projY,
          vx: Math.cos(angle) * projSpeed,
          vy: Math.sin(angle) * projSpeed,
          damage: dmgPerProj,
          owner: 'player',
          weaponId: weapon.id,
          color: projColor,
          totalDist: 0,
        });
      }
      playShotSound();
    }
  }

  // Mine platzieren (X)
  if (gameState.keys['x'] && state.playerMines > 0 && now - gameState.lastMinePlace > MINE_PLACE_COOLDOWN) {
    gameState.lastMinePlace = now;
    state.playerMines--;
    gameState.mines.push({
      x: p.x + Math.cos(p.angle) * 24,
      y: p.y + Math.sin(p.angle) * 24,
      owner: 'player',
      placedAt: now,
    });
    playMineSound();
  }

  // Rakete abfeuern (Y)
  if (gameState.keys['y'] && state.playerRockets > 0 && now - gameState.lastRocketFire > ROCKET_FIRE_COOLDOWN) {
    gameState.lastRocketFire = now;
    state.playerRockets--;
    const projSpeed = 3.2;
    const baseX = p.x + Math.cos(p.angle) * 18;
    const baseY = p.y + Math.sin(p.angle) * 18;
    const projColor = gameState.playerRobotIndex === 1 ? '#ff4757' : '#00d4aa';
    gameState.projectiles.push({
      x: baseX,
      y: baseY,
      vx: Math.cos(p.angle) * projSpeed,
      vy: Math.sin(p.angle) * projSpeed,
      damage: ROCKET_DAMAGE,
      owner: 'player',
      type: 'rocket',
      color: projColor,
      totalDist: 0,
    });
    playRocketSound();
  }
}

function updateEnemies() {
  if (gameState.countdown > 0 || gameState.fightEnded) return;
  
  const p = gameState.player;
  if (!p) return;
  
  gameState.enemies.forEach((e, eIdx) => {
    if (e.hp <= 0) return;
  
  const maxSpeed = e.speed * 0.38;  // 10% langsamer als vorher (0.42 * 0.9)
  const acceleration = 0.12;       // Schnellere Reaktion
  const friction = 0.97;
  if (e.thrust === undefined) e.thrust = 0;
  if (e.retreatUntil === undefined) e.retreatUntil = 0;
  if (e.strategy === undefined) e.strategy = 'aggressive';
  
  const wrapDist = (ax, ay, bx, by) => {
    let dx = bx - ax;
    let dy = by - ay;
    if (Math.abs(dx) > canvas.width / 2) dx -= Math.sign(dx) * canvas.width;
    if (Math.abs(dy) > canvas.height / 2) dy -= Math.sign(dy) * canvas.height;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const now = Date.now();
  const isRetreating = now < (e.retreatUntil || 0);
  
  let minAllyDist = Infinity;
  let separationX = 0, separationY = 0;
  gameState.enemies.forEach((other, oIdx) => {
    if (oIdx === eIdx || other.hp <= 0) return;
    const d2e = wrapDist(e.x, e.y, other.x, other.y);
    if (d2e < minAllyDist) minAllyDist = d2e;
    if (d2e < 90 && d2e > 0) {
      const awayX = (e.x - other.x) / d2e;
      const awayY = (e.y - other.y) / d2e;
      const sepStrength = (90 - d2e) / 90;
      separationX += awayX * sepStrength * maxSpeed * 2.5;
      separationY += awayY * sepStrength * maxSpeed * 2.5;
    }
  });
  
  if (!isRetreating) {
    const shouldRetreat = minAllyDist < 45;
    if (shouldRetreat) {
      e.retreatUntil = now + 800 + Math.random() * 500;
    }
  }

  // Angriff/Verteidigung wechseln – alle Gegner abwechselnd, nie nur angreifen oder nur verteidigen
  const phaseDurations = {
    aggressive: { attack: 2200, defend: 1600 },
    defensive: { attack: 1600, defend: 2200 },
    evasive: { attack: 1900, defend: 1900 },
    flanker: { attack: 2000, defend: 1800 },
  };
  const durations = phaseDurations[e.strategy] || phaseDurations.aggressive;
  if (e._phaseUntil === undefined) {
    e._phase = 'attack';
    e._phaseUntil = now + durations.attack;
  }
  if (now > e._phaseUntil) {
    e._phase = e._phase === 'attack' ? 'defend' : 'attack';
    e._phaseUntil = now + (e._phase === 'attack' ? durations.attack : durations.defend);
  }
  
  // Ziel wählen: Spieler oder (in 1v3) zufällig auch andere Gegner – häufiger wechseln
  const is1v3 = state.arenaMode === '1v3';
  if (e._targetSwitchAt === undefined || now > e._targetSwitchAt) {
    e._targetSwitchAt = now + 1200 + Math.random() * 1800;
    const targets = [{ player: true }];
    if (is1v3) {
      gameState.enemies.forEach((other, oIdx) => {
        if (oIdx !== eIdx && other.hp > 0) targets.push({ player: false, idx: oIdx });
      });
    }
    const t = targets[Math.floor(Math.random() * targets.length)];
    e._targetPlayer = t.player;
    e._targetEnemyIdx = t.idx;
  }
  let targetX, targetY;
  if (e._targetPlayer) {
    targetX = p.x;
    targetY = p.y;
  } else if (e._targetEnemyIdx !== undefined) {
    const other = gameState.enemies[e._targetEnemyIdx];
    if (other && other.hp > 0) {
      targetX = other.x;
      targetY = other.y;
    } else {
      targetX = p.x;
      targetY = p.y;
    }
  } else {
    targetX = p.x;
    targetY = p.y;
  }
  const dist = wrapDist(e.x, e.y, targetX, targetY);
  
  let dx = targetX - e.x;
  let dy = targetY - e.y;
  if (Math.abs(dx) > canvas.width / 2) dx -= Math.sign(dx) * canvas.width;
  if (Math.abs(dy) > canvas.height / 2) dy -= Math.sign(dy) * canvas.height;
  
  // Geschwindigkeit initialisieren falls nicht vorhanden
  if (e.vx === undefined) e.vx = 0;
  if (e.vy === undefined) e.vy = 0;
  
  let targetVx = separationX;
  let targetVy = separationY;
  
  if (dist > 0) {
    const targetAngle = Math.atan2(dy, dx);
    let angleDiff = targetAngle - e.angle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    const rotSpeed = 0.06;
    e.angle += angleDiff * rotSpeed;
    
    let avoidX = 0, avoidY = 0;
    const lookAhead = 50;
    const futureX = e.x + Math.cos(e.angle) * lookAhead;
    const futureY = e.y + Math.sin(e.angle) * lookAhead;
    
    for (let i = 0; i < gameState.obstacles.length; i++) {
      const obs = gameState.obstacles[i];
      const odx = e.x - obs.x;
      const ody = e.y - obs.y;
      const oDist = Math.sqrt(odx * odx + ody * ody);
      if (oDist < 80 || circleRectCollision(futureX, futureY, 14, obs.x, obs.y, obs.w, obs.h)) {
        const avoidStrength = Math.max(0, 1 - oDist / 100);
        avoidX += (odx / oDist) * avoidStrength * maxSpeed * 1.5;
        avoidY += (ody / oDist) * avoidStrength * maxSpeed * 1.5;
      }
    }
    
    let moveStrength = 1.0;
    const moveDir = isRetreating ? -1 : 1;
    const randVar = 0.92 + Math.random() * 0.16;
    if (!isRetreating) {
      if (e._phase === 'attack') {
        moveStrength = (dist > 80 ? 0.85 : dist > 50 ? 0.7 : 0.6) * randVar;
      } else {
        moveStrength = (-0.35 - Math.random() * 0.2) * randVar;
      }
    }
    targetVx += Math.cos(e.angle) * maxSpeed * moveStrength * moveDir + avoidX;
    targetVy += Math.sin(e.angle) * maxSpeed * moveStrength * moveDir + avoidY;
  }
  
  const targetSpeed = Math.sqrt(targetVx * targetVx + targetVy * targetVy);
  const isThrusting = targetSpeed > 0.1;

  if (isThrusting) {
    e.vx += (targetVx - e.vx) * acceleration;
    e.vy += (targetVy - e.vy) * acceleration;
  }
  
  const eSpeed = Math.sqrt(e.vx * e.vx + e.vy * e.vy);
  if (eSpeed > maxSpeed) {
    e.vx = (e.vx / eSpeed) * maxSpeed;
    e.vy = (e.vy / eSpeed) * maxSpeed;
  }
  
  e.vx *= friction;
  e.vy *= friction;
  
  const thrustTarget = isThrusting ? Math.min(eSpeed / maxSpeed + 0.3, 1.0) : 0;
  e.thrust += (thrustTarget - e.thrust) * 0.15;
  
  const prevX = e.x;
  const prevY = e.y;
  e.x += e.vx;
  e.y += e.vy;
  
  // Wrap-Around: auf der anderen Seite wieder auftauchen
  if (e.x < 0) e.x += canvas.width;
  if (e.x > canvas.width) e.x -= canvas.width;
  if (e.y < 0) e.y += canvas.height;
  if (e.y > canvas.height) e.y -= canvas.height;

  for (let i = 0; i < gameState.obstacles.length; i++) {
    const obs = gameState.obstacles[i];
    if (circleRectCollision(e.x, e.y, 14, obs.x, obs.y, obs.w, obs.h)) {
      resolveObstacleCollision(e, 14, obs);
    }
  }

  // Schild berühren = 10s Schutz
  if (gameState.countdown === 0 && gameState.shield?.active) {
    const sh = gameState.shield;
    sh.x = canvas.width / 2;
    sh.y = canvas.height / 2;
    const dist = Math.hypot(e.x - sh.x, e.y - sh.y);
    if (dist < sh.radius + 14) {
      e.shieldUntil = Date.now() + 10000;
      gameState.shield.active = false;
      spawnExplosion(sh.x, sh.y, '#44aaff', 15);
    }
  }

  // Gegner: Mine legen (wenn Spieler nah und zufällig)
  if ((e.mines || 0) > 0 && now - (e.lastMinePlace || 0) > MINE_PLACE_COOLDOWN && dist < 100 && Math.random() < 0.012) {
    e.lastMinePlace = now;
    e.mines--;
    gameState.mines.push({
      x: e.x + Math.cos(e.angle) * 24,
      y: e.y + Math.sin(e.angle) * 24,
      owner: 'enemy',
      placedAt: now,
    });
    playMineSound();
  }

  // Gegner: Rakete abfeuern (wenn Spieler in Reichweite)
  if ((e.rockets || 0) > 0 && now - (e.lastRocketFire || 0) > ROCKET_FIRE_COOLDOWN && dist < 250 && Math.random() < 0.008) {
    e.lastRocketFire = now;
    e.rockets--;
    const projSpeed = 3.2;
    const baseX = e.x + Math.cos(e.angle) * 18;
    const baseY = e.y + Math.sin(e.angle) * 18;
    gameState.projectiles.push({
      x: baseX,
      y: baseY,
      vx: Math.cos(e.angle) * projSpeed,
      vy: Math.sin(e.angle) * projSpeed,
      damage: ROCKET_DAMAGE,
      owner: 'enemy',
      enemyIndex: eIdx,
      type: 'rocket',
      color: '#ff4757',
      totalDist: 0,
    });
    playRocketSound();
  }

  const shotCooldown = e.shotCooldown ?? 520;
  if (now - (e.lastShot || 0) > shotCooldown) {
    e.lastShot = now;
    playShotSound();
    const projSpeed = 3.8;
    const weaponId = e.weaponId || 'weapon_cannon';
    const count = e.shotsPerVolley ?? (Math.random() < 0.35 ? 2 : 1);
    const dmgPerProj = e.damage;
    const spreadAngle = 0.08;
    for (let i = 0; i < count; i++) {
      const angleOff = (i - (count - 1) / 2) * spreadAngle;
      const angle = e.angle + angleOff;
      const posOff = (i - (count - 1) / 2) * 6;
      const proj = {
        x: e.x + Math.cos(e.angle) * 18 + Math.cos(e.angle + Math.PI / 2) * posOff,
        y: e.y + Math.sin(e.angle) * 18 + Math.sin(e.angle + Math.PI / 2) * posOff,
        vx: Math.cos(angle) * projSpeed,
        vy: Math.sin(angle) * projSpeed,
        damage: dmgPerProj,
        owner: 'enemy',
        enemyIndex: gameState.enemies.indexOf(e),
        weaponId,
        color: '#ff4757',
        totalDist: 0,
      };
      gameState.projectiles.push(proj);
    }
  }
  });
}

// —— Hindernisse: zufällig pro Kampf
function generateObstacles(theme) {
  const obstacles = [];
  const count = 5 + Math.floor(Math.random() * 5); // 5–9 Hindernisse
  const playerStartX = canvas.width * 0.2;
  const playerStartY = canvas.height * 0.5;
  const enemyStartX = canvas.width * 0.8;
  const enemyStartY = canvas.height * 0.5;
  const margin = 70; // Mindestabstand zu Startpositionen

  const sizeRange = theme?.sizeRange || { minW: 30, maxW: 65, minH: 25, maxH: 65 };
  const colors = theme?.colors || ['#3a4555','#4a5568'];
  const sizeW = sizeRange.maxW - sizeRange.minW;
  const sizeH = sizeRange.maxH - sizeRange.minH;

  for (let i = 0; i < count; i++) {
    let x, y, w, h;
    let tries = 0;
    do {
      w = sizeRange.minW + Math.floor(Math.random() * (sizeW + 1));
      h = sizeRange.minH + Math.floor(Math.random() * (sizeH + 1));
      x = margin + w + Math.random() * (canvas.width - 2 * margin - 2 * w);
      y = margin + h + Math.random() * (canvas.height - 2 * margin - 2 * h);
      tries++;
    } while (
      tries < 50 &&
      (Math.hypot(x - playerStartX, y - playerStartY) < margin + Math.max(w, h) ||
       Math.hypot(x - enemyStartX, y - enemyStartY) < margin + Math.max(w, h))
    );

    const color = colors[Math.floor(Math.random() * colors.length)];
    obstacles.push({ x, y, w, h, color });
  }

  gameState.obstacles = obstacles;
}

function pointInRect(px, py, rx, ry, rw, rh) {
  const halfW = rw / 2;
  const halfH = rh / 2;
  return px >= rx - halfW && px <= rx + halfW && py >= ry - halfH && py <= ry + halfH;
}

function circleRectCollision(cx, cy, radius, rx, ry, rw, rh) {
  const halfW = rw / 2;
  const halfH = rh / 2;
  const closestX = Math.max(rx - halfW, Math.min(cx, rx + halfW));
  const closestY = Math.max(ry - halfH, Math.min(cy, ry + halfH));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy < radius * radius;
}

function resolveObstacleCollision(robot, radius, obs) {
  const halfW = obs.w / 2;
  const halfH = obs.h / 2;
  const closestX = Math.max(obs.x - halfW, Math.min(robot.x, obs.x + halfW));
  const closestY = Math.max(obs.y - halfH, Math.min(robot.y, obs.y + halfH));
  let dx = robot.x - closestX;
  let dy = robot.y - closestY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) {
    dx = robot.x - obs.x;
    dy = robot.y - obs.y;
    const d2 = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= d2;
    dy /= d2;
  } else {
    dx /= dist;
    dy /= dist;
  }

  const penetration = radius - dist;
  robot.x += dx * (penetration + 0.5);
  robot.y += dy * (penetration + 0.5);

  const velDot = (robot.vx || 0) * dx + (robot.vy || 0) * dy;
  if (velDot < 0) {
    robot.vx -= velDot * dx;
    robot.vy -= velDot * dy;
  }
}

function drawShieldRing(x, y, radius) {
  ctx.save();
  ctx.strokeStyle = 'rgba(68, 170, 255, 0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius + Math.sin(Date.now() / 150) * 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawShield() {
  const sh = gameState.shield;
  if (!sh || !sh.active) return;
  sh.x = canvas.width / 2;
  sh.y = canvas.height / 2;
  const pulse = 0.9 + Math.sin(Date.now() / 200) * 0.1;
  ctx.save();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(68, 170, 255, 0.9)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(sh.x, sh.y, sh.radius * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(68, 170, 255, 0.25)';
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawObstacle(obs) {
  const x = obs.x - obs.w / 2;
  const y = obs.y - obs.h / 2;
  const baseColor = obs.color || '#3a4555';
  ctx.fillStyle = baseColor;
  ctx.fillRect(x, y, obs.w, obs.h);
  ctx.strokeStyle = '#4a5568';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, obs.w, obs.h);
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(x + 2, y + 2, obs.w - 4, obs.h - 4);
}

function checkCollision(robot1, robot2, radius1 = 14, radius2 = 14) {
  if (!robot1 || !robot2) return false;
  const dx = robot2.x - robot1.x;
  const dy = robot2.y - robot1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = radius1 + radius2;
  return dist < minDist;
}

function resolveCollision(robot1, robot2, radius1 = 14, radius2 = 14) {
  if (!robot1 || !robot2) return;
  
  const dx = robot2.x - robot1.x;
  const dy = robot2.y - robot1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = radius1 + radius2;
  
  if (dist < minDist && dist > 0) {
    // Normalisierter Kollisionsvektor
    const nx = dx / dist;
    const ny = dy / dist;
    
    // Roboter auseinander schieben
    const overlap = minDist - dist;
    const separationX = nx * overlap * 0.5;
    const separationY = ny * overlap * 0.5;
    
    robot1.x -= separationX;
    robot1.y -= separationY;
    robot2.x += separationX;
    robot2.y += separationY;
    
    // Geschwindigkeiten für Bounce-Effekt
    const bounceForce = 0.8;
    
    // Relative Geschwindigkeit
    const v1x = robot1.vx || 0;
    const v1y = robot1.vy || 0;
    const v2x = robot2.vx || 0;
    const v2y = robot2.vy || 0;
    
    const relVx = v2x - v1x;
    const relVy = v2y - v1y;
    
    // Geschwindigkeit entlang der Kollisionsnormalen
    const velAlongNormal = relVx * nx + relVy * ny;
    
    // Nur kollidieren wenn sich Roboter aufeinander zu bewegen
    if (velAlongNormal < 0) {
      // Impuls berechnen
      const impulse = velAlongNormal * bounceForce;
      
      // Geschwindigkeiten anpassen
      robot1.vx = (robot1.vx || 0) + impulse * nx;
      robot1.vy = (robot1.vy || 0) + impulse * ny;
      robot2.vx = (robot2.vx || 0) - impulse * nx;
      robot2.vy = (robot2.vy || 0) - impulse * ny;
    } else {
      // Roboter drücken sich auseinander wenn sie sich nicht bewegen
      robot1.vx = (robot1.vx || 0) - nx * bounceForce * 0.5;
      robot1.vy = (robot1.vy || 0) - ny * bounceForce * 0.5;
      robot2.vx = (robot2.vx || 0) + nx * bounceForce * 0.5;
      robot2.vy = (robot2.vy || 0) + ny * bounceForce * 0.5;
    }
  }
}

function triggerEnemyDeathExplosion(enemy) {
  if (!enemy || enemy._deathFxPlayed) return;
  enemy._deathFxPlayed = true;
  spawnExplosion(enemy.x, enemy.y, '#ff4757', 24);
}

function getAliveEnemiesCount() {
  return gameState.enemies.filter((x) => x.hp > 0).length;
}

function updateMines() {
  if (gameState.countdown > 0 || gameState.fightEnded) return;
  const p = gameState.player;
  const enemies = gameState.enemies;
  const stats = gameState.playerStats || computeRobotStats();
  const minesToRemove = [];
  const hitRadius = MINE_RADIUS + 14;

  const now = Date.now();
  for (let i = 0; i < gameState.mines.length; i++) {
    const mine = gameState.mines[i];
    const distTo = (x, y) => Math.hypot(mine.x - x, mine.y - y);
    const isArmed = !mine.placedAt || now - mine.placedAt > MINE_ARMING_MS;

    if (isArmed && p && p.hp > 0 && distTo(p.x, p.y) < hitRadius) {
      minesToRemove.push(mine);
      if (Date.now() < (p.shieldUntil || 0)) {
        spawnExplosion(mine.x, mine.y, '#ffaa00', 12);
        playMineExplosionSound();
        continue;
      }
      const dmg = Math.max(1, Math.floor(MINE_DAMAGE - (stats.armor || 0) / 2));
      p.hp -= dmg;
      spawnExplosion(mine.x, mine.y, '#ffaa00', 14);
      playMineExplosionSound();
      if (p.hp <= 0) endFight(false);
      continue;
    }

    if (isArmed && enemies) {
      for (let j = 0; j < enemies.length; j++) {
        const e = enemies[j];
        if (e.hp <= 0) continue;
        if (distTo(e.x, e.y) < hitRadius) {
          minesToRemove.push(mine);
          if (Date.now() < (e.shieldUntil || 0)) {
            spawnExplosion(mine.x, mine.y, '#ffaa00', 12);
            playMineExplosionSound();
            break;
          }
          const dmg = Math.max(1, Math.floor(MINE_DAMAGE - e.armor / 2));
          e.hp -= dmg;
          if (e.hp <= 0) triggerEnemyDeathExplosion(e);
          spawnExplosion(mine.x, mine.y, '#ffaa00', 14);
          playMineExplosionSound();
          if (getAliveEnemiesCount() === 0) endFight(true);
          break;
        }
      }
    }
  }

  gameState.mines = gameState.mines.filter((m) => !minesToRemove.includes(m));
}

function scheduleNextMeteorStorm(now = Date.now()) {
  const delay = METEOR_STORM_MIN_DELAY + Math.random() * (METEOR_STORM_MAX_DELAY - METEOR_STORM_MIN_DELAY);
  gameState.nextMeteorStormAt = now + delay;
}

function spawnMeteorStorm(now = Date.now()) {
  const margin = METEOR_ZONE_RADIUS + 10;
  for (let i = 0; i < METEOR_ZONES_PER_STORM; i++) {
    const x = margin + Math.random() * Math.max(1, canvas.width - margin * 2);
    const y = margin + Math.random() * Math.max(1, canvas.height - margin * 2);
    const startX = x + (Math.random() * 2 - 1) * 220;
    const startY = y - (160 + Math.random() * 180);
    gameState.meteorWarnings.push({
      x,
      y,
      startX,
      startY,
      size: 10 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() * 0.06 + 0.02) * (Math.random() < 0.5 ? -1 : 1),
      radius: METEOR_ZONE_RADIUS,
      impactAt: now + METEOR_WARNING_MS,
    });
  }
}

function updateMeteorStorms() {
  if (gameState.countdown > 0 || gameState.fightEnded) return;
  const now = Date.now();

  if (!gameState.nextMeteorStormAt) scheduleNextMeteorStorm(now);
  if (gameState.meteorWarnings.length === 0 && now >= gameState.nextMeteorStormAt) {
    spawnMeteorStorm(now);
    scheduleNextMeteorStorm(now);
  }

  if (gameState.meteorWarnings.length === 0) return;
  const due = gameState.meteorWarnings.filter((z) => now >= z.impactAt);
  if (due.length === 0) return;

  const p = gameState.player;
  const enemies = gameState.enemies;
  due.forEach((zone) => {
    const r2 = zone.radius * zone.radius;
    spawnExplosion(zone.x, zone.y, '#ff8844', 20);

    if (p && p.hp > 0) {
      const dx = p.x - zone.x;
      const dy = p.y - zone.y;
      if (dx * dx + dy * dy <= r2) {
        p.hp -= METEOR_DAMAGE;
        if (p.hp <= 0) endFight(false);
      }
    }

    if (enemies) {
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (e.hp <= 0) continue;
        const dx = e.x - zone.x;
        const dy = e.y - zone.y;
        if (dx * dx + dy * dy <= r2) {
          e.hp -= METEOR_DAMAGE;
          if (e.hp <= 0) triggerEnemyDeathExplosion(e);
        }
      }
      if (getAliveEnemiesCount() === 0) endFight(true);
    }
  });

  gameState.meteorWarnings = gameState.meteorWarnings.filter((z) => now < z.impactAt);
}

function updateProjectiles() {
  // Während Countdown keine Projektile aktualisieren
  if (gameState.countdown > 0 || gameState.fightEnded) {
    return;
  }
  
  const stats = gameState.playerStats || computeRobotStats();
  const p = gameState.player;
  const enemies = gameState.enemies;
  
  // 1. Raketen: Homing (begrenzter Kurvenradius)
  const wrapDist = (ax, ay, bx, by) => {
    let dx = bx - ax, dy = by - ay;
    if (Math.abs(dx) > canvas.width / 2) dx -= Math.sign(dx) * canvas.width;
    if (Math.abs(dy) > canvas.height / 2) dy -= Math.sign(dy) * canvas.height;
    return { dx, dy, dist: Math.sqrt(dx * dx + dy * dy) };
  };
  gameState.projectiles.forEach((proj) => {
    if (proj.type === 'rocket') {
      let tx = 0, ty = 0;
      if (proj.owner === 'player' && enemies?.length) {
        let best = Infinity;
        enemies.forEach((e) => {
          if (e.hp <= 0) return;
          const { dist } = wrapDist(proj.x, proj.y, e.x, e.y);
          if (dist < best) { best = dist; tx = e.x; ty = e.y; }
        });
        if (best < Infinity) {
          const { dx, dy, dist } = wrapDist(proj.x, proj.y, tx, ty);
          if (dist > 5) {
            const wantAngle = Math.atan2(dy, dx);
            const curAngle = Math.atan2(proj.vy, proj.vx);
            let diff = wantAngle - curAngle;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            const clamped = Math.max(-ROCKET_TURN_RATE, Math.min(ROCKET_TURN_RATE, diff));
            const speed = Math.sqrt(proj.vx * proj.vx + proj.vy * proj.vy) || 3.2;
            proj.vx = Math.cos(curAngle + clamped) * speed;
            proj.vy = Math.sin(curAngle + clamped) * speed;
          }
        }
      } else if (proj.owner === 'enemy' && p && p.hp > 0) {
        const { dx, dy, dist } = wrapDist(proj.x, proj.y, p.x, p.y);
        if (dist > 5) {
          const wantAngle = Math.atan2(dy, dx);
          const curAngle = Math.atan2(proj.vy, proj.vx);
          let diff = wantAngle - curAngle;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          const clamped = Math.max(-ROCKET_TURN_RATE, Math.min(ROCKET_TURN_RATE, diff));
          const speed = Math.sqrt(proj.vx * proj.vx + proj.vy * proj.vy) || 3.2;
          proj.vx = Math.cos(curAngle + clamped) * speed;
          proj.vy = Math.sin(curAngle + clamped) * speed;
        }
      }
    }
  });

  // 2. Alle Projektile bewegen
  const maxDist = Math.max(canvas.width, canvas.height) * 0.5;
  gameState.projectiles.forEach((proj) => {
    const dist = Math.sqrt(proj.vx * proj.vx + proj.vy * proj.vy);
    proj.totalDist = (proj.totalDist || 0) + dist;
    proj.x += proj.vx;
    proj.y += proj.vy;
    if (proj.x < 0) proj.x += canvas.width;
    if (proj.x > canvas.width) proj.x -= canvas.width;
    if (proj.y < 0) proj.y += canvas.height;
    if (proj.y > canvas.height) proj.y -= canvas.height;
  });
  
  // 3. Projektile, die sich gegenseitig treffen, zerstören sich (Schüsse zerstören Minen/Raketen NICHT)
  const projToRemove = new Set();
  const projs = gameState.projectiles;
  for (let i = 0; i < projs.length; i++) {
    if (projToRemove.has(projs[i])) continue;
    for (let j = i + 1; j < projs.length; j++) {
      if (projToRemove.has(projs[j])) continue;
      if (projs[i].type === 'rocket' || projs[j].type === 'rocket') continue; // Schüsse treffen Raketen nicht
      if (projs[i].owner === projs[j].owner) continue; // Eigene Schüsse zerstören sich nicht
      const dx = projs[i].x - projs[j].x;
      const dy = projs[i].y - projs[j].y;
      if (dx * dx + dy * dy < 400) { // ~20px Kollisionsradius
        projToRemove.add(projs[i]);
        projToRemove.add(projs[j]);
        spawnExplosion((projs[i].x + projs[j].x) / 2, (projs[i].y + projs[j].y) / 2, '#ffaa00', 8);
        break;
      }
    }
  }
  
  gameState.projectiles = gameState.projectiles.filter((proj) => {
    if (projToRemove.has(proj)) return false;
    
    // Maximal einmal Arena durchqueren
    if ((proj.totalDist || 0) > maxDist) return false;

    // Kollision mit Hindernissen
    for (let i = 0; i < gameState.obstacles.length; i++) {
      const obs = gameState.obstacles[i];
      if (pointInRect(proj.x, proj.y, obs.x, obs.y, obs.w, obs.h)) {
        if (proj.type === 'rocket') playRocketExplosionSound();
        spawnExplosion(proj.x, proj.y, proj.color, 10);
        return false;
      }
    }
    
    if (proj.owner === 'enemy' && p) {
      const dx = proj.x - p.x;
      const dy = proj.y - p.y;
      if (dx * dx + dy * dy < 225) {
        if (proj.type === 'rocket') playRocketExplosionSound();
        if (Date.now() < (p.shieldUntil || 0)) {
          spawnExplosion(proj.x, proj.y, '#44aaff', 8);
          return false;
        }
        const dmg = Math.max(1, Math.floor(proj.damage - stats.armor / 2));
        p.hp -= dmg;
        spawnExplosion(proj.x, proj.y, '#ff4757', 12);
        updatePlayerHp(p.hp, p.maxHp);
        if (p.hp <= 0) {
          endFight(false);
        }
        return false;
      }
    }

    if (proj.owner === 'enemy' && enemies && proj.enemyIndex !== undefined) {
      for (let i = 0; i < enemies.length; i++) {
        if (i === proj.enemyIndex) continue;
        const e = enemies[i];
        if (e.hp <= 0) continue;
        const dx = proj.x - e.x;
        const dy = proj.y - e.y;
        if (dx * dx + dy * dy < 225) {
          if (proj.type === 'rocket') playRocketExplosionSound();
          if (Date.now() < (e.shieldUntil || 0)) {
            spawnExplosion(proj.x, proj.y, '#44aaff', 8);
            return false;
          }
          const dmg = Math.max(1, Math.floor(proj.damage - e.armor / 2));
          e.hp -= dmg;
          if (e.hp <= 0) triggerEnemyDeathExplosion(e);
          spawnExplosion(proj.x, proj.y, '#ff4757', 12);
          if (getAliveEnemiesCount() === 0) {
            endFight(true);
          }
          return false;
        }
      }
    }
    
    if (proj.owner === 'player' && enemies) {
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (e.hp <= 0) continue;
        const dx = proj.x - e.x;
        const dy = proj.y - e.y;
        if (dx * dx + dy * dy < 225) {
          if (proj.type === 'rocket') playRocketExplosionSound();
          if (Date.now() < (e.shieldUntil || 0)) {
            spawnExplosion(proj.x, proj.y, '#44aaff', 8);
            return false;
          }
          const dmgMult = gameState.playerRobotIndex === 1 ? 1.44 : 1.2; // Zweiter Mech: 20% mehr als erster
          const dmg = Math.max(1, Math.floor(proj.damage * dmgMult - e.armor / 2));
          e.hp -= dmg;
          if (e.hp <= 0) triggerEnemyDeathExplosion(e);
          const hitColor = gameState.playerRobotIndex === 1 ? '#ff4757' : '#00d4aa';
          spawnExplosion(proj.x, proj.y, hitColor, 12);
          if (getAliveEnemiesCount() === 0) {
            endFight(true);
          }
          return false;
        }
      }
    }
    
    return true;
  });
}

function render() {
  ctx.fillStyle = '#0a0e14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#1a2433';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= canvas.width; i += 80) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }
  for (let i = 0; i <= canvas.height; i += 80) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }
  ctx.stroke();
  
  // Countdown anzeigen
  if (gameState.countdown > 0) {
    const elapsed = Date.now() - gameState.countdownStartTime;
    if (elapsed >= 2990) {
      gameState.countdown = 0;
    } else {
      const remaining = Math.max(1, Math.ceil((3000 - elapsed) / 1000));
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00d4aa';
      ctx.font = 'bold 80px Orbitron';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(remaining.toString(), canvas.width / 2, canvas.height / 2);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px Rajdhani';
      ctx.fillText('Kampf beginnt...', canvas.width / 2, canvas.height / 2 + 60);
      return;
    }
  }
  
  // Gewinner-Text anzeigen
  if (gameState.fightEnded && gameState.winner) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const winnerColor = gameState.winner === 'player' ? (gameState.playerRobotIndex === 1 ? '#ff4757' : '#00d4aa') : '#ff4757';
    const winnerText = gameState.winner === 'player' ? 'SIEG!' : 'NIEDERLAGE';
    
    ctx.fillStyle = winnerColor;
    ctx.font = 'bold 72px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(winnerText, canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Rajdhani';
    ctx.fillText(gameState.winner === 'player' ? 'Du hast gewonnen!' : 'Du wurdest besiegt!', canvas.width / 2, canvas.height / 2 + 50);
    return;
  }
  
  // Hindernisse
  gameState.obstacles.forEach((obs) => {
    drawObstacle(obs);
  });

  // Meteor-Warnzonen
  const now = Date.now();
  gameState.meteorWarnings.forEach((zone) => {
    const t = Math.max(0, Math.min(1, (zone.impactAt - now) / METEOR_WARNING_MS));
    const progress = 1 - t;
    const pulse = 0.9 + Math.sin(now / 120) * 0.08;
    ctx.save();
    ctx.globalAlpha = 0.25 + (1 - t) * 0.25;
    ctx.fillStyle = '#ff4757';
    ctx.beginPath();
    ctx.arc(zone.x, zone.y, zone.radius * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = '#ff1f3a';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Meteor sichtbar im Anflug (realistischer Felskörper + Feuer/Rauchschweif)
    const mx = zone.startX + (zone.x - zone.startX) * progress;
    const my = zone.startY + (zone.y - zone.startY) * progress;
    const sx = zone.size || 12;
    const travelAngle = Math.atan2(zone.y - zone.startY, zone.x - zone.startX);
    const ang = (zone.rot || 0) + now * (zone.spin || 0.03);
    const tailLen = 26 + sx * 1.8 + (1 - t) * 16;

    ctx.setLineDash([]);
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = 'rgba(120, 120, 120, 0.45)';
    ctx.lineWidth = sx * 0.55;
    ctx.beginPath();
    ctx.moveTo(mx - Math.cos(travelAngle) * tailLen * 1.15, my - Math.sin(travelAngle) * tailLen * 1.15);
    ctx.lineTo(mx - Math.cos(travelAngle) * sx * 0.6, my - Math.sin(travelAngle) * sx * 0.6);
    ctx.stroke();

    const fireGrad = ctx.createLinearGradient(
      mx - Math.cos(travelAngle) * tailLen,
      my - Math.sin(travelAngle) * tailLen,
      mx,
      my
    );
    fireGrad.addColorStop(0, 'rgba(255, 70, 20, 0)');
    fireGrad.addColorStop(0.35, 'rgba(255, 110, 40, 0.45)');
    fireGrad.addColorStop(1, 'rgba(255, 220, 120, 0.95)');
    ctx.globalAlpha = 0.95;
    ctx.strokeStyle = fireGrad;
    ctx.lineWidth = sx * 0.7;
    ctx.beginPath();
    ctx.moveTo(mx - Math.cos(travelAngle) * tailLen, my - Math.sin(travelAngle) * tailLen);
    ctx.lineTo(mx - Math.cos(travelAngle) * sx * 0.2, my - Math.sin(travelAngle) * sx * 0.2);
    ctx.stroke();

    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(ang);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#6f6157';
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx * 0.45, sx * 0.78);
    ctx.lineTo(-sx * 0.35, sx * 0.92);
    ctx.lineTo(-sx * 0.95, sx * 0.2);
    ctx.lineTo(-sx * 0.82, -sx * 0.55);
    ctx.lineTo(-sx * 0.15, -sx * 0.95);
    ctx.lineTo(sx * 0.62, -sx * 0.62);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#8f7d6f';
    ctx.beginPath();
    ctx.arc(sx * 0.2, -sx * 0.15, sx * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4f443e';
    ctx.beginPath();
    ctx.arc(-sx * 0.25, sx * 0.18, sx * 0.2, 0, Math.PI * 2);
    ctx.arc(sx * 0.35, sx * 0.32, sx * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.restore();
  });

  drawShield();

  // Minen
  gameState.mines.forEach((mine) => {
    ctx.save();
    ctx.translate(mine.x, mine.y);
    const pulse = 0.85 + Math.sin(Date.now() / 200) * 0.15;
    ctx.fillStyle = mine.owner === 'player' ? 'rgba(0, 212, 170, 0.9)' : 'rgba(255, 71, 87, 0.9)';
    ctx.strokeStyle = mine.owner === 'player' ? '#00d4aa' : '#ff4757';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, MINE_RADIUS * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.arc(0, 0, MINE_RADIUS * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Projektile
  gameState.projectiles.forEach((proj) => {
    drawProjectile(proj);
  });
  
  gameState.enemies.forEach((e) => {
    if (e.hp > 0) {
      if (Date.now() < (e.shieldUntil || 0)) drawShieldRing(e.x, e.y, 20);
      drawMech(e.x, e.y, e.angle, '#ff4757', 14, false, e.spriteIndex || 0, e.thrust || 0);
      drawHpBar(e.x, e.y, e.hp, e.maxHp, '#ff4757', 14);
    }
  });
  
  // Spieler
  if (gameState.player) {
    if (Date.now() < (gameState.player.shieldUntil || 0)) drawShieldRing(gameState.player.x, gameState.player.y, 20);
    const isSecondMech = gameState.playerRobotIndex === 1;
    const playerColor = isSecondMech ? '#ff4757' : '#00d4aa';
    drawMech(gameState.player.x, gameState.player.y, gameState.player.angle, playerColor, 14, true, 0, gameState.player.thrust || 0);
    drawHpBar(gameState.player.x, gameState.player.y, gameState.player.hp, gameState.player.maxHp, playerColor, 14);
  }

  // Partikel / Explosionen
  drawParticles();
}

function gameLoop() {
  if (!state.fightInProgress) return;
  
  // Countdown aktualisieren (robust: auch bei niedriger FPS)
  if (gameState.countdown > 0) {
    const elapsed = Date.now() - gameState.countdownStartTime;
    if (elapsed >= 2990) {
      gameState.countdown = 0;
    }
  }
  
  updatePlayer();
  updateEnemies();
  
  if (gameState.player && !gameState.fightEnded && gameState.countdown === 0) {
    gameState.enemies.forEach((e) => {
      if (e.hp > 0 && checkCollision(gameState.player, e)) {
        resolveCollision(gameState.player, e);
      }
    });
    for (let i = 0; i < gameState.enemies.length; i++) {
      for (let j = i + 1; j < gameState.enemies.length; j++) {
        const a = gameState.enemies[i];
        const b = gameState.enemies[j];
        if (a.hp > 0 && b.hp > 0 && checkCollision(a, b)) {
          resolveCollision(a, b);
        }
      }
    }
  }
  
  updateMines();
  updateMeteorStorms();
  updateProjectiles();
  updateParticles();
  
  // HP-Anzeigen (gedrosselt: nur alle 80ms für bessere Performance)
  const now = Date.now();
  if (!gameState._lastHpUpdate || now - gameState._lastHpUpdate > 80 || gameState.fightEnded) {
    gameState._lastHpUpdate = now;
    if (gameState.player && !gameState.fightEnded) {
      updatePlayerHp(gameState.player.hp, gameState.player.maxHp);
    }
    if (gameState.enemies.length > 0 && !gameState.fightEnded) {
      const totalHp = gameState.enemies.reduce((s, e) => s + Math.max(0, e.hp), 0);
      const totalMax = gameState.enemies.reduce((s, e) => s + e.maxHp, 0);
      updateEnemyHp(totalHp, totalMax);
    }
    updateHud();
  }
  
  render();
  
  gameState.animationId = requestAnimationFrame(gameLoop);
}

function updatePlayerHp(current, max) {
  const el = document.getElementById('playerHpText');
  const bar = document.getElementById('playerHpBar');
  if (el) el.textContent = `${Math.max(0, Math.round(current))} / ${max}`;
  if (bar) bar.style.width = `${(current / max) * 100}%`;
}

function updateEnemyHp(current, max) {
  const el = document.getElementById('enemyHpText');
  const bar = document.getElementById('enemyHpBar');
  if (el) el.textContent = `${Math.max(0, Math.round(current))} / ${max}`;
  if (bar) bar.style.width = `${(current / max) * 100}%`;
}

function endFight(won) {
  gameState.fightEnded = true;
  gameState.winner = won ? 'player' : 'enemy';
  
  if (won) {
    const enemies = state.currentEnemies || [state.currentEnemy];
    const reward = state.storyMode ? enemies.reduce((s, e) => s + (e?.reward || 500), 0) : 3000;
    const scorePoints = enemies.reduce((s, e) => s + Math.round((e?.power || 0) + (e?.reward || 0) / 2), 0);
    state.money += reward;
    state.score += scorePoints;
    updateMoney();
    updateScoreDisplay();
  } else {
    state.lives--;
    updateLivesDisplay();
  }
  
  setTimeout(() => {
    exitFight();
    
    if (!won && state.lives <= 0) {
      showGameOver();
      return;
    }
    
    if (state.storyMode && won) {
      state.storyChapter++;
      if (state.storyChapter > 10) {
        showHappyEnd();
      } else {
        showStoryChapter(state.storyChapter - 1);
      }
      return;
    }
    
    const arenaStatusEl = document.getElementById('arenaStatus');
    if (won) {
      const reward = 3000;
      if (arenaStatusEl) {
        arenaStatusEl.innerHTML = `<p class="win">Sieg! Du erhältst <strong>${reward} Credits</strong>.</p>`;
      }
    } else {
      if (arenaStatusEl) {
        arenaStatusEl.innerHTML = `<p class="lose">Niederlage! Noch <strong>${state.lives}</strong> Leben übrig.</p>`;
      }
    }
  }, 3000);
}

function handleKeyDown(e) {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    gameState.keys[e.key] = true;
  }
  if (e.key === ' ') {
    e.preventDefault();
    gameState.keys[' '] = true;
  }
  if (e.key === 'x' || e.key === 'X') {
    e.preventDefault();
    gameState.keys['x'] = true;
  }
  if (e.key === 'y' || e.key === 'Y') {
    e.preventDefault();
    gameState.keys['y'] = true;
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    exitFight();
  }
}

function handleKeyUp(e) {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    gameState.keys[e.key] = false;
  }
  if (e.key === ' ') {
    gameState.keys[' '] = false;
  }
  if (e.key === 'x' || e.key === 'X') {
    gameState.keys['x'] = false;
  }
  if (e.key === 'y' || e.key === 'Y') {
    gameState.keys['y'] = false;
  }
}

function fight() {
  const is1v3 = state.arenaMode === '1v3';
  const isStory = state.storyMode;
  if (state.fightInProgress) return;
  if (!isStory && !is1v3 && !state.currentEnemy) return;
  if (isStory && !state.currentEnemies?.length) return;
  
  showFightOverlay();
  initCanvas();
  
  state.fightInProgress = true;
  gameState.fightEnded = false;
  gameState.winner = null;
  playCombatMusic();
  document.getElementById('btnFight').disabled = true;
  document.getElementById('btnNextOpponent').disabled = true;
  
  window.addEventListener('resize', resizeFightCanvas);
  canvas.focus();
  
  const playerStats = computeRobotStats();
  gameState.playerStats = playerStats;
  
  gameState.player = {
    x: canvas.width * 0.2,
    y: canvas.height * 0.5,
    angle: 0,
    hp: playerStats.hp,
    maxHp: playerStats.hp,
    vx: 0,
    vy: 0,
    shieldUntil: 0,
  };
  gameState.playerRobotIndex = state.activeRobotIndex;
  
  const opponents = isStory ? state.currentEnemies : (is1v3 ? generateOpponents().slice(0, 3) : [state.currentEnemy]);
  state.currentEnemies = opponents;
  
  const posCount = opponents.length;
  const positions = posCount >= 3
    ? [{ x: 0.75, y: 0.25 }, { x: 0.85, y: 0.5 }, { x: 0.75, y: 0.75 }]
    : posCount === 2
      ? [{ x: 0.78, y: 0.35 }, { x: 0.78, y: 0.65 }]
      : [{ x: 0.8, y: 0.5 }];
  
  gameState.enemies = opponents.map((opp, i) => ({
    x: canvas.width * positions[i].x,
    y: canvas.height * positions[i].y,
    angle: Math.PI,
    hp: opp.hp,
    maxHp: opp.hp,
    armor: opp.armor,
    damage: opp.damage,
    speed: opp.speed,
    reward: opp.reward ?? 500,
    name: opp.name,
    weaponId: opp.weaponId || 'weapon_cannon',
    vx: 0,
    vy: 0,
    spriteIndex: Math.floor(Math.random() * 3),
    lastShot: 0,
    shieldUntil: 0,
    retreatUntil: 0,
    strategy: opp.strategy || ['aggressive', 'defensive', 'evasive', 'flanker'][Math.floor(Math.random() * 4)],
    shotCooldown: opp.shotCooldown ?? (380 + Math.floor(Math.random() * 220)),
    mines: 10,
    rockets: 10,
    lastMinePlace: 0,
    lastRocketFire: 0,
  }));
  
  gameState.projectiles = [];
  gameState.mines = [];
  gameState.meteorWarnings = [];
  gameState.particles = [];
  gameState.keys = {};
  gameState.lastShot = 0;
  gameState.lastMinePlace = 0;
  gameState.lastRocketFire = 0;
  gameState.lastWeaponFired = 'R'; // Nächster Schuss von links
  gameState.enemyLastShot = 0;
  gameState.nextMeteorStormAt = Date.now() + 5000;

  // Zufällige Hindernisse für diesen Kampf
  const theme = state.storyMode && STORY_CHAPTERS[state.storyChapter - 1]?.obstacleTheme;
  generateObstacles(theme);
  
  // Schild in der Mitte (berühren = 10s Schutz)
  gameState.shield = { x: canvas.width / 2, y: canvas.height / 2, radius: 28, active: true };
  
  // Countdown starten
  gameState.countdown = 3;
  gameState.countdownStartTime = Date.now();
  
  updatePlayerHp(gameState.player.hp, gameState.player.maxHp);
  const totalHp = gameState.enemies.reduce((s, e) => s + e.hp, 0);
  const totalMax = gameState.enemies.reduce((s, e) => s + e.maxHp, 0);
  updateEnemyHp(totalHp, totalMax);
  
  // Tastatur-Events
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  
  // Game Loop starten
  gameLoop();
}

function initArena() {
  const btnFightEl = document.getElementById('btnFight');
  const btnNextOpponentEl = document.getElementById('btnNextOpponent');
  
  if (!btnFightEl) {
    console.error('btnFight element not found!');
    return;
  }
  
  if (!btnNextOpponentEl) {
    console.error('btnNextOpponent element not found!');
    return;
  }
  
  // Entferne alte Event-Listener falls vorhanden
  const newFightBtn = btnFightEl.cloneNode(true);
  btnFightEl.parentNode.replaceChild(newFightBtn, btnFightEl);
  
  const newNextBtn = btnNextOpponentEl.cloneNode(true);
  btnNextOpponentEl.parentNode.replaceChild(newNextBtn, btnNextOpponentEl);
  
  // Neue Event-Listener hinzufügen
  newFightBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Fight button clicked');
    fight();
  });
  
  newNextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Next opponent button clicked');
    state.currentEnemy = null;
    renderArena();
  });
  
  console.log('Arena buttons initialized');
}

// —— Highscore-System
function getHighScores() {
  try {
    return JSON.parse(localStorage.getItem('mechArenaHighScores')) || [];
  } catch { return []; }
}

function saveHighScore(name, score) {
  const scores = getHighScores();
  scores.push({ name, score, date: Date.now() });
  scores.sort((a, b) => b.score - a.score);
  const top10 = scores.slice(0, 10);
  localStorage.setItem('mechArenaHighScores', JSON.stringify(top10));
  return top10;
}

function renderHighScoreList(currentScore) {
  const list = document.getElementById('highscoreList');
  if (!list) return;
  const scores = getHighScores();
  list.innerHTML = '';
  if (scores.length === 0) {
    list.innerHTML = '<li style="justify-content:center;color:var(--text-dim)">Noch keine Einträge</li>';
    return;
  }
  scores.forEach((entry, i) => {
    const li = document.createElement('li');
    if (entry.score === currentScore) li.className = 'hs-current';
    li.innerHTML = `<span class="hs-rank">#${i + 1}</span><span class="hs-name">${entry.name}</span><span class="hs-score">${entry.score}</span>`;
    list.appendChild(li);
  });
}

function showGameOver() {
  const screen = document.getElementById('gameOverScreen');
  const app = document.getElementById('app');
  const finalScore = document.getElementById('finalScore');
  const nameInput = document.getElementById('playerNameInput');
  const saveBtn = document.getElementById('saveScoreBtn');

  if (finalScore) finalScore.textContent = state.score;
  if (screen) screen.classList.remove('hidden');
  if (app) app.classList.add('hidden');

  renderHighScoreList(state.score);

  if (saveBtn) saveBtn.disabled = false;
  if (nameInput) {
    nameInput.value = '';
    nameInput.focus();
  }

  const handleSave = () => {
    const name = (nameInput?.value || '').trim() || 'Anonym';
    saveHighScore(name, state.score);
    renderHighScoreList(state.score);
    saveBtn.disabled = true;
    nameInput.disabled = true;
  };

  saveBtn?.replaceWith(saveBtn.cloneNode(true));
  const newSaveBtn = document.getElementById('saveScoreBtn');
  newSaveBtn?.addEventListener('click', handleSave);

  nameInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !newSaveBtn.disabled) handleSave();
  });
}

function resetGame() {
  state.money = INITIAL_STATE.money;
  state.ownedPartIds = [...INITIAL_STATE.ownedPartIds];
  state.weaponShots = { ...INITIAL_STATE.weaponShots };
  state.robots = INITIAL_STATE.robots.map((r) => ({ name: r.name, equipped: Object.assign({}, r.equipped) }));
  state.activeRobotIndex = 0;
  state.currentEnemy = null;
  state.currentEnemies = null;
  state.fightInProgress = false;
  state.lives = INITIAL_STATE.lives;
  state.score = INITIAL_STATE.score;
  state.storyMode = false;
  state.storyChapter = 1;
  state.playerMines = INITIAL_STATE.playerMines;
  state.playerRockets = INITIAL_STATE.playerRockets;

  const gameOverScreen = document.getElementById('gameOverScreen');
  const storyScreen = document.getElementById('storyChapterScreen');
  const happyScreen = document.getElementById('happyEndScreen');
  const app = document.getElementById('app');
  if (gameOverScreen) gameOverScreen.classList.add('hidden');
  if (storyScreen) storyScreen.classList.add('hidden');
  if (happyScreen) happyScreen.classList.add('hidden');
  if (app) app.classList.remove('hidden');

  updateMoney();
  updateLivesDisplay();
  updateScoreDisplay();
  renderGarage();
  renderArena();
  renderShop();

  // Zur Garage navigieren
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const garageBtn = document.querySelector('.nav-btn[data-screen="garage"]');
  const garageScreen = document.getElementById('garage');
  if (garageBtn) garageBtn.classList.add('active');
  if (garageScreen) garageScreen.classList.add('active');
}

function initGameOver() {
  const restartBtn = document.getElementById('restartBtn');
  if (!restartBtn) return;
  restartBtn.addEventListener('click', () => {
    resetGame();
  });
}

// —— Start Screen → Intro (mit Musik + Scroll) → ZUR ARENA / STORY
function initStartScreen() {
  const startScreen = document.getElementById('startScreen');
  const startBtn = document.getElementById('startBtn');
  const introScreen = document.getElementById('introScreen');
  if (!startScreen || !startBtn) return;

  startBtn.addEventListener('click', () => {
    startMusic();
    startScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
    introSpeechTimeout = setTimeout(playIntroSpeech, 2000);
  });
}

function showStoryChapter(chapterIndex) {
  const screen = document.getElementById('storyChapterScreen');
  const app = document.getElementById('app');
  if (!screen) return;
  const chapter = STORY_CHAPTERS[chapterIndex];
  if (!chapter) return;
  document.getElementById('storyChapterTitle').textContent = `Kapitel ${chapterIndex + 1}`;
  document.getElementById('storyChapterText').textContent = chapter.text;
  if (app) app.classList.add('hidden');
  screen.classList.remove('hidden');
  state.currentEnemies = [...chapter.opponents];
  const btn = document.getElementById('btnStoryPrepare');
  if (btn) {
    btn.replaceWith(btn.cloneNode(true));
    document.getElementById('btnStoryPrepare').addEventListener('click', startStoryChapter);
  }
}

function startStoryChapter() {
  const screen = document.getElementById('storyChapterScreen');
  const app = document.getElementById('app');
  if (screen) screen.classList.add('hidden');
  if (app) app.classList.remove('hidden');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  const garageBtn = document.querySelector('.nav-btn[data-screen="garage"]');
  const garageScreen = document.getElementById('garage');
  if (garageBtn) garageBtn.classList.add('active');
  if (garageScreen) garageScreen.classList.add('active');
  renderGarage();
  renderArena();
}

function showHappyEnd() {
  const screen = document.getElementById('happyEndScreen');
  const app = document.getElementById('app');
  const scoreEl = document.getElementById('happyEndScore');
  const nameInput = document.getElementById('happyEndNameInput');
  const saveBtn = document.getElementById('happyEndSaveBtn');
  const listEl = document.getElementById('happyEndScoreList');
  if (scoreEl) scoreEl.textContent = state.score;
  if (screen) screen.classList.remove('hidden');
  if (app) app.classList.add('hidden');
  if (listEl) {
    const scores = getHighScores();
    listEl.innerHTML = '';
    scores.forEach((entry, i) => {
      const li = document.createElement('li');
      if (entry.score === state.score) li.className = 'hs-current';
      li.innerHTML = `<span class="hs-rank">#${i + 1}</span><span class="hs-name">${entry.name}</span><span class="hs-score">${entry.score}</span>`;
      listEl.appendChild(li);
    });
    if (scores.length === 0) listEl.innerHTML = '<li style="justify-content:center;color:var(--text-dim)">Noch keine Einträge</li>';
  }
  if (nameInput) nameInput.value = '';
  if (saveBtn) saveBtn.disabled = false;
  const handleSave = () => {
    const name = (nameInput?.value || '').trim() || 'Anonym';
    saveHighScore(name, state.score);
    if (listEl) {
      const scores = getHighScores();
      listEl.innerHTML = '';
      scores.forEach((entry, i) => {
        const li = document.createElement('li');
        if (entry.score === state.score) li.className = 'hs-current';
        li.innerHTML = `<span class="hs-rank">#${i + 1}</span><span class="hs-name">${entry.name}</span><span class="hs-score">${entry.score}</span>`;
        listEl.appendChild(li);
      });
    }
    saveBtn.disabled = true;
    nameInput.disabled = true;
  };
  saveBtn?.replaceWith(saveBtn.cloneNode(true));
  document.getElementById('happyEndSaveBtn')?.addEventListener('click', handleSave);
  nameInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSave();
  });
  document.getElementById('happyEndRestartBtn')?.replaceWith(document.getElementById('happyEndRestartBtn').cloneNode(true));
  document.getElementById('happyEndRestartBtn')?.addEventListener('click', () => {
    resetGame();
    const happyScreen = document.getElementById('happyEndScreen');
    const startScreen = document.getElementById('startScreen');
    if (happyScreen) happyScreen.classList.add('hidden');
    if (startScreen) startScreen.classList.remove('hidden');
    if (app) app.classList.add('hidden');
  });
}

const introSpeech = new Audio('introspeech.wav');
introSpeech.volume = 0.9;
let introSpeechTimeout = null;

function playIntroSpeech() {
  introSpeechTimeout = null;
  if (currentMusic) currentMusic.volume = 0.1;
  introSpeech.currentTime = 0;
  introSpeech.play().catch(() => {});
  introSpeech.onended = () => { if (currentMusic) currentMusic.volume = 0.3; };
}

function stopIntroSpeech() {
  if (introSpeechTimeout) {
    clearTimeout(introSpeechTimeout);
    introSpeechTimeout = null;
  }
  introSpeech.pause();
  introSpeech.currentTime = 0;
  if (currentMusic) currentMusic.volume = 0.3;
}

function initIntro() {
  const introScreen = document.getElementById('introScreen');
  const btnZurArena = document.getElementById('btnZurArena');
  const btnStory = document.getElementById('btnStory');
  const app = document.getElementById('app');
  if (!introScreen) return;

  if (btnZurArena) {
    btnZurArena.addEventListener('click', () => {
      stopIntroSpeech();
      introScreen.classList.add('hidden');
      app.classList.remove('hidden');
      initGame();
    });
  }

  if (btnStory) {
    btnStory.addEventListener('click', () => {
      stopIntroSpeech();
      state.storyMode = true;
      state.storyChapter = 1;
      state.currentEnemies = STORY_CHAPTERS[0] ? [...STORY_CHAPTERS[0].opponents] : [];
      introScreen.classList.add('hidden');
      app.classList.remove('hidden');
      initGame();
      showStoryChapter(0);
    });
  }
}

function initGame() {
  try {
    if (typeof initPartSprites === 'function') {
      initPartSprites();
    }
    initCanvas();
    updateMoney();
    updateLivesDisplay();
    updateScoreDisplay();
    renderGarage();
    renderArena();
    renderShop();
    initNavigation();
    initArena();
    initGameOver();
    console.log('Game initialized successfully');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

// —— Start
function init() {
  initStartScreen();
  initIntro();
}

// Warte bis DOM vollständig geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM ist bereits geladen
  init();
}
