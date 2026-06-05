const slider = document.querySelector(".slider");
const slideTrack = document.querySelector(".slide-track");

let posicao = 0;
let velocidade = -0.45;

function animarSkills() {
  posicao += velocidade;

  const metade = slideTrack.scrollWidth / 2;

  if (Math.abs(posicao) >= metade) {
    posicao = 0;
  }

  if (posicao > 0) {
    posicao = -metade;
  }

  slideTrack.style.transform = `translateX(${posicao}px)`;

  requestAnimationFrame(animarSkills);
}

slider.addEventListener("wheel", (e) => {
  e.preventDefault();
  posicao -= e.deltaY * 0.9;
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