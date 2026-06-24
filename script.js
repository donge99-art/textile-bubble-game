// script.js - Textile Bubble Shooter Game (바닐라 자바스크립트 기반 게임 로직)

// 1. 섬유 데이터 정의 (10종의 섬유별 고유 색상, 특성 및 설명)
const FIBER_DATA = [
  {
    id: 0,
    name: "면",
    english: "Cotton",
    color: "#EF4444", // Red
    bgColor: "bg-red-500",
    textClass: "text-white",
    characteristics: [
      "흡습성 우수 (식물성)",
      "피부 자극 없는 면화",
      "물에 젖으면 강도 강해짐",
      "구김 잘 가나 세탁 쉬움"
    ],
    hint: "식물성 천연 섬유로 위생적이고 아동복이나 타월 등에 널리 활용됩니다."
  },
  {
    id: 1,
    name: "마",
    english: "Linen",
    color: "#10B981", // Green
    bgColor: "bg-emerald-500",
    textClass: "text-white",
    characteristics: [
      "열전도 우수 (매우 시원)",
      "통기성 뛰어난 여름용",
      "강도 강하나 구김 심함",
      "아마/삼베 원료 식물성"
    ],
    hint: "모시나 삼베처럼 여름 패션에 필수적인 까슬까슬한 느낌의 천연 섬유입니다."
  },
  {
    id: 2,
    name: "모",
    english: "Wool",
    color: "#FBBF24", // Yellow
    bgColor: "bg-amber-400",
    textClass: "text-slate-900",
    characteristics: [
      "보온성 우수 (양털 원료)",
      "탄성 좋음 (구김 적음)",
      "열/습기에 수축함",
      "해충(좀) 피해 받기 쉬움"
    ],
    hint: "양의 털로 만들어지며 스웨터나 양복, 겨울 이불 등에 쓰이는 따뜻한 섬유입니다."
  },
  {
    id: 3,
    name: "견",
    english: "Silk",
    color: "#8B5CF6", // Purple
    bgColor: "bg-violet-500",
    textClass: "text-white",
    characteristics: [
      "우아한 광택 (누에고치)",
      "촉감 부드럽고 잘 흘러내림",
      "동물성 단백질 섬유",
      "햇빛 노출 시 누렇게 변색"
    ],
    hint: "누에고치에서 뽑아내는 천연 단백질 섬유로 매우 고급스럽고 부드럽습니다."
  },
  {
    id: 4,
    name: "아세테이트",
    english: "Acetate",
    color: "#EC4899", // Pink
    bgColor: "bg-pink-500",
    textClass: "text-white",
    characteristics: [
      "실크 유사 광택 (반합성)",
      "아세톤 용제에 매우 약함",
      "목재 펄프 가공 원료",
      "부드럽고 주름 잘 안 감"
    ],
    hint: "목재 펄프에 화학 처리를 한 반합성 섬유로 넥타이나 스카프 안감 등에 쓰입니다."
  },
  {
    id: 5,
    name: "레이온",
    english: "Rayon",
    color: "#3B82F6", // Blue
    bgColor: "bg-blue-500",
    textClass: "text-white",
    characteristics: [
      "정전기 없는 재생 섬유",
      "목재 펄프 원료 비스코스",
      "물에 젖으면 강도 반감",
      "흡습성 좋고 정교한 광택"
    ],
    hint: "비스코스라고도 불리며 정전기가 안 나는 매끄러운 안감용 대표 재생 섬유입니다."
  },
  {
    id: 6,
    name: "나일론",
    english: "Nylon",
    color: "#6366F1", // Indigo
    bgColor: "bg-indigo-500",
    textClass: "text-white",
    characteristics: [
      "마찰 강도 최강 (스타킹)",
      "탄성 우수해 구김 없음",
      "최초 합성 섬유 원료",
      "열/햇빛 및 정전기에 약함"
    ],
    hint: "강도가 최고라 스타킹, 칫솔모, 아웃도어 가방 등에 단골로 쓰이는 인조 섬유입니다."
  },
  {
    id: 7,
    name: "아크릴",
    english: "Acrylic",
    color: "#14B8A6", // Teal
    bgColor: "bg-teal-500",
    textClass: "text-white",
    characteristics: [
      "인조 울 (가볍고 따뜻)",
      "햇빛 저항 최고 (야외막)",
      "해충/곰팡이 저항 강함",
      "양모 유사 보온성 대체재"
    ],
    hint: "인조 울이라고 불리며 따뜻한 담요나 니트웨어에 양모 대체제로 흔히 배합됩니다."
  },
  {
    id: 8,
    name: "폴리우레탄",
    english: "Polyurethane",
    color: "#84CC16", // Lime
    bgColor: "bg-lime-500",
    textClass: "text-slate-900",
    characteristics: [
      "신축성 최강 (5배 연장)",
      "회복탄력 우수 스판덱스",
      "수영복/스포츠의류 원료",
      "고무보다 가볍고 튼튼함"
    ],
    hint: "일명 '스판덱스'로 의류의 신축성을 담당하는 놀라운 회복탄력성의 합성 섬유입니다."
  },
  {
    id: 9,
    name: "폴리에스터",
    english: "Polyester",
    color: "#F97316", // Orange
    bgColor: "bg-orange-500",
    textClass: "text-white",
    characteristics: [
      "전세계 생산/사용량 1위",
      "구김 없고 형태 안정성 우수",
      "건조 속도 매우 빠름",
      "구김이나 오염에 강함"
    ],
    hint: "가장 대중적인 합성 의류용 섬유로 땀 배출 운동복이나 일상 T셔츠에 널리 활용됩니다."
  }
];

// 2. 게임 상태 상수 및 변수 정의
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 600;
const BUBBLE_RADIUS = 20;
const BUBBLE_DIAMETER = BUBBLE_RADIUS * 2;
const ROW_HEIGHT = Math.round(BUBBLE_RADIUS * 1.732); // 헥사고날 행 높이 (~34.6)
const TOP_OFFSET = 40; // 상단 벽 여백

