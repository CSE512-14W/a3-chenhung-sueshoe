$(document).ready(function(){
    cr_main.init();
});

cr_main = {
    init: function(){
    }
};
$(".area").hover(function(){
    var districtname = $(this).attr("district");
    var districtcode = "." + districtname;
    $(districtcode).css("opacity", 1);
    $("#localdistrict").html(districtname);
}, function(){
    var districtname = $(this).attr("district");
    var districtcode = "." + districtname;
    $(districtcode).css("opacity", 0.1);
    $("#localdistrict").html("Grand Total");
});
