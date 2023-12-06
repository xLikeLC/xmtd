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
  });

  $("#birthday").on("input", function () {
    changePlaceholderColor(this);
  });
  // change place holder inputcolor
  function changePlaceholderColor(input) {
    input.setAttribute("placeholder", "dd/mm/yy");
    input.style.color = "#000";
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Получаем кнопку "Continue" на первом шаге
    var continueButton = document.querySelector(
      ".form__step:first .form-btn button"
    );

    // Добавляем обработчик события клика на кнопку "Continue"
    continueButton.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("continueButton");

      // Предотвращаем действие по умолчанию (например, отправку формы)

      // Убираем класс активного шага с первого и добавляем к следующему
      document
        .querySelector(".form__step:first")
        .classList.remove("form__step--active");
      document
        .querySelector(".form__step:nth-child(2)")
        .classList.add("form__step--active");

      // Изменяем стиль для шкалы прогресса
      var progressBar = document.querySelector(
        ".form__bars-line--first::before"
      );
      progressBar.style.width = "100%";
    });
  });
});
