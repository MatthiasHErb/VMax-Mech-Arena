/**
 * Mech Arena – Kampfroboter bauen, kämpfen, verbessern
 */

// —— Teile-Katalog (Slot: chassis | weapon | armor)
const PARTS_CATALOG = [
  { id: 'chassis_scout', name: 'Scout-Chassis', slot: 'chassis', hp: 80, armor: 20, damage: 0, speed: 14, price: 0 },
  { id: 'chassis_tank', name: 'Panzer-Chassis', slot: 'chassis', hp: 140, armor: 60, damage: 0, speed: 6, price: 800 },
  { id: 'chassis_balanced', name: 'Balanced-Chassis', slot: 'chassis', hp: 110, armor: 40, damage: 0, speed: 10, price: 500 },
  { id: 'weapon_cannon', name: 'Leichte Kanone', slot: 'weapon', hp: 0, armor: 0, damage: 28, speed: 0, price: 0 },
  { id: 'weapon_plasma', name: 'Plasma-Werfer', slot: 'weapon', hp: 0, armor: 0, damage: 42, speed: 0, price: 600 },
  { id: 'weapon_railgun', name: 'Railgun', slot: 'weapon', hp: 0, armor: 0, damage: 55, speed: -1, price: 1200 },
  { id: 'weapon_minigun', name: 'Minigun', slot: 'weapon', hp: 0, armor: 0, damage: 38, speed: 1, price: 400 },
  { id: 'armor_light', name: 'Leichtpanzerung', slot: 'armor', hp: 0, armor: 25, damage: 0, speed: 2, price: 0 },
  { id: 'armor_heavy', name: 'Schwerpanzerung', slot: 'armor', hp: 20, armor: 55, damage: 0, speed: -3, price: 700 },
  { id: 'armor_reactive', name: 'Reaktivpanzerung', slot: 'armor', hp: 10, armor: 45, damage: 0, speed: 0, price: 500 },
];

// —— Spieler-Stand
const state = {
  money: 500,
  ownedPartIds: ['chassis_scout', 'weapon_cannon', 'armor_light'],
  equipped: {
    chassis: 'chassis_scout',
    weaponL: 'weapon_cannon',
    weaponR: 'weapon_cannon',
    armor: 'armor_light',
  },
  currentEnemy: null,
  fightInProgress: false,
};

// —— Hilfsfunktionen
function getPart(id) {
  return PARTS_CATALOG.find((p) => p.id === id) || null;
}

function getEquippedParts() {
  return {
    chassis: getPart(state.equipped.chassis),
    weaponL: getPart(state.equipped.weaponL),
    weaponR: getPart(state.equipped.weaponR),
    armor: getPart(state.equipped.armor),
  };
}

function computeRobotStats() {
  const parts = getEquippedParts();
  const sum = (key) =>
    [parts.chassis, parts.weaponL, parts.weaponR, parts.armor]
      .filter(Boolean)
      .reduce((acc, p) => acc + (p[key] || 0), 0);

  return {
    hp: Math.max(50, sum('hp')),
    armor: Math.max(0, sum('armor')),
    damage: Math.max(5, sum('damage')),
    speed: Math.max(1, sum('speed')),
  };
}

function getPowerLevel(stats) {
  return stats.hp + stats.armor * 2 + stats.damage * 3 + stats.speed * 4;
}

