const slider = document.querySelector(".slider-container");
const slides = Array.from(document.querySelectorAll(".slide"));
const create = document.getElementById("create");
const craateAccount = document.querySelector(".craate--account");
const overlayAccount = document.querySelector(".overlay--account");

// slider
let current = 0;
//
const change = function () {
  slides.forEach((slide, i) => {
    slide.style.transform = `translate(${100 * (i - current)}%)`;
  });
};
//
const visualChange = function () {
  change();
  //
  slides.forEach((slide) => {
    slide.classList.remove("slide__current");
  });
  slides[current].classList.add("slide__current");
};
change();

setInterval(function () {
  if (current < slides.length - 1) {
    current++;
    visualChange();
  }
  if (current === slides.length - 1) {
    current = -1;
  }
}, 2000);

const changing = function () {
  slides.forEach((slide, i) => {
    slide.addEventListener("click", function () {
      current = Number(slide.dataset.tab);
      visualChange();
    });
  });
};
changing();
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight" && current < slides.length - 1) {
    current++;
    visualChange();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && current > 0) {
    current--;
    visualChange();
  }
});
// form active
const addAccount = function () {
  overlayAccount.classList.add("overlay--active");
  craateAccount.classList.add("account__active");
};
const removeAcc = function () {
  overlayAccount.classList.remove("overlay--active");
  craateAccount.classList.remove("account__active");
};
create.addEventListener("click", addAccount);

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.code === "Escape") {
    removeAcc();
  }
});
overlayAccount.addEventListener("click", removeAcc);