let canvas, ctx;
let score = 0;
let highScore = parseInt(localStorage.getItem("textile_highscore") || "0");
let currentLevel = 1;
let combo = 1;

let grid = []; // 2D 버블 그리드
let currentShooter = null; // 현재 장전된 버블 { type, char, x, y }
let nextShooter = null; // 다음 장전 대기 버블 { type, char }
let shotBubble = null; // 현재 공중을 날아다니는 버블 { x, y, vx, vy, type, char }
let isShooting = false;

let particles = []; // 버블 터질 때 사방으로 날아가는 조각들
let fallingBubbles = []; // 떨어지는 버블 목록
let floatingTexts = []; // 화면에 뜨는 득점/피드백 글자
let highlightedFiberType = null; // 현재 도감에서 마우스 올렸을 때 강조할 섬유 종류

let audioCtx = null; // Web Audio API용 컨텍스트
let soundEnabled = true;

let aimAngle = -Math.PI / 2; // 기본 위쪽
let pointerX = CANVAS_WIDTH / 2;
let pointerY = 0;
let isGameOver = false;
let isGameWin = false;
let gameLoopId = null;

// 3. Web Audio API를 활용한 이펙트 사운드 신디사이저
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "shoot") {
      // 슝 하고 쏘는 소리
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "pop") {
      // 버블 터지는 톡! 소리
      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "correct") {
      // 정답 맞췄을 때 딩동댕~ 청량한 소리
      osc.type = "sine";
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const toneOsc = audioCtx.createOscillator();
        const toneGain = audioCtx.createGain();
        toneOsc.connect(toneGain);
        toneGain.connect(audioCtx.destination);

        toneOsc.frequency.setValueAtTime(freq, now + idx * 0.07);
        toneGain.gain.setValueAtTime(0.12, now + idx * 0.07);
        toneGain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.07 + 0.25);

        toneOsc.start(now + idx * 0.07);
        toneOsc.stop(now + idx * 0.07 + 0.3);
      });
    } else if (type === "wrong") {
      // 오답 소리 (낮은 징~)
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "levelup") {
      // 스테이지 클리어 축하 팡파르
      const fanfares = [261.63, 329.63, 392.00, 523.25, 392.00, 523.25];
      fanfares.forEach((freq, idx) => {
        const toneOsc = audioCtx.createOscillator();
        const toneGain = audioCtx.createGain();
        toneOsc.connect(toneGain);
        toneGain.connect(audioCtx.destination);

        toneOsc.frequency.setValueAtTime(freq, now + idx * 0.12);
        toneGain.gain.setValueAtTime(0.15, now + idx * 0.12);
        toneGain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.2);

        toneOsc.start(now + idx * 0.12);
        toneOsc.stop(now + idx * 0.12 + 0.22);
      });
    } else if (type === "gameover") {
      // 패배 소리 (점점 떨어짐)
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(55, now + 0.6);
      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  } catch (e) {
    console.warn("Sound play failed:", e);
  }
}

// 4. HTML UI 연동 및 이벤트 바인딩
function initGame() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  // 이벤트 등록
  canvas.addEventListener("mousemove", handlePointerMove);
  canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
  canvas.addEventListener("click", handlePointerClick);
  canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

  document.getElementById("btn-swap").addEventListener("click", swapShooterBubbles);
  document.getElementById("btn-restart").addEventListener("click", () => startNewGame(1));
  document.getElementById("btn-toggle-sound").addEventListener("click", toggleSound);

  // 최초 게임 시작
  startNewGame(1);

  // 고해상도 모니터 대응 (Retina)
  adjustCanvasScale();
}

window.startNewGame = startNewGame;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGame);
} else {
  initGame();
}

// Canvas 고해상도 선명도 조절
function adjustCanvasScale() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = CANVAS_WIDTH * dpr;
  canvas.height = CANVAS_HEIGHT * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = `${CANVAS_WIDTH}px`;
  canvas.style.height = `${CANVAS_HEIGHT}px`;
}

// 5. 도감 UI 생성 및 렌더링 (비활성화)
function renderGuidebook() {}
function flashGuidebookCard(fiberId) {}
function toggleGuidebook() {}

// 사운드 토글
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("btn-toggle-sound");
  if (soundEnabled) {
    btn.innerHTML = `
      <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
      소리 켬
    `;
    initAudio();
    playSound("correct");
  } else {
    btn.innerHTML = `
      <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
      소리 끔
    `;
  }
}

// 6. 게임판 핵심 초기화 및 로직
function startNewGame(level = 1) {
  isGameOver = false;
  isGameWin = false;

  // 성공 및 실패 페이지 오버레이 숨기기
  const overOverlay = document.getElementById("game-over-overlay");
  const winOverlay = document.getElementById("game-win-overlay");
  if (overOverlay) overOverlay.classList.add("hidden");
  if (winOverlay) winOverlay.classList.add("hidden");

  score = 0;
  combo = 1;
  currentLevel = level;
  particles = [];
  fallingBubbles = [];
  floatingTexts = [];
  highlightedFiberType = null;
  isShooting = false;
  shotBubble = null;

  updateUI();
  
  // 그리드 데이터 세팅 (최대 12행, 헥사고날 구조)
  grid = [];
  const rowsCount = 3 + level; // 레벨이 높을수록 행이 많아짐 (최대 7개)
  const maxRows = Math.min(rowsCount, 7);

  for (let r = 0; r < 12; r++) {
    grid[r] = [];
    const cols = (r % 2 === 0) ? 10 : 9;
    for (let c = 0; c < cols; c++) {
      if (r < maxRows) {
        // 완전 무작위 대신 근처에 같은 색상이 뭉칠 확률 부여 (플레이 만족도 증진)
        let type;
        if (c > 0 && Math.random() < 0.35 && grid[r][c-1]) {
          type = grid[r][c-1].type;
        } else if (r > 0 && Math.random() < 0.35 && grid[r-1][c]) {
          type = grid[r-1][c].type;
        } else {
          // 0~9 중 무작위 배정
          type = Math.floor(Math.random() * FIBER_DATA.length);
        }
        
        const pos = getBubbleCenter(r, c);
        grid[r][c] = { type, x: pos.x, y: pos.y };
      } else {
        grid[r][c] = null;
      }
    }
  }

  // 슈터 준비
  setupShooter();

  // 피드백 패널 및 로그 청소
  const logFeed = document.getElementById("log-feed");
  logFeed.innerHTML = `
    <div class="text-xs text-slate-400 p-2 bg-slate-900/30 rounded border border-slate-800/30">
      🎮 게임이 시작되었습니다! 슈터에 장전된 특성 카드를 확인하고, 해당 특성을 가진 섬유(색상/이름)의 묶음을 조준하여 쏘세요!
    </div>
  `;
  document.getElementById("feedback-title").textContent = "도전 시작!";
  document.getElementById("feedback-desc").textContent = "조준 가이드선을 마우스나 터치로 정렬하여 퀴즈 버블을 쏘세요. 알맞은 섬유 버블에 닿으면 터집니다.";
  document.getElementById("feedback-icon-container").innerHTML = `
    <div class="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl">💡</div>
  `;

  // 루프 돌기 시작 (중복 등록 방지)
  if (!gameLoopId) {
    gameLoop();
  }
}

