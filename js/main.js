async function fetchData() {
  const fetchData = await fetch("https://api.coinlore.net/api/tickers/");
  const response = await fetchData.json();
  return response.data;
}

document.addEventListener("DOMContentLoaded", function async() {
  fetchData().then((response) => {
    const btcResponse = response[0];
    const ethResponse = response[1];
    const xrpResponse = response[4];
    const ltcResponse = response[17];
    const bchResponse = response[18];
    const allCoins = [
      { ...btcResponse },
      { ...ethResponse },
      { ...xrpResponse },
      { ...ltcResponse },
      { ...bchResponse },
    ];
    allCoins.map((el, idx) => {
      document.querySelectorAll(".crypto__content-item-unit")[idx].textContent =
        el.symbol;
      document.querySelectorAll(".crypto__content-price")[
        idx
      ].textContent = `$${el.price_usd}`;
      document.querySelectorAll(".crypto__content-item-name")[idx].textContent =
        el.name;
      if (+el.percent_change_24h < 0) {
        document
          .querySelectorAll(".crypto__item-bottom")
          [idx].children[1].classList.add("up");
        document.querySelectorAll(".crypto__item-bottom")[
          idx
        ].children[0].innerHTML = `<svg width="11px" height="11px" viewBox="0 0 11 11" version="1.1">
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(69.411765%,100%,76.078431%);fill-opacity:1;" d="M 5.5 0.917969 C 2.96875 0.917969 0.917969 2.96875 0.917969 5.5 C 0.917969 8.03125 2.96875 10.082031 5.5 10.082031 C 8.03125 10.082031 10.082031 8.03125 10.082031 5.5 C 10.082031 2.96875 8.03125 0.917969 5.5 0.917969 Z M 7.199219 6.285156 C 7.113281 6.371094 6.996094 6.417969 6.875 6.417969 C 6.753906 6.417969 6.636719 6.371094 6.550781 6.285156 L 5.5 5.230469 L 4.449219 6.285156 C 4.269531 6.464844 3.980469 6.464844 3.800781 6.285156 C 3.621094 6.105469 3.621094 5.8125 3.800781 5.632812 L 5.175781 4.257812 C 5.261719 4.171875 5.378906 4.121094 5.5 4.121094 C 5.621094 4.121094 5.738281 4.171875 5.824219 4.257812 L 7.199219 5.632812 C 7.289062 5.71875 7.335938 5.835938 7.335938 5.957031 C 7.335938 6.082031 7.289062 6.199219 7.199219 6.285156 Z M 7.199219 6.285156 "></path>
    </svg>`;
      } else {
        document
          .querySelectorAll(".crypto__item-bottom")
          [idx].children[1].classList.add("down");
        document.querySelectorAll(".crypto__item-bottom")[
          idx
        ].children[0].innerHTML = `<svg width="11px" height="11px" viewBox="0 0 24 24" class="icon glyph" fill="#FFA3A6" stroke="#FFA3A6">
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,9.71-3,3a1,1,0,0,1-1.42,0l-3-3a1,1,0,0,1,1.42-1.42L12,12.59l2.29-2.3a1,1,0,0,1,1.42,1.42Z" style="fill:#FFA3A6"></path>
    </svg>`;
      }

      document.querySelectorAll(".crypto__item-bottom")[
        idx
      ].children[1].textContent = `${Math.abs(el.percent_change_24h)}%`;
    });
    console.log(allCoins);
  });
});

// Setup Name
const fullNameInput = document.querySelector("#username");
const fullNameError = document.querySelector("#fullName-error");
const btnFirst = document.querySelector(".btn-next");
const inputUsername = document.querySelector(".form__step-input--username");

fullNameInput.addEventListener("input", (e) => {
  const isValid = validateFullNameField(e.target.value);
  fullNameError.hidden = isValid;

  if (e.target.value.trim() !== "") {
    inputUsername.classList.toggle("form__step-input--error", !isValid);
    inputUsername.classList.toggle("form__step-input--success", isValid);
  } else {
    btnFirst.classList.remove("form-btn--success");
    inputUsername.classList.remove("form__step-input--success");
    inputUsername.classList.remove("form__step-input--error");
  }
});

const validateFullNameField = (name) => /^([a-zA-Z]+\s?)+$/.test(name);

const validateBirthDateField = (value) => {
  const date = new Date(value);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - date.getFullYear();

  return {
    maxAge: age >= 60,
    minAge: age <= 18,
  };
};

// Setup Birthdate
const birthDateInput = document.querySelector("#birthday");
const birthDateMaxAgeError = document.querySelector("#upAgeError");
const birthDateMinAgeError = document.querySelector("#downAgeError");
const inputBirthday = document.querySelector(".form__step-input--birthday");
const btnStep = document.querySelector(".btn-next");
const stepBars = document.querySelector(".form__bars-line--first");

