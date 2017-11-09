(function($) {
    "use strict";
    var $document = $(document),
        $window = $(window),
        $html = $('html'),
        $body = $('body'),
        $pageWrap = $('#page-wrap'),
        $rsMainHeader = $('.rs-main-header'),
        $mainMenu = $('.main-nav'),
        mainMenuLi = $mainMenu.find('li').has('ul'),
        $mobileMenuOpen = $('<span class="mobile-menu-open">Menu</span>'),
        $mobileMenuClose = $('<span class="mobile-menu-close"/>'),
        $sideMenuCont = $('<div class="side-menu-cont"><div class="side-menu-cont-in"></div></div>'),
        $pgiImg = $('.pgi-img'),
        $imgCont = $('.single-banner-img, .sibi-img').add($pgiImg).add('.sc-item-img').add('.single-alc-img'),
        $columns = $('.ipm-ls, .ipm-cs, .ipm-rs'),
        $popupGallery = $('.popup-gallery'),
        $searchIcon = $('.search-icon-cta'),
        $searchForm = $('#search-section'),
        $tabArea = $('.tabular-module');

    var app = {
        init: function() {
            $document.ready(
                this.menuAction(),
                this.mobileMenu(),
                this.imgToBg(),
                this.stickyColumns(),
                this.popupGallery(),
                this.searchReveal(),
                this.tabAction()
            )
        },
        // Add Class To 'LI' that contain 'UL' mostly used for Drop Down Menus
        menuAction: function() {
            mainMenuLi.addClass('has-ul');
        },
        // Create Off-Canvas Menus for Mobile Devices
        mobileMenu: function() {
            var mobileMenuMethods = {
                showMenu: function() {
                    $body.addClass('menu-open');
                },
                hideMenu: function() {
                    $body.removeClass('menu-open');
                }
            };

            $mainMenu.clone().prependTo($sideMenuCont.prependTo($body).find('.side-menu-cont-in'));

            $mobileMenuOpen
                .prependTo($rsMainHeader)
                .on('click', function() {
                    mobileMenuMethods.showMenu();
                });

            $mobileMenuClose
                .prependTo($sideMenuCont)
                .on('click', function() {
                    mobileMenuMethods.hideMenu();
                });

            $(document).on('click', function(e) {
                if ($body.hasClass('menu-open') && $(e.target).is($pageWrap)) {
                    mobileMenuMethods.hideMenu();
                }
            });

            $sideMenuCont.find('li').on('click', function() {
                console.log('clicked');
                $(this).find('ul').slideToggle();
            });
        },
        // Convert html Img tags to CSS Background Images
        imgToBg: function() {
            $imgCont.length && $imgCont.each(function() {
                var el = $(this),
                    img = el.find('img'),
                    imgSrc = img.attr('src');
                el.css({
                    'backgroundImage': 'url(" ' + imgSrc + ' ")'
                });
                img.remove();
            });
        },
        // Using Sticky Columns thanks to Theia Sticky Plugin (https://github.com/WeCodePixels/theia-sticky-sidebar)
        stickyColumns: function() {
            if ($columns.length) {
                $columns.theiaStickySidebar();
            }
        },

        // Using Pop Up thanks Magnific Popup Plugin (https://github.com/dimsemenov/Magnific-Popup)
        popupGallery: function() {
            if ($popupGallery.length) {
                $popupGallery.magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    mainClass: 'mfp-img-mobile',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                    }
                });
            }
        },
        // Revealing Search Box on Click
        searchReveal: function() {
            if ($searchForm.length) {
                $searchIcon.on('click', function() {
                    $body.toggleClass('search-reveal');
                    $searchForm.slideToggle();
                })
            }
        },

        // Tabs
        tabAction: function() {
            $tabArea.length && $tabArea.each(function() {
                var tabLinks = $(this).find('.nav-tabs-module'),
                    tabContent = $(this).find('.single-tab-content'),
                    extractLinkFn = function(anchorTarget) {
                        var anchorLink = anchorTarget.attr('href'),
                            refinedAnchorLink = anchorLink.split('#');
                        return refinedAnchorLink[1];
                    },
                    tabLinkingFn = function(el) {
                        var linkHref = extractLinkFn(el),
                            linkContent = tabContent.filter(function() {
                                return $(this).attr('id') === linkHref
                            });

                        el.parent().addClass('active').siblings().removeClass('active');
                        linkContent.addClass('active').siblings().removeClass('active');
                    };
                tabLinkingFn(tabLinks.find('li').filter(':first').find('a'));
                tabLinks.on('click', 'a', function(e) {
                    e.preventDefault();
                    tabLinkingFn($(this));
                });
            });
        }
    }
    app.init();

})(jQuery);
