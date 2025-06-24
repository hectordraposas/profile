"use strict";

const allSlides = document.querySelectorAll(".data_slide");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const bannerName = document.querySelector(".banner--name");
const newName = bannerName.textContent.split(/\s+/);
const abr = newName
  .map((n) => n.slice(0, 1))
  .filter((c) => c.toLowerCase() !== "c");

function checkViewport() {
  if (window.innerWidth < 1000) {
    bannerName.textContent = abr.join(".") + ".";
  } else {
    bannerName.textContent = "Hector Dela Cruz Raposas";
  }
}

checkViewport();

window.addEventListener("resize", () => {
  checkViewport();
});

let curSlide = 0;
const maxSlide = allSlides.length - 1;
allSlides.forEach(function (s, i) {
  s.style.transform = `translateX(${i * 100}%)`;
});

btnNext.addEventListener("click", function () {
  curSlide = curSlide === maxSlide ? 0 : curSlide + 1;

  allSlides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
});

btnPrev.addEventListener("click", function () {
  curSlide = curSlide === 0 ? maxSlide : curSlide - 1;

  allSlides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
});

let slideInterval;
