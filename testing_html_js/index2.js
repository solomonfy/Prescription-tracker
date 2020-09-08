$("#search-criteria").on("keyup", function () {
    var g = $(this).val().toLowerCase();
    $(".fbbox .fix label").each(function () {
        var s = $(this).text().toLowerCase();
        $(this).closest('.fbbox')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
    });
});​