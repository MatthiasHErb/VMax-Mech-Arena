/**
 * Parts Renderer – Zeichnet alle Roboter-Teile als Offscreen-Canvas-Grafiken
 * Jedes Teil wird einmal vorgerendert und dann als Layer übereinander gelegt.
 */

const PART_SIZE_TOP = 64; // Top-Down Größe
const PART_SIZE_SIDE_W = 160; // Seiten-Breite
const PART_SIZE_SIDE_H = 200; // Seiten-Höhe

const partSprites = { top: {}, side: {} };
const enemySprites = [];

function createCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

// ═══════════════════════════════════════════
// TOP-DOWN CHASSIS
// ═══════════════════════════════════════════

function drawChassisScoutTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Schlanker Körper
  g.fillStyle = '#1a8a7a';
  g.fillRect(cx - 8, cy - 14, 16, 28);

  // Cockpit (Spitze nach rechts = Fahrtrichtung)
  g.fillStyle = '#22b8a5';
  g.beginPath();
  g.moveTo(cx + 14, cy);
  g.lineTo(cx + 6, cy - 8);
  g.lineTo(cx + 6, cy + 8);
  g.closePath();
  g.fill();

  // Beine (dünn, agil)
  g.fillStyle = '#147060';
  g.fillRect(cx - 4, cy - 20, 4, 8);
  g.fillRect(cx - 4, cy + 12, 4, 8);
  g.fillRect(cx + 1, cy - 20, 4, 8);
  g.fillRect(cx + 1, cy + 12, 4, 8);

  // Thruster hinten
  g.fillStyle = '#0e5a4e';
  g.fillRect(cx - 10, cy - 5, 4, 10);

  return c;
}

function drawChassisTankTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Massiver Körper
  g.fillStyle = '#3a6a6a';
  g.fillRect(cx - 14, cy - 18, 28, 36);

  // Cockpit (breiter)
  g.fillStyle = '#4a8a8a';
  g.beginPath();
  g.moveTo(cx + 18, cy);
  g.lineTo(cx + 12, cy - 12);
  g.lineTo(cx + 12, cy + 12);
  g.closePath();
  g.fill();

  // Schwere Ketten
  g.fillStyle = '#2a4a4a';
  g.fillRect(cx - 16, cy - 22, 6, 44);
  g.fillRect(cx + 10, cy - 22, 6, 44);

  // Laufrad-Details
  g.fillStyle = '#1e3838';
  for (let i = -18; i <= 18; i += 8) {
    g.fillRect(cx - 16, cy + i, 6, 2);
    g.fillRect(cx + 10, cy + i, 6, 2);
  }

  return c;
}

function drawChassisBalancedTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Mittlerer Körper
  g.fillStyle = '#2a7a8a';
  g.fillRect(cx - 10, cy - 16, 22, 32);

  // Cockpit
  g.fillStyle = '#3a9aaa';
  g.beginPath();
  g.moveTo(cx + 16, cy);
  g.lineTo(cx + 10, cy - 10);
  g.lineTo(cx + 10, cy + 10);
  g.closePath();
  g.fill();

  // Beine (mittel)
  g.fillStyle = '#1a5a6a';
  g.fillRect(cx - 6, cy - 20, 6, 6);
  g.fillRect(cx - 6, cy + 14, 6, 6);
  g.fillRect(cx + 2, cy - 20, 6, 6);
  g.fillRect(cx + 2, cy + 14, 6, 6);

  // Heck
  g.fillStyle = '#14505e';
  g.fillRect(cx - 14, cy - 8, 6, 16);

  return c;
}

// ═══════════════════════════════════════════
// TOP-DOWN WAFFEN
// ═══════════════════════════════════════════

function drawWeaponCannonTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Zwei Kanonenrohre
  g.fillStyle = '#888888';
  g.fillRect(cx, cy - 12, 20, 4);
  g.fillRect(cx, cy + 8, 20, 4);

  // Mündungen
  g.fillStyle = '#aaaaaa';
  g.fillRect(cx + 18, cy - 13, 4, 6);
  g.fillRect(cx + 18, cy + 7, 4, 6);

  // Basis/Halterung
  g.fillStyle = '#666666';
  g.fillRect(cx - 2, cy - 6, 6, 12);

  return c;
}

function drawWeaponPlasmaTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Breites Plasma-Rohr
  g.fillStyle = '#7744aa';
  g.fillRect(cx, cy - 6, 22, 12);

  // Plasma-Kern (leuchtet)
  g.fillStyle = '#bb66ff';
  g.fillRect(cx + 16, cy - 4, 8, 8);

  // Energielinien
  g.fillStyle = '#9955dd';
  g.fillRect(cx + 4, cy - 3, 2, 6);
  g.fillRect(cx + 10, cy - 3, 2, 6);

  // Schulter-Halterung
  g.fillStyle = '#553388';
  g.fillRect(cx - 4, cy - 10, 6, 20);

  return c;
}

function drawWeaponRailgunTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Langes Railgun-Rohr
  g.fillStyle = '#5588cc';
  g.fillRect(cx - 2, cy - 3, 28, 6);

  // Magnetschienen
  g.fillStyle = '#3366aa';
  g.fillRect(cx + 2, cy - 6, 20, 2);
  g.fillRect(cx + 2, cy + 4, 20, 2);

  // Energiekammer
  g.fillStyle = '#77bbff';
  g.beginPath();
  g.arc(cx + 2, cy, 6, 0, Math.PI * 2);
  g.fill();

  // Mündung
  g.fillStyle = '#aaddff';
  g.fillRect(cx + 24, cy - 4, 4, 8);

  return c;
}

function drawWeaponMinigunTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Mehrere dünne Läufe
  g.fillStyle = '#999999';
  for (let i = -8; i <= 8; i += 4) {
    g.fillRect(cx + 2, cy + i - 1, 18, 2);
  }

  // Laufgehäuse
  g.fillStyle = '#777777';
  g.beginPath();
  g.arc(cx + 18, cy, 6, 0, Math.PI * 2);
  g.fill();

  // Motor
  g.fillStyle = '#aa8800';
  g.fillRect(cx - 4, cy - 8, 8, 16);

  // Munitionsgurt
  g.fillStyle = '#bbaa44';
  g.fillRect(cx - 6, cy + 4, 4, 10);

  return c;
}

// ═══════════════════════════════════════════
// TOP-DOWN RÜSTUNG
// ═══════════════════════════════════════════

function drawArmorLightTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Dünne Schulterplatten
  g.fillStyle = 'rgba(100, 200, 180, 0.7)';
  g.fillRect(cx - 6, cy - 20, 14, 4);
  g.fillRect(cx - 6, cy + 16, 14, 4);

  // Seitenverkleidung
  g.fillStyle = 'rgba(80, 180, 160, 0.5)';
  g.fillRect(cx - 14, cy - 10, 4, 20);

  return c;
}

function drawArmorHeavyTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Massive Schulterplatten
  g.fillStyle = 'rgba(90, 90, 110, 0.8)';
  g.fillRect(cx - 12, cy - 24, 24, 6);
  g.fillRect(cx - 12, cy + 18, 24, 6);

  // Seitenpanzer
  g.fillStyle = 'rgba(70, 70, 90, 0.7)';
  g.fillRect(cx - 18, cy - 16, 6, 32);

  // Frontschild
  g.fillStyle = 'rgba(100, 100, 120, 0.6)';
  g.fillRect(cx + 10, cy - 14, 6, 28);

  // Nieten
  g.fillStyle = 'rgba(140, 140, 160, 0.8)';
  g.beginPath(); g.arc(cx - 10, cy - 22, 2, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(cx + 10, cy - 22, 2, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(cx - 10, cy + 22, 2, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(cx + 10, cy + 22, 2, 0, Math.PI * 2); g.fill();

  return c;
}

function drawArmorReactiveTop() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Reactive-Panels (angewinkelt)
  g.fillStyle = 'rgba(180, 120, 40, 0.7)';
  // Oben
  g.beginPath();
  g.moveTo(cx - 8, cy - 18);
  g.lineTo(cx + 12, cy - 18);
  g.lineTo(cx + 10, cy - 22);
  g.lineTo(cx - 6, cy - 22);
  g.closePath();
  g.fill();
  // Unten
  g.beginPath();
  g.moveTo(cx - 8, cy + 18);
  g.lineTo(cx + 12, cy + 18);
  g.lineTo(cx + 10, cy + 22);
  g.lineTo(cx - 6, cy + 22);
  g.closePath();
  g.fill();

  // Seitenpanzer
  g.fillStyle = 'rgba(160, 100, 30, 0.6)';
  g.fillRect(cx - 16, cy - 12, 5, 24);

  // Warndreiecke
  g.fillStyle = 'rgba(220, 160, 50, 0.8)';
  g.beginPath();
  g.moveTo(cx - 14, cy - 4);
  g.lineTo(cx - 14, cy + 4);
  g.lineTo(cx - 18, cy);
  g.closePath();
  g.fill();

  return c;
}

// ═══════════════════════════════════════════
// SEITENANSICHT CHASSIS
// ═══════════════════════════════════════════

function drawChassisScoutSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Beine (schlank)
  g.fillStyle = '#147060';
  // Linkes Bein
  g.fillRect(cx - 20, cy + 30, 8, 50);
  g.fillRect(cx - 24, cy + 75, 16, 6);
  // Rechtes Bein
  g.fillRect(cx + 12, cy + 30, 8, 50);
  g.fillRect(cx + 8, cy + 75, 16, 6);

  // Schlanker Torso
  g.fillStyle = '#1a8a7a';
  g.fillRect(cx - 24, cy - 20, 48, 50);

  // Cockpit (oberer Bereich)
  g.fillStyle = '#22b8a5';
  g.fillRect(cx - 16, cy - 40, 32, 24);

  // Visier
  g.fillStyle = '#77ffee';
  g.fillRect(cx - 10, cy - 36, 20, 6);

  // Schultergelenke
  g.fillStyle = '#0e5a4e';
  g.beginPath(); g.arc(cx - 24, cy - 4, 6, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(cx + 24, cy - 4, 6, 0, Math.PI * 2); g.fill();

  return c;
}

function drawChassisTankSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Schwere Beine
  g.fillStyle = '#2a4a4a';
  g.fillRect(cx - 26, cy + 25, 14, 55);
  g.fillRect(cx - 30, cy + 74, 22, 8);
  g.fillRect(cx + 12, cy + 25, 14, 55);
  g.fillRect(cx + 8, cy + 74, 22, 8);

  // Hydraulik
  g.fillStyle = '#3a6060';
  g.fillRect(cx - 20, cy + 40, 4, 30);
  g.fillRect(cx + 16, cy + 40, 4, 30);

  // Massiver Torso
  g.fillStyle = '#3a6a6a';
  g.fillRect(cx - 34, cy - 24, 68, 50);

  // Cockpit
  g.fillStyle = '#4a8a8a';
  g.fillRect(cx - 22, cy - 44, 44, 24);

  // Visier (schmal)
  g.fillStyle = '#88ddcc';
  g.fillRect(cx - 14, cy - 40, 28, 4);

  // Schultergelenke (groß)
  g.fillStyle = '#2a5050';
  g.beginPath(); g.arc(cx - 34, cy - 6, 10, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(cx + 34, cy - 6, 10, 0, Math.PI * 2); g.fill();

  return c;
}

function drawChassisBalancedSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Beine
  g.fillStyle = '#1a5a6a';
  g.fillRect(cx - 22, cy + 28, 10, 52);
  g.fillRect(cx - 26, cy + 74, 18, 7);
  g.fillRect(cx + 12, cy + 28, 10, 52);
  g.fillRect(cx + 8, cy + 74, 18, 7);

  // Torso
  g.fillStyle = '#2a7a8a';
  g.fillRect(cx - 28, cy - 22, 56, 50);

  // Cockpit
  g.fillStyle = '#3a9aaa';
  g.fillRect(cx - 18, cy - 42, 36, 24);

  // Visier
  g.fillStyle = '#88eeff';
  g.fillRect(cx - 12, cy - 38, 24, 5);

  // Schultergelenke
  g.fillStyle = '#14505e';
  g.beginPath(); g.arc(cx - 28, cy - 4, 8, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(cx + 28, cy - 4, 8, 0, Math.PI * 2); g.fill();

  return c;
}

// ═══════════════════════════════════════════
// SEITENANSICHT WAFFEN
// ═══════════════════════════════════════════

function drawWeaponCannonSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Arme
  g.fillStyle = '#888888';
  g.fillRect(cx - 40, cy - 8, 16, 8);
  g.fillRect(cx + 24, cy - 8, 16, 8);

  // Kanonenrohre
  g.fillStyle = '#999999';
  g.fillRect(cx - 44, cy - 30, 6, 26);
  g.fillRect(cx + 38, cy - 30, 6, 26);

  // Mündungen
  g.fillStyle = '#bbbbbb';
  g.fillRect(cx - 46, cy - 34, 10, 6);
  g.fillRect(cx + 36, cy - 34, 10, 6);

  return c;
}

function drawWeaponPlasmaSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Arme
  g.fillStyle = '#7744aa';
  g.fillRect(cx - 42, cy - 10, 18, 10);
  g.fillRect(cx + 24, cy - 10, 18, 10);

  // Plasma-Werfer
  g.fillStyle = '#9955dd';
  g.fillRect(cx - 48, cy - 34, 12, 28);
  g.fillRect(cx + 36, cy - 34, 12, 28);

  // Plasma-Kern
  g.fillStyle = '#bb66ff';
  g.beginPath(); g.arc(cx - 42, cy - 28, 5, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.arc(cx + 42, cy - 28, 5, 0, Math.PI * 2); g.fill();

  return c;
}

function drawWeaponRailgunSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Schulter-Halterung
  g.fillStyle = '#3366aa';
  g.fillRect(cx - 36, cy - 16, 12, 14);
  g.fillRect(cx + 24, cy - 16, 12, 14);

  // Langes Railgun-Rohr (nur rechte Seite sichtbar)
  g.fillStyle = '#5588cc';
  g.fillRect(cx + 30, cy - 50, 8, 40);

  // Magnetschienen
  g.fillStyle = '#77bbff';
  g.fillRect(cx + 28, cy - 52, 4, 44);
  g.fillRect(cx + 36, cy - 52, 4, 44);

  // Energiekammer
  g.fillStyle = '#aaddff';
  g.beginPath(); g.arc(cx + 34, cy - 14, 6, 0, Math.PI * 2); g.fill();

  // Linke Seite: Stütze
  g.fillStyle = '#5588cc';
  g.fillRect(cx - 38, cy - 40, 8, 28);

  return c;
}

function drawWeaponMinigunSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Arme
  g.fillStyle = '#777777';
  g.fillRect(cx - 38, cy - 8, 14, 8);
  g.fillRect(cx + 24, cy - 8, 14, 8);

  // Minigun-Läufe (Bündel)
  g.fillStyle = '#999999';
  g.fillRect(cx + 32, cy - 44, 4, 38);
  g.fillRect(cx + 38, cy - 44, 4, 38);
  g.fillRect(cx + 35, cy - 44, 4, 38);

  // Lauf-Gehäuse
  g.fillStyle = '#aaaaaa';
  g.beginPath(); g.arc(cx + 37, cy - 44, 6, 0, Math.PI * 2); g.fill();

  // Munitionsbox links
  g.fillStyle = '#aa8800';
  g.fillRect(cx - 42, cy - 30, 10, 24);
  // Gurt
  g.fillStyle = '#bbaa44';
  g.fillRect(cx - 36, cy - 14, 20, 3);

  return c;
}

// ═══════════════════════════════════════════
// SEITENANSICHT RÜSTUNG
// ═══════════════════════════════════════════

function drawArmorLightSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Dünne Schulterplatten
  g.fillStyle = 'rgba(100, 200, 180, 0.7)';
  g.fillRect(cx - 34, cy - 18, 68, 4);

  // Brustplatte
  g.fillStyle = 'rgba(80, 180, 160, 0.5)';
  g.fillRect(cx - 20, cy - 10, 40, 8);

  // Knieschützer
  g.fillStyle = 'rgba(100, 200, 180, 0.6)';
  g.fillRect(cx - 18, cy + 40, 8, 8);
  g.fillRect(cx + 10, cy + 40, 8, 8);

  return c;
}

function drawArmorHeavySide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Massive Schulterplatten
  g.fillStyle = 'rgba(90, 90, 110, 0.8)';
  g.fillRect(cx - 40, cy - 24, 80, 8);

  // Brustpanzer
  g.fillStyle = 'rgba(70, 70, 90, 0.7)';
  g.fillRect(cx - 26, cy - 14, 52, 20);

  // Beinpanzer
  g.fillStyle = 'rgba(80, 80, 100, 0.6)';
  g.fillRect(cx - 24, cy + 30, 12, 35);
  g.fillRect(cx + 12, cy + 30, 12, 35);

  // Nieten
  g.fillStyle = 'rgba(140, 140, 160, 0.9)';
  for (let x = -30; x <= 30; x += 20) {
    g.beginPath(); g.arc(cx + x, cy - 20, 2, 0, Math.PI * 2); g.fill();
  }

  return c;
}

