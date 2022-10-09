"use strict";
const shoesContainer = document.querySelector(".shoes__container");
// nav card
const redNoti = document.querySelector(".red--noti");

// sort element
const sortEl = document.querySelector(".sort");
const smallScreenSort = document.querySelector(".smallScreen__sort");
const smallScreenfilter = document.querySelector(".smallScreen__filter");
const filterEL = document.querySelector(".filter__field");
const filterItems = document.querySelectorAll(".filters");
const filterIcons = document.querySelectorAll(".filter__arrow img");
const shopEl = document.querySelector(".shop");
const searchEl = document.querySelector(".search");
// card click element
const presentImage = document.querySelector(".present__image");
const presentCard = document.querySelector(".present__card");
const backspaceEl = document.querySelector(".backspace");
const addToCard = document.querySelector(".addToShop");
const swipeleft = document.querySelector(".swipe__left");
const swipeRight = document.querySelector(".swipe__right");
// shoe select element
const showNumber = document.querySelector(".show__number");
const presentCardTitle = document.querySelector(".present__card--title");
const presentCardImage = document.querySelector(".present__card--image");
const presentCardPrice = document.querySelector(".present__card--price");
const presentCardSizeContainer = document.querySelector(".present__card--size");
const slides = document.querySelectorAll(".slide");
// sort options
const sortOptions = document.querySelectorAll(".sort__options");
const sortMessage = document.querySelector(".sort__message");
const sort = document.querySelector(".sort img");
// present size

// function
const loadData = function () {
  shoesData.forEach((shoe) => {
    const brand = shoe.brand;
    const name = shoe.name;
    const image = shoe.image;
    const price = shoe.price;
    const remainingDays = shoe.calc;

    const html = `
    <div class="shoes__card">
      <div class="shoes__new--label">${remainingDays <= 30 ? "new" : ""}</div>
      <div class="card__header">
        <div class="card__header--left">
          <div class="shoes__brand"><h2>${brand}</h2></div>
          <div class="shoes__name">${name}</div>
       </div>
        <div class="card__header--right"></div>
      </div>
      <div class="shoes__image">
        <img src="${image}" alt="" />
      </div>
      <div class="card__footer">
       <div class="price">Price</div>
        <div class="price__tag">${price}$</div>
      </div>
    </div>`;

    shoesContainer.insertAdjacentHTML("beforeend", html);
  });
};
loadData();

// sort toggle
sortEl.addEventListener("click", () => {
  sortEl.classList.toggle("sort__active");
  sort.classList.toggle("sort__arrow--active");
  if (sortEl.classList.contains("sort__active")) {
    smallScreenSort.style.display = "block";
    smallScreenfilter.classList.remove("smallScreen__filter--active");
  } else {
    smallScreenSort.style.display = "none";
  }
});

// filter small screen
filterEL.addEventListener("click", () => {
  smallScreenSort.style.display = "none";
  smallScreenfilter.classList.toggle("smallScreen__filter--active");
});

// filter collapsing
filterItems.forEach((item) => {
  item.addEventListener("click", function () {
    const number = item.dataset.tab;
    filterItems[number].classList.toggle("filters__active");
    filterIcons[number].classList.toggle("filter__arrow--active");
  });
});

// shoes card
const cards = function () {
  const shoesCard = document.querySelectorAll(".shoes__card");
  shoesCard.forEach((card, i) => {
    card.addEventListener("mouseout", () => {
      card.classList.remove("shoes__card--active");
    });
    card.addEventListener("mouseover", () => {
      card.classList.add("shoes__card--active");
    });

    card.addEventListener("click", () => {
      // data
      const brand = shoesData[i].brand;
      const name = shoesData[i].name;
      const image = shoesData[i].image;
      const price = shoesData[i].price;
      const sizes = shoesData[i].sizes;

      // add data to click
      showNumber.innerHTML = `<span>${String(i + 1).padStart(
        2,
        0
      )}</span>/<span>${String(shoesCard.length).padStart(2, 0)}</span>`;
      presentCardTitle.innerHTML = `<h1>${brand}</h1>
    <p>${name}</p>`;
      presentCardImage.innerHTML = `<img src="${image}" alt="" />`;
      presentCardPrice.innerHTML = `<p>Price</p>
    <h1>${price}$</h1>`;

      presentCardSizeContainer.innerHTML = "";

      sizes.forEach((size) => {
        const html = `<div class="present__card--size--card">${size}</div>`;
        presentCardSizeContainer.insertAdjacentHTML("beforeend", html);
      });
      // add selected size
      const presentCardSizeCard = document.querySelectorAll(
        ".present__card--size div"
      );

      // present select item
      presentCardSizeCard.forEach((size) => {
        size.addEventListener("click", function () {
          if (
            Array.from(presentCardSizeCard).some((el) => {
              el.classList.contains("presentCardSizeActive");
            })
          ) {
            console.log("yes");
            addToCard.addEventListener("click", function () {});
          }
          presentCardSizeCard.forEach((si) => {
            si.classList.remove("presentCardSizeActive");
          });
          size.classList.add("presentCardSizeActive");
        });
      });

      // react to click animation
      presentImage.classList.add("present__image--active");
      presentCard.classList.add("present__card--active");
      backspaceEl.classList.add("backspace__active");
      addToCard.classList.add("addToShop__active");
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.overflow = "scroll";
      // add to card
      addToCard.addEventListener("click", function () {
        redNoti.classList.add("red--noti__active");
      });
    });
  });

  const closePresentPage = function () {
    presentImage.classList.remove("present__image--active");
    presentCard.classList.remove("present__card--active");
    backspaceEl.classList.remove("backspace__active");
    addToCard.classList.remove("addToShop__active");
    document.querySelector("body").style.position = "static";
  };

  backspaceEl.addEventListener("click", function () {
    closePresentPage();
  });
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Escape") {
      closePresentPage();
    }
  });
};
cards();

// sort function
sortOptions.forEach((sort) => {
  sort.addEventListener("click", () => {
    shoesContainer.innerHTML = "";
    sortMessage.innerHTML = sort.innerHTML;
    if (sort.innerHTML === "High to low") {
      shoesData.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (sort.innerHTML === "Low to high") {
      shoesData.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (sort.innerHTML === "What's new") {
      shoesData.sort((a, b) => {
        if (a.calc > b.calc) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    loadData();
    cards();
  });
});

// intersection observe header
const noneDisplay = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    document.querySelector(".navbar").style.display = "none";
  } else {
    document.querySelector(".navbar").style.display = "flex";
  }
};

const shopObserver = new IntersectionObserver(noneDisplay, {
  root: null,
  threshold: 0.9,
});
shopObserver.observe(shopEl);

// slider
let currentSlide = 0;
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%) `;
});
const change = function () {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%) `;
  });
};
const increaseCur = function () {
  if (currentSlide <= slides.length - 2) {
    currentSlide++;
  }
  change();
};
const decreaseCur = function () {
  if (currentSlide >= 1) {
    currentSlide--;
  }
  change();
};
swipeRight.addEventListener("click", increaseCur);
swipeleft.addEventListener("click", decreaseCur);
document.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.key === "ArrowLeft") {
    decreaseCur();
  }
});
document.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.key === "ArrowRight") {
    increaseCur();
  }
});