// 7. 슈터 세팅 (그리드에 실제로 남아있는 색상만을 기반으로 퀴즈 공급)
function setupShooter() {
  const activeTypes = getActiveTypesInGrid();
  
  // 그리드에 버블이 아무것도 없다면 승리!
  if (activeTypes.length === 0) {
    triggerGameWin();
    return;
  }

  // 현재 슈터 정하기
  if (!currentShooter) {
    if (nextShooter && activeTypes.includes(nextShooter.type)) {
      // 대기 버블을 현재 버블로 승격 (그리드에 아직 존재하는 타입인 경우에만)
      currentShooter = {
        type: nextShooter.type,
        char: nextShooter.char,
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 50
      };
    } else {
      // 대기 버블이 없거나 해당 섬유 타입이 보드에서 모두 사라진 경우 새로 생성
      const type = getRandomType(activeTypes);
      const char = getRandomChar(type);
      currentShooter = {
        type: type,
        char: char,
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 50
      };
    }
  }

  // 다음 대기 버블 새로 정하기
  const nextType = getRandomType(activeTypes);
  const nextChar = getRandomChar(nextType);
  nextShooter = {
    type: nextType,
    char: nextChar
  };

  updateShooterPanelUI();
}

// 현재 그리드에 활성화된 섬유 타입들 추출
function getActiveTypesInGrid() {
  const types = new Set();
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) {
        types.add(grid[r][c].type);
      }
    }
  }
  return Array.from(types);
}

function getRandomType(activeTypes) {
  if (activeTypes.length === 0) return 0;
  return activeTypes[Math.floor(Math.random() * activeTypes.length)];
}

function getRandomChar(type) {
  const fiber = FIBER_DATA[type];
  const charIdx = Math.floor(Math.random() * fiber.characteristics.length);
  return fiber.characteristics[charIdx];
}

// 8. 캔버스 헥사고날 위치 계산 공식
function getBubbleCenter(row, col) {
  const y = row * ROW_HEIGHT + TOP_OFFSET + BUBBLE_RADIUS;
  let x;
  if (row % 2 === 0) {
    // 10개 열 배치 (양옆 여백 40px)
    x = col * BUBBLE_DIAMETER + 40 + BUBBLE_RADIUS;
  } else {
    // 9개 열 배치 (양옆 여백 60px)
    x = col * BUBBLE_DIAMETER + 60 + BUBBLE_RADIUS;
  }
  return { x, y };
}

// 슈팅 버블 스왑 기능
function swapShooterBubbles() {
  if (isShooting || !currentShooter || !nextShooter) return;

  const tempType = currentShooter.type;
  const tempChar = currentShooter.char;

  currentShooter.type = nextShooter.type;
  currentShooter.char = nextShooter.char;

  nextShooter.type = tempType;
  nextShooter.char = tempChar;

  updateShooterPanelUI();
  playSound("pop");
}

// 9. 포인터(마우스/터치) 조준 방향 업데이트
function handlePointerMove(e) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  pointerX = mx;
  pointerY = my;

  calculateAimAngle();
}

function handleTouchMove(e) {
  if (e.touches.length === 0) return;
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const mx = touch.clientX - rect.left;
  const my = touch.clientY - rect.top;

  pointerX = mx;
  pointerY = my;

  calculateAimAngle();
}

function calculateAimAngle() {
  const shooterX = CANVAS_WIDTH / 2;
  const shooterY = CANVAS_HEIGHT - 50;

  // 방향 계산
  let angle = Math.atan2(pointerY - shooterY, pointerX - shooterX);

  // 아래로 향하는 비정상 각도 잠금 (항상 화면 위쪽 절반을 쏘도록 제한)
  const limit = 0.15; // 라디안
  if (angle > -limit && angle < Math.PI / 2) {
    angle = -limit;
  } else if (angle < Math.PI + limit && angle >= Math.PI / 2) {
    angle = Math.PI + limit;
  }

  aimAngle = angle;
}

function handlePointerClick() {
  fireBubble();
}

function handleTouchEnd(e) {
  e.preventDefault();
  fireBubble();
}

function fireBubble() {
  if (isShooting || !currentShooter) return;

  const vx = Math.cos(aimAngle) * 11; // 탄환 속도
  const vy = Math.sin(aimAngle) * 11;

  shotBubble = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 50,
    vx: vx,
    vy: vy,
    type: currentShooter.type,
    char: currentShooter.char
  };

  isShooting = true;
  playSound("shoot");

  // 슈터 소모 후 로딩
  currentShooter = null;
}

// 10. 조준선 보이기 레이저 가이드선 트레이싱 (벽 반사 1회 포함)
function drawAimGuide() {
  if (isShooting || !currentShooter) return;

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.setLineDash([4, 6]);
  ctx.lineWidth = 2;

  let startX = CANVAS_WIDTH / 2;
  let startY = CANVAS_HEIGHT - 50;
  let dx = Math.cos(aimAngle);
  let dy = Math.sin(aimAngle);

  // 벽 반사를 포함한 점선 그리기
  ctx.beginPath();
  ctx.moveTo(startX, startY);

  // 좌우 벽과의 충돌 시간 계산
  let tWall = Infinity;
  let wallX = 0;

  if (dx < 0) {
    tWall = (BUBBLE_RADIUS - startX) / dx;
    wallX = BUBBLE_RADIUS;
  } else if (dx > 0) {
    tWall = (CANVAS_WIDTH - BUBBLE_RADIUS - startX) / dx;
    wallX = CANVAS_WIDTH - BUBBLE_RADIUS;
  }

  // 상단 벽 충돌 시간
  let tCeiling = (BUBBLE_RADIUS + TOP_OFFSET - startY) / dy;

  // 그리드에 직접 닿는 최조 충돌점 계산
  let hitGrid = false;
  let tHit = Infinity;

  // 가상의 레이로 충돌 검사
  const steps = 80;
  let currX = startX;
  let currY = startY;

  for (let i = 1; i <= steps; i++) {
    currX = startX + dx * (i * 8);
    currY = startY + dy * (i * 8);

    // 좌우 벽 반사 처리
    if (currX <= BUBBLE_RADIUS) {
      currX = BUBBLE_RADIUS;
      dx = -dx;
      startX = currX;
      startY = currY;
      i = 0; // 리셋하여 반사 궤적 연속
      ctx.lineTo(currX, currY);
      continue;
    } else if (currX >= CANVAS_WIDTH - BUBBLE_RADIUS) {
      currX = CANVAS_WIDTH - BUBBLE_RADIUS;
      dx = -dx;
      startX = currX;
      startY = currY;
      i = 0;
      ctx.lineTo(currX, currY);
      continue;
    }

    // 버블 충돌 검사
    const hit = checkCollisionAt(currX, currY);
    if (hit || currY <= BUBBLE_RADIUS + TOP_OFFSET) {
      ctx.lineTo(currX, currY);
      
      // 충돌 지점에 목표물 원 그리기
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = "#818cf8"; // Neutral indigo to avoid spoiler
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(currX, currY, BUBBLE_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      // 조준점 안쪽 크로스헤어
      ctx.beginPath();
      ctx.moveTo(currX - 5, currY); ctx.lineTo(currX + 5, currY);
      ctx.moveTo(currX, currY - 5); ctx.lineTo(currX, currY + 5);
      ctx.stroke();

      break;
    }

    ctx.lineTo(currX, currY);
  }

  ctx.stroke();
  ctx.restore();
}

function checkCollisionAt(x, y) {
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const b = grid[r][c];
      if (b) {
        const dist = Math.hypot(x - b.x, y - b.y);
        if (dist < BUBBLE_DIAMETER - 2) {
          return true;
        }
      }
    }
  }
  return false;
}

// 11. 날아가던 버블 충돌 판단 및 올바른 그리드로 자동 스냅 정렬
function updateShotBubble() {
  if (!isShooting || !shotBubble) return;

  // 이동
  shotBubble.x += shotBubble.vx;
  shotBubble.y += shotBubble.vy;

  // 좌우 벽 튕기기
  if (shotBubble.x - BUBBLE_RADIUS <= 0) {
    shotBubble.x = BUBBLE_RADIUS;
    shotBubble.vx = -shotBubble.vx;
    playSound("pop");
  } else if (shotBubble.x + BUBBLE_RADIUS >= CANVAS_WIDTH) {
    shotBubble.x = CANVAS_WIDTH - BUBBLE_RADIUS;
    shotBubble.vx = -shotBubble.vx;
    playSound("pop");
  }

  // 그리드 내 버블 또는 상단 천장 충돌 체크
  let hasCollided = false;
  if (shotBubble.y - BUBBLE_RADIUS <= TOP_OFFSET) {
    hasCollided = true;
  } else {
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const b = grid[r][c];
        if (b) {
          const dist = Math.hypot(shotBubble.x - b.x, shotBubble.y - b.y);
          if (dist < BUBBLE_DIAMETER - 4) { // 약간의 겹침 판정 허용하여 스무스하게
            hasCollided = true;
            break;
          }
        }
      }
      if (hasCollided) break;
    }
  }

  if (hasCollided) {
    isShooting = false;
    snapToGrid(shotBubble);
    shotBubble = null;
  }
}

// 가장 근접한 빈 벌집 셀에 스냅
function snapToGrid(bubble) {
  let bestRow = -1;
  let bestCol = -1;
  let minDist = Infinity;

  for (let r = 0; r < 12; r++) {
    const cols = (r % 2 === 0) ? 10 : 9;
    for (let c = 0; c < cols; c++) {
      if (!grid[r][c]) {
        const pos = getBubbleCenter(r, c);
        const dist = Math.hypot(bubble.x - pos.x, bubble.y - pos.y);
        if (dist < minDist) {
          minDist = dist;
          bestRow = r;
          bestCol = c;
        }
      }
    }
  }

  if (bestRow !== -1 && bestCol !== -1) {
    const pos = getBubbleCenter(bestRow, bestCol);
    grid[bestRow][bestCol] = {
      type: bubble.type,
      x: pos.x,
      y: pos.y
    };

    // 터질 만한 이웃 그룹 판독 (Flooding)
    processMatching(bestRow, bestCol, bubble.type, bubble.char);
  }
}