function drawArmorReactiveSide() {
  const c = createCanvas(PART_SIZE_SIDE_W, PART_SIZE_SIDE_H);
  const g = c.getContext('2d');
  const cx = 80, cy = 100;

  // Reaktivpanzer-Panels
  g.fillStyle = 'rgba(180, 120, 40, 0.7)';
  // Schultern
  g.beginPath();
  g.moveTo(cx - 34, cy - 20);
  g.lineTo(cx + 34, cy - 20);
  g.lineTo(cx + 38, cy - 26);
  g.lineTo(cx - 38, cy - 26);
  g.closePath();
  g.fill();

  // Brustpanzer
  g.fillStyle = 'rgba(160, 100, 30, 0.6)';
  g.fillRect(cx - 22, cy - 12, 44, 14);

  // Oberschenkelpanzer
  g.fillStyle = 'rgba(180, 120, 40, 0.5)';
  g.fillRect(cx - 20, cy + 32, 10, 20);
  g.fillRect(cx + 10, cy + 32, 10, 20);

  // Warnsymbol
  g.fillStyle = 'rgba(220, 160, 50, 0.9)';
  g.beginPath();
  g.moveTo(cx, cy - 8);
  g.lineTo(cx - 6, cy);
  g.lineTo(cx + 6, cy);
  g.closePath();
  g.fill();

  return c;
}

// ═══════════════════════════════════════════
// GEGNER (KOMPLETTE TOP-DOWN SPRITES)
// ═══════════════════════════════════════════

function drawEnemyType1() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Runder agiler Bot
  g.fillStyle = '#cc3333';
  g.beginPath(); g.arc(cx, cy, 12, 0, Math.PI * 2); g.fill();

  // Waffen
  g.fillStyle = '#aa2222';
  g.fillRect(cx + 8, cy - 10, 14, 4);
  g.fillRect(cx + 8, cy + 6, 14, 4);

  // Cockpit
  g.fillStyle = '#ff5555';
  g.beginPath(); g.arc(cx + 4, cy, 5, 0, Math.PI * 2); g.fill();

  // Triebwerke
  g.fillStyle = '#881111';
  g.fillRect(cx - 16, cy - 4, 6, 8);

  return c;
}

function drawEnemyType2() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Großer eckiger Bot
  g.fillStyle = '#993322';
  g.fillRect(cx - 14, cy - 16, 28, 32);

  // Schwere Waffe
  g.fillStyle = '#bb4433';
  g.fillRect(cx + 10, cy - 4, 18, 8);

  // Panzerplatten
  g.fillStyle = '#773322';
  g.fillRect(cx - 18, cy - 18, 6, 36);
  g.fillRect(cx + 12, cy - 18, 6, 36);

  // Cockpit
  g.fillStyle = '#dd6644';
  g.fillRect(cx + 4, cy - 6, 8, 12);

  return c;
}

function drawEnemyType3() {
  const c = createCanvas(PART_SIZE_TOP, PART_SIZE_TOP);
  const g = c.getContext('2d');
  const cx = 32, cy = 32;

  // Spinnenartiger Bot
  g.fillStyle = '#aa4400';
  g.beginPath();
  g.moveTo(cx + 10, cy);
  g.lineTo(cx - 4, cy - 12);
  g.lineTo(cx - 12, cy);
  g.lineTo(cx - 4, cy + 12);
  g.closePath();
  g.fill();

  // Vier Beine
  g.fillStyle = '#884400';
  g.fillRect(cx - 6, cy - 20, 4, 10);
  g.fillRect(cx - 6, cy + 10, 4, 10);
  g.fillRect(cx + 2, cy - 20, 4, 10);
  g.fillRect(cx + 2, cy + 10, 4, 10);

  // Doppelkanone
  g.fillStyle = '#cc6600';
  g.fillRect(cx + 6, cy - 6, 16, 4);
  g.fillRect(cx + 6, cy + 2, 16, 4);

  // Auge
  g.fillStyle = '#ffaa00';
  g.beginPath(); g.arc(cx, cy, 4, 0, Math.PI * 2); g.fill();

  return c;
}

// ═══════════════════════════════════════════
// INITIALISIERUNG
// ═══════════════════════════════════════════

