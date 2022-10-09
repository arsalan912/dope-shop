const payment = document.querySelectorAll(".payment");
const overlayAccount = document.querySelector(".overlay--account");
const craateAccount = document.querySelector(".craate--account");
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const showNumber = document.querySelector(".show__number");
const closeEl = document.querySelectorAll(".next__container");
const card = document.querySelectorAll(".card__container--item");

// form
const addAccount = function () {
  overlayAccount.classList.add("overlay--active");
  craateAccount.classList.add("account__active");
};
const removeAcc = function () {
  overlayAccount.classList.remove("overlay--active");
  craateAccount.classList.remove("account__active");
};
payment.forEach((pay) => {
  pay.addEventListener("click", addAccount);
});

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.code === "Escape") {
    removeAcc();
  }
});
overlayAccount.addEventListener("click", removeAcc);
// increase
let counti = 1;
increase.addEventListener("click", function () {
  if (counti < 8) {
    counti++;
  }
  showNumber.innerHTML = counti;
});
decrease.addEventListener("click", function () {
  if (counti > 1) {
    counti--;
  }
  showNumber.innerHTML = counti;
});
// remove cards
closeEl.forEach((close, i) =>
  close.addEventListener("click", function () {
    card[i].style.display = "none";
  })
);
