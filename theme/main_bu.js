var crimeclone = {};

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
    $("#seattlemap").find(districtcode).css("stroke-width", "2px");
    $("#localdistrict").html(districtname);
    var val = findvalue(districtname);
    console.log(val);
}, function(){
    var districtname = $(this).attr("district");
    var districtcode = "." + districtname;
    $(districtcode).css("opacity", 0.05);
    $("#seattlemap").find(districtcode).css("opacity", 0.5);
    $("#seattlemap").find(districtcode).css("stroke-width", "0.5px");
    $("#localdistrict").html("Median");
});

function findvalue(districtname){
    for(var i = 0; i < crimeclone.length; ++i){
        if(crimeclone[i]['District'] == districtname){
            return crimeclone[i];
            i = crimeclone.length;
        }
    }
}