birthDateInput.addEventListener("input", (e) => {
  const { maxAge, minAge } = validateBirthDateField(e.target.value);

  birthDateMaxAgeError.hidden = true;
  birthDateMinAgeError.hidden = true;
  if (maxAge) {
    birthDateMaxAgeError.hidden = false;
    inputBirthday.classList.add("form__step-input--error");
    return;
  }
  if (minAge) {
    birthDateMinAgeError.hidden = false;
    inputBirthday.classList.add("form__step-input--error");
    console.log(minAge);
    return;
  }

  inputBirthday.classList.remove("form__step-input--error");
  inputBirthday.classList.add("form__step-input--success");
  btnStep.classList.add("form-btn--success");
  stepBars.classList.add("form__bars--success");
});

function validateEmail() {
  let emailInput = document.getElementById("email");
  let emailError = document.getElementById("email-error");
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailBorder = document.querySelector(".form__step-input--email");

  if (!emailRegex.test(emailInput.value)) {
    emailError.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
        <g clip-path="url(#clip0_4805_137)">
          <path d="M4.5 9C6.98555 9 9 6.98555 9 4.5C9 2.01445 6.98555 0 4.5 0C2.01445 0 0 2.01445 0 4.5C0 6.98555 2.01445 9 4.5 9ZM4.5 6.1875C3.56836 6.1875 2.8125 5.43164 2.8125 4.5C2.8125 3.56836 3.56836 2.8125 4.5 2.8125C5.43164 2.8125 6.1875 3.56836 6.1875 4.5C6.1875 5.43164 5.43164 6.1875 4.5 6.1875Z" fill="#D51820"/>
        </g>
      </svg> Please enter a valid email address`;
    emailError.style.display = "block";
    emailBorder.classList.add("form__step-input--error");
    return false;
  } else {
    emailError.style.display = "none";
    emailBorder.classList.add("form__step-input--success");
    console.log(emailBorder);
    emailBorder.classList.remove("form__step-input--error");

    return true;
  }
}

let emailInput = document.getElementById("email");
emailInput.addEventListener("input", validateEmail);

// password check
const passInput = document.querySelector("#password");
const paswordInputErrorWithinRange = document.querySelector(
  "#paswordInputErrorWithinRange"
);
const paswordInputErrorOneOrMoreNumbers = document.querySelector(
  "#paswordInputErrorOneOrMoreNumbers"
);
const paswordInputErrorOneOrMoreLowercase = document.querySelector(
  "#paswordInputErrorOneOrMoreLowercase"
);
const paswordInputErrorOneOrMoreUppercase = document.querySelector(
  "#paswordInputErrorOneOrMoreUppercase"
);
const paswordInputErrorOneOrMoreSpecial = document.querySelector(
  "#paswordInputErrorOneOrMoreSpecial"
);
const pathCaracters = document.querySelector(".form__step--characters path");
const pathNumbers = document.querySelector(".form__step--numbers path");
const pathLowercase = document.querySelector(".form__step--lowercase path");
const pathUppercase = document.querySelector(".form__step--uppercase path");
const pathSpecial = document.querySelector(".form__step--special path");
const barsSucces = document.querySelector(".form__bars-line--second");
const btnSucces = document.querySelector(".btn-register");
const inputSucces = document.querySelector(".form__step-input--password");

const validatePasswordField = (value) => {
  const withinRange = (value) => {
    const minRange = 8;
    const maxRange = 15;
    return minRange <= value.length && maxRange >= value.length;
  };

  const oneOrMoreNumbers = (value) => /\d/.test(value);
  const oneOrMoreUppercase = (value) => /[A-Z]/.test(value);
  const oneOrMoreLowercase = (value) => /[a-z]/.test(value);
  const oneOrMoreSpecial = (value) => /[#\[ \]()@$&*!?|,.^/\\+_\-]/.test(value);

  return {
    withinRange: withinRange(value),
    oneOrMoreNumbers: oneOrMoreNumbers(value),
    oneOrMoreLowercase: oneOrMoreLowercase(value),
    oneOrMoreUppercase: oneOrMoreUppercase(value),
    oneOrMoreSpecial: oneOrMoreSpecial(value),
  };
};

passInput.addEventListener("input", (e) => {
  const {
    withinRange,
    oneOrMoreNumbers,
    oneOrMoreLowercase,
    oneOrMoreUppercase,
    oneOrMoreSpecial,
  } = validatePasswordField(e.target.value);

  if (withinRange) {
    pathCaracters.setAttribute("fill", "#29a643");
    paswordInputErrorWithinRange.classList.remove("error-message");
    paswordInputErrorWithinRange.classList.add("success-message");
    inputSucces.classList.add("form__step-input--error");
  } else {
    pathCaracters.setAttribute("fill", "#d51820");
    paswordInputErrorWithinRange.classList.add("error-message");
    paswordInputErrorWithinRange.classList.remove("success-message");
  }

  if (oneOrMoreNumbers) {
    pathNumbers.setAttribute("fill", "#29a643");
    paswordInputErrorOneOrMoreNumbers.classList.remove("error-message");
    paswordInputErrorOneOrMoreNumbers.classList.add("success-message");
    inputSucces.classList.add("form__step-input--error");
  } else {
    pathNumbers.setAttribute("fill", "#d51820");
    paswordInputErrorOneOrMoreNumbers.classList.add("error-message");
    paswordInputErrorOneOrMoreNumbers.classList.remove("success-message");
  }

  if (oneOrMoreLowercase) {
    pathLowercase.setAttribute("fill", "#29a643");
    paswordInputErrorOneOrMoreLowercase.classList.remove("error-message");
    paswordInputErrorOneOrMoreLowercase.classList.add("success-message");
    inputSucces.classList.add("form__step-input--error");
  } else {
    pathLowercase.setAttribute("fill", "#d51820");
    paswordInputErrorOneOrMoreLowercase.classList.add("error-message");
    paswordInputErrorOneOrMoreLowercase.classList.remove("success-message");
  }

  if (oneOrMoreUppercase) {
    pathUppercase.setAttribute("fill", "#29a643");
    paswordInputErrorOneOrMoreUppercase.classList.remove("error-message");
    paswordInputErrorOneOrMoreUppercase.classList.add("success-message");
  } else {
    pathUppercase.setAttribute("fill", "#d51820");
    paswordInputErrorOneOrMoreUppercase.classList.add("error-message");
    paswordInputErrorOneOrMoreUppercase.classList.remove("success-message");
  }

  if (oneOrMoreSpecial) {
    pathSpecial.setAttribute("fill", "#29a643");
    paswordInputErrorOneOrMoreSpecial.classList.remove("error-message");
    paswordInputErrorOneOrMoreSpecial.classList.add("success-message");
  } else {
    pathSpecial.setAttribute("fill", "#d51820");
    paswordInputErrorOneOrMoreSpecial.classList.add("error-message");
    paswordInputErrorOneOrMoreSpecial.classList.remove("success-message");
  }
  if (
    (withinRange,
    oneOrMoreNumbers,
    oneOrMoreLowercase,
    oneOrMoreUppercase,
    oneOrMoreSpecial)
  ) {
    barsSucces.classList.add("form__bars-line--50");
    btnSucces.classList.remove("form-btn--disabled");
    btnSucces.classList.add("form-btn--success");
    inputSucces.classList.add("form__step-input--success");
    console.log(inputSucces);
  } else {
    barsSucces.classList.remove("form__bars-line--50");
    btnSucces.classList.remove("form-btn--success");
    btnSucces.classList.add("form-btn--disabled");
    inputSucces.classList.remove("form__step-input--success");
  }
});

// Active button
function validateStep1() {
  let fullName = document.getElementById("username").value.trim();
  let birthday = document.getElementById("birthday").value.trim();
  const btnStep1 = document.querySelector(".btn-next");
  let thisYear = new Date().getFullYear() - new Date(birthday).getFullYear();
  if (fullName === "" || birthday === "") {
    alert("Please complete all steps.");
    return false;
  }
  if (thisYear > 60) {
    alert("Maximum age requirements, 60 years old");
    return false;
  }
  if (thisYear < 18) {
    alert("Minimum age requirements, 18 years old");
    return false;
  }
  btnStep.classList.add("form-btn--success");
  showStep(2);
}

function validateStep2() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const withinRange = (value) => {
    const minRange = 8;
    const maxRange = 15;
    return minRange <= value.length && maxRange >= value.length;
  };
  const oneOrMoreNumbers = (value) => /\d/.test(value);
  const oneOrMoreUppercase = (value) => /[A-Z]/.test(value);
  const oneOrMoreLowercase = (value) => /[a-z]/.test(value);
  const oneOrMoreSpecial = (value) => /[#\[ \]()@$&*!?|,.^/\\+_\-]/.test(value);

  if (email === "" || password === "") {
    alert("Please fill in all fields for Step 2.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Return");
    return false;
  }
  if (!withinRange(password)) {
    alert("withinRange");
    return false;
  }
  if (!oneOrMoreNumbers(password)) {
    alert("oneOrMoreNumbers");
    return false;
  }
  if (!oneOrMoreUppercase(password)) {
    alert("oneOrMoreUppercase");
    return false;
  }
  if (!oneOrMoreLowercase(password)) {
    alert("oneOrMoreLowercase");
    return false;
  }
  if (!oneOrMoreSpecial(password)) {
    alert("oneOrMoreSpecial");
    return false;
  }

  showStep(3);
}
function showStep(stepNumber) {
  let steps = document.querySelectorAll(".form__step");
  for (let i = 0; i < steps.length; i++) {
    steps[i].classList.remove("form__step--active");
  }

  steps[stepNumber - 1].classList.add("form__step--active");
}

//  Slaider
$(function () {
  $(".slider-blog__items").slick({
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="images/icon/arrow-left.svg" alt="arrow-left"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="images/icon/arrow-right.svg" alt="arrow-right"></button>',

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  });
});
