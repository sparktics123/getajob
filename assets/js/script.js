(function ($) {

    'use strict';

    /*-------------------------------------------
       preloader
   --------------------------------------------- */

    $(window).on('load', function () {
        $('#ctn-preloader').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({ 'overflow': 'visible' });
    });

    /*-------------------------------------------
        off-canvas-menu
    --------------------------------------------- */

    $('.off-canvas-menu .has-dropdown').prepend('<span class="toggle-btn"><i class="icon"></i></span>');

    $('.off-canvas-menu .has-dropdown > .toggle-btn').on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().children('.sub-menu').slideToggle();
        $(this).parent().siblings().children('.sub-menu').slideUp();
        $(this).parent().siblings().removeClass('active');
    });

    $("[data-open-sidebar]").on('click', function () {
        $('body').addClass('stop-scroll');
        $('.off-canvas-section').addClass('active');
        $('.off-canvas-wrap').addClass('active');
    });

    $(document).on('click', '.off-canvas-menu .mainmenu li a', function () {
        $(".off-canvas-section").removeClass("active");
        $(".off-canvas-wrap").removeClass("active");
    });

    $(".off-canvas-overlay").on('click', function () {
        $('body').removeClass('stop-scroll');
        $(this).parent().removeClass('active');
        $('.off-canvas-wrap').removeClass('active');
    });

    $(".off-canvas-close").on('click', function () {
        $('body').removeClass('stop-scroll');
        $('.off-canvas-section').removeClass('active');
        $('.off-canvas-wrap').removeClass('active');
    });

    // search
    $(".open-search-bar").on('click', function () {
        $('body').addClass('stop-scroll');
        $('.search-popup').addClass('opened');
        $('.search-popup-overlay').addClass('opened');
    });

    $(".search-popup-close").on('click', function () {
        $('body').removeClass('stop-scroll');
        $('.search-popup').removeClass('opened');
        $('.search-popup-overlay').removeClass('opened');
    });

    $(".search-popup-overlay").on('click', function () {
        $('body').removeClass('stop-scroll');
        $('.search-popup').removeClass('opened');
        $(this).removeClass('opened');
    });

    /*-------------------------------------------
        mobile menu
    --------------------------------------------- */
    $('#mobile-menu-active').metisMenu();

    $('#mobile-menu-active .has-dropdown > a').on('click', function (e) {
        e.preventDefault();
    });

    /*-------------------------------------------
        Sticky Header
    --------------------------------------------- */

    let win = $(window);
    let sticky_id = $("[data-header-sticky]");
    win.on('scroll', function () {
        let scroll = win.scrollTop();
        if (scroll < 245) {
            sticky_id.removeClass("sticky-header");
        } else {
            sticky_id.addClass("sticky-header");
        }
    });

    /*------------------------------------
        cart-plus-minus
    --------------------------------------*/

    $(".quantity-wrap").append('<div class="qtybutton minus"><i class="far fa-minus"></i></div><div class="qtybutton plus"><i class="far fa-plus"></i></div>');

    $(".quantity-wrap").on("click", ".qtybutton.plus, .qtybutton.minus", function () {
        // Get current quantity values
        let qty = $(this).closest(".quantity-wrap").find(".qty");
        let val = parseFloat(qty.val());
        let max = parseFloat(qty.attr("max"));
        let min = parseFloat(qty.attr("min"));
        let step = parseFloat(qty.attr("step"));

        // Change the value if plus or minus
        if ($(this).is(".plus")) {
            if (max && max <= val) {
                qty.val(max);
            } else {
                qty.val(val + step).trigger("change");
            }
        } else {
            if (min && min >= val) {
                qty.val(min);
            } else if (val > 1) {
                qty.val(val - step).trigger("change");
            }
        }
    });

    /*------------------------------------
        product-review-rating
    --------------------------------------*/

    $('.p-review-form .rating-wrap a').on('click', function (event) {
        event.preventDefault();
        $(this).parent().addClass('selected');
        $(this).addClass('active').siblings().removeClass('active');
    });

    /*------------------------------------
        project-accordion
    --------------------------------------*/
    $('.project-accordion').on('click', function (event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    /*------------------------------------
        Data-Background
    --------------------------------------*/
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });

    $("[data-bg-color]").each(function () {
        $(this).css("background", $(this).attr("data-bg-color"))
    });

    /*------------------------------------
        nice-select
    --------------------------------------*/
    if (jQuery(".nice-dropdown").length > 0) {
        $('.nice-dropdown select').niceSelect();
    }

    /*------------------------------------
        nscroll to top
    --------------------------------------*/

    var scrollToTopBtn = $('#scrollToTopBtn');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            scrollToTopBtn.addClass('show');
        } else {
            scrollToTopBtn.removeClass('show');
        }
    });

    scrollToTopBtn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

    /*------------------------------------
        circle-progressbar
    --------------------------------------*/
    if (jQuery(".knob").length > 0) {
        $('.knob').each(function () {
            let $this = $(this), knobVal = $this.attr('data-rel');

            $this.knob({
                'draw': function () {
                    $(this.i).val(this.cv + '%')
                }
            });

            $this.appear(function () {
                $({
                    value: 0
                }).animate({
                    value: knobVal
                }, {
                    duration: 2000, easing: 'swing', step: function () {
                        $this.val(Math.ceil(this.value)).trigger('change');
                    }
                });
            }, {
                accX: 0, accY: -150
            });
        });
    }


    /*------------------------------------
        progress-bar
    --------------------------------------*/
    if (jQuery(".progress-bar").length > 0) {
        function animateProgressBar() {
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();

            $('.progress').each(function () {
                const progressElement = $(this);
                const progressBar = progressElement.find('.progress-bar');

                if (scrollPosition > progressElement.offset().top - windowHeight && !progressBar.hasClass('animated')) {
                    progressBar.animate({ width: progressBar.attr('aria-valuenow') + '%' }, 1000);
                    progressBar.addClass('animated');
                }
            });
        }

        $(window).scroll(animateProgressBar);
        animateProgressBar(); // Trigger the animation if the progress bars are initially in view
    }


    /*------------------------------------
        counter
    --------------------------------------*/
    if (jQuery(".odometer").length > 0) {
        $('.odometer').appear(function (e) {
            var odo = $(".odometer");
            odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }

    /*------------------------------------
        popup
    --------------------------------------*/
    if (jQuery(".popup-links").length > 0) {
        new VenoBox({
            selector: '.popup-links', numeration: true, infinigall: true, share: true, spinner: 'rotating-plane'
        });
    }

    /*------------------------------------
        filter
    --------------------------------------*/
    if (jQuery(".filter-grid").length > 0) {
        $('.filter-grid').imagesLoaded(function () {
            let $grid = $('.filter-grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                layoutMode: 'masonry', // masonry , fitRows
                masonry: {
                    columnWidth: '.grid-item' // columnWidth: 1
                }
            });
        });
    }

    /*------------------------------------
        countdown
    --------------------------------------*/
    if (jQuery("[data-countdown]").length > 0) {
        $('[data-countdown]').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                $this.html(event.strftime('<span class="cdown days"><p>Days</p> <span class="time-count">%-D</span></span> <span class="cdown hour"><p>Hour</p> <span class="time-count">%-H</span></span> <span class="cdown minutes"><p>Min</p> <span class="time-count">%M</span></span> <span class="cdown second"><p>Sec</p> <span><span class="time-count">%S</span></span>'));
            });
        });
    }


    /*------------------------------------
        sliders
    --------------------------------------*/
    if (jQuery(".hero-slider-active-2 .swiper").length > 0) {
        let homeActive2 = '.hero-slider-active-2 .swiper';
        let homeSlider2 = new Swiper('.hero-slider-active-2 .swiper', {
            // Optional parameters
            slidesPerView: 1, slidesPerColumn: 1, loop: true, spaceBetween: 0,

            autoplay: {
                delay: 5000,
            },

            // If we need pagination
            pagination: {
                el: '.home-two-pagination', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.home-two-button-next', prevEl: '.home-two-button-prev',
            },

            a11y: false,
        });

        function animated_swiper(selector, init) {
            let animated = function animated() {
                $(selector + ' [data-animation]').each(function () {
                    let anim = $(this).data('animation');
                    let delay = $(this).data('delay');
                    let duration = $(this).data('duration');

                    $(this).removeClass('anim' + anim)
                        .addClass(anim + ' animated')
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration
                        })
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass(anim + ' animated');
                        });
                });
            };
            animated();
            // Make animated when slide change
            init.on('slideChange', function () {
                $(homeActive2 + ' [data-animation]').removeClass('animated');
            });
            init.on('slideChange', animated);
        }

        animated_swiper(homeActive2, homeSlider2);
    }

    if (jQuery(".hero-slider-active-3 .swiper").length > 0) {
        let homeActive3 = '.hero-slider-active-3 .swiper';
        let homeSlider3 = new Swiper('.hero-slider-active-3 .swiper', {
            // Optional parameters
            slidesPerView: 1, slidesPerColumn: 1, loop: true, spaceBetween: 0,

            autoplay: {
                delay: 5000,
            },

            // If we need pagination
            pagination: {
                el: '.home-three-pagination', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.home-three-button-next', prevEl: '.home-three-button-prev',
            },

            a11y: false,
        });

        function animated_swiper2(selector, init) {
            let animated2 = function animated() {
                $(selector + ' [data-animation]').each(function () {
                    let anim = $(this).data('animation');
                    let delay = $(this).data('delay');
                    let duration = $(this).data('duration');

                    $(this).removeClass('anim' + anim)
                        .addClass(anim + ' animated')
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration
                        })
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass(anim + ' animated');
                        });
                });
            };
            animated2();
            // Make animated when slide change
            init.on('slideChange', function () {
                $(homeActive3 + ' [data-animation]').removeClass('animated');
            });
            init.on('slideChange', animated2);
        }

        animated_swiper2(homeActive3, homeSlider3);
    }

    if (jQuery(".service-slider-active .swiper").length > 0) {
        let serviceSlider1 = new Swiper('.service-slider-active .swiper', {
            // Optional parameters
            slidesPerView: 4, slidesPerColumn: 1, loop: true, spaceBetween: 35,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.service-pagination', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.service-button-next', prevEl: '.service-button-prev',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1,
                }, 768: {
                    slidesPerView: 2,
                }, 1024: {
                    slidesPerView: 3,
                }, 1200: {
                    slidesPerView: 4,
                },
            },
        })
    }

    if (jQuery(".service-slider-active-2 .swiper").length > 0) {
        let serviceSlider2 = new Swiper('.service-slider-active-2 .swiper', {
            // Optional parameters
            slidesPerView: 4, slidesPerColumn: 1, loop: true, spaceBetween: 30,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.service-pagination-2', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.service-button-next-2', prevEl: '.service-button-prev-2',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1,
                }, 768: {
                    slidesPerView: 2,
                }, 1024: {
                    slidesPerView: 3,
                }, 1200: {
                    slidesPerView: 4,
                },
            },
        })
    }

    if (jQuery(".testimonial-top-slider-active .swiper").length > 0) {
        let testimonialSwiper1 = new Swiper('.testimonial-top-slider-active .swiper', {
            slidesPerView: 1, slidesPerColumn: 1, loop: true, spaceBetween: 30,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.testimonial-top-pagination', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.testimonial-top-button-next', prevEl: '.testimonial-top-button-prev',
            },

            // allowTouchMove: false,

            a11y: false,

            watchSlidesProgress: true,
        });

        let testimonialSwiper2 = new Swiper('.testimonial-bottom-slider-active .swiper', {
            slidesPerView: 5, slidesPerColumn: 1, loop: true, spaceBetween: 20, centeredSlides: true,

            // autoplay: {
            //     delay: 3000,
            // },

            // If we need pagination
            pagination: {
                el: '.testimonial-bottom-pagination', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.testimonial-bottom-button-next', prevEl: '.testimonial-bottom-button-prev',
            },

            a11y: false,

            // thumbs: {
            //     swiper: testimonialTopSlider,
            // },

            effect: "coverflow", grabCursor: true, slideToClickedSlide: true, coverflowEffect: {
                rotate: 0, stretch: 0, depth: 300, modifier: 1, slideShadows: false, shadow: false,
            },

            breakpoints: {
                320: {
                    slidesPerView: 3,
                }, 768: {
                    slidesPerView: 5,
                }, 1024: {
                    slidesPerView: 5,
                }, 1200: {
                    slidesPerView: 5,
                },
            },
        });

        testimonialSwiper1.on('slideChange', function () {
            let activeslide = testimonialSwiper1.realIndex;
            let totalslide = testimonialSwiper1.slides.length;
            $(".activeslide").html('0' + (activeslide + 1));
            $(".totalslide").html('0' + (totalslide - 2));
        });

        testimonialSwiper1.controller.control = testimonialSwiper2;
        testimonialSwiper2.controller.control = testimonialSwiper1;
    }

    if (jQuery(".testimonial-slider-active-2 .swiper").length > 0) {
        let testimonialSlider2 = new Swiper('.testimonial-slider-active-2 .swiper', {
            // Optional parameters
            slidesPerView: 2, slidesPerColumn: 1, loop: true, spaceBetween: 60,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.testimonial-pagination-2', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.testimonial-button-next-2', prevEl: '.testimonial-button-prev-2',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1,
                }, 768: {
                    slidesPerView: 1,
                }, 1024: {
                    slidesPerView: 2,
                }, 1200: {
                    slidesPerView: 2,
                },
            },
        })
    }

    if (jQuery(".testimonial-slider-active-3 .swiper").length > 0) {
        let testimonialSlider3 = new Swiper('.testimonial-slider-active-3 .swiper', {
            // Optional parameters
            slidesPerView: 3, slidesPerColumn: 1, loop: true, spaceBetween: 45,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.testimonial-pagination-3', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.testimonial-button-next-3', prevEl: '.testimonial-button-prev-3',
            },

            a11y: false,

            centeredSlides: true,

            breakpoints: {
                20: {
                    slidesPerView: 1, centeredSlides: false,
                }, 768: {
                    slidesPerView: 1, centeredSlides: false,
                }, 1024: {
                    slidesPerView: 2, centeredSlides: false,
                }, 1200: {
                    slidesPerView: 3,
                },
            },
        })
    }


    if (jQuery(".team-slider-active .swiper").length > 0) {
        let teamSlider1 = new Swiper('.team-slider-active .swiper', {
            // Optional parameters
            slidesPerView: 3, slidesPerColumn: 1, loop: true, spaceBetween: 60,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.team-pagination', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.team-button-next', prevEl: '.team-button-prev',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1, spaceBetween: 30,
                }, 768: {
                    slidesPerView: 2, spaceBetween: 30,
                }, 1024: {
                    slidesPerView: 3, spaceBetween: 30,
                }, 1200: {
                    slidesPerView: 3, spaceBetween: 60,
                },
            },
        })
    }

    if (jQuery(".case-studies-slider-active .swiper").length > 0) {
        let caseStudiesSlider = new Swiper('.case-studies-slider-active .swiper', {
            // Optional parameters
            slidesPerView: 3, slidesPerColumn: 1, loop: true, spaceBetween: 40, centeredSlides: true,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.case-studies-pagination', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.case-studies-button-next', prevEl: '.case-studies-button-prev',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1, spaceBetween: 30,
                }, 768: {
                    slidesPerView: 1, spaceBetween: 30,
                }, 1024: {
                    slidesPerView: 2, spaceBetween: 30,
                }, 1200: {
                    slidesPerView: 3, spaceBetween: 40,
                },
            },
        })
    }

    if (jQuery(".case-studies-slider-active-2 .swiper").length > 0) {
        let caseStudiesSlide2 = new Swiper('.case-studies-slider-active-2 .swiper', {
            // Optional parameters
            slidesPerView: 3, slidesPerColumn: 1, loop: true, spaceBetween: 60,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.case-studies-pagination-2', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.case-studies-button-next-2', prevEl: '.case-studies-button-prev-2',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1,
                }, 768: {
                    slidesPerView: 1,
                }, 1024: {
                    slidesPerView: 2,
                }, 1200: {
                    slidesPerView: 3,
                },
            },
        })
    }

    if (jQuery(".testimonial-slider-active-4 .swiper").length > 0) {
        let testimonialSlider4 = new Swiper('.testimonial-slider-active-4 .swiper', {
            // Optional parameters
            slidesPerView: 3, slidesPerColumn: 1, loop: true, spaceBetween: 45,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.testimonial-pagination-4', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.testimonial-button-next-4', prevEl: '.testimonial-button-prev-4',
            },

            a11y: false,

            centeredSlides: true,

            breakpoints: {
                20: {
                    slidesPerView: 1, centeredSlides: false,
                }, 768: {
                    slidesPerView: 1, centeredSlides: false,
                }, 1024: {
                    slidesPerView: 2,
                }, 1200: {
                    slidesPerView: 3,
                },
            },
        })
    }

    if (jQuery(".testimonial-slider-active-5 .swiper").length > 0) {
        let testimonialSlider5 = new Swiper('.testimonial-slider-active-5 .swiper', {
            // Optional parameters
            slidesPerView: 3, slidesPerColumn: 1, loop: true, spaceBetween: 60,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.testimonial-pagination-5', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.testimonial-button-next-5', prevEl: '.testimonial-button-prev-5',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1,
                }, 768: {
                    slidesPerView: 1,
                }, 1024: {
                    slidesPerView: 2,
                }, 1200: {
                    slidesPerView: 3,
                },
            },
        })
    }

    if (jQuery(".team-education-active .swiper").length > 0) {
        let teamEducationSlider = new Swiper('.team-education-active .swiper', {
            // Optional parameters
            slidesPerView: 3, slidesPerColumn: 1, loop: true, spaceBetween: 60,

            autoplay: {
                delay: 3000,
            },

            // If we need pagination
            pagination: {
                el: '.testimonial-pagination-5', clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.testimonial-button-next-5', prevEl: '.testimonial-button-prev-5',
            },

            a11y: false,

            breakpoints: {
                20: {
                    slidesPerView: 1,
                }, 768: {
                    slidesPerView: 1,
                }, 1024: {
                    slidesPerView: 2,
                }, 1200: {
                    slidesPerView: 3,
                },
            },
        })
    }

    if (jQuery("[data-aos]").length > 0) {
        AOS.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        });
    }

})(jQuery);
