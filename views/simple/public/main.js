jQuery(function(){
 var ink, d, x, y;
 jQuery(".ripplelink").click(function(e){
    if(jQuery(this).find(".ink").length === 0){
        jQuery(this).prepend("<span class='ink'></span>");
    }
         
    ink = jQuery(this).find(".ink");
    ink.removeClass("animate");
     
    if(!ink.height() && !ink.width()){
        d = Math.max(jQuery(this).outerWidth(), jQuery(this).outerHeight());
        ink.css({height: d, width: d});
    }
     
    x = e.pageX - jQuery(this).offset().left - ink.width()/2;
    y = e.pageY - jQuery(this).offset().top - ink.height()/2;
     
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
});
});