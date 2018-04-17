$(document).ready(function () {

    $('.goods-slider__item').on('click',function () {
        var thisSrc = $(this).children('img').attr('src');

        $('.goods-slider__for img').attr('src', thisSrc);
    })

});
