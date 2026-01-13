(function () {
  if (!window.jQuery) return;

  $(function () {
    const $thumbs = $('#thumbnails');
    const $main = $('#main-image');
    if ($thumbs.length === 0 || $main.length === 0) return;

    const images = [
      "../images/img1.png",
      "../images/img2.png",
      "../images/img3.png",
      "../images/img4.png",
      "../images/img5.png"
    ];

    let currentIndex = 0;

    images.forEach((src, index) => {
      $thumbs.append(`<img src="${src}" data-index="${index}" alt="Miniatura ${index + 1}">`);
    });

    function showImage(index) {
      currentIndex = index;
      $main.attr("src", images[currentIndex]);
      $("#thumbnails img").removeClass("active");
      $(`#thumbnails img[data-index=${currentIndex}]`).addClass("active");
    }

    showImage(0);

    $("#thumbnails").on("click", "img", function () {
      showImage($(this).data("index"));
    });

    $(".next").on("click", function () {
      showImage((currentIndex + 1) % images.length);
    });
    $(".prev").on("click", function () {
      showImage((currentIndex - 1 + images.length) % images.length);
    });
  });
})();