function initPartSprites() {
  // Top-Down Sprites
  partSprites.top['chassis_scout'] = drawChassisScoutTop();
  partSprites.top['chassis_tank'] = drawChassisTankTop();
  partSprites.top['chassis_balanced'] = drawChassisBalancedTop();

  partSprites.top['weapon_cannon'] = drawWeaponCannonTop();
  partSprites.top['weapon_plasma'] = drawWeaponPlasmaTop();
  partSprites.top['weapon_railgun'] = drawWeaponRailgunTop();
  partSprites.top['weapon_minigun'] = drawWeaponMinigunTop();

  partSprites.top['armor_light'] = drawArmorLightTop();
  partSprites.top['armor_heavy'] = drawArmorHeavyTop();
  partSprites.top['armor_reactive'] = drawArmorReactiveTop();

  // Seiten-Sprites
  partSprites.side['chassis_scout'] = drawChassisScoutSide();
  partSprites.side['chassis_tank'] = drawChassisTankSide();
  partSprites.side['chassis_balanced'] = drawChassisBalancedSide();

  partSprites.side['weapon_cannon'] = drawWeaponCannonSide();
  partSprites.side['weapon_plasma'] = drawWeaponPlasmaSide();
  partSprites.side['weapon_railgun'] = drawWeaponRailgunSide();
  partSprites.side['weapon_minigun'] = drawWeaponMinigunSide();

  partSprites.side['armor_light'] = drawArmorLightSide();
  partSprites.side['armor_heavy'] = drawArmorHeavySide();
  partSprites.side['armor_reactive'] = drawArmorReactiveSide();

  // Gegner-Sprites
  enemySprites.push(drawEnemyType1());
  enemySprites.push(drawEnemyType2());
  enemySprites.push(drawEnemyType3());

  console.log('Part sprites initialized:', Object.keys(partSprites.top).length, 'top,', Object.keys(partSprites.side).length, 'side,', enemySprites.length, 'enemies');
}

// Zeichnet den Spieler-Mech aus Layern (top-down), optional mit Farbtönung (z.B. rot für Mech 2)
function drawPlayerMechLayered(ctx, x, y, angle, size, tintColor) {
  const equipped = state.robots[state.activeRobotIndex]?.equipped || state.robots[0].equipped;
  const scale = size / 32; // Skalierung relativ zur Standard-Größe

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const layers = [equipped.chassis, equipped.armor, equipped.weaponL];
  layers.forEach((partId) => {
    const sprite = partSprites.top[partId];
    if (sprite) {
      const w = sprite.width * scale;
      const h = sprite.height * scale;
      ctx.drawImage(sprite, -w / 2, -h / 2, w, h);
    }
  });

  // Zweiter Mech: rote Farbtönung (wenn rote Farbe übergeben)
  if (tintColor && tintColor === '#ff4757') {
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255, 71, 87, 0.9)';
    ctx.fillRect(-100, -100, 200, 200);
    ctx.globalCompositeOperation = 'source-over';
  }

  ctx.restore();
}

// Zeichnet einen Gegner-Mech (top-down)
function drawEnemyMechSprite(ctx, x, y, angle, size, enemyIndex) {
  const sprite = enemySprites[enemyIndex % enemySprites.length];
  if (!sprite) return;
  const scale = size / 32;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const w = sprite.width * scale;
  const h = sprite.height * scale;
  ctx.drawImage(sprite, -w / 2, -h / 2, w, h);
  ctx.restore();
}

// Zeichnet die Garage-Vorschau (Seitenansicht, layered)
function drawGaragePreview(targetCanvas) {
  const gc = targetCanvas.getContext('2d');
  gc.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

  const equipped = state.robots[state.activeRobotIndex]?.equipped || state.robots[0].equipped;
  const layers = [equipped.chassis, equipped.armor, equipped.weaponL];

  layers.forEach((partId) => {
    const sprite = partSprites.side[partId];
    if (sprite) {
      gc.drawImage(sprite, 0, 0, targetCanvas.width, targetCanvas.height);
    }
  });

  // Zweiter Mech: rote Farbtönung in der Garage
  if (state.activeRobotIndex === 1) {
    gc.globalCompositeOperation = 'source-atop';
    gc.fillStyle = 'rgba(255, 71, 87, 0.9)';
    gc.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    gc.globalCompositeOperation = 'source-over';
  }
}
