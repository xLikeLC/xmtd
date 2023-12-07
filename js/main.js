const fullNameInput = document.querySelector("#username");
const fullNameError = document.querySelector("#fullName-error");

fullNameInput.addEventListener("input", (e) => {
  fullNameError.hidden = validateFullNameField(e.target.value);
  console.log(fullNameError);
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

birthDateInput.addEventListener("input", (e) => {
  const { maxAge, minAge } = validateBirthDateField(e.target.value);
  birthDateMaxAgeError.hidden = true;
  birthDateMinAgeError.hidden = true;
  if (maxAge) {
    birthDateMaxAgeError.hidden = false;
    return;
  }
  if (minAge) {
    birthDateMinAgeError.hidden = false;
    return;
  }
  birthDateMaxAgeError.hidden = true;
  birthDateMinAgeError.hidden = true;
});
// email check
function validateEmail() {
  let emailInput = document.getElementById("email");
  let emailError = document.getElementById("email-error");

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value)) {
    emailError.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
        <g clip-path="url(#clip0_4805_137)">
          <path d="M4.5 9C6.98555 9 9 6.98555 9 4.5C9 2.01445 6.98555 0 4.5 0C2.01445 0 0 2.01445 0 4.5C0 6.98555 2.01445 9 4.5 9ZM4.5 6.1875C3.56836 6.1875 2.8125 5.43164 2.8125 4.5C2.8125 3.56836 3.56836 2.8125 4.5 2.8125C5.43164 2.8125 6.1875 3.56836 6.1875 4.5C6.1875 5.43164 5.43164 6.1875 4.5 6.1875Z" fill="#D51820"/>
        </g>
      </svg>Please enter a valid email address`;
    emailError.style.display = "block";
    return false;
  } else {
    emailError.style.display = "none";
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
    paswordInputErrorWithinRange.classList.remove("error-message");
    paswordInputErrorWithinRange.classList.add("success-message");
  } else {
    paswordInputErrorWithinRange.classList.add("error-message");
    paswordInputErrorWithinRange.classList.remove("success-message");
  }

  if (oneOrMoreNumbers) {
    paswordInputErrorOneOrMoreNumbers.classList.remove("error-message");
    paswordInputErrorOneOrMoreNumbers.classList.add("success-message");
  } else {
    paswordInputErrorOneOrMoreNumbers.classList.add("error-message");
    paswordInputErrorOneOrMoreNumbers.classList.remove("success-message");
  }

  if (oneOrMoreLowercase) {
    paswordInputErrorOneOrMoreLowercase.classList.remove("error-message");
    paswordInputErrorOneOrMoreLowercase.classList.add("success-message");
  } else {
    paswordInputErrorOneOrMoreLowercase.classList.add("error-message");
    paswordInputErrorOneOrMoreLowercase.classList.remove("success-message");
  }

  if (oneOrMoreUppercase) {
    paswordInputErrorOneOrMoreUppercase.classList.remove("error-message");
    paswordInputErrorOneOrMoreUppercase.classList.add("success-message");
  } else {
    paswordInputErrorOneOrMoreUppercase.classList.add("error-message");
    paswordInputErrorOneOrMoreUppercase.classList.remove("success-message");
  }

  if (oneOrMoreSpecial) {
    paswordInputErrorOneOrMoreSpecial.classList.remove("error-message");
    paswordInputErrorOneOrMoreSpecial.classList.add("success-message");
  } else {
    paswordInputErrorOneOrMoreSpecial.classList.add("error-message");
    paswordInputErrorOneOrMoreSpecial.classList.remove("success-message");
  }
});
// Active button
function validateStep1() {
  let fullName = document.getElementById("username").value.trim();
  let birthday = document.getElementById("birthday").value.trim();

  if (fullName === "" || birthday === "") {
    alert("Please complete all steps.");
    return false;
  }

  showStep(2);
}

function validateStep2() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill in all fields for Step 2.");
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

  $("#birthday").on("input", function () {
    changePlaceholderColor(this);
  });
});
