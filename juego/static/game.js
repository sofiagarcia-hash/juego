
"use strict";

// =============================================
// ENGLISH QUEST: THE ROAD TO WORDLAND
// Cámara dinámica + bosque detallado + personajes animados
// =============================================

const $ = id => document.getElementById(id);

const STORAGE_KEY = "englishQuestRoadToWordland";
const W = 900;
const H = 520;

// =============================================
// DIMENSIONES DEL MUNDO
// =============================================

const WORLD_W = 1800;
const WORLD_H = 1300;

const camera = {
  x: 0,
  y: 0,
  smoothing: 0.09
};

// =============================================
// MUNDOS Y PREGUNTAS
// =============================================

const worldData = [
  {
    id: 1,
    name: "Beginner Forest",
    difficulty: "EASY",
    color: "#76bf57",
    description: "Aprendé saludos, colores y vocabulario básico.",
    npc: "Eira",
    role: "Forest Guide",
    intro: "Hello, adventurer! Can you help me learn English?",
    x: 155,
    y: 340,
    questions: [
      {
        q: "How do you say 'hola' in English?",
        options: ["Hello", "Goodbye", "Thanks"],
        answer: 0,
        acceptedAnswers: ["hello", "hi", "hola"],
        tip: "Hello significa hola. También podés usar Hi para saludar."
      },
      {
        q: "Choose the correct color: the sky is...",
        options: ["Green", "Blue", "Black"],
        answer: 1,
        acceptedAnswers: ["blue", "azul"],
        tip: "Blue significa azul. The sky is blue = El cielo es azul."
      },
      {
        q: "What is the opposite of 'big'?",
        options: ["Tall", "Small", "Long"],
        answer: 1,
        acceptedAnswers: ["small", "pequeño", "pequena", "chico", "chica"],
        tip: "Small significa pequeño. Es lo contrario de big (grande)."
      },
      {
        q: "Complete: I ___ a student.",
        options: ["am", "is", "are"],
        answer: 0,
        acceptedAnswers: ["am", "i am", "i am a student"],
        tip: "Con I usamos am. La frase completa es: I am a student."
      },
      {
        q: "What does 'apple' mean?",
        options: ["Manzana", "Naranja", "Pan"],
        answer: 0,
        acceptedAnswers: ["manzana"],
        tip: "Apple significa manzana."
      }
    ]
  },
  {
    id: 2,
    name: "River Valley",
    difficulty: "MEDIUM",
    color: "#5db7dc",
    description: "Practicá acciones, lugares y frases cotidianas.",
    npc: "Milo",
    role: "River Merchant",
    intro: "Welcome to the valley! Let's practice everyday English.",
    x: 340,
    y: 235,
    questions: [
      {
        q: "Complete: She ___ to school every day.",
        options: ["go", "goes", "going"],
        answer: 1,
        acceptedAnswers: ["goes", "she goes", "she goes to school every day"],
        tip: "Con she en presente simple agregamos -s o -es al verbo."
      },
      {
        q: "What does 'behind' mean?",
        options: ["Delante de", "Debajo de", "Detrás de"],
        answer: 2,
        acceptedAnswers: ["detras de", "detras", "behind"],
        tip: "Behind significa detrás de."
      },
      {
        q: "Choose the past of 'go'.",
        options: ["Goed", "Went", "Gone"],
        answer: 1,
        acceptedAnswers: ["went"],
        tip: "Went es el pasado simple de go (ir)."
      },
      {
        q: "Complete: There ___ two books.",
        options: ["is", "are", "am"],
        answer: 1,
        acceptedAnswers: ["are", "there are", "there are two books"],
        tip: "There are se usa con sustantivos plurales."
      },
      {
        q: "What does 'hungry' mean?",
        options: ["Cansado", "Hambriento", "Enojado"],
        answer: 1,
        acceptedAnswers: ["hambriento", "hambrienta", "tener hambre"],
        tip: "Hungry significa tener hambre."
      }
    ]
  },
  {
    id: 3,
    name: "Frozen Mountains",
    difficulty: "HARD",
    color: "#a5e6ed",
    description: "Superá desafíos de gramática y comprensión.",
    npc: "Frost",
    role: "Mountain Scholar",
    intro: "The mountain is cold, but your English can be strong!",
    x: 535,
    y: 155,
    questions: [
      {
        q: "Complete: If I ___ time, I would travel.",
        options: ["have", "had", "will have"],
        answer: 1,
        acceptedAnswers: ["had", "if i had time"],
        tip: "En el segundo condicional usamos if + pasado simple."
      },
      {
        q: "Choose the correct sentence.",
        options: ["He have finished.", "He has finished.", "He finished has."],
        answer: 1,
        acceptedAnswers: ["he has finished", "he's finished"],
        tip: "Con he usamos has. La frase correcta es He has finished."
      },
      {
        q: "What does 'although' mean?",
        options: ["Aunque", "Por eso", "Mientras"],
        answer: 0,
        acceptedAnswers: ["aunque"],
        tip: "Although significa aunque."
      },
      {
        q: "Complete: This is the ___ mountain in the region.",
        options: ["higher", "highest", "high"],
        answer: 1,
        acceptedAnswers: ["highest"],
        tip: "Para el superlativo usamos the highest."
      },
      {
        q: "Choose the correct passive form: The cake ___ yesterday.",
        options: ["was baked", "baked", "is bake"],
        answer: 0,
        acceptedAnswers: ["was baked", "the cake was baked"],
        tip: "La voz pasiva en pasado se forma con was/were + participio."
      }
    ]
  },
  {
    id: 4,
    name: "Wordland Castle",
    difficulty: "PRO",
    color: "#bd8ce8",
    description: "El desafío final: inglés avanzado y situaciones laborales.",
    npc: "King Rowan",
    role: "Guardian of Wordland",
    intro: "You have reached Wordland. Prove your mastery of English!",
    x: 735,
    y: 95,
    questions: [
      {
        q: "Choose the most natural formal request.",
        options: [
          "Give me the report.",
          "Could you send me the report, please?",
          "You send report now."
        ],
        answer: 1,
        acceptedAnswers: [
          "could you send me the report please",
          "could you send me the report"
        ],
        tip: "Could you... please? es una forma cortés de pedir algo."
      },
      {
        q: "Complete: By next June, I ___ here for five years.",
        options: ["will have worked", "work", "am working"],
        answer: 0,
        acceptedAnswers: ["will have worked"],
        tip: "El future perfect expresa una acción completada para un momento futuro."
      },
      {
        q: "What does 'reliable' mean?",
        options: ["Confiable", "Ruidoso", "Costoso"],
        answer: 0,
        acceptedAnswers: ["confiable", "fiable"],
        tip: "Reliable significa confiable."
      },
      {
        q: "Choose the correct reported speech: She said, 'I am tired.'",
        options: [
          "She said she is tired.",
          "She said she was tired.",
          "She says she tired."
        ],
        answer: 1,
        acceptedAnswers: ["she said she was tired"],
        tip: "En estilo indirecto, am suele pasar a was."
      },
      {
        q: "A colleague says 'I appreciate your help.' What does it mean?",
        options: [
          "Rechazo tu ayuda.",
          "Agradezco tu ayuda.",
          "Necesito más ayuda."
        ],
        answer: 1,
        acceptedAnswers: ["agradezco tu ayuda", "te agradezco tu ayuda"],
        tip: "I appreciate your help expresa agradecimiento."
      }
    ]
  }
];

// =============================================
// ESTADO
// =============================================

let state = {
  name: "",
  xp: 0,
  coins: 0,
  lives: 5,
  unlocked: 1,
  completed: [],
  worldProgress: {}
};

let currentWorld = 1;
let currentQuestion = 0;
let answered = false;
let mode = "menu";
let activeNpc = null;