// 12. 버블 연쇄 매치 판정 및 피드백 (핵심 게임 규칙!)
function processMatching(row, col, targetType, charText) {
  const matchedList = findConnectedSameType(row, col, targetType);
  const fiber = FIBER_DATA[targetType];

  const feedbackTitleEl = document.getElementById("feedback-title");
  const feedbackDescEl = document.getElementById("feedback-desc");
  const iconContainerEl = document.getElementById("feedback-icon-container");
  const logFeed = document.getElementById("log-feed");

  // 12-1. 매치 성공 (3개 이상 뭉쳤을 때 터짐)
  if (matchedList.length >= 3) {
    // 터지는 이펙트
    matchedList.forEach(([r, c]) => {
      const b = grid[r][c];
      if (b) {
        createExplosion(b.x, b.y, fiber.color);
        createFloatingText(b.x, b.y, "+10", fiber.color);
        grid[r][c] = null;
      }
    });

    // 득점 계산 (콤보 적용)
    const basePoints = matchedList.length * 10;
    const finalPoints = basePoints * combo;
    score += finalPoints;

    playSound("correct");

    // UI 보강 및 최근 피드백 노출
    feedbackTitleEl.className = "font-bold text-lg text-emerald-400 flex items-center gap-1";
    feedbackTitleEl.innerHTML = `
      <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      정답입니다! (+${finalPoints}점)
    `;

    feedbackDescEl.innerHTML = `
      <span class="font-bold text-slate-100">[${fiber.name}]</span> 섬유의 성질인 <span class="underline underline-offset-4 text-emerald-300 font-semibold">"${charText}"</span>을 완벽히 맞추어 <span class="text-emerald-400 font-bold">${matchedList.length}개</span>의 버블이 연쇄적으로 팝! 터졌습니다! ${combo > 1 ? `<span class="bg-violet-900/60 border border-violet-500/50 text-violet-300 font-mono text-[10px] px-1.5 py-0.5 rounded ml-1 animate-pulse">COMBO X${combo}</span>` : ""}
    `;

    iconContainerEl.innerHTML = `
      <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl animate-spin text-white" style="background-color: ${fiber.color}">
        ${fiber.name[0]}
      </div>
    `;

    // 최근 정답 피드백 로그 기록
    const logItem = document.createElement("div");
    logItem.className = "text-xs border-l-4 p-2 bg-slate-900/60 rounded flex flex-col gap-0.5 animate-fade-in";
    logItem.style.borderColor = fiber.color;
    logItem.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="font-bold" style="color: ${fiber.color}">정답! ${fiber.name} (${fiber.english})</span>
        <span class="text-[10px] text-slate-400 font-mono-custom">+${finalPoints}점</span>
      </div>
      <p class="text-[11px] text-slate-300 mt-0.5">"${charText}"은/는 ${fiber.name} 섬유의 대표적인 핵심 특징입니다.</p>
    `;
    logFeed.insertBefore(logItem, logFeed.firstChild);

    // 공중에 떠버린 버블 낙하시키기
    processFloatingBubbles();

    // 콤보 증가
    combo++;
    
    // 도감 반짝 하이라이트 제공 (공부 자극!)
    flashGuidebookCard(targetType);

  } else {
    // 12-2. 쏘았으나 터지지 못했을 때 (단순 부착 또는 잘못 조준한 경우)
    // 인접한 위치에 퀴즈와 일치하는 섬유 버블이 있는 지 여부 판정
    let isCorrectTargetButFew = false;
    const neighbors = getNeighbors(row, col);
    
    for (let i = 0; i < neighbors.length; i++) {
      const [nr, nc] = neighbors[i];
      if (grid[nr][nc] && grid[nr][nc].type === targetType) {
        isCorrectTargetButFew = true;
        break;
      }
    }

    if (isCorrectTargetButFew) {
      // 맞췄는데 개수가 모자란 경우
      playSound("pop");
      feedbackTitleEl.className = "font-bold text-lg text-amber-400 flex items-center gap-1";
      feedbackTitleEl.innerHTML = `💡 옳은 섬유에 조준함`;
      feedbackDescEl.innerHTML = `
        <span class="font-bold text-slate-200">[${fiber.name}]</span> 섬유에 알맞게 맞췄지만, 팝! 터뜨리려면 <strong>동일한 색상/이름 버블이 3개 이상</strong> 연결되어야 합니다. 버블을 조금 더 뭉쳐보세요!
      `;
      iconContainerEl.innerHTML = `
        <div class="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg text-amber-400" style="border-color: ${fiber.color}; background-color: ${fiber.color}22">
          ${fiber.name}
        </div>
      `;
    } else {
      // 퀴즈 매치 실패 (오답 조준)
      playSound("wrong");
      feedbackTitleEl.className = "font-bold text-lg text-rose-400 flex items-center gap-1";
      feedbackTitleEl.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        아쉬운 오답입니다!
      `;
      feedbackDescEl.innerHTML = `
        방금 발사한 퀴즈 특성 <span class="text-rose-300 font-semibold italic">"${charText}"</span>은/는 <span class="font-bold underline text-rose-400" style="color: ${fiber.color}">[${fiber.name}]</span> 섬유의 특성입니다. 왼쪽 도감 카드의 색상과 동일한 버블 그룹에 맞추세요.
      `;
      iconContainerEl.innerHTML = `
        <div class="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-black text-2xl">
          ?
        </div>
      `;

      const logItem = document.createElement("div");
      logItem.className = "text-xs border-l-4 border-rose-500 p-2 bg-slate-900/60 rounded flex flex-col gap-0.5 animate-fade-in";
      logItem.innerHTML = `
        <div class="flex justify-between items-center">
          <span class="font-bold text-rose-400">오답 조준</span>
          <span class="text-[10px] text-slate-500">콤보 리셋</span>
        </div>
        <p class="text-[11px] text-slate-400 mt-0.5">"${charText}"은/는 <span class="font-semibold text-slate-200">${fiber.name}</span>의 특징입니다.</p>
      `;
      logFeed.insertBefore(logItem, logFeed.firstChild);
      
      flashGuidebookCard(targetType);
    }

    // 콤보 리셋
    combo = 1;
  }

  // 득점 UI 갱신
  updateUI();

  // 다음 버블 준비
  setupShooter();
}

