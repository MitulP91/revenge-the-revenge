var $container = $("#scrollContainer"),
    $ps = $container.find("p"),
    containerHeight = $container.height(),
    contentHeight = 0,
    scrollTop = 0;

$ps.each(function() {
    contentHeight += $(this).outerHeight();
});

$("<div></div>").css("height", 400).appendTo($container).clone().prependTo($container);

setInterval(function() {
    if (scrollTop > contentHeight + containerHeight)
        scrollTop = 0;
    $container.scrollTop(scrollTop++);
        
    $ps.removeClass("highlighted")
       .addClass("dimmed")
       .each(function() {
           var $this = $(this),
               top = $this.position().top,
               height = $this.height();
           if (top > 0 && top + height < containerHeight)
                    $(this).addClass("highlighted");
    });
}, 20);
