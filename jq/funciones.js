
$(document).ready(function () {

    // Menu desplegable y volver arriba

    $("#volverarriba").on("click", function () {
        $("html").animate({ scrollTop: 0 }, "slow");
    });

    $("ul#menu").css("display", "none");
    $("nav#menu-principal span").on({
        click: function () {
            $("ul#menu").stop(true, true).toggle(500);
        }
    });

    $("ul#menu > li").on({
        click: function () {
            $("ul#menu > li").find("span").css({
                transform: "rotate(0deg)",
                transition: "transform 0.3s ease"
            })

            $(this).siblings().children("ul").slideUp(500);

            if ($(this).children("#ul").is(":hidden")) {
                $(this).children("ul").slideDown(500);
                $(this).find("span").css({
                    transform: "rotate(180deg)",
                    transition: "transform 0.3s ease"
                });
            } else {
                $(this).children("ul").slideUp(500);
                $(this).find("span").css("transform", "rotate(0deg)");
            }
        }
    });
/*
    $(window).scroll(function () {
            $("#comprar").css({
                position: "relative",
                top: "1rem",
                opacity: "90%",
                width: "100%",
                backgroundColor: "red"
            })
        
    });*/


    // Slider

    var SliderModule = (function () {
        var pb = {};

        pb.elslider = $("#slider");

        pb.items = {
            panels: pb.elslider.find(".slider-wrapper > li"),
        }

        var SliderInterval, currentSlider = 0, nextSlider = 1, lengthSlider = pb.items.panels.length;

        pb.init = function (settings) {
            var loscontroles = '';
            this.settings = settings || { duration: 3000 }

            SliderInit();

            for (let i = 0; i < lengthSlider; i++) {
                if (i == 0) {
                    loscontroles += '<li class="active"></li>';
                } else {
                    loscontroles += '<li></li>';
                }
            }

            $('#control-buttons').html(loscontroles);

            $('#control-buttons > li').click(function () {
                if (currentSlider !== $(this).index()) {
                    cambiarPanel($(this).index());
                }
            })
        }

        var SliderInit = function () {
            SliderInterval = setInterval(pb.startSlider, pb.settings.duration);
        }

        pb.startSlider = function () {
            var paneles = pb.items.panels;
            var controles = $('#control-buttons li');

            if (nextSlider >= lengthSlider) {
                nextSlider = 0;
                currentSlider = lengthSlider - 1;
            }

            controles.removeClass('active');
            controles.eq(nextSlider).addClass('active');

            paneles.eq(currentSlider).fadeOut('slow');
            paneles.eq(nextSlider).fadeIn('slow');

            currentSlider = nextSlider;
            nextSlider += 1;
        }

        var cambiarPanel = function (indice) {
            clearInterval(SliderInterval);

            var paneles = pb.items.panels;
            var controles = $('#control-buttons li');

            if (indice >= lengthSlider) {
                indice = 0;
            } else if (indice < 0) {
                indice = lengthSlider - 1;
            }

            controles.removeClass('active');
            controles.eq(indice).addClass('active');

            paneles.eq(currentSlider).fadeOut('slow');
            paneles.eq(indice).fadeIn('slow');

            currentSlider = indice;
            nextSlider = indice + 1;

            SliderInit();
        }

        return pb;
    }());

    // Llamada al constructor
    SliderModule.init();

    

});