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

  function changePlaceholderColor(input) {
    input.setAttribute("placeholder", "dd/mm/yy");
    input.style.color = "#000";
  }
});
