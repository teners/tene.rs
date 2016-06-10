/**
 * Created by Sergey Sokolov on 6/8/16.
 */
var hide;

hide = function(container) {
    $(container).hide(500, function() {
        container.style.visibility = "hidden";
    });
};


$(document).ready(function(){
    $("#header").fadeOut(0).fadeIn(700);
    $("#photo").fadeOut(0).delay(700).show(1000);
    $("#main").fadeOut(0).delay(1700).slideDown(700);
    $("#footer").hide(0).delay(2400).show(700);
});
