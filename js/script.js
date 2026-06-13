const slider = document.querySelector(".slider");
const slideTrack = document.querySelector(".slide-track");

// duplica as skills automaticamente
slideTrack.innerHTML += slideTrack.innerHTML;

let posicao = 0;
let velocidade = -0.45;

let arrastando = false;
let inicioX = 0;
let posicaoInicial = 0;
let alvoPosicao = 0;

function animarSkills() {
  if (!arrastando) {
    posicao += velocidade;
    alvoPosicao = posicao;
  } else {
    posicao += (alvoPosicao - posicao) * 0.08;
  }

  const metade = slideTrack.scrollWidth / 2;

  if (posicao <= -metade) {
    posicao += metade;
    alvoPosicao += metade;
  }

  if (posicao >= 0) {
    posicao -= metade;
    alvoPosicao -= metade;
  }

  slideTrack.style.transform = `translateX(${posicao}px)`;

  requestAnimationFrame(animarSkills);
}

slider.addEventListener("wheel", (e) => {
  e.preventDefault();
  posicao -= e.deltaY * 0.9;
  alvoPosicao = posicao;
});

slider.addEventListener("mousedown", (e) => {
  arrastando = true;
  inicioX = e.clientX;
  posicaoInicial = posicao;
  alvoPosicao = posicao;
  slider.classList.add("dragging");
});

slider.addEventListener("touchstart", (e) => {
  arrastando = true;
  inicioX = e.touches[0].clientX;
  posicaoInicial = posicao;
  slider.classList.add("dragging");
});

slider.addEventListener("touchmove", (e) => {
  const xAtual = e.touches[0].clientX;
  const distancia = xAtual - inicioX;

  posicao = posicaoInicial + distancia;
});

slider.addEventListener("touchend", () => {
  arrastando = false;
  slider.classList.remove("dragging");
});

window.addEventListener("mousemove", (e) => {
  if (!arrastando) return;

  const movimento = e.clientX - inicioX;
  alvoPosicao = posicaoInicial + movimento;
});

window.addEventListener("mouseup", () => {
  arrastando = false;
  slider.classList.remove("dragging");
});

animarSkills();

const timeline = document.querySelector(".jornada-timeline");
const path = document.querySelector("#jornadaPath");

if (timeline && path) {
  timeline.addEventListener("mousemove", (e) => {
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left + timeline.scrollLeft;
    path.style.transition = "d 0.15s ease";

    path.setAttribute(
      "d",
      `M0 35 C ${x - 260} 35, ${x - 140} 10, ${x} 10 C ${x + 140} 10, ${x + 260} 35, 1800 35`
    );
  });

  timeline.addEventListener("mouseleave", () => {
  path.style.transition = "d 0.45s ease";

  path.setAttribute(
    "d",
    "M0 35 C 450 35, 900 35, 1800 35"
  );
});
}