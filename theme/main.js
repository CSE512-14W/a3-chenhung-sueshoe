$(document).ready(function(){
    cr_main.init();
});

cr_main = {
    init: function(){
    }
};

$(".area").hover(function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css({"opacity": 0.5});
}, function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css({"opacity": 1});
});