// 13. 연결 구조 탐색 알고리즘 (BFS)
function findConnectedSameType(startRow, startCol, targetType) {
  const queue = [[startRow, startCol]];
  const visited = Array(12).fill(0).map(() => Array(10).fill(false));
  visited[startRow][startCol] = true;

  const result = [];

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    result.push([r, c]);

    const neighbors = getNeighbors(r, c);
    neighbors.forEach(([nr, nc]) => {
      if (grid[nr][nc] && !visited[nr][nc]) {
        if (grid[nr][nc].type === targetType) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    });
  }

  return result;
}

// 헥사고날 이웃 판단 (행의 짝홀에 따른 오프셋 분기 필수)
function getNeighbors(r, c) {
  const neighbors = [];
  const cols = (r % 2 === 0) ? 10 : 9;

  // 양옆 이웃
  if (c > 0) neighbors.push([r, c - 1]);
  if (c < cols - 1) neighbors.push([r, c + 1]);

  // 상하 이웃 인덱스 연산
  const upRow = r - 1;
  const downRow = r + 1;

  if (r % 2 === 0) {
    // 짝수 행인 경우 (10개 열) -> 상하행은 9개 열(홀수 행)
    // 윗행
    if (upRow >= 0) {
      if (c - 1 >= 0) neighbors.push([upRow, c - 1]);
      if (c < 9) neighbors.push([upRow, c]);
    }
    // 아랫행
    if (downRow < 12) {
      if (c - 1 >= 0) neighbors.push([downRow, c - 1]);
      if (c < 9) neighbors.push([downRow, c]);
    }
  } else {
    // 홀수 행인 경우 (9개 열) -> 상하행은 10개 열(짝수 행)
    // 윗행
    if (upRow >= 0) {
      neighbors.push([upRow, c]);
      neighbors.push([upRow, c + 1]);
    }
    // 아랫행
    if (downRow < 12) {
      neighbors.push([downRow, c]);
      neighbors.push([downRow, c + 1]);
    }
  }

  // 필터링 (그리드 범위 내 안전성 확보)
  return neighbors.filter(([nr, nc]) => {
    return nr >= 0 && nr < 12 && nc >= 0 && nc < grid[nr].length;
  });
}

