const galleryImgs = document.querySelectorAll(".gallery img");
let currentIndex = 0;

galleryImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    displayImage(img, img.src);
  });
});

function overlayImage(element) {
  const overlayImage = document.querySelector(".overlay-image");
  overlayImage.append(element);
  overlayImage.setAttribute("data-visible", "true");
  document.body.append(overlayImage);
  overlayImage.addEventListener("click", (e) => {
    if (e.target.matches(".overlay-image")) {
      overlayImage.setAttribute("data-visible", "false");
      if (overlayImage.hasChildNodes()) {
        overlayImage.firstElementChild.remove();
      }
    } else return;
  });
}

function displayImage(element, elementSrc) {
  const image = document.createElement("img");
  image.classList.add("current-gallery-img");
  image.setAttribute("src", `${elementSrc}`);
  // Reset currentIndex to the index of the clicked image
  currentIndex = Array.from(galleryImgs).indexOf(element);
  createButtons();
  overlayImage(image);
}

function createButtons() {
  if (!document.querySelector(".gallery-btn--prev")) {
    const prevBtn = document.createElement("button");
    prevBtn.setAttribute("class", "gallery-btn gallery-btn--prev");
    prevBtn.addEventListener("click", () => {
      changeImg("prev");
    });
    const prevImgIcon = document.createElement("i");
    prevImgIcon.setAttribute("class", "fa-solid fa-chevron-left");
    prevBtn.append(prevImgIcon);
    overlayImage(prevBtn);
  }

  if (!document.querySelector(".gallery-btn--next")) {
    const nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "gallery-btn gallery-btn--next ");
    nextBtn.addEventListener("click", (e) => {
      changeImg("next");
    });
    const nextImgIcon = document.createElement("i");
    nextImgIcon.setAttribute("class", "fa-solid fa-chevron-right");
    nextBtn.append(nextImgIcon);
    overlayImage(nextBtn);
  }
}

function changeImg(direction) {
  const galleryImgs = document.querySelectorAll(".gallery img");
  const totalImages = galleryImgs.length;

  if (direction === "prev") {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  } else if (direction === "next") {
    currentIndex = (currentIndex + 1) % totalImages;
  }

  const newImgSrc = galleryImgs[currentIndex].src;
  const currentGalleryImg = document.querySelector(".current-gallery-img");

  // Remove both classes
  currentGalleryImg.classList.remove("left-image");
  currentGalleryImg.classList.remove("right-image");

  // Trigger a reflow to force the CSS to reset
  void currentGalleryImg.offsetWidth;

  // Add the appropriate class
  if (direction === "prev") {
    currentGalleryImg.classList.add("left-image");
  } else if (direction === "next") {
    currentGalleryImg.classList.add("right-image");
  }

  currentGalleryImg.setAttribute("src", newImgSrc);
}
