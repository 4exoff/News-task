; (function () {
    $('#menuToggle').hide();
    $('.fa-window-close').on('click', function () {
        $('body').toggleClass('body-push-toright');
        $('#theMenu').toggleClass('menu-open');
        $('#menuToggle').show(100);
    });
    $('#menuToggle').on('click', function () {
        $('#theMenu').toggleClass('menu-open');
        $('#menuToggle').hide();
    });
})(jQuery)