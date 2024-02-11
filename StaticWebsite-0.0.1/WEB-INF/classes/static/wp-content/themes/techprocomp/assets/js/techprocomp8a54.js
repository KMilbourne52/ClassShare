(function ($) {
  // Testing js script
  $(document).ready(function () {
    console.log("working");
  });
  // Navbar toggler
  $(document).on("click", ".navbar-toggler", function () {
    $("body").toggleClass("menu-open");
    $(".navbar-toggler").toggleClass("pos-fixed");
  });

  // Sticky nav adjustments
  let stickyHeader = $(".header");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      stickyHeader.addClass("sticky-style");
      $(".center-element").addClass("d-none");
    } else {
      stickyHeader.removeClass("sticky-style");
      $(".center-element").removeClass("d-none");
    }
  });

  // $('#search_modal').click(function () {
  //     $('#overlay').toggleClass('open');
  // });



  // Progress bar
  $(document).on('scroll', function () {
    if (document.getElementsByTagName('body')[0].classList.contains('home') || document.getElementsByTagName('body')[0].classList.contains('cyber-bar')) {
      if ($(this).scrollTop() >= $('.custom-progress-bar').position().top) {
        $('.progress-bar2').each(function () {
          $(this).find('.progress-content').animate({
            width: $(this).attr('data-percentage')
          }, 2000);

          $(this).find('.progress-number-mark').animate({ left: $(this).attr('data-percentage') }, {
            duration: 2000,
            step: function (now, fx) {
              var data = Math.round(now);
              $(this).find('.percent').html(data + '%');
            }
          });
        });
      }
    }

  });

  // Search function limit
  $(document).ready(function () {
    $("input#keyword").keyup(function () {
      if ($(this).val().length >= 4) {
        $("#datafetch").show();
      } else {
        $("#datafetch").hide();
      }

      if ($(this).val().length >= 4) {
        $("#close-btn").show();
      } else {
        $("#close-btn").hide();
      }
    });
  });
  // Clear search field
  $(document).on("click", "#close-btn", function () {
    $("input#keyword").val("");
    $(".search_result").addClass("d-none");
    $("#close-btn").addClass("d-none");
  });
  // Remove video button
  $(document).on("click", "#v-poster", function () {
    $("#video-btn-one").toggleClass("d-none");
  });

  /*
   * Cyber Security section
   */

  // Read More option for Cyber Security posts
  $(document).on("click", "#read-more", function () {
    $("#read-more-content").addClass("d-block");
    $(this).addClass("d-none");
    // Particle JS fix
    window.dispatchEvent(new Event('resize'));
  });

  // Cloud Comput page scroll effects

  const fadeElements = document.querySelectorAll('.criss-cross-block__wrapper');
  const fadeInOptions = {
    threshold: 0.5
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transition = 'opacity 0.5s ease-in-out';
      }
    });
  }, fadeInOptions);

  fadeElements.forEach(fadeElement => {
    fadeElement.style.opacity = '0';
    fadeElement.style.transition = 'none';
    fadeInObserver.observe(fadeElement);
  });



  /*
  * Testimonials custom slider
  */

  // Function to initialize the slider based on data-slider-type
  function initializeSlider($slider, sliderType) {
    const sliderConfig = {
      $slider: $slider,
      $slides: $slider.find('.testimonial-slide'),
      $dotsContainer: $slider.find('.slider-dots'),
      $prevBtn: $slider.find('.prev-slide'),
      $nextBtn: $slider.find('.next-slide'),
      currentSlide: 0,
      isAnimating: false,
      autoplayInterval: null,
      autoplayDelay: 4000,
    };

    // Initialize the slider
    showSlide(sliderConfig.currentSlide, sliderConfig);

    // Create dots for each slide
    sliderConfig.$slides.each((index) => {
      sliderConfig.$dotsContainer.append(`<span class="dot" data-slide="${index}"></span>`);
    });

    // Event delegation for dot clicks
    sliderConfig.$dotsContainer.on('click', '.dot', function () {
      if (!sliderConfig.isAnimating) {
        const slideTo = $(this).data('slide');
        showSlide(slideTo, sliderConfig);
      }
    });

    // Event delegation for previous button
    sliderConfig.$prevBtn.click(function (e) {
      e.preventDefault();
      if (!sliderConfig.isAnimating) {
        sliderConfig.currentSlide = (sliderConfig.currentSlide - 1 + sliderConfig.$slides.length) % sliderConfig.$slides.length;
        showSlide(sliderConfig.currentSlide, sliderConfig);
      }
    });

    // Event delegation for next button
    sliderConfig.$nextBtn.click(function (e) {
      e.preventDefault();
      if (!sliderConfig.isAnimating) {
        sliderConfig.currentSlide = (sliderConfig.currentSlide + 1) % sliderConfig.$slides.length;
        showSlide(sliderConfig.currentSlide, sliderConfig);
      }
    });

    // Function to show the current slide with fade effect
    function showSlide(index, config) {
      if (config.isAnimating) return;
      config.isAnimating = true;

      const $currentSlide = config.$slides.eq(index);

      config.$slides
        .filter(':visible')
        .fadeOut(300, () => {
          $currentSlide.fadeIn(300, () => {
            config.isAnimating = false;
          });
        });

      config.$dotsContainer.find('.dot').removeClass('active');
      config.$dotsContainer.find('.dot').eq(index).addClass('active');

      // Start autoplay if not already running
      if (!config.autoplayInterval) {
        config.autoplayInterval = setInterval(() => {
          if (!config.isAnimating) {
            config.currentSlide = (config.currentSlide + 1) % config.$slides.length;
            showSlide(config.currentSlide, config);
          }
        }, config.autoplayDelay);
      }
    }

    // Initialize autoplay
    showSlide(sliderConfig.currentSlide, sliderConfig); // Start the slider

    // Customize slider height for specific sliders
    if (sliderType === 'custom-slider-with-height') {
      // Check if the slider does not have specific classes to exclude
      if (!$slider.hasClass('did-you-know') || !$slider.hasClass('threats-facts')) {
        // Set the slider's height based on the tallest slide for screens wider than 998px
        function setSliderHeight($slider) {
          if ($(window).width() > 998) {
            let maxHeight = 0;
            $slider.find('.testimonial-slide').each(function () {
              const slideHeight = $(this).outerHeight();
              if (slideHeight > maxHeight) {
                maxHeight = slideHeight;
              }
            });
            $slider.css('height', maxHeight + 'px');
          } else {
            // Reset the slider height for screens 998px or narrower
            $slider.css('height', 'auto');
          }
        }

        // Call the function to set the initial height for this specific slider
        setSliderHeight($slider);

        // Re-calculate and set the height when the window is resized
        $(window).on('resize', function () {
          setSliderHeight($slider);
        });
      }
    }
  }

  // Find and initialize sliders based on data-slider-type
  $('[data-slider-type]').each(function () {
    const sliderType = $(this).data('slider-type');
    initializeSlider($(this), sliderType);
  });

  
  
  /*
 *  Custom Cookie Consent
 */

