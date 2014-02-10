$(document).ready(function(){
    cr_main.init();
});

cr_main = {
    init: function(){
    }
};
$(".area").hover(function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css("opacity", 1);
}, function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css("opacity", 0.1);
});
$("path").hover(function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css("opacity", 1);
}, function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css("opacity", 0.1);
});
/*
$(".area").hover(function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css("opacity", 1);
}, function(){
    var districtcode = "." + $(this).attr("district");
    $(districtcode).css("opacity", 0.2);
});
*/
