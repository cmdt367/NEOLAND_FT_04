import "./Wacka.css";
import { randomTime } from "../../utils/randomTime";

//! ----------------------------------------------------------------
//? ------------------ TEMPLATE GENERAL ---------------------------
//! ----------------------------------------------------------------

const template = () => `
  <div class="interface">
    <h1>Wacka</h1>
    <span class="score">0</span>
    <button id="startGame">Start!</button>
  </div>
  <div class="game">
    <div class="hole hole1">
      <div class="mole"></div>
    </div>
    <div class="hole hole2">
      <div class="mole"></div>
    </div>
    <div class="hole hole3">
      <div class="mole"></div>
    </div>
    <div class="hole hole4">
      <div class="mole"></div>
    </div>
    <div class="hole hole5">
      <div class="mole"></div>
    </div>
    <div class="hole hole6">
      <div class="mole"></div>
    </div>
  </div>
`;

//! ----------------------------------------------------------------
//? ------------------ VARIABLES GLOBALES ---------------------------
//! ----------------------------------------------------------------

let lastHole; // --> Último hoyo
let score = 0; // --> Puntuacion
let timeUp = false; // --> Indica cuando se acaba el tiempo

//! ----------------------------------------------------------------
//? ------------------ LÓGICA DEL JUEGO ---------------------------
//! ----------------------------------------------------------------

//TODO --> Función para que el topo que se vaya a asomar sea aleatorio
const randomHole = () => {
  //Index aleatorio
  const index = Math.floor(
    Math.random() * document.querySelectorAll(".hole").length
  );
  //Hoyo aleatorio
  const hole = document.querySelectorAll(".hole")[index];
  //Evitamos que el topo salga dos veces por el mismo hoyo
  if (hole === lastHole) {
    return randomHole(document.querySelectorAll(".hole"));
  }

  lastHole = hole;
  return hole;
};

//TODO --> Función que decide que topo se asomará
const showMole = () => {
  //Definimos el tiempo que el topo se mantiene asomado
  const time = randomTime(500, 1000);

  //Seleccionamos hoyo para añadirle la clase up
  const hole = randomHole(document.querySelectorAll(".hole"));
  hole.classList.add("up");

  //SetTimeout para elimimar la clase

  setTimeout(() => {
    hole.classList.remove("up");

    // Siempre que el tiempo de la partida no haya acabado seguiremos asomando topos
    if (!timeUp) {
      showMole();
    }
  }, time);
};

//TODO --> Función que arranca el juego
const startGame = () => {
  timeUp = false;
  score = 0;
  showMole();

  setTimeout(() => {
    timeUp = true;
  }, 15000);
};

//TODO --> Función que se ejecuta al pulsar el topo : suma puntuación y borra la clase al padre del evento
const wack = (e) => {
  score++;
  e.target.parentNode.classList.remove("up");
  document.querySelector(".score").textContent = score;
};

//! ----------------------------------------------------------------
//? ------------------ EVENTOS DE LOS ELEMENTOS HTML ---------------------------
//! ----------------------------------------------------------------

const addListeners = () => {
  //Añadimos a los topos el escuchador del click para saber cuando han clicado
  document
    .querySelectorAll(".mole")
    .forEach((mole) => mole.addEventListener("click", (e) => wack(e)));

  document.querySelector("#startGame").addEventListener("click", startGame);
};

//! ----------------------------------------------------------------
//?--------------- PINTAR EL CONTENEDOR GENERAL---------------------
//! ----------------------------------------------------------------

export const printTemplate = () => {
  document.querySelector("main").innerHTML = template();
  addListeners();
};