const executeCodes = () => {
  const cookieBox = document.querySelector(".cookie-consent");

  // Check if cookieBox exists in the DOM
  if (!cookieBox) {
    console.log("Cookie consent box not found in the DOM.");
    return;
  }

  // Check if cookie consent has already been given
  if (document.cookie.includes("_cookie-consent")) {
    console.log("Cookie consent already given.");
    cookieBox.classList.remove("show");
  } else {
    console.log("Cookie consent not found. Showing cookie consent box.");
    cookieBox.classList.add("show");
  }

  // Select consent buttons and add event listeners
  document.querySelectorAll('[data-cookie-button]').forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");

      // If 'Accept' button is clicked
      if (button.id === "cookie-accept") {
        // Set cookies for a month (60 seconds * 60 minutes * 24 hours * 30 days)
        const cookieValue = "_cookie-consent=accepted; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
        document.cookie = cookieValue;
        console.log("Cookie consent accepted. Cookie set:", cookieValue);
      } else {
        console.log("Cookie consent declined.");
      }
    });
  });
};

window.addEventListener("load", executeCodes);


  /*
  *  Navigation third-level fix
  */

  $(document).ready(function () {
    // Select the third-level dropdowns with class "dropdown-submenu"
    $('.menu-main-menu-container .menu-item-has-children .menu-item-has-children').hover(function () {
      // When hovering, set the 'top' and 'left' properties of the dropdown-menu
      $(this).find('.dropdown-menu').css({
        'top': '0',
        'left': '100%',
        'padding': '0'
      });
    }, function () {
      // When not hovering, reset the 'top' and 'left' properties
      $(this).find('.dropdown-menu').css({
        'top': '100px!important',
        'left': '0',
      });
    });
  });

  /*
  *  Navigation animation
  */

  $(document).ready(function () {
    let magicline = $("<li>").addClass("magicline");
    let active = $(".active");
    let menu = $("#menu-main-menu");

    menu.append(magicline);

    function updateMagicLine() {
      magicline.css({
        transition: "left 0.2s, width 0.2s",
        width: active.outerWidth(),
        left: active.position().left,
      });
    }

    // Call the function to set the initial position
    updateMagicLine();

    $("#menu-main-menu > li").on("mouseenter", function () {
      if (!$(this).hasClass("dropdown")) {
        let left = $(this).position().left;
        let width = $(this).outerWidth();
        magicline.css({ left: left, width: width });
      } else {
        // If it's a dropdown, hide the line
        magicline.css({ width: 0 });
      }
    });

    menu.on("mouseleave", function () {
      // Reset to the active state
      updateMagicLine();
    });
  });


  /*
   *  Mobile navigation multilevel navigation
   */


  if ($(window).width() <= 992) {
    // Bind click event to first-level dropdown links
    $('.menu-item-has-children:not(.sub-menu) > a').on('click', function (e) {
      e.preventDefault();
      var icon = $(this).find('.carret-img');
      if (icon.hasClass('clicked')) {
        window.location.href = $(this).attr('href');
      } else {
        icon.attr('src', '/wp-content/uploads/2023/10/view-link-mobile-nav.svg');
        icon.addClass('clicked');
        icon.css('width', '15px');
      }
    });
  } else {
    // Handle hover for resolutions above 992 pixels
    $('.menu-item-has-children:not(.sub-menu) > a').hover(
      function () {
        var icon = $(this).find('.carret-img');
        icon.attr('src', '/wp-content/uploads/2023/10/view-link-mobile-nav.svg');
        icon.css('width', '15px');
        icon.css('transition', 'width 0.3s');
      },
      function () {
        var icon = $(this).find('.carret-img');
        if (!icon.hasClass('clicked')) {
          icon.attr('src', '/wp-content/uploads/2023/10/arrow-down-mobile-nav.svg');
          icon.css('width', '');
          icon.css('transition', 'width 0.3s');
        }
      }
    );

    // Reset the clicked state for the icons when not in mobile view
    $('.menu-item-has-children:not(.sub-menu) > a').on('click', function () {
      var icon = $(this).find('.carret-img');
      if (icon.hasClass('clicked')) {
        icon.removeClass('clicked');
        icon.css('width', '');
        icon.css('transition', 'width 0.3s');
      }
    });
  }

  // Close mobile menu when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.menu-open').length && !$(e.target).closest('.navbar-toggler').length) {
      $("body").removeClass("menu-open");
    }
  });


  /*
  *  Pagespeed test warning - handlers
  */

  document.addEventListener("DOMContentLoaded", function () {
    // Get references to the elements you want to attach the listeners to
    const touchElement = document.getElementById("yourTouchElementId");
    const wheelElement = document.getElementById("yourWheelElementId");

    // Function to handle touch start event
    const handleTouchStart = function (event) {
      // Your touch start event handling code here
      console.log("Touch start event");
    };

    // Function to handle touch move event
    const handleTouchMove = function (event) {
      // Your touch move event handling code here
      console.log("Touch move event");
    };

    // Function to handle wheel event
    const handleWheel = function (event) {
      // Your wheel event handling code here
      console.log("Wheel event");
    };

    if (touchElement) {
      addTouchStartListener(touchElement, handleTouchStart);
      addTouchMoveListener(touchElement, handleTouchMove);
    }

    if (wheelElement) {
      addWheelListener(wheelElement, handleWheel);
      addMouseWheelListener(wheelElement, handleWheel);
    }
  });

  // Provided functions for adding event listeners
  const addTouchStartListener = (element, handle) => {
    element.addEventListener("touchstart", handle, { passive: true });
  };

  const addTouchMoveListener = (element, handle) => {
    element.addEventListener("touchmove", handle, { passive: true });
  };

  const addWheelListener = (element, handle) => {
    element.addEventListener("wheel", handle, { passive: true });
  };

  const addMouseWheelListener = (element, handle) => {
    element.addEventListener("wheel", handle, { passive: true });
  };



  // Function to pause video
  function pauseVideo(element) {
    const video = element.getElementsByTagName("video")[0];
    if (video) {
      video.pause();
    }
  }

  /*
  * ClickView & Radio Block
  */

 
  const showContent = (index, prefix, radioName) => {
    // Get the total number of radio button elements
    const totalRadioButtons = $(`input[name="${radioName}"]`).length;
  
    for (let i = 0; i < totalRadioButtons; i++) {
      // Ensure 'index' is compared as a string
      $(`#${prefix}_${i}`).toggle(i.toString() === index);
    }
  };
  
  const setupRadioChangeHandler = (radioName, contentPrefix) => {
    $(document).on('change', `input[name="${radioName}"]`, function () {
      const selectedId = $(this).attr('id');
      const index = selectedId.split('_').pop(); // Extracts the numeric part
      showContent(index, contentPrefix, radioName);
    });
  };
  
  // Initialize handlers
  $(document).ready(function() {
      setupRadioChangeHandler("radio_button", "acf_repeater_content");
      setupRadioChangeHandler("select_items", "select_items_content");
  });

  /*
  *  End ClickView & Radio Block
  */


  // Subscribe to newsleter input field 
  const placeholderText = 'Your Email';
  const placeholderImage = 'url_to_your_image.jpg';

  $('#email_field').on('focus', function () {
    $(this).attr('placeholder', '');
    $(this).css('background-image', 'none');
    $(this).css('padding-left', '10px');
  });

  $('#email_field').on('blur', function () {
    if ($(this).val() === '') {
      $(this).attr('placeholder', placeholderText);
      $(this).css('background-image', placeholderImage);
      $(this).css('padding-left', '20px');
    }
  });


})(jQuery);