// 14. 공중부양 낙하 판정 및 점수 부가 시스템
function processFloatingBubbles() {
  const visited = Array(12).fill(0).map(() => Array(10).fill(false));
  const queue = [];

  // 최상단 천장행(0번 행)에 붙어있는 모든 버블을 큐에 삽입
  for (let c = 0; c < grid[0].length; c++) {
    if (grid[0][c]) {
      visited[0][c] = true;
      queue.push([0, c]);
    }
  }

  // 천장에 직간접적으로 단단히 연결되어 매달린 버블 탐색
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const neighbors = getNeighbors(r, c);

    neighbors.forEach(([nr, nc]) => {
      if (grid[nr][nc] && !visited[nr][nc]) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    });
  }

  // 매달려있지 않은 낙하 대상 버블 골라내어 드롭 효과
  let dropCount = 0;
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] && !visited[r][c]) {
        // 낙하 이펙트용 배열에 이동
        fallingBubbles.push({
          type: grid[r][c].type,
          x: grid[r][c].x,
          y: grid[r][c].y,
          vy: 2, // 하강 속도 시작값
          gravity: 0.35 // 중력 가속도
        });

        // 득점 점수 표시
        createFloatingText(grid[r][c].x, grid[r][c].y, "+15", "#A78BFA");

        grid[r][c] = null;
        dropCount++;
      }
    }
  }

  if (dropCount > 0) {
    // 낙하 보너스 점수 부가 (+15점씩!)
    const dropPoints = dropCount * 15;
    score += dropPoints;

    setTimeout(() => {
      playSound("pop");
    }, 150);

    const logFeed = document.getElementById("log-feed");
    const dropLog = document.createElement("div");
    dropLog.className = "text-xs border-l-4 border-violet-500 p-2 bg-slate-900/60 rounded flex flex-col gap-0.5 animate-fade-in";
    dropLog.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="font-bold text-violet-400">지지대 제거 낙하 보너스!</span>
        <span class="text-[10px] text-slate-400 font-mono-custom">+${dropPoints}점</span>
      </div>
      <p class="text-[11px] text-slate-300 mt-0.5">매달려있던 버블 ${dropCount}개가 지지대를 잃고 우수수 쏟아졌습니다!</p>
    `;
    logFeed.insertBefore(dropLog, logFeed.firstChild);
  }
}

// 15. 이펙트 생성 기능 (파티클 & 플로팅 텍스트)
function createExplosion(x, y, color) {
  const count = 12 + Math.floor(Math.random() * 8);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: color,
      size: 2.5 + Math.random() * 3.5,
      alpha: 1,
      decay: 0.02 + Math.random() * 0.03
    });
  }
}

function createFloatingText(x, y, text, color) {
  floatingTexts.push({
    x: x,
    y: y,
    text: text,
    color: color,
    vy: -0.8,
    alpha: 1,
    life: 50 // 프레임
  });
}

// 16. 게임오버 및 승리 엔드게임 트리거
function triggerGameWin() {
  isGameWin = true;
  playSound("levelup");
  
  // 최고 기록 저장
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("textile_highscore", highScore.toString());
  }

  // 성공 오버레이 표시 및 데이터 매칭
  const winOverlay = document.getElementById("game-win-overlay");
  if (winOverlay) {
    winOverlay.classList.remove("hidden");
    const winScoreEl = document.getElementById("win-score");
    if (winScoreEl) winScoreEl.textContent = `${score.toLocaleString()} 점`;
    const winStageEl = document.getElementById("win-stage");
    if (winStageEl) winStageEl.textContent = `STAGE ${currentLevel}`;
    
    const btnNextStage = document.getElementById("btn-next-stage");
    if (btnNextStage) {
      btnNextStage.onclick = () => startNewGame(currentLevel + 1);
    }
  }

  document.getElementById("feedback-title").className = "font-bold text-xl text-emerald-400 flex items-center gap-1.5 animate-bounce";
  document.getElementById("feedback-title").innerHTML = `🎉 스테이지 ${currentLevel} 클리어!`;
  document.getElementById("feedback-desc").innerHTML = `
    훌륭합니다! 화면의 모든 섬유 버블을 제거하여 미션을 클리어했습니다.<br>
    <button onclick="startNewGame(${currentLevel + 1})" class="mt-4 w-full bg-[#6366f1] hover:bg-[#818cf8] active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer transition-all shadow-lg shadow-indigo-500/20">다음 스테이지 (${currentLevel + 1}) 시작하기</button>
  `;
}

function triggerGameOver() {
  isGameOver = true;
  playSound("gameover");

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("textile_highscore", highScore.toString());
  }

  // 실패 오버레이 표시
  const overOverlay = document.getElementById("game-over-overlay");
  if (overOverlay) {
    overOverlay.classList.remove("hidden");
  }

  document.getElementById("feedback-title").className = "font-bold text-xl text-rose-500 flex items-center gap-1.5";
  document.getElementById("feedback-title").innerHTML = `😢 게임 오버`;
  document.getElementById("feedback-desc").innerHTML = `
    버블 마지노선이 바닥에 닿았습니다! 다시 한번 도전해 보세요.<br>
    <button onclick="startNewGame(1)" class="mt-4 w-full bg-[#ff5d8f] hover:bg-[#ff758f] active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer transition-all shadow-lg shadow-rose-500/20">첫 단계부터 재도전</button>
  `;
}

// 17. 실시간 UI 텍스트 동기화
function updateUI() {
  document.getElementById("score-display").textContent = score.toLocaleString();
  document.getElementById("highscore-display").textContent = highScore.toLocaleString();
  document.getElementById("level-display").textContent = `STAGE ${currentLevel}`;
}

// 장전된 슈터 정보 UI 패널 반영
function updateShooterPanelUI() {
  if (!currentShooter || !nextShooter) return;

  // 장전 퀴즈 보드 갱신 (퀴즈 전 정답 비공개하여 스포 차단)
  const loadedBadgeEl = document.getElementById("loaded-fiber-badge");
  loadedBadgeEl.textContent = "❓ QUIZ";
  loadedBadgeEl.style.backgroundColor = "#475569"; // Neutral slate-600
  loadedBadgeEl.className = `px-3 py-1 rounded-full text-xs font-extrabold text-slate-100 uppercase tracking-wider animate-pulse`;

  document.getElementById("loaded-char-text").innerHTML = `
    <span class="text-indigo-200">"</span>${currentShooter.char}<span class="text-indigo-200">"</span>
  `;

  // 대기 퀴즈 예고판 갱신
  const nextCircleEl = document.getElementById("next-bubble-circle");
  nextCircleEl.style.backgroundColor = "#64748b"; // Neutral slate-500
  nextCircleEl.className = "w-5 h-5 rounded-full border border-white/20 transition-all duration-300";

  document.getElementById("next-fiber-name").textContent = `${nextShooter.char}`;
  document.getElementById("next-char-preview").textContent = nextShooter.char;
}

// 18. 게임 루프 및 렌더링 파이프라인
function gameLoop() {
  if (isGameOver || isGameWin) {
    gameLoopId = null;
    return;
  }

  update();
  render();

  gameLoopId = requestAnimationFrame(gameLoop);
}

// 18-1. 데이터 상태 변화 및 충돌 업데이트
function update() {
  // 날아가는 탄환 버블 물리 연산
  updateShotBubble();

  // 터진 파티클 물리 업데이트 및 소멸
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= p.decay;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  // 낙하 버블 물리 업데이트 및 소멸
  for (let i = fallingBubbles.length - 1; i >= 0; i--) {
    const fb = fallingBubbles[i];
    fb.vy += fb.gravity;
    fb.y += fb.vy;
    if (fb.y - BUBBLE_RADIUS > CANVAS_HEIGHT) {
      fallingBubbles.splice(i, 1);
    }
  }

  // 플로팅 피드백 텍스트 소멸 업데이트
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y += ft.vy;
    ft.life--;
    if (ft.life <= 0) {
      floatingTexts.splice(i, 1);
    }
  }

  // 버블 가득 차서 바닥에 도달했는지 확인 (패배 조건 판단)
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) {
        // 11행 아래로 내려온 버블이 있으면 게임오버
        if (r >= 11) {
          triggerGameOver();
          return;
        }
      }
    }
  }
}

// 18-2. 캔버스 수동 드로잉 구현 (파티클, 아웃라인, 고해상도 처리)
function render() {
  // 화면 비우기 및 배경 그리기
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // 미세 그리드 격자 백그라운드 디자인
  ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
  ctx.lineWidth = 1;
  for (let x = 0; x < CANVAS_WIDTH; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y < CANVAS_HEIGHT; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y);
    ctx.stroke();
  }

  // 천장 한계선 및 상단 경계선 그리기
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, CANVAS_WIDTH, TOP_OFFSET);
  
  ctx.fillStyle = "#475569";
  ctx.fillRect(0, TOP_OFFSET, CANVAS_WIDTH, 4);

  // 상단 텍스트 경고 메시지
  ctx.fillStyle = "#94a3b8";
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("--- 🎯 TEXTILE CEILING LIMIT ---", CANVAS_WIDTH / 2, TOP_OFFSET - 12);

  // 조준 가이드선 그리기
  drawAimGuide();

  // 1) 고정 정렬된 그리드 버블 렌더링
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const bubble = grid[r][c];
      if (bubble) {
        drawBubble(bubble.x, bubble.y, bubble.type, false);
      }
    }
  }

  // 하단 위험 한계선 그리기 (그 아래로 내려오면 실패)
  const limitY = 11 * ROW_HEIGHT + TOP_OFFSET;
  ctx.save();
  ctx.strokeStyle = "#ff477e"; // Cute neon bubble rose
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(0, limitY);
  ctx.lineTo(CANVAS_WIDTH, limitY);
  ctx.stroke();
  ctx.restore();

  // 경고 메세지 라벨 그리기 (반투명 파스텔 배경)
  ctx.save();
  ctx.fillStyle = "rgba(255, 71, 126, 0.15)";
  ctx.fillRect(0, limitY, CANVAS_WIDTH, 20);
  ctx.fillStyle = "#ff477e";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🚨 위험 한계선 (여기를 넘어가면 게임오버!) 🚨", CANVAS_WIDTH / 2, limitY + 10);
  ctx.restore();

  // 2) 떨어지고 있는 고아 버블 렌더링
  fallingBubbles.forEach(fb => {
    drawBubble(fb.x, fb.y, fb.type, true);
  });

  // 3) 발사되어 비행 중인 퀴즈 탄환 버블 렌더링
  if (isShooting && shotBubble) {
    drawBubble(shotBubble.x, shotBubble.y, shotBubble.type, false, true);
    
    // 비행 버블 꼬리 트레일 이펙트 (중립적인 색상의 트레일)
    ctx.beginPath();
    ctx.arc(shotBubble.x, shotBubble.y, BUBBLE_RADIUS - 1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
    ctx.fill();

    // 버블 위에 섬유 특성 텍스트 라벨 출력
    drawQuizLabel(shotBubble.x, shotBubble.y, shotBubble.char);
  }

  // 4) 대기 중인 슈터 대포 렌더링
  if (!isShooting && currentShooter) {
    // 회전 대포 기계 부속 렌더링
    ctx.save();
    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
    ctx.rotate(aimAngle + Math.PI / 2);

    // 대포 배럴
    ctx.fillStyle = "#334155";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-16, -55, 32, 60, [8, 8, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // 배럴 내부 탄약 가이드링 (중립적인 indigo 가이드라인)
    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -25, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // 장전되어 회전축 중앙에 대기 중인 퀴즈 버블 그리기 (중립 회색 버블로 그려 스포 방지)
    drawBubble(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50, currentShooter.type, false, true);

    // 버블 위에 섬유 특성 텍스트 라벨 출력
    drawQuizLabel(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50, currentShooter.char);
  }

  // 슈터 하단 회전 거치대 베이스
  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 대기 구체 조명 하이라이트
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(CANVAS_WIDTH / 2 - 6, CANVAS_HEIGHT - 50 - 6, 4, 0, Math.PI * 2);
  ctx.fill();

  // 5) 터지는 먼지 파티클 파편 드로잉
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // 6) 플로팅 스코어 텍스트 드로잉
  floatingTexts.forEach(ft => {
    ctx.save();
    ctx.fillStyle = ft.color;
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.restore();
  });
}

// 퀴즈용 버블 위/옆 텍스트 라벨 그리기 (섬유 특성 표시용 툴팁 패널)
function drawQuizLabel(x, y, text) {
  if (!text) return;
  ctx.save();
  ctx.font = "bold 11px sans-serif";
  const textWidth = ctx.measureText(text).width;
  const padX = 8;
  const padY = 5;
  const rectW = textWidth + padX * 2;
  const rectH = 20;
  const rx = x - rectW / 2;
  const ry = y - BUBBLE_RADIUS - 24; // 버블 위쪽 24px 공간에 배치

  // 말풍선 사각형 그리기 (심플하고 모던한 다크 둥근 사각형)
  ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
  ctx.strokeStyle = "#818cf8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(rx, ry, rectW, rectH, 6);
  } else {
    ctx.rect(rx, ry, rectW, rectH);
  }
  ctx.fill();
  ctx.stroke();

  // 말풍선 아래의 작은 삼각형 지시선
  ctx.fillStyle = "#818cf8";
  ctx.beginPath();
  ctx.moveTo(x - 4, ry + rectH);
  ctx.lineTo(x + 4, ry + rectH);
  ctx.lineTo(x, ry + rectH + 4);
  ctx.closePath();
  ctx.fill();

  // 텍스트 출력
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, ry + rectH / 2);
  ctx.restore();
}

// 개별 버블 그리기 (입체감 있는 그라데이션 및 글씨 표시)
function drawBubble(x, y, type, isFalling, isShooterOrFlying = false) {
  const fiber = FIBER_DATA[type];
  if (!fiber) return;

  ctx.save();

  // 현재 도감 호버에 의해 하이라이트 활성화된 섬유인 경우 후광 빛무리 드로잉
  if (highlightedFiberType === type && !isShooterOrFlying) {
    ctx.shadowColor = fiber.color;
    ctx.shadowBlur = 14;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, BUBBLE_RADIUS + 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 슈터나 비행 중인 버블일 때는 정답 유추 스포를 방지하는 실버/그레이 계열 색상 적용
  let mainColor = fiber.color;
  if (isShooterOrFlying) {
    mainColor = "#64748b"; // 스포가 되지 않는 중립적인 slate-500 실버블루 그레이
  }

  // 3D 입체 그라데이션 광원 설정
  const gradient = ctx.createRadialGradient(
    x - BUBBLE_RADIUS / 2.5, y - BUBBLE_RADIUS / 2.5, 1,
    x, y, BUBBLE_RADIUS
  );
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.2, mainColor);
  gradient.addColorStop(1, adjustColorDarkness(mainColor, -50));

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, BUBBLE_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  // 버블 외곽선 정의
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // 텍스트 출력
  if (isShooterOrFlying) {
    // 퀴즈 슈터/탄환 버블에는 퀴즈 마크 "❓"를 표시하여 학습 유도
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("❓", x, y);
  } else if (!isFalling) {
    // 그리드에 맞춰진 일반 버블들에는 한글 섬유 이름을 선명하게 출력
    ctx.fillStyle = (fiber.textClass === "text-white") ? "#ffffff" : "#0f172a";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 1.5;
    ctx.fillText(fiber.name, x, y);
  }

  // 투명한 볼록 반사 맺힘빛 (Glossy 맺힘 하이라이트)
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.beginPath();
  ctx.ellipse(x - 5, y - 6, 4, 2, -Math.PI/6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 입체감을 위한 그라데이션 그림자 어둡게 가공 헬퍼
function adjustColorDarkness(hex, percent) {
  let num = parseInt(hex.replace("#",""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}
