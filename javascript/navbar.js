"use strict";
// coursel navbar

const navIcon = document.querySelector(".navbar__coursel");
const lines = document.querySelectorAll(".cousrel__line");
const navitems = document.querySelector(".navbar_items");
const overlay = document.querySelector(".overlay");

const navAnimation = function () {
  lines.forEach((line) => {
    line.classList.toggle("close_nav");

    if (line.classList.contains("close_nav")) {
      navitems.classList.remove("nav__close");
      overlay.classList.add("overlay__active");
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.overflow = "scroll";
      document.querySelector(".navbar__icon").style.opacity = 0;
    } else {
      navitems.classList.add("nav__close");
      document.querySelector("body").style.position = "static";
      overlay.classList.remove("overlay__active");
      document.querySelector(".navbar__icon").style.opacity = "100%";
    }
  });
};
navIcon.addEventListener("click", navAnimation);
overlay.addEventListener("click", navAnimation);
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Escape" && !navitems.classList.contains("nav__close")) {
    navAnimation();
  }
});
