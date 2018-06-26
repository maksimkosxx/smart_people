$(document).ready(function () {

    $('.goods-slider__item').on('click',function () {
        var thisSrc = $(this).children('img').attr('src');

        $('.goods-slider__for img').attr('src', thisSrc);
    });

    function tabs() {
        $('.profile-tabs__nav div').on('click', function () {

            var click_id = $(this).attr('id');
            var item = '#item_' + click_id;

            $('.profile-tabs__nav div').removeClass('current');
            $('.profile-content__item').hide();
            $(this).addClass('current');
            $(item).show();
        });
    }
    tabs();

    $('.grid-sidebar').on('click',function () {
        $(this).css('width', '100%');
        $('.person-photo').toggleClass('hidden');
        $('.person').children().slideToggle();
    });

});
