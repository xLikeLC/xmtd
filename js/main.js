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
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  });

  $("#birthday").on("input", function () {
    changePlaceholderColor(this);
  });
  // change place holder inputcolor
  function changePlaceholderColor(input) {
    input.setAttribute("placeholder", "dd/mm/yy");
    input.style.color = "#000";
  }
});