const player = {
  x: 450,
  y: 435,
  size: 24,
  speed: 3.2,
  direction: "down"
};

// =============================================
// BOSQUE: PERSONAJES Y ELEMENTOS
// =============================================

const FOREST_NPC = {
  x: 450,
  y: 205
};

// Árboles repartidos por el mapa grande.
// Cada árbol tiene su propia escala.

const FOREST_TREES = [
  { x: 85, y: 95, s: 1.15 },
  { x: 190, y: 75, s: 0.95 },
  { x: 310, y: 105, s: 1.2 },
  { x: 565, y: 95, s: 0.95 },
  { x: 810, y: 85, s: 1.15 },
  { x: 855, y: 190, s: 1.0 },
  { x: 125, y: 245, s: 1.15 },
  { x: 270, y: 310, s: 1.1 },
  { x: 350, y: 430, s: 1.05 },
  { x: 575, y: 350, s: 1.15 },
  { x: 820, y: 405, s: 1.1 },
  { x: 115, y: 455, s: 1.05 },
  { x: 735, y: 480, s: 0.95 },
  { x: 330, y: 200, s: 0.8 },
  { x: 680, y: 245, s: 0.9 },

  { x: 1030, y: 80, s: 1.2 },
  { x: 1190, y: 125, s: 1.0 },
  { x: 1450, y: 80, s: 1.15 },
  { x: 1650, y: 145, s: 1.1 },

  { x: 1000, y: 330, s: 1.1 },
  { x: 1150, y: 440, s: 1.25 },
  { x: 1500, y: 350, s: 1.1 },
  { x: 1690, y: 450, s: 1.2 },

  { x: 80, y: 680, s: 1.2 },
  { x: 250, y: 790, s: 1.1 },
  { x: 490, y: 690, s: 1.0 },
  { x: 820, y: 780, s: 1.25 },
  { x: 1040, y: 700, s: 1.0 },
  { x: 1390, y: 750, s: 1.15 },
  { x: 1660, y: 680, s: 1.2 },

  { x: 100, y: 1020, s: 1.1 },
  { x: 340, y: 1150, s: 1.2 },
  { x: 590, y: 1030, s: 1.1 },
  { x: 900, y: 1150, s: 1.2 },
  { x: 1200, y: 1030, s: 1.15 },
  { x: 1510, y: 1130, s: 1.2 },
  { x: 1710, y: 1000, s: 1.0 }
];

// Puntos aproximados del río para las colisiones.

const FOREST_RIVER = [
  { x: 1120, y: -30 },
  { x: 1060, y: 70 },
  { x: 1090, y: 155 },
  { x: 1180, y: 245 },
  { x: 1160, y: 330 },
  { x: 1080, y: 425 },
  { x: 1120, y: 550 },
  { x: 1220, y: 650 },
  { x: 1300, y: 760 },
  { x: 1260, y: 880 },
  { x: 1170, y: 990 },
  { x: 1230, y: 1120 },
  { x: 1320, y: 1330 }
];

const keys = new Set();

// =============================================
// CANVAS
// =============================================

const mapCanvas = $("world-map");
const mapCtx = mapCanvas.getContext("2d");

const gameCanvas = $("game-canvas");
const gameCtx = gameCanvas.getContext("2d");

// =============================================
// INTELIGENCIA ARTIFICIAL
// =============================================

let languageModel = null;
let aiLoading = false;

async function loadAI() {
  const status = $("voice-status");

  if (!status) return;

  if (!window.use || typeof window.use.load !== "function") {
    status.textContent =
      "Modelo de IA no disponible. Podés jugar igualmente.";
    return;
  }

  try {
    aiLoading = true;
    status.textContent = "Cargando inteligencia artificial...";

    languageModel = await window.use.load();

    status.textContent =
      "¡IA lista! Podés escribir o hablar en inglés.";

  } catch (error) {
    console.error("Error al cargar TensorFlow:", error);

    status.textContent =
      "La IA no está disponible. Podés usar respuestas exactas.";

  } finally {
    aiLoading = false;
  }
}

// =============================================
// RECONOCIMIENTO DE VOZ
// =============================================

let recognition = null;

function startVoiceRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    $("voice-status").textContent =
      "Tu navegador no permite reconocimiento de voz. Probá con Chrome.";
    return;
  }

  if (recognition) {
    recognition.stop();
    recognition = null;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  $("voice-status").textContent =
    "Escuchando... ¡Hablá en inglés!";

  try {
    recognition.onresult = event => {
      const spokenText = event.results[0][0].transcript;

      $("written-answer").value = spokenText;

      $("voice-status").textContent =
        `Escuché: "${spokenText}". Ahora comprobá tu respuesta.`;
    };

    recognition.onerror = event => {
      console.error("Error de reconocimiento:", event.error);

      $("voice-status").textContent =
        "No pude reconocer tu voz. Revisá el micrófono e intentá otra vez.";
    };

    recognition.onend = () => {
      recognition = null;
    };

    recognition.start();

  } catch (error) {
    console.error("No se pudo iniciar el micrófono:", error);

    $("voice-status").textContent =
      "No se pudo iniciar el micrófono. Intentá nuevamente.";
  }
}

// =============================================
// RESPUESTAS ESCRITAS
// =============================================

function normalizeAnswer(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,!?;:'"]/g, "")
    .replace(/\s+/g, " ");
}

async function calculateSimilarity(textA, textB) {
  if (!languageModel) return 0;

  let embeddings;

  try {
    embeddings = await languageModel.embed([textA, textB]);

    const vectors = await embeddings.array();
    const a = vectors[0];
    const b = vectors[1];

    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    if (!normA || !normB) return 0;

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));

  } catch (error) {
    console.error("Error al comparar respuestas:", error);
    return 0;

  } finally {
    if (embeddings) embeddings.dispose();
  }
}

async function checkWrittenAnswer() {
  if (answered) return;

  const input = $("written-answer").value.trim();

  if (!input) {
    toast("Primero escribí o decí tu respuesta.");
    $("written-answer").focus();
    return;
  }

  const world = worldData.find(w => w.id === currentWorld);
  const question = world.questions[currentQuestion];

  const correctAnswer = question.options[question.answer];
  const userAnswer = normalizeAnswer(input);

  const acceptedAnswers = [
    correctAnswer,
    ...(question.acceptedAnswers || [])
  ].map(normalizeAnswer);

  let isCorrect = acceptedAnswers.includes(userAnswer);
  let feedbackMessage = "";

  if (!isCorrect && languageModel) {
    $("voice-status").textContent =
      "La inteligencia artificial está analizando tu respuesta...";

    const similarity = await calculateSimilarity(
      input,
      correctAnswer
    );

    isCorrect = similarity >= 0.84;

    if (isCorrect) {
      feedbackMessage =
        "¡Tu respuesta tiene un significado muy parecido al correcto!";
    }
  }

  if (!isCorrect) {
    feedbackMessage =
      `Tu respuesta fue: "${input}". La respuesta esperada es: "${correctAnswer}".`;
  }

  $("voice-status").textContent =
    languageModel
      ? "Análisis terminado."
      : "Respuesta comprobada.";

  answerQuestion(
    isCorrect ? question.answer : -1,
    null,
    feedbackMessage
  );
}

// =============================================
// GUARDADO
// =============================================

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };

      if (!state.worldProgress) state.worldProgress = {};
      if (!Array.isArray(state.completed)) state.completed = [];
    }

  } catch (error) {
    console.error("No se pudo leer el guardado:", error);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  } catch (error) {
    console.error("No se pudo guardar:", error);
    toast("No se pudo guardar el progreso en este navegador.");
  }
}

// =============================================
// MENSAJES Y PANTALLAS
// =============================================

