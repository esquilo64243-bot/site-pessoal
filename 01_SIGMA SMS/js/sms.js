const imagens = document.querySelectorAll(".feature-card img");
const overlay = document.querySelector("#imageOverlay");
const overlayImage = document.querySelector("#overlayImage");

imagens.forEach((img) => {
  img.addEventListener("click", () => {
    overlayImage.src = img.src;
    overlayImage.alt = img.alt;
    overlay.classList.add("active");
  });
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  overlayImage.src = "";
});