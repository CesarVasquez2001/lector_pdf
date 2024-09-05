document.addEventListener("DOMContentLoaded", function () {
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");
  const rotateLeftBtn = document.getElementById("rotate-left");
  const rotateRightBtn = document.getElementById("rotate-right");
  const pdfViewer = document.getElementById("pdf-viewer");
  const pdfImage = document.querySelector(".pdf-image");

  const scaleDisplay = document.getElementById("scale-display");
  const rotationDisplay = document.getElementById("rotation-display");

  let scale = 0.20;
  let rotation = 0;
  let posX = 0,
    posY = 0;
  let isDragging = false;
  let startX, startY;

  zoomInBtn.addEventListener("click", function () {
    scale += 0.05;
    updateTransform();
    updateDisplays();
  });

  zoomOutBtn.addEventListener("click", function () {
    if (scale >= 0.2) {
      scale -= 0.1;
      updateTransform();
      updateDisplays();
    }
  });

  rotateLeftBtn.addEventListener("click", function () {
    rotation -= 90;
    updateTransform();
    updateDisplays();
  });

  rotateRightBtn.addEventListener("click", function () {
    rotation += 90;
    updateTransform();
    updateDisplays();
  });

  pdfViewer.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    pdfImage.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      updateTransform();
    }
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      pdfImage.style.cursor = "grab";
    }
  });

  function updateTransform() {
    pdfImage.style.transform = `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`;
  }

  function updateDisplays() {
    scaleDisplay.textContent = `Escala: ${scale.toFixed(2)}`;
    rotationDisplay.textContent = `Rotación: ${rotation}°`;
  }

  updateTransform();
  updateDisplays();
});