function toast(message) {
  const el = $("toast");

  el.textContent = message;
  el.classList.remove("hidden");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    el.classList.add("hidden");
  }, 2600);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => {
    el.classList.add("hidden");
  });

  $(id).classList.remove("hidden");

  $("hud").classList.toggle("hidden", id === "title-screen");
}

function updateHUD() {
  $("hud-name").textContent = state.name || "Aventurero";
  $("hud-lives").textContent = state.lives;
  $("hud-xp").textContent = state.xp;
  $("hud-coins").textContent = state.coins;
}

// =============================================
// INICIO Y CONTINUACIÓN
// =============================================

function startNewGame() {
  const name = $("player-name").value.trim();

  if (!name) {
    toast("¡Escribí el nombre de tu aventurero!");
    $("player-name").focus();
    return;
  }

  state = {
    name: name.slice(0, 18),
    xp: 0,
    coins: 0,
    lives: 5,
    unlocked: 1,
    completed: [],
    worldProgress: {}
  };

  currentWorld = 1;

  saveState();
  updateHUD();
  openMap();
}

function continueGame() {
  loadState();

  if (!state.name) {
    toast("Todavía no hay una aventura guardada. ¡Creá tu personaje!");
    return;
  }

  updateHUD();
  openMap();
}

function openMap() {
  mode = "map";
  activeNpc = null;

  keys.clear();
  closeOverlays();
  updateHUD();
  drawMap();

  showScreen("map-screen");
  updateWorldInfo(currentWorld);
}

function closeOverlays() {
  $("dialog-overlay").classList.add("hidden");
  $("question-overlay").classList.add("hidden");
}

// =============================================
// MAPA DE MUNDOS
// =============================================

function updateWorldInfo(id) {
  const world = worldData.find(w => w.id === id);

  $("world-title").textContent = world.name;
  $("world-difficulty").textContent = world.difficulty;
  $("world-description").textContent = world.description;

  const unlocked = id <= state.unlocked;
  const completed = state.completed.includes(id);

  $("world-status").textContent = completed
    ? "★ Mundo completado"
    : unlocked ? "✓ Disponible" : "🔒 Bloqueado";

  $("select-world-button").disabled = !unlocked;

  drawMap();
}

function drawMap() {
  const c = mapCtx;

  c.clearRect(0, 0, 900, 500);

  c.fillStyle = "#72b85c";
  c.fillRect(0, 0, 900, 500);

  for (let i = 0; i < 7; i++) {
    c.fillStyle = i % 2 ? "#5aa64d" : "#83c86a";

    c.beginPath();
    c.ellipse(
      i * 155 + 40,
      70 + (i % 3) * 120,
      110,
      75,
      0,
      0,
      Math.PI * 2
    );

    c.fill();
  }

  c.fillStyle = "#4db6df";

  c.beginPath();
  c.moveTo(650, 0);
  c.bezierCurveTo(570, 120, 820, 230, 680, 500);
  c.lineTo(790, 500);
  c.bezierCurveTo(900, 250, 700, 120, 780, 0);
  c.closePath();
  c.fill();

  const points = worldData.map(w => ({
    x: w.x,
    y: w.y
  }));

  c.strokeStyle = "#a57b4e";
  c.lineWidth = 30;
  c.lineCap = "round";

  c.beginPath();

  points.forEach((p, i) => {
    i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y);
  });

  c.stroke();

  c.strokeStyle = "#e7c88a";
  c.lineWidth = 20;
  c.stroke();

  for (let i = 0; i < 30; i++) {
    const x = (i * 97 + 20) % 875 + 12;
    const y = (i * 61 + 20) % 470 + 12;

    c.fillStyle = "#65442d";
    c.fillRect(x - 4, y, 8, 16);

    c.fillStyle = i % 2 ? "#22663d" : "#32854a";
    c.fillRect(x - 13, y - 12, 26, 20);
    c.fillRect(x - 8, y - 19, 16, 10);
  }

  worldData.forEach(world => {
    const unlocked = world.id <= state.unlocked;
    const selected = currentWorld === world.id;
    const completed = state.completed.includes(world.id);

    c.fillStyle = "#463a31";
    c.fillRect(world.x - 26, world.y - 24, 52, 52);

    c.fillStyle = unlocked ? world.color : "#5d5d65";
    c.fillRect(world.x - 23, world.y - 27, 46, 46);

    c.strokeStyle = selected ? "#fff5a1" : "#3a302a";
    c.lineWidth = selected ? 5 : 3;
    c.strokeRect(world.x - 23, world.y - 27, 46, 46);

    c.fillStyle = "#ffffff";
    c.font = "bold 20px monospace";
    c.textAlign = "center";
    c.textBaseline = "middle";

    c.fillText(
      unlocked ? String(world.id) : "🔒",
      world.x,
      world.y - 4
    );

    c.fillStyle = "#18371f";
    c.font = "bold 12px sans-serif";
    c.fillText(world.name, world.x, world.y + 34);

    if (completed) {
      c.fillStyle = "#fff36c";
      c.font = "bold 22px sans-serif";
      c.fillText("★", world.x + 24, world.y - 23);
    }
  });
}

function selectWorldFromCanvas(event) {
  const rect = mapCanvas.getBoundingClientRect();

  const x = (event.clientX - rect.left) * 900 / rect.width;
  const y = (event.clientY - rect.top) * 500 / rect.height;

  for (const world of worldData) {
    if (
      Math.abs(x - world.x) < 32 &&
      Math.abs(y - world.y) < 32
    ) {
      currentWorld = world.id;
      updateWorldInfo(currentWorld);

      if (world.id > state.unlocked) {
        toast("Completá el mundo anterior para desbloquear este.");
      }

      return;
    }
  }
}

// =============================================
// ENTRAR A UN MUNDO
// =============================================

function enterWorld() {
  const world = worldData.find(w => w.id === currentWorld);

  if (!world || currentWorld > state.unlocked) {
    toast("Este mundo todavía está bloqueado.");
    return;
  }

  mode = "game";
  keys.clear();

  if (currentWorld === 1) {
    player.x = 450;
    player.y = 435;
  } else {
    player.x = 450;
    player.y = 300;
  }

  player.direction = "down";

  $("room-title").textContent = world.name;

  $("room-difficulty").textContent =
    `WORLD ${world.id} · ${world.difficulty}`;

  $("game-message").textContent =
    `Estás en ${world.name}. Acercate a ${world.npc} y presioná E para hablar.`;

  camera.x = 0;
  camera.y = 0;

  showScreen("game-screen");

  gameCanvas.focus();
  drawRoom();
}

// =============================================
// CÁMARA QUE SIGUE AL JUGADOR
// =============================================

function updateCamera() {
  if (currentWorld !== 1) return;

  // La cámara intenta mantener al jugador cerca
  // del centro de la pantalla.
  const targetX = player.x - W / 2;
  const targetY = player.y - H * 0.65;

  // Evita mostrar zonas fuera del mapa.
  const maxX = WORLD_W - W;
  const maxY = WORLD_H - H;

  const boundedX = Math.max(0, Math.min(maxX, targetX));
  const boundedY = Math.max(0, Math.min(maxY, targetY));

  // Movimiento suave de cámara.
  camera.x += (boundedX - camera.x) * camera.smoothing;
  camera.y += (boundedY - camera.y) * camera.smoothing;

  if (Math.abs(camera.x - boundedX) < 0.5) {
    camera.x = boundedX;
  }

  if (Math.abs(camera.y - boundedY) < 0.5) {
    camera.y = boundedY;
  }
}

// =============================================
// FONDO DEL BOSQUE
// =============================================

function drawForestGround(c) {
  const grass = c.createLinearGradient(
    0, 0,
    WORLD_W, WORLD_H
  );

  grass.addColorStop(0, "#183c2b");
  grass.addColorStop(0.5, "#245438");
  grass.addColorStop(1, "#142f25");

  c.fillStyle = grass;
  c.fillRect(0, 0, WORLD_W, WORLD_H);

  // Textura determinista del terreno.
  // Se calcula solo la zona visible por la cámara.

  const startX = Math.max(0, Math.floor(camera.x / 40) * 40);
  const endX = Math.min(WORLD_W, camera.x + W + 40);

  const startY = Math.max(0, Math.floor(camera.y / 40) * 40);
  const endY = Math.min(WORLD_H, camera.y + H + 40);

  for (let y = startY; y < endY; y += 40) {
    for (let x = startX; x < endX; x += 40) {
      const seed = (x * 13 + y * 7) % 5;

      c.fillStyle = seed === 0
        ? "rgba(125,170,92,0.13)"
        : "rgba(5,22,16,0.13)";

      c.fillRect(x + seed, y + 3, 3, 3);

      c.strokeStyle = "rgba(142,184,105,0.3)";
      c.lineWidth = 1;

      c.beginPath();
      c.moveTo(x + 12, y + 28);
      c.lineTo(x + 10, y + 22);
      c.moveTo(x + 12, y + 28);
      c.lineTo(x + 16, y + 23);
      c.stroke();
    }
  }
}

// =============================================
// RÍO
// =============================================

function traceForestRiver(c) {
  c.beginPath();

  c.moveTo(1120, -30);

  c.bezierCurveTo(
    1060, 70,
    1090, 155,
    1180, 245
  );

  c.bezierCurveTo(
    1270, 330,
    1160, 330,
    1080, 425
  );

  c.bezierCurveTo(
    1000, 530,
    1140, 600,
    1220, 650
  );

  c.bezierCurveTo(
    1320, 750,
    1300, 760,
    1260, 880
  );

  c.bezierCurveTo(
    1220, 960,
    1170, 990,
    1230, 1120
  );

  c.bezierCurveTo(
    1280, 1210,
    1320, 1280,
    1320, 1330
  );
}

function drawForestRiver(c) {
  traceForestRiver(c);

  c.strokeStyle = "#132b2b";
  c.lineWidth = 120;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.stroke();

  traceForestRiver(c);

  const water = c.createLinearGradient(
    1000, 0,
    1330, WORLD_H
  );

  water.addColorStop(0, "#174e70");
  water.addColorStop(0.5, "#247e9c");
  water.addColorStop(1, "#123f63");

  c.strokeStyle = water;
  c.lineWidth = 94;
  c.stroke();

  // Reflejos animados.
  const time = performance.now();

  traceForestRiver(c);

  c.save();
  c.strokeStyle = "rgba(146,220,226,0.42)";
  c.lineWidth = 3;
  c.setLineDash([15, 28]);
  c.lineDashOffset = -time / 110;
  c.stroke();
  c.restore();

  traceForestRiver(c);

  c.save();
  c.strokeStyle = "rgba(190,235,232,0.22)";
  c.lineWidth = 2;
  c.setLineDash([5, 38]);
  c.lineDashOffset = time / 160;
  c.stroke();
  c.restore();
}

// =============================================
// ÁRBOLES CON FORMA NATURAL
// =============================================

function drawTree(c, tree, time) {
  const x = tree.x;
  const y = tree.y;
  const s = tree.s;

  // Leve movimiento de hojas.
  const sway = Math.sin(time / 1100 + x * 0.02) * 0.035;

  c.save();

  c.translate(x, y);
  c.scale(s, s);

  // Sombra del árbol.
  c.fillStyle = "rgba(0,0,0,0.38)";

  c.beginPath();
  c.ellipse(9, 14, 42, 20, 0.15, 0, Math.PI * 2);
  c.fill();

  // Raíces.
  c.fillStyle = "#493326";

  c.beginPath();
  c.moveTo(-8, 0);
  c.lineTo(-24, 17);
  c.lineTo(-11, 13);
  c.lineTo(0, 18);
  c.lineTo(10, 13);
  c.lineTo(25, 17);
  c.lineTo(9, -2);
  c.closePath();
  c.fill();

  // Tronco principal.
  const trunk = c.createLinearGradient(-12, 0, 13, 0);

  trunk.addColorStop(0, "#36251e");
  trunk.addColorStop(0.45, "#805238");
  trunk.addColorStop(1, "#3e2a22");

  c.fillStyle = trunk;

  c.beginPath();
  c.moveTo(-9, 7);
  c.lineTo(-7, -35);
  c.lineTo(-4, -64);
  c.lineTo(5, -64);
  c.lineTo(8, -35);
  c.lineTo(11, 8);
  c.closePath();
  c.fill();

  // Textura del tronco.
  c.strokeStyle = "rgba(26,16,13,0.5)";
  c.lineWidth = 2;

  c.beginPath();
  c.moveTo(-4, -8);
  c.lineTo(-2, -34);
  c.moveTo(5, -14);
  c.lineTo(3, -43);
  c.stroke();

  // Ramas.
  c.strokeStyle = "#563827";
  c.lineWidth = 7;
  c.lineCap = "round";

  c.beginPath();
  c.moveTo(0, -45);
  c.lineTo(-21, -65);
  c.lineTo(-31, -75);

  c.moveTo(2, -43);
  c.lineTo(22, -63);
  c.lineTo(32, -73);
  c.stroke();

  // Movimiento de copa.
  c.translate(0, -54);
  c.rotate(sway);

  // Silueta principal de hojas.
  const foliage = c.createLinearGradient(0, -70, 0, 20);

  foliage.addColorStop(0, "#5da55d");
  foliage.addColorStop(0.45, "#347e48");
  foliage.addColorStop(1, "#16442e");

  c.fillStyle = foliage;

  c.beginPath();
  c.moveTo(0, -75);
  c.lineTo(17, -57);
  c.lineTo(35, -48);
  c.lineTo(29, -29);
  c.lineTo(42, -12);
  c.lineTo(26, 4);
  c.lineTo(8, 12);
  c.lineTo(-12, 10);
  c.lineTo(-32, 0);
  c.lineTo(-42, -17);
  c.lineTo(-30, -36);
  c.lineTo(-36, -53);
  c.lineTo(-15, -61);
  c.closePath();
  c.fill();

  // Capas de follaje.
  const leafClusters = [
    [-24, -38, 22],
    [0, -57, 24],
    [25, -37, 21],
    [-16, -9, 22],
    [17, -7, 23],
    [0, -29, 28]
  ];

  leafClusters.forEach((leaf, index) => {
    const [lx, ly, radius] = leaf;

    c.fillStyle = [
      "#3e884c",
      "#4c9954",
      "#2e7542",
      "#286b3c",
      "#4a9150",
      "#357e44"
    ][index];

    c.beginPath();

    c.ellipse(
      lx,
      ly,
      radius,
      radius * 0.78,
      index * 0.2,
      0,
      Math.PI * 2
    );

    c.fill();
  });

  // Detalles iluminados en las hojas.
  c.fillStyle = "rgba(174,215,128,0.23)";

  c.beginPath();
  c.ellipse(-15, -51, 8, 5, -0.5, 0, Math.PI * 2);
  c.ellipse(13, -36, 7, 4, 0.5, 0, Math.PI * 2);
  c.ellipse(-19, -15, 6, 4, 0.3, 0, Math.PI * 2);
  c.fill();

  // Oscurecimiento de la parte inferior.
  c.fillStyle = "rgba(8,35,23,0.22)";

  c.beginPath();
  c.ellipse(0, -4, 32, 12, 0, 0, Math.PI * 2);
  c.fill();

  c.restore();
}

// =============================================
// PERSONAJE PRINCIPAL: AVENTURERO
// =============================================

function drawAdventurer(c, x, y, time, moving, direction) {
  const walk = moving ? Math.sin(time / 85) : 0;
  const bounce = moving ? Math.abs(Math.sin(time / 85)) * 2.2 : 0;
  const hairMove = Math.sin(time / 280) * 1.4;

  c.save();
  c.translate(x, y - bounce);

  // Sombra.
  c.fillStyle = "rgba(0,0,0,0.4)";

  c.beginPath();
  c.ellipse(2, 14 + bounce, 17, 8, 0, 0, Math.PI * 2);
  c.fill();

  // Mochila.
  c.fillStyle = "#59402a";

  c.beginPath();
  c.roundRect(-15, -13, 10, 21, 4);
  c.fill();

  c.fillStyle = "#a36c36";
  c.fillRect(-14, -9, 7, 5);

  // Piernas animadas.
  const legA = walk * 6;
  const legB = -walk * 6;

  c.strokeStyle = "#332a2c";
  c.lineWidth = 6;
  c.lineCap = "round";

  c.beginPath();
  c.moveTo(-5, 5);
  c.lineTo(-6 + legA, 15);

  c.moveTo(5, 5);
  c.lineTo(6 + legB, 15);
  c.stroke();

  // Botas.
  c.fillStyle = "#4b3023";

  c.beginPath();
  c.ellipse(-7 + legA, 17, 7, 4, -0.2, 0, Math.PI * 2);
  c.ellipse(7 + legB, 17, 7, 4, 0.2, 0, Math.PI * 2);
  c.fill();

  // Pantalón.
  c.fillStyle = "#39485a";

  c.beginPath();
  c.moveTo(-10, -1);
  c.lineTo(10, -1);
  c.lineTo(9, 8);
  c.lineTo(2, 10);
  c.lineTo(-9, 8);
  c.closePath();
  c.fill();

  // Brazos animados.
  const armA = -walk * 5;
  const armB = walk * 5;

  c.strokeStyle = "#c68f68";
  c.lineWidth = 5;
  c.lineCap = "round";

  c.beginPath();

  c.moveTo(-10, -12);
  c.lineTo(-15 + armA, -1);

  c.moveTo(10, -12);
  c.lineTo(15 + armB, -1);

  c.stroke();

  // Mangas verdes.
  c.strokeStyle = "#527d45";
  c.lineWidth = 7;

  c.beginPath();
  c.moveTo(-10, -12);
  c.lineTo(-13 + armA, -4);

  c.moveTo(10, -12);
  c.lineTo(13 + armB, -4);

  c.stroke();

  // Manos.
  c.fillStyle = "#e4b18c";

  c.beginPath();
  c.arc(-15 + armA, 0, 4, 0, Math.PI * 2);
  c.arc(15 + armB, 0, 4, 0, Math.PI * 2);
  c.fill();

  // Torso: túnica de aventurero.
  const tunic = c.createLinearGradient(-12, -22, 12, 7);

  tunic.addColorStop(0, "#769f51");
  tunic.addColorStop(0.5, "#466c3c");
  tunic.addColorStop(1, "#304d31");

  c.fillStyle = tunic;

  c.beginPath();
  c.moveTo(-9, -20);
  c.lineTo(9, -20);
  c.lineTo(13, 2);
  c.lineTo(8, 8);
  c.lineTo(-8, 8);
  c.lineTo(-13, 2);
  c.closePath();
  c.fill();

  // Cuello.
  c.fillStyle = "#e8b58e";
  c.fillRect(-4, -25, 8, 7);

  // Cuello de la túnica.
  c.fillStyle = "#d5c08a";

  c.beginPath();
  c.moveTo(-6, -20);
  c.lineTo(0, -13);
  c.lineTo(6, -20);
  c.lineTo(3, -22);
  c.lineTo(0, -17);
  c.lineTo(-3, -22);
  c.closePath();
  c.fill();

  // Cinturón.
  c.fillStyle = "#563b29";
  c.fillRect(-12, -2, 24, 4);

  c.fillStyle = "#d7b65d";
  c.fillRect(-2, -3, 5, 6);

  // Pequeña bolsa.
  c.fillStyle = "#795333";

  c.beginPath();
  c.roundRect(7, -1, 8, 9, 2);
  c.fill();

  c.fillStyle = "#d8b76c";
  c.fillRect(9, 1, 4, 2);

  // Cabeza.
  c.fillStyle = "#edbd97";

  c.beginPath();
  c.ellipse(0, -29, 9, 11, 0, 0, Math.PI * 2);
  c.fill();

  // Orejas.
  c.fillStyle = "#dca782";
  c.beginPath();
  c.arc(-9, -29, 3, 0, Math.PI * 2);
  c.arc(9, -29, 3, 0, Math.PI * 2);
  c.fill();

  // Pelo con movimiento.
  c.fillStyle = "#68452d";

  c.beginPath();
  c.moveTo(-9, -30);
  c.quadraticCurveTo(-13, -45, -3, -44 + hairMove);
  c.quadraticCurveTo(7, -48 - hairMove, 10, -37);
  c.lineTo(8, -28);
  c.quadraticCurveTo(4, -35, 0, -35);
  c.quadraticCurveTo(-5, -31, -9, -30);
  c.fill();

  // Flequillo.
  c.fillStyle = "#815632";

  c.beginPath();
  c.moveTo(-8, -36);
  c.quadraticCurveTo(-2, -45 - hairMove, 8, -37);
  c.lineTo(4, -34);
  c.lineTo(0, -37);
  c.lineTo(-4, -33);
  c.closePath();
  c.fill();

  // Ojos.
  c.fillStyle = "#30251f";

  if (direction === "left") {
    c.fillRect(-5, -30, 2, 2);
  } else if (direction === "right") {
    c.fillRect(3, -30, 2, 2);
  } else {
    c.fillRect(-4, -30, 2, 2);
    c.fillRect(3, -30, 2, 2);
  }

  // Sonrisa.
  c.strokeStyle = "#9b5549";
  c.lineWidth = 1;

  c.beginPath();
  c.arc(0, -25, 3, 0.2, Math.PI - 0.2);
  c.stroke();

  // Pequeño broche de aventurero.
  c.fillStyle = "#eac66e";

  c.beginPath();
  c.arc(0, -7, 2.5, 0, Math.PI * 2);
  c.fill();

  c.restore();
}

// =============================================
// PERSONAJE NPC: EIRA
// =============================================