// —— UI: Geld
function updateMoney() {
  const el = document.getElementById('money');
  if (el) el.textContent = state.money;
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
  const maxHp = 200;
  const maxArmor = 100;
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
    parts.weaponL?.name,
    parts.weaponR?.name,
    parts.armor?.name,
  ].filter(Boolean);
  const equippedEl = document.getElementById('equippedParts');

  // Ausrüstungs-Dropdowns pro Slot
  const slots = [
    { key: 'chassis', label: 'Chassis', partIds: state.ownedPartIds.filter((id) => getPart(id)?.slot === 'chassis') },
    { key: 'weaponL', label: 'Waffe links', partIds: state.ownedPartIds.filter((id) => getPart(id)?.slot === 'weapon') },
    { key: 'weaponR', label: 'Waffe rechts', partIds: state.ownedPartIds.filter((id) => getPart(id)?.slot === 'weapon') },
    { key: 'armor', label: 'Rüstung', partIds: state.ownedPartIds.filter((id) => getPart(id)?.slot === 'armor') },
  ];
  let selectHtml = '';
  slots.forEach(({ key, label, partIds }) => {
    const current = state.equipped[key];
    selectHtml += `<div class="equip-select"><label>${label}: </label><select data-slot="${key}">`;
    partIds.forEach((id) => {
      const p = getPart(id);
      if (!p) return;
      const sel = current === id ? ' selected' : '';
      selectHtml += `<option value="${id}"${sel}>${p.name}</option>`;
    });
    selectHtml += '</select></div>';
  });

  equippedEl.innerHTML = '<p><strong>Ausgerüstet:</strong></p>' + names.map((n) => `<p>• ${n}</p>`).join('') + '<div class="equip-selects" id="equipSelects">' + selectHtml + '</div>';

  document.getElementById('equipSelects')?.querySelectorAll('select').forEach((sel) => {
    sel.addEventListener('change', (e) => {
      state.equipped[e.target.dataset.slot] = e.target.value;
      renderGarage();
    });
  });
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

  const ownedList = document.getElementById('ownedList');
  if (ownedList) {
    ownedList.innerHTML = '';
    state.ownedPartIds.forEach((id) => {
      const p = getPart(id);
      if (!p) return;
      const isEquipped =
        state.equipped.chassis === id ||
        state.equipped.weaponL === id ||
        state.equipped.weaponR === id ||
        state.equipped.armor === id;
      const tag = document.createElement('span');
      tag.className = 'owned-tag' + (isEquipped ? ' equipped' : '');
      tag.textContent = p.name + (isEquipped ? ' (ausgerüstet)' : '');
      ownedList.appendChild(tag);
    });
  }
}

// —— ARENA: Gegner generieren (etwas stärker)
function generateOpponents() {
  const myStats = computeRobotStats();
  const myPower = getPowerLevel(myStats);
  const names = ['Scrap-King', 'Rost-Ritter', 'Blitz-Bot', 'Stahl-Wolf', 'Titan-X', 'Vulkan', 'Nova', 'Shadow-Mech', 'Iron-Fist', 'Pulsar'];
  const list = [];
  for (let i = 0; i < 5; i++) {
    // Etwas stärker: Gegner haben jetzt 85-95% der Spieler-Power
    const powerVariation = (i - 2) * 12 + Math.floor(Math.random() * 20);
    const power = Math.max(40, myPower * 0.85 + powerVariation); // 85% der Spieler-Power
    const hp = 50 + (power * 0.3) + Math.floor(Math.random() * 30); // Mehr HP
    const armor = 15 + (power * 0.12) + Math.floor(Math.random() * 20); // Mehr Rüstung
    const damage = 15 + (power * 0.15) + Math.floor(Math.random() * 15); // Mehr Schaden
    const speed = 4 + Math.floor(Math.random() * 6); // Etwas schneller
    const reward = 70 + power + Math.floor(Math.random() * 50);
    list.push({
      name: names[Math.floor(Math.random() * names.length)] + ' #' + (i + 1),
      hp: Math.round(hp),
      armor: Math.round(armor),
      damage: Math.round(damage),
      speed,
      reward,
      power: Math.round(getPowerLevel({ hp, armor, damage, speed })),
    });
  }
  return list;
}

function renderArena() {
  try {
    const opponents = generateOpponents();
    const listEl = document.getElementById('opponentList');
    if (!listEl) {
      console.error('opponentList element not found!');
      return;
    }
    listEl.innerHTML = '';

    console.log(`Rendering ${opponents.length} opponents`);

    opponents.forEach((opp, index) => {
      const btn = document.createElement('button');
      btn.className = 'opponent-btn';
      btn.innerHTML = `${opp.name} <span class="power">(Power: ${opp.power})</span>`;
      
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

    const stats = computeRobotStats();
    const playerNameEl = document.getElementById('playerName');
    const playerHpTextEl = document.getElementById('playerHpText');
    const playerHpBarEl = document.getElementById('playerHpBar');
    if (playerNameEl) playerNameEl.textContent = 'Dein Mech';
    if (playerHpTextEl) playerHpTextEl.textContent = `${stats.hp} / ${stats.hp}`;
    if (playerHpBarEl) playerHpBarEl.style.width = '100%';

    // Wenn kein Gegner ausgewählt ist, Button deaktivieren
    if (!state.currentEnemy) {
      const enemyNameEl = document.getElementById('enemyName');
      const arenaStatusEl = document.getElementById('arenaStatus');
      const btnFightEl = document.getElementById('btnFight');
      if (enemyNameEl) enemyNameEl.textContent = 'Gegner wählen';
      if (arenaStatusEl) arenaStatusEl.innerHTML = '<p>Wähle einen Gegner aus der Liste.</p>';
      if (btnFightEl) {
        btnFightEl.disabled = true;
        console.log('Fight button disabled (no enemy selected)');
      }
    } else {
      // Wenn bereits ein Gegner ausgewählt ist, Button aktivieren
      const btnFightEl = document.getElementById('btnFight');
      if (btnFightEl) {
        btnFightEl.disabled = false;
        console.log('Fight button enabled (enemy already selected)');
      }
    }
  } catch (error) {
    console.error('Error in renderArena:', error);
    alert('Fehler beim Laden der Arena: ' + error.message);
  }
}

// —— ECHTZEIT-KAMPF-SYSTEM
let canvas, ctx;
let robotImage = null; // rebel2-Bild für Arena

let gameState = {
  player: null,
  enemy: null,
  projectiles: [],
  obstacles: [],
  keys: {},
  animationId: null,
  lastShot: 0,
  enemyLastShot: 0,
  countdown: 0,
  countdownStartTime: 0,
  fightEnded: false,
  winner: null,
};

function loadRobotImage() {
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  let tried = 0;
  function tryLoad() {
    if (tried >= extensions.length) return;
    const ext = extensions[tried++];
    const img = new Image();
    img.onload = function() {
      robotImage = img;
      console.log('Roboter-Bild rebel2.' + ext + ' geladen');
      const garageImg = document.getElementById('mechPreviewImage');
      if (garageImg) garageImg.src = 'rebel2.' + ext;
    };
    img.onerror = function() {
      tryLoad();
    };
    img.src = 'rebel2.' + ext;
  }
  tryLoad();
}

function initGarageRobotImage() {
  const garageImg = document.getElementById('mechPreviewImage');
  if (!garageImg) return;
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  let tried = 0;
  function tryNext() {
    if (tried >= extensions.length) return;
    const ext = extensions[tried++];
    const testImg = new Image();
    testImg.onload = function() {
      garageImg.src = 'rebel2.' + ext;
    };
    testImg.onerror = tryNext;
    testImg.src = 'rebel2.' + ext;
  }
  tryNext();
}

function initCanvas() {
  canvas = document.getElementById('fightCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resizeFightCanvas();
  if (!robotImage) loadRobotImage();
}

function resizeFightCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
  const e = gameState.enemy;
  if (p) {
    const bar = document.getElementById('hudPlayerHp');
    const text = document.getElementById('hudPlayerHpText');
    if (bar) bar.style.width = `${(Math.max(0, p.hp) / p.maxHp) * 100}%`;
    if (text) text.textContent = `${Math.max(0, Math.round(p.hp))} / ${p.maxHp}`;
  }
  if (e) {
    const bar = document.getElementById('hudEnemyHp');
    const text = document.getElementById('hudEnemyHpText');
    const label = document.getElementById('hudEnemyLabel');
    if (bar) bar.style.width = `${(Math.max(0, e.hp) / e.maxHp) * 100}%`;
    if (text) text.textContent = `${Math.max(0, Math.round(e.hp))} / ${e.maxHp}`;
    if (label && state.currentEnemy) label.textContent = state.currentEnemy.name;
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
  hideFightOverlay();
  document.getElementById('btnNextOpponent').disabled = false;
  document.getElementById('btnFight').disabled = false;
  document.getElementById('controlsHint').classList.add('hidden');
}

function drawMech(x, y, angle, color, size = 20) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  if (robotImage && robotImage.complete && robotImage.naturalWidth > 0) {
    const w = size * 2.4;
    const h = size * 2.2;
    ctx.drawImage(robotImage, -w / 2, -h / 2, w, h);
  } else {
    // Fallback: geometrische Form
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
  }

  ctx.restore();
}

function drawProjectile(proj) {
  const x = proj.x;
  const y = proj.y;
  const color = proj.color;
  
  // Winkel basierend auf Geschwindigkeit berechnen
  const angle = Math.atan2(proj.vy, proj.vx);
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  
  // Raketenkörper (längliches Rechteck)
  ctx.fillStyle = color;
  ctx.fillRect(-8, -2, 12, 4);
  
  // Raketenspitze (Dreieck)
  ctx.beginPath();
  ctx.moveTo(4, 0);
  ctx.lineTo(-2, -3);
  ctx.lineTo(-2, 3);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  
  // Raketenflamme (kleinerer Bereich hinten)
  ctx.fillStyle = proj.owner === 'player' ? '#00ff88' : '#ff6b6b';
  ctx.fillRect(-10, -1.5, 4, 3);
  
  // Glühender Kern
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-9, -1, 2, 2);
  
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
  // Während Countdown keine Steuerung
  if (gameState.countdown > 0 || gameState.fightEnded) return;
  
  const p = gameState.player;
  const stats = computeRobotStats();
  const maxSpeed = stats.speed * 0.3; // Langsamere Geschwindigkeit
  const acceleration = 0.12; // Beschleunigung
  const friction = 0.92; // Reibung (Verzögerung)
  const rotSpeed = 0.045; // Rotation pro Frame
  
  // Rotation
  if (gameState.keys['ArrowLeft']) p.angle -= rotSpeed;
  if (gameState.keys['ArrowRight']) p.angle += rotSpeed;
  
  // Geschwindigkeit initialisieren falls nicht vorhanden
  if (p.vx === undefined) p.vx = 0;
  if (p.vy === undefined) p.vy = 0;
  
  // Beschleunigung basierend auf Eingabe
  let targetVx = 0;
  let targetVy = 0;
  
  if (gameState.keys['ArrowUp']) {
    targetVx = Math.cos(p.angle) * maxSpeed;
    targetVy = Math.sin(p.angle) * maxSpeed;
  }
  if (gameState.keys['ArrowDown']) {
    targetVx = -Math.cos(p.angle) * maxSpeed * 0.7;
    targetVy = -Math.sin(p.angle) * maxSpeed * 0.7;
  }
  
  // Trägheit: Geschwindigkeit langsam zur Zielgeschwindigkeit
  p.vx += (targetVx - p.vx) * acceleration;
  p.vy += (targetVy - p.vy) * acceleration;
  
  // Reibung (Verzögerung wenn keine Eingabe)
  if (!gameState.keys['ArrowUp'] && !gameState.keys['ArrowDown']) {
    p.vx *= friction;
    p.vy *= friction;
  }
  
  const prevX = p.x;
  const prevY = p.y;
  p.x += p.vx;
  p.y += p.vy;
  
  // Wrap-Around: auf der anderen Seite wieder auftauchen
  if (p.x < 0) p.x += canvas.width;
  if (p.x > canvas.width) p.x -= canvas.width;
  if (p.y < 0) p.y += canvas.height;
  if (p.y > canvas.height) p.y -= canvas.height;

  // Hindernisse: Roboter aufhalten (nicht herausstoßen)
  for (let i = 0; i < gameState.obstacles.length; i++) {
    const obs = gameState.obstacles[i];
    if (circleRectCollision(p.x, p.y, 14, obs.x, obs.y, obs.w, obs.h)) {
      stopRobotAtObstacle(p, prevX, prevY, 14);
      break;
    }
  }

  // Schießen
  const now = Date.now();
  if (gameState.keys[' '] && now - gameState.lastShot > 200) { // Cooldown 200ms
    gameState.lastShot = now;
    const projSpeed = 4.5;
    gameState.projectiles.push({
      x: p.x + Math.cos(p.angle) * 18,
      y: p.y + Math.sin(p.angle) * 18,
      vx: Math.cos(p.angle) * projSpeed,
      vy: Math.sin(p.angle) * projSpeed,
      damage: stats.damage,
      owner: 'player',
      color: '#00d4aa',
    });
  }
}

function updateEnemy() {
  // Während Countdown keine KI-Bewegung
  if (gameState.countdown > 0 || gameState.fightEnded) return;
  
  const e = gameState.enemy;
  const p = gameState.player;
  if (!e || !p) return;
  
  const maxSpeed = e.speed * 0.2; // Langsamere Geschwindigkeit
  const acceleration = 0.10; // Beschleunigung
  const friction = 0.92; // Reibung
  
  // KI: Wrap-Around-Distanz zum Spieler (kürzester Weg)
  let dx = p.x - e.x;
  let dy = p.y - e.y;
  if (Math.abs(dx) > canvas.width / 2) dx -= Math.sign(dx) * canvas.width;
  if (Math.abs(dy) > canvas.height / 2) dy -= Math.sign(dy) * canvas.height;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Geschwindigkeit initialisieren falls nicht vorhanden
  if (e.vx === undefined) e.vx = 0;
  if (e.vy === undefined) e.vy = 0;
  
  let targetVx = 0;
  let targetVy = 0;
  
  if (dist > 0) {
    const targetAngle = Math.atan2(dy, dx);
    let angleDiff = targetAngle - e.angle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    e.angle += angleDiff * 0.03;
    
    // Hindernisvermeidung: Prüfe ob Hindernis im Weg liegt
    let avoidX = 0;
    let avoidY = 0;
    const lookAhead = 50; // Vorausschau-Distanz
    const futureX = e.x + Math.cos(e.angle) * lookAhead;
    const futureY = e.y + Math.sin(e.angle) * lookAhead;
    
    for (let i = 0; i < gameState.obstacles.length; i++) {
      const obs = gameState.obstacles[i];
      const odx = e.x - obs.x;
      const ody = e.y - obs.y;
      const oDist = Math.sqrt(odx * odx + ody * ody);
      
      // Hindernis in der Nähe? Ausweichen!
      if (oDist < 80 || circleRectCollision(futureX, futureY, 14, obs.x, obs.y, obs.w, obs.h)) {
        const avoidStrength = Math.max(0, 1 - oDist / 100);
        avoidX += (odx / oDist) * avoidStrength * maxSpeed * 1.5;
        avoidY += (ody / oDist) * avoidStrength * maxSpeed * 1.5;
      }
    }
    
    // Bewegung zum Spieler + Hindernisvermeidung
    if (dist > 80) {
      targetVx = Math.cos(e.angle) * maxSpeed + avoidX;
      targetVy = Math.sin(e.angle) * maxSpeed + avoidY;
    } else {
      targetVx = Math.cos(e.angle) * maxSpeed * 0.4 + avoidX;
      targetVy = Math.sin(e.angle) * maxSpeed * 0.4 + avoidY;
    }
  }
  
  // Trägheit: Geschwindigkeit langsam zur Zielgeschwindigkeit
  e.vx += (targetVx - e.vx) * acceleration;
  e.vy += (targetVy - e.vy) * acceleration;
  
  // Reibung
  if (dist <= 80) {
    e.vx *= friction;
    e.vy *= friction;
  }
  
  const prevX = e.x;
  const prevY = e.y;
  e.x += e.vx;
  e.y += e.vy;
  
  // Wrap-Around: auf der anderen Seite wieder auftauchen
  if (e.x < 0) e.x += canvas.width;
  if (e.x > canvas.width) e.x -= canvas.width;
  if (e.y < 0) e.y += canvas.height;
  if (e.y > canvas.height) e.y -= canvas.height;

  // Hindernisse: Roboter aufhalten (nicht herausstoßen)
  for (let i = 0; i < gameState.obstacles.length; i++) {
    const obs = gameState.obstacles[i];
    if (circleRectCollision(e.x, e.y, 14, obs.x, obs.y, obs.w, obs.h)) {
      stopRobotAtObstacle(e, prevX, prevY, 14);
      break;
    }
  }

  // Gelegentlich schießen (einfach: alle 1.5 Sekunden)
  const now = Date.now();
  if (now - gameState.enemyLastShot > 1500) {
    gameState.enemyLastShot = now;
    const projSpeed = 3.5;
    gameState.projectiles.push({
      x: e.x + Math.cos(e.angle) * 18,
      y: e.y + Math.sin(e.angle) * 18,
      vx: Math.cos(e.angle) * projSpeed,
      vy: Math.sin(e.angle) * projSpeed,
      damage: e.damage,
      owner: 'enemy',
      color: '#ff4757',
    });
  }
}

// —— Hindernisse: zufällig pro Kampf
function generateObstacles() {
  const obstacles = [];
  const count = 5 + Math.floor(Math.random() * 5); // 5–9 Hindernisse
  const playerStartX = canvas.width * 0.2;
  const playerStartY = canvas.height * 0.5;
  const enemyStartX = canvas.width * 0.8;
  const enemyStartY = canvas.height * 0.5;
  const margin = 70; // Mindestabstand zu Startpositionen

  for (let i = 0; i < count; i++) {
    let x, y, w, h;
    let tries = 0;
    do {
      w = 30 + Math.floor(Math.random() * 35); // 30–65 px breit
      h = 25 + Math.floor(Math.random() * 40); // 25–65 px hoch
      x = margin + w + Math.random() * (canvas.width - 2 * margin - 2 * w);
      y = margin + h + Math.random() * (canvas.height - 2 * margin - 2 * h);
      tries++;
    } while (
      tries < 50 &&
      (Math.hypot(x - playerStartX, y - playerStartY) < margin + Math.max(w, h) ||
       Math.hypot(x - enemyStartX, y - enemyStartY) < margin + Math.max(w, h))
    );

    obstacles.push({ x, y, w, h });
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

// Roboter an Hindernis aufhalten: Position zurücksetzen, Geschwindigkeit stoppen
function stopRobotAtObstacle(robot, prevX, prevY, radius) {
  robot.x = prevX;
  robot.y = prevY;
  robot.vx = 0;
  robot.vy = 0;
}

function drawObstacle(obs) {
  const x = obs.x - obs.w / 2;
  const y = obs.y - obs.h / 2;
  ctx.fillStyle = '#2a3a4a';
  ctx.fillRect(x, y, obs.w, obs.h);
  ctx.strokeStyle = '#1a2530';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, obs.w, obs.h);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
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

function updateProjectiles() {
  // Während Countdown keine Projektile aktualisieren
  if (gameState.countdown > 0 || gameState.fightEnded) {
    return;
  }
  
  const stats = computeRobotStats();
  const p = gameState.player;
  const e = gameState.enemy;
  
  gameState.projectiles = gameState.projectiles.filter((proj) => {
    proj.x += proj.vx;
    proj.y += proj.vy;
    
    // Wrap-Around: Projektile tauchen auf der anderen Seite auf
    if (proj.x < 0) proj.x += canvas.width;
    if (proj.x > canvas.width) proj.x -= canvas.width;
    if (proj.y < 0) proj.y += canvas.height;
    if (proj.y > canvas.height) proj.y -= canvas.height;
    
    // Lebensdauer: Projektile nach 3 Sekunden entfernen
    if (!proj.born) proj.born = Date.now();
    if (Date.now() - proj.born > 3000) return false;

    // Kollision mit Hindernissen (Rakete verschwindet)
    for (let i = 0; i < gameState.obstacles.length; i++) {
      const obs = gameState.obstacles[i];
      if (pointInRect(proj.x, proj.y, obs.x, obs.y, obs.w, obs.h)) {
        return false;
      }
    }
    
    // Kollision mit Spieler (kleinerer Radius)
    if (proj.owner === 'enemy' && p) {
      const dx = proj.x - p.x;
      const dy = proj.y - p.y;
      if (dx * dx + dy * dy < 225) { // Radius ~15
        const dmg = Math.max(1, Math.floor(proj.damage - stats.armor / 2));
        p.hp -= dmg;
        updatePlayerHp(p.hp, p.maxHp);
        if (p.hp <= 0) {
          endFight(false);
        }
        return false;
      }
    }
    
    // Kollision mit Gegner (kleinerer Radius)
    if (proj.owner === 'player' && e) {
      const dx = proj.x - e.x;
      const dy = proj.y - e.y;
      if (dx * dx + dy * dy < 225) { // Radius ~15
        const dmg = Math.max(1, Math.floor(proj.damage - e.armor / 2));
        e.hp -= dmg;
        updateEnemyHp(e.hp, e.maxHp);
        if (e.hp <= 0) {
          endFight(true);
        }
        return false;
      }
    }
    
    return true;
  });
}

function render() {
  // Hintergrund weiß
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Gitter (hellgrau für weißen Hintergrund)
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += 40) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
  
  // Countdown anzeigen
  if (gameState.countdown > 0) {
    const elapsed = Date.now() - gameState.countdownStartTime;
    const remaining = Math.ceil((3000 - elapsed) / 1000);
    if (remaining > 0) {
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
    } else {
      gameState.countdown = 0;
    }
  }
  
  // Gewinner-Text anzeigen
  if (gameState.fightEnded && gameState.winner) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const winnerColor = gameState.winner === 'player' ? '#00d4aa' : '#ff4757';
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

  // Projektile
  gameState.projectiles.forEach((proj) => {
    drawProjectile(proj);
  });
  
  // Gegner
  if (gameState.enemy) {
    drawMech(gameState.enemy.x, gameState.enemy.y, gameState.enemy.angle, '#ff4757', 14);
    drawHpBar(gameState.enemy.x, gameState.enemy.y, gameState.enemy.hp, gameState.enemy.maxHp, '#ff4757', 14);
  }
  
  // Spieler
  if (gameState.player) {
    drawMech(gameState.player.x, gameState.player.y, gameState.player.angle, '#00d4aa', 14);
    drawHpBar(gameState.player.x, gameState.player.y, gameState.player.hp, gameState.player.maxHp, '#00d4aa', 14);
  }
}

function gameLoop() {
  if (!state.fightInProgress) return;
  
  // Countdown aktualisieren
  if (gameState.countdown > 0) {
    const elapsed = Date.now() - gameState.countdownStartTime;
    if (elapsed >= 3000) {
      gameState.countdown = 0;
    }
  }
  
  updatePlayer();
  updateEnemy();
  
  // Kollisionserkennung und -reaktion zwischen Robotern
  if (gameState.player && gameState.enemy && !gameState.fightEnded && gameState.countdown === 0) {
    if (checkCollision(gameState.player, gameState.enemy)) {
      resolveCollision(gameState.player, gameState.enemy);
    }
  }
  
  updateProjectiles();
  
  // HP-Anzeigen aktualisieren (Arena-Seite + Vollbild-HUD)
  if (gameState.player && !gameState.fightEnded) {
    updatePlayerHp(gameState.player.hp, gameState.player.maxHp);
  }
  if (gameState.enemy && !gameState.fightEnded) {
    updateEnemyHp(gameState.enemy.hp, gameState.enemy.maxHp);
  }
  updateHud();
  
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
  
  // Credits sofort gutschreiben
  if (won) {
    state.money += state.currentEnemy.reward;
    updateMoney();
  }
  
  // Nach 3 Sekunden Vollbild verlassen
  setTimeout(() => {
    exitFight();
    
    const arenaStatusEl = document.getElementById('arenaStatus');
    if (won) {
      if (arenaStatusEl) {
        arenaStatusEl.innerHTML = `<p class="win">Sieg! Du erhältst <strong>${state.currentEnemy.reward} Credits</strong>.</p>`;
      }
    } else {
      if (arenaStatusEl) {
        arenaStatusEl.innerHTML = '<p class="lose">Niederlage. Verbessere deinen Mech in der Garage und im Shop.</p>';
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
}

function fight() {
  if (state.fightInProgress || !state.currentEnemy) return;
  
  // Vollbild-Overlay anzeigen
  showFightOverlay();
  initCanvas();
  
  state.fightInProgress = true;
  gameState.fightEnded = false;
  gameState.winner = null;
  document.getElementById('btnFight').disabled = true;
  document.getElementById('btnNextOpponent').disabled = true;
  
  // Fenster-Resize beobachten
  window.addEventListener('resize', resizeFightCanvas);
  
  // Canvas fokussieren
  canvas.focus();
  
  const playerStats = computeRobotStats();
  
  // Spieler initialisieren
  gameState.player = {
    x: canvas.width * 0.2,
    y: canvas.height * 0.5,
    angle: 0,
    hp: playerStats.hp,
    maxHp: playerStats.hp,
    vx: 0,
    vy: 0,
  };
  
  // Gegner initialisieren
  gameState.enemy = {
    x: canvas.width * 0.8,
    y: canvas.height * 0.5,
    angle: Math.PI,
    hp: state.currentEnemy.hp,
    maxHp: state.currentEnemy.hp,
    armor: state.currentEnemy.armor,
    damage: state.currentEnemy.damage,
    speed: state.currentEnemy.speed,
    vx: 0,
    vy: 0,
  };
  
  gameState.projectiles = [];
  gameState.keys = {};
  gameState.lastShot = 0;
  gameState.enemyLastShot = 0;

  // Zufällige Hindernisse für diesen Kampf
  generateObstacles();
  
  // Countdown starten
  gameState.countdown = 3;
  gameState.countdownStartTime = Date.now();
  
  updatePlayerHp(gameState.player.hp, gameState.player.maxHp);
  updateEnemyHp(gameState.enemy.hp, gameState.enemy.maxHp);
  
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

// —— Start
function init() {
  try {
    loadRobotImage();
    initGarageRobotImage();
    initCanvas();
    updateMoney();
    renderGarage();
    renderArena();
    renderShop();
    initNavigation();
    initArena();
    console.log('Game initialized successfully');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

// Warte bis DOM vollständig geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM ist bereits geladen
  init();
}