function drawEira(c, x, y, time) {
  const idle = Math.sin(time / 500) * 1.5;
  const hairMove = Math.sin(time / 300) * 2;

  c.save();
  c.translate(x, y - idle);

  // Sombra.
  c.fillStyle = "rgba(0,0,0,0.38)";

  c.beginPath();
  c.ellipse(3, 13, 17, 8, 0, 0, Math.PI * 2);
  c.fill();

  // Piernas.
  c.fillStyle = "#49374d";
  c.fillRect(-7, 4, 6, 12);
  c.fillRect(2, 4, 6, 12);

  // Botas.
  c.fillStyle = "#493126";

  c.beginPath();
  c.ellipse(-6, 17, 6, 4, 0, 0, Math.PI * 2);
  c.ellipse(6, 17, 6, 4, 0, 0, Math.PI * 2);
  c.fill();

  // Vestido y túnica de guía.
  const dress = c.createLinearGradient(-12, -18, 12, 12);

  dress.addColorStop(0, "#b77ca8");
  dress.addColorStop(1, "#654a80");

  c.fillStyle = dress;

  c.beginPath();
  c.moveTo(-8, -20);
  c.lineTo(8, -20);
  c.lineTo(15, 10);
  c.lineTo(-15, 10);
  c.closePath();
  c.fill();

  // Capa.
  c.fillStyle = "#456b50";

  c.beginPath();
  c.moveTo(-8, -17);
  c.lineTo(-15, 6);
  c.lineTo(-9, 10);
  c.lineTo(-3, -12);
  c.closePath();
  c.fill();

  // Cinturón.
  c.fillStyle = "#e0c178";
  c.fillRect(-11, -1, 22, 3);

  // Brazos.
  c.strokeStyle = "#e4b18c";
  c.lineWidth = 5;
  c.lineCap = "round";

  c.beginPath();
  c.moveTo(-9, -13);
  c.lineTo(-13, -2 + idle);

  c.moveTo(9, -13);
  c.lineTo(13, -2 - idle);
  c.stroke();

  // Mangas.
  c.strokeStyle = "#a36d9d";
  c.lineWidth = 7;

  c.beginPath();
  c.moveTo(-9, -13);
  c.lineTo(-12, -5);

  c.moveTo(9, -13);
  c.lineTo(12, -5);
  c.stroke();

  // Manos.
  c.fillStyle = "#edbd97";

  c.beginPath();
  c.arc(-13, -2 + idle, 4, 0, Math.PI * 2);
  c.arc(13, -2 - idle, 4, 0, Math.PI * 2);
  c.fill();

  // Cuello.
  c.fillStyle = "#edbd97";
  c.fillRect(-4, -26, 8, 8);

  // Cabeza.
  c.beginPath();
  c.ellipse(0, -30, 9, 11, 0, 0, Math.PI * 2);
  c.fill();

  // Cabello largo.
  c.fillStyle = "#493252";

  c.beginPath();
  c.moveTo(-9, -34);
  c.quadraticCurveTo(-17, -48, -4, -47);
  c.quadraticCurveTo(12, -49, 10, -34);
  c.lineTo(13, 0 + hairMove);
  c.quadraticCurveTo(7, 5, 7, -13);
  c.lineTo(5, -25);
  c.lineTo(-7, -23);
  c.lineTo(-8, 1 - hairMove);
  c.quadraticCurveTo(-15, -4, -11, -21);
  c.closePath();
  c.fill();

  // Cara.
  c.fillStyle = "#edbd97";

  c.beginPath();
  c.ellipse(0, -30, 8, 10, 0, 0, Math.PI * 2);
  c.fill();

  // Flequillo.
  c.fillStyle = "#5a3c63";

  c.beginPath();
  c.moveTo(-8, -35);
  c.quadraticCurveTo(0, -45, 9, -35);
  c.lineTo(3, -32);
  c.lineTo(-2, -35);
  c.lineTo(-6, -31);
  c.closePath();
  c.fill();

  // Ojos.
  c.fillStyle = "#30243a";
  c.fillRect(-4, -31, 2, 2);
  c.fillRect(3, -31, 2, 2);

  // Sonrisa.
  c.strokeStyle = "#9b5549";
  c.lineWidth = 1;

  c.beginPath();
  c.arc(0, -26, 3, 0.2, Math.PI - 0.2);
  c.stroke();

  // Broche de guía.
  c.fillStyle = "#f1d078";

  c.beginPath();
  c.arc(0, -8, 3, 0, Math.PI * 2);
  c.fill();

  c.restore();
}

// =============================================
// DIBUJAR EL BOSQUE COMPLETO
// =============================================

function drawForestRoom() {
  const c = gameCtx;
  const time = performance.now();

  c.clearRect(0, 0, W, H);

  updateCamera();

  // Todo lo que está dentro de este bloque
  // utiliza coordenadas del mundo.
  c.save();

  c.translate(-camera.x, -camera.y);

  drawForestGround(c);
  drawForestRiver(c);

  // Ordenamos los elementos por profundidad.
  // Así los árboles pueden quedar delante o detrás
  // de los personajes según su posición.

  const objects = [];

  FOREST_TREES.forEach(tree => {
    objects.push({
      type: "tree",
      y: tree.y,
      data: tree
    });
  });

  objects.push({
    type: "npc",
    y: FOREST_NPC.y,
    data: FOREST_NPC
  });

  objects.push({
    type: "player",
    y: player.y,
    data: player
  });

  objects.sort((a, b) => a.y - b.y);

  objects.forEach(object => {
    if (object.type === "tree") {
      const tree = object.data;

      // Evitamos dibujar árboles muy alejados.
      if (
        tree.x < camera.x - 100 ||
        tree.x > camera.x + W + 100 ||
        tree.y < camera.y - 130 ||
        tree.y > camera.y + H + 100
      ) {
        return;
      }

      drawTree(c, tree, time);
    }

    if (object.type === "npc") {
      drawEira(c, FOREST_NPC.x, FOREST_NPC.y, time);
    }

    if (object.type === "player") {
      const moving = keys.size > 0 &&
        (
          keys.has("ArrowUp") ||
          keys.has("ArrowDown") ||
          keys.has("ArrowLeft") ||
          keys.has("ArrowRight") ||
          keys.has("w") ||
          keys.has("a") ||
          keys.has("s") ||
          keys.has("d")
        );

      drawAdventurer(
        c,
        player.x,
        player.y,
        time,
        moving,
        player.direction
      );
    }
  });

  // Nombre de Eira.
  c.fillStyle = "rgba(9,20,19,0.85)";
  c.fillRect(
    FOREST_NPC.x - 49,
    FOREST_NPC.y - 76,
    98,
    23
  );

  c.fillStyle = "#f4e8b8";
  c.font = "bold 13px Georgia";
  c.textAlign = "center";
  c.fillText(
    "Eira · Forest Guide",
    FOREST_NPC.x,
    FOREST_NPC.y - 60
  );

  // Indicador para hablar.
  const distance = Math.hypot(
    player.x - FOREST_NPC.x,
    player.y - FOREST_NPC.y
  );

  if (distance < 75) {
    const pulse = 1 + Math.sin(time / 180) * 0.12;

    c.save();
    c.translate(FOREST_NPC.x, FOREST_NPC.y - 98);
    c.scale(pulse, pulse);

    c.fillStyle = "#f6ce68";
    c.beginPath();
    c.arc(0, 0, 13, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "#1b2030";
    c.font = "bold 15px Georgia";
    c.textAlign = "center";
    c.fillText("E", 0, 5);

    c.restore();
  }

  // Pequeñas luces nocturnas.
  for (let i = 0; i < 12; i++) {
    const fx = 150 + i * 137;
    const fy = 110 + (i * 91) % 1100;

    const glow = 0.35 + Math.sin(time / 400 + i) * 0.2;

    c.fillStyle = `rgba(210,245,145,${glow})`;

    c.beginPath();
    c.arc(
      fx + Math.sin(time / 800 + i) * 5,
      fy + Math.cos(time / 700 + i) * 4,
      2.5,
      0,
      Math.PI * 2
    );
    c.fill();
  }

  c.restore();

  // Oscurecimiento nocturno en coordenadas de pantalla.
  const darkness = c.createRadialGradient(
    W / 2, H / 2, 150,
    W / 2, H / 2, 590
  );

  darkness.addColorStop(0, "rgba(0,0,0,0)");
  darkness.addColorStop(1, "rgba(0,8,12,0.42)");

  c.fillStyle = darkness;
  c.fillRect(0, 0, W, H);
}

// =============================================
// ESCENARIOS DE LOS OTROS MUNDOS
// =============================================

function drawOtherWorldRoom() {
  const c = gameCtx;
  const world = worldData.find(w => w.id === currentWorld);

  c.clearRect(0, 0, W, H);

  const themes = [
    { ground: "#4e9a48", light: "#69b75a", detail: "#28683d" },
    { ground: "#ba9b62", light: "#d5bb7d", detail: "#4b9dbe" },
    { ground: "#c7e9e8", light: "#e9f5e8", detail: "#76b9d0" },
    { ground: "#75435e", light: "#9c5470", detail: "#ed995b" }
  ];

  const theme = themes[currentWorld - 1];

  c.fillStyle = theme.ground;
  c.fillRect(0, 0, W, H);

  for (let y = 0; y < H; y += 40) {
    for (let x = 0; x < W; x += 40) {
      c.fillStyle =
        ((x / 40 + y / 40) % 2)
          ? theme.light
          : theme.ground;

      c.fillRect(x, y, 38, 38);
    }
  }

  c.fillStyle = theme.detail;
  c.fillRect(0, 385, W, 95);
  c.fillRect(400, 90, 100, 340);

  c.fillStyle = "#d4bd83";
  c.fillRect(420, 90, 60, 340);
  c.fillRect(0, 400, W, 65);

  for (let i = 0; i < 13; i++) {
    const x = 35 + i * 70;

    if (Math.abs(x - player.x) < 55 && player.y < 370) {
      continue;
    }

    c.fillStyle = "#6b432a";
    c.fillRect(x, 90, 12, 27);

    c.fillStyle =
      currentWorld === 3 ? "#f1ffff" : theme.detail;

    c.fillRect(x - 12, 70, 36, 30);
    c.fillRect(x - 6, 60, 24, 16);
  }

  c.fillStyle = "#433657";
  c.fillRect(365, 25, 170, 100);

  c.fillStyle = world.color;
  c.fillRect(378, 38, 144, 72);

  c.fillStyle = "#433657";
  c.fillRect(435, 75, 30, 50);

  const npcX = 450;
  const npcY = 205;

  drawEira(c, npcX, npcY, performance.now());

  c.fillStyle = "#19172c";
  c.fillRect(npcX - 65, npcY - 56, 130, 24);

  c.fillStyle = "#ffffff";
  c.font = "bold 14px sans-serif";
  c.textAlign = "center";
  c.fillText(world.npc, npcX, npcY - 39);

  const distance = Math.hypot(
    player.x - npcX,
    player.y - npcY
  );

  if (distance < 75) {
    c.fillStyle = "#fff0a0";
    c.fillRect(npcX - 12, npcY - 82, 24, 22);

    c.fillStyle = "#201d31";
    c.font = "bold 16px sans-serif";
    c.fillText("E", npcX, npcY - 66);
  }

  const moving = keys.size > 0;

  drawAdventurer(
    c,
    player.x,
    player.y,
    performance.now(),
    moving,
    player.direction
  );

  c.fillStyle = "#19172c";
  c.fillRect(10, 10, 245, 28);

  c.fillStyle = "#ffffff";
  c.font = "bold 13px sans-serif";
  c.textAlign = "left";
  c.fillText("EXPLORE  ·  MOVE  ·  TALK [E]", 20, 29);
}

function drawRoom() {
  if (currentWorld === 1) {
    drawForestRoom();
  } else {
    drawOtherWorldRoom();
  }
}

// =============================================
// INTERACCIÓN CON NPC
// =============================================

function interact() {
  if (mode !== "game") return;

  const world = worldData.find(w => w.id === currentWorld);

  const npcX = currentWorld === 1 ? FOREST_NPC.x : 450;
  const npcY = currentWorld === 1 ? FOREST_NPC.y : 205;

  const distance = Math.hypot(
    player.x - npcX,
    player.y - npcY
  );

  if (distance > 75) {
    $("game-message").textContent =
      `Acercate a ${world.npc} para hablar.`;

    return;
  }

  activeNpc = world;
  openNpcDialog(world);
}

function openNpcDialog(world) {
  $("dialog-speaker").textContent =
    `${world.npc} · ${world.role}`;

  $("dialog-title").textContent =
    `¡Hola, ${state.name}!`;

  $("dialog-text").textContent = world.intro;

  const actions = $("dialog-actions");
  actions.innerHTML = "";

  const progress = state.worldProgress[world.id] || 0;
  const completed = state.completed.includes(world.id);

  if (completed) {
    const done = document.createElement("p");

    done.textContent =
      "¡Ya completaste los cinco desafíos de este mundo!";

    actions.appendChild(done);

  } else {
    const start = document.createElement("button");

    start.className = "primary";

    start.textContent = progress
      ? "CONTINUAR DESAFÍO"
      : "ACEPTAR MISIÓN";

    start.addEventListener("click", () => {
      $("dialog-overlay").classList.add("hidden");
      startChallenge();
    });

    actions.appendChild(start);
  }

  $("dialog-overlay").classList.remove("hidden");
}

// =============================================
// DESAFÍOS
// =============================================

function startChallenge() {
  if (state.lives <= 0) {
    toast("No te quedan vidas. Volvé al mapa para recuperarlas.");
    $("dialog-overlay").classList.add("hidden");
    return;
  }

  const world = worldData.find(w => w.id === currentWorld);
  const progress = state.worldProgress[currentWorld] || 0;

  currentQuestion = progress;
  answered = false;

  if (currentQuestion >= world.questions.length) {
    completeWorld();
    return;
  }

  showQuestion();
}

function showQuestion() {
  const world = worldData.find(w => w.id === currentWorld);
  const question = world.questions[currentQuestion];

  if (!question) {
    completeWorld();
    return;
  }

  answered = false;

  $("question-category").textContent =
    `WORLD ${world.id} · ${world.difficulty} · CHALLENGE ${currentQuestion + 1}/${world.questions.length}`;

  $("question-title").textContent =
    `Desafío ${currentQuestion + 1}`;

  $("question-text").textContent = question.q;

  $("answer-feedback").textContent = "";
  $("answer-feedback").className = "";

  $("next-question-button").classList.add("hidden");
  $("quit-question-button").classList.remove("hidden");

  $("written-answer").value = "";
  $("written-answer").disabled = false;

  $("voice-status").textContent = aiLoading
    ? "Cargando inteligencia artificial..."
    : languageModel
      ? "También podés hablar o escribir tu respuesta."
      : "Podés hablar o escribir tu respuesta.";

  $("check-written-button").disabled = false;
  $("voice-button").disabled = false;

  const options = $("answer-options");
  options.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener("click", () => {
      answerQuestion(index, button);
    });

    options.appendChild(button);
  });

  $("question-overlay").classList.remove("hidden");
}

// =============================================
// COMPROBAR RESPUESTAS
// =============================================

function answerQuestion(index, selectedButton, writtenFeedback = "") {
  if (answered) return;

  answered = true;

  const world = worldData.find(w => w.id === currentWorld);
  const question = world.questions[currentQuestion];

  const buttons = [
    ...$("answer-options").querySelectorAll("button")
  ];

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === question.answer) {
      button.classList.add("correct");
    }
  });

  $("written-answer").disabled = true;
  $("check-written-button").disabled = true;
  $("voice-button").disabled = true;

  const isCorrect = index === question.answer;

  // El progreso avanza con cualquier respuesta realizada.
  state.worldProgress[currentWorld] = currentQuestion + 1;

  if (isCorrect) {
    if (selectedButton) {
      selectedButton.classList.add("correct");
    }

    $("answer-feedback").textContent =
      `¡Excelente! ${question.tip} ${writtenFeedback}`;

    $("answer-feedback").className = "good";

    state.xp += 20;
    state.coins += 8;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(
        question.options[question.answer]
      );

      speech.lang = "en-US";
      speech.rate = 0.85;

      window.speechSynthesis.speak(speech);
    }

  } else {
    if (selectedButton) {
      selectedButton.classList.add("incorrect");
    }

    state.lives = Math.max(0, state.lives - 1);

    $("answer-feedback").textContent =
      `¡No te rindas! ${writtenFeedback} La respuesta correcta es: ${
        question.options[question.answer]
      }. ${question.tip} Perdiste una vida.`;

    $("answer-feedback").className = "bad";
  }

  saveState();
  updateHUD();

  $("next-question-button").textContent =
    state.lives <= 0
      ? "VOLVER AL MAPA"
      : currentQuestion === world.questions.length - 1
        ? "COMPLETAR MUNDO"
        : "CONTINUAR";

  $("next-question-button").classList.remove("hidden");
  $("quit-question-button").classList.add("hidden");
}

// =============================================
// SIGUIENTE PREGUNTA
// =============================================

function nextQuestion() {
  $("question-overlay").classList.add("hidden");

  const world = worldData.find(w => w.id === currentWorld);
  const progress = state.worldProgress[currentWorld] || 0;

  if (state.lives <= 0) {
    toast("Te quedaste sin vidas. Volvé al mapa para recuperar tus fuerzas.");
    openMap();
    return;
  }

  if (progress >= world.questions.length) {
    completeWorld();
    return;
  }

  currentQuestion = progress;
  showQuestion();
}

// =============================================
// COMPLETAR MUNDO
// =============================================

function completeWorld() {
  $("question-overlay").classList.add("hidden");
  $("dialog-overlay").classList.add("hidden");

  if (!state.completed.includes(currentWorld)) {
    state.completed.push(currentWorld);

    state.coins += 30;
    state.xp += 30;

    if (currentWorld < 4) {
      state.unlocked = Math.max(
        state.unlocked,
        currentWorld + 1
      );
    }
  }

  saveState();
  updateHUD();

  if (currentWorld === 4) {
    mode = "victory";

    $("dialog-speaker").textContent = "WORDLAND RESTORED";
    $("dialog-title").textContent = "¡Victoria, aventurero!";

    $("dialog-text").textContent =
      `¡Felicitaciones, ${state.name}! Completaste los cuatro mundos y recuperaste los Fragmentos del Lenguaje.`;

  } else {
    $("dialog-speaker").textContent = "WORLD COMPLETED";
    $("dialog-title").textContent = "¡Mundo completado!";

    $("dialog-text").textContent =
      `¡Excelente, ${state.name}! Ganaste 30 monedas y 30 XP. El siguiente mundo está desbloqueado.`;
  }

  const actions = $("dialog-actions");
  actions.innerHTML = "";

  const button = document.createElement("button");

  button.className = "primary";
  button.textContent = "CONTINUAR";
  button.addEventListener("click", openMap);

  actions.appendChild(button);

  $("dialog-overlay").classList.remove("hidden");

  updateWorldInfo(currentWorld);
}

// =============================================
// VOLVER AL MENÚ O AL MAPA
// =============================================

function returnToTitle() {
  closeOverlays();
  keys.clear();

  mode = "menu";

  updateHUD();
  showScreen("title-screen");
}

function returnToMap() {
  keys.clear();

  openMap();

  if (state.lives <= 0) {
    state.lives = 5;

    saveState();
    updateHUD();

    toast("Recuperaste tus 5 vidas. ¡Volvé a intentarlo!");
  }
}

// =============================================
// COLISIONES
// =============================================

function distanceToSegment(px, py, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const lengthSquared = dx * dx + dy * dy;

  if (!lengthSquared) {
    return Math.hypot(px - a.x, py - a.y);
  }

  const t = Math.max(
    0,
    Math.min(
      1,
      ((px - a.x) * dx + (py - a.y) * dy) / lengthSquared
    )
  );

  const closestX = a.x + t * dx;
  const closestY = a.y + t * dy;

  return Math.hypot(px - closestX, py - closestY);
}

function canPlayerMoveTo(x, y) {
  const radius = 11;

  if (
    x < radius ||
    x > WORLD_W - radius ||
    y < 45 ||
    y > WORLD_H - radius
  ) {
    return false;
  }

  if (currentWorld === 1) {
    // Colisiones con árboles.
    for (const tree of FOREST_TREES) {
      const distance = Math.hypot(
        x - tree.x,
        y - tree.y
      );

      const collisionRadius = 25 * tree.s + radius;

      if (distance < collisionRadius) {
        return false;
      }
    }

    // Colisión con el río.
    for (let i = 0; i < FOREST_RIVER.length - 1; i++) {
      const distance = distanceToSegment(
        x,
        y,
        FOREST_RIVER[i],
        FOREST_RIVER[i + 1]
      );

      if (distance < 49 + radius) {
        return false;
      }
    }
  }

  return true;
}

// =============================================
// MOVIMIENTO DEL JUGADOR
// =============================================

function movePlayer() {
  if (
    mode !== "game" ||
    !$("question-overlay").classList.contains("hidden") ||
    !$("dialog-overlay").classList.contains("hidden")
  ) {
    return;
  }

  let dx = 0;
  let dy = 0;

  if (keys.has("ArrowLeft") || keys.has("a")) dx--;
  if (keys.has("ArrowRight") || keys.has("d")) dx++;
  if (keys.has("ArrowUp") || keys.has("w")) dy--;
  if (keys.has("ArrowDown") || keys.has("s")) dy++;

  if (dx && dy) {
    dx *= Math.SQRT1_2;
    dy *= Math.SQRT1_2;
  }

  if (dx < 0) player.direction = "left";
  if (dx > 0) player.direction = "right";
  if (dy < 0) player.direction = "up";
  if (dy > 0) player.direction = "down";

  const nextX = player.x + dx * player.speed;
  const nextY = player.y + dy * player.speed;

  if (canPlayerMoveTo(nextX, player.y)) {
    player.x = nextX;
  }

  if (canPlayerMoveTo(player.x, nextY)) {
    player.y = nextY;
  }
}

// =============================================
// BUCLE PRINCIPAL
// =============================================

function gameLoop() {
  movePlayer();

  if (mode === "game") {
    drawRoom();
  }

  requestAnimationFrame(gameLoop);
}

// =============================================
// BOTONES
// =============================================

$("start-button").addEventListener("click", startNewGame);
$("continue-button").addEventListener("click", continueGame);
$("select-world-button").addEventListener("click", enterWorld);
$("return-map-button").addEventListener("click", returnToMap);
$("map-back-button").addEventListener("click", returnToTitle);

$("dialog-close-button").addEventListener("click", () => {
  $("dialog-overlay").classList.add("hidden");
});

$("next-question-button").addEventListener("click", nextQuestion);

$("quit-question-button").addEventListener("click", () => {
  $("question-overlay").classList.add("hidden");

  $("game-message").textContent =
    "Desafío pausado. Podés hablar con el NPC para continuar.";
});

$("voice-button").addEventListener("click", startVoiceRecognition);
$("check-written-button").addEventListener("click", checkWrittenAnswer);

$("written-answer").addEventListener("keydown", event => {
  if (event.key === "Enter" && !answered) {
    checkWrittenAnswer();
  }
});

mapCanvas.addEventListener("click", selectWorldFromCanvas);

// =============================================
// TECLADO
// =============================================

window.addEventListener("keydown", event => {
  const key = event.key.length === 1
    ? event.key.toLowerCase()
    : event.key;

  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(key)
  ) {
    if (mode === "game") {
      event.preventDefault();
    }
  }

  if (key === "Escape") {
    if (!$("question-overlay").classList.contains("hidden")) {
      $("question-overlay").classList.add("hidden");

    } else if (!$("dialog-overlay").classList.contains("hidden")) {
      $("dialog-overlay").classList.add("hidden");

    } else if (mode === "game") {
      returnToMap();
    }

    return;
  }

  if (key === "e" || key === "Enter") {
    if (
      mode === "game" &&
      $("question-overlay").classList.contains("hidden") &&
      $("dialog-overlay").classList.contains("hidden")
    ) {
      interact();
    }

    return;
  }

  keys.add(key);
});

window.addEventListener("keyup", event => {
  const key = event.key.length === 1
    ? event.key.toLowerCase()
    : event.key;

  keys.delete(key);
});

window.addEventListener("blur", () => {
  keys.clear();
});

// =============================================
// INICIAR JUEGO
// =============================================

loadState();
updateHUD();
drawMap();
updateWorldInfo(1);

requestAnimationFrame(gameLoop);
loadAI();
