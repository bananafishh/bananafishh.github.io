$(document).ready(function() {
	svg4everybody();

  $(".js-select").select2({
  	minimumResultsForSearch: Infinity
  });

});


var BackToTop = {
    el: '.js-back-to-top',
    name: 'BackToTop',
    initialize: function() {
        this.offset = 1000;
        this.backToTopBtn = this.$('.js-back-to-top__btn');

        var self = this;

        $(window).bind('scroll', function () {
            self.fadeIn();
        });
    },

    events: {
        'click .js-back-to-top__btn': 'scrollToTop'
    },

    scrollToTop: function(ev) {
        ev.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1800);
    },

    fadeIn: function() {
        if($(window).scrollTop() > this.offset) {
            this.$el.removeClass('buttons-round--hidden');
        } else {
            this.$el.addClass('buttons-round--hidden');
        }
    }
};

App.Control.install(BackToTop);
var MainOfficeMap = {
    el: '#main-office',
    name: 'MainOfficeMap',
    initialize: function() {
        if (!_.isUndefined(window.ymaps)) {
            ymaps.ready(init);
            var myMap;

            function init() {
                myMap = new ymaps.Map("main-office", {
                    center: [55.718324068999664, 37.79198949999998],
                    zoom: 15,
                    controls: ['zoomControl']
                });

                myPlacemark = new ymaps.Placemark([55.718324068999664, 37.79198949999998], {
                    iconCaption: 'Рязанский проспект, 75к4'
                }, {
                    preset: 'islands#redDotIconWithCaption',
                });

                myMap.geoObjects.add(myPlacemark);
            }
        }
    }
};

App.Control.install(MainOfficeMap);
var RegionalOfficesMap = {
    el: '#regional-offices',
    name: 'RegionalOfficesMap',
    initialize: function() {
        if (!_.isUndefined(window.ymaps)) {
            ymaps.ready(init);
            var myMap;

            function init() {
                myMap = new ymaps.Map("regional-offices", {
                    center: [54.404311668987056, 46.3975481875],
                    zoom: 5,
                    controls: ['zoomControl']
                });

                myPlacemark1 = new ymaps.Placemark([55.718324068999664, 37.79198949999998], {
                    hintContent: '109456, Москва, Рязанский проспект, д.75, корп.4',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon--white.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-17, -33]
                });

                myPlacemark2 = new ymaps.Placemark([59.92901056417907, 30.38784099999998], {
                    hintContent: '191167, Санкт-Петербург, Синопская набережная 22, 4 этаж',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-15, -32]
                });

                myPlacemark3 = new ymaps.Placemark([56.83566256788385, 60.59089], {
                    hintContent: '620014, Екатеринбург, ул.Хохрякова, д.10',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-13, -32]
                });

                myPlacemark4 = new ymaps.Placemark([51.66437307230397, 39.19270549999995], {
                    hintContent: '394018, Воронеж, ул.Никитинская,д.42',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-13, -31]
                });

                myPlacemark5 = new ymaps.Placemark([56.323328068402155, 44.01145699999997], {
                    hintContent: '603006, Нижний Новгород, ул.Ковалихинская, д.8',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-14, -32]
                });

                myPlacemark6 = new ymaps.Placemark([57.63180206699096, 39.870699999999985], {
                    hintContent: '150040, Ярославль, ул.Некрасова, д.41',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-13, -31]
                });

                myPlacemark7 = new ymaps.Placemark([55.79008406894568, 49.11087849999998], {
                    hintContent: '420111, Казань, ул.Право-Булачная, д.35/2',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-14, -32]
                });

                myPlacemark8 = new ymaps.Placemark([51.53263757238977, 46.03906249999998], {
                    hintContent: '410031, Саратов, ул.Московская, 55',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-14, -32]
                });

                myPlacemark9 = new ymaps.Placemark([54.81712156985457, 56.077493499999946], {
                    hintContent: '450112, Уфа, ул.Первомайская, д.29',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-16, -28]
                });

                myPlacemark10 = new ymaps.Placemark([47.27147357427328, 39.761805999999986], {
                    hintContent: '344065, Ростов-на-Дону, ул.50-летия Ростсельмаша, 1/52',
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/images/icon-balloon.png',
                    iconImageSize: [26, 33],
                    iconImageOffset: [-15, -30]
                });


                myMap.geoObjects
                    .add(myPlacemark1)
                    .add(myPlacemark2)
                    .add(myPlacemark3)
                    .add(myPlacemark4)
                    .add(myPlacemark5)
                    .add(myPlacemark6)
                    .add(myPlacemark7)
                    .add(myPlacemark8)
                    .add(myPlacemark9)
                    .add(myPlacemark10);
            }
        }
    }
};

App.Control.install(RegionalOfficesMap);
var PartiallyHidden = {
    el: '.js-partially-hidden',
    name: 'PartiallyHidden',

    initialize: function() {
        this.btn = this.$('.js-partially-hidden__btn');
        this.btnWrap = this.$('.js-partially-hidden__btn-wrap');
        this.hiddenBlock = this.$('.js-partially-hidden__block');
        this.hiddenContent = this.$('.js-partially-hidden__content');
        this.clicked = false;

        var self = this;

        $(window).bind('resize', function() {
            if(self.clicked) {
                self.hiddenContentHeight = self.hiddenContent.outerHeight();
                self.hiddenBlock.outerHeight(self.hiddenContentHeight);
            }
        });
    },

    events: {
        'click .js-partially-hidden__btn': 'showHiddenBlock'
    },

    showHiddenBlock: function(ev) {
        var self = this;
        this.clicked = true;

        this.hiddenContentHeight = this.hiddenContent.outerHeight();

        this.hiddenBlock.animate({
            height: this.hiddenContentHeight
        }, 500, function() {
            self.btnWrap.fadeOut(300);
        });
    }
};

App.Control.install(PartiallyHidden);
var SectionNav = {
    el: '.js-section-nav',
    name: 'SectionNav',
    initialize: function() {
        this.item = this.$('.js-section-nav__item');
        this.list = this.$('.js-section-nav__list');
    },

    events: {
        'click .js-section-nav__item': 'switchActiveState'

    },

    switchActiveState: function(e) {
        this.item.removeClass('is-active');
        $(e.currentTarget).addClass('is-active');

        this.list.toggleClass('is-open');
    },

    toggleList: function() {
        this.list.toggleClass('is-open');
    }
};

App.Control.install(SectionNav);
var SwitchActiveState = {
    el: '.js-switch-active',
    name: 'SwitchActiveState',
    initialize: function() {
        this.btn =  this.$('.js-switch-active__btn');
    },

    events: {
        'click .js-switch-active__btn': 'switchActiveState'
    },

    switchActiveState: function(e) {
        this.btn.siblings().removeClass('is-active');
        $(e.currentTarget).addClass('is-active')
    }
};

App.Control.install(SwitchActiveState);
var TabsControl = {
    el: '.js-tabs',
    name: 'Tabs',
    initialize: function() {
        this.tab = this.$('.js-tabs__tab');
        this.tabsList = this.$('.js-tabs__list');
        this.tabContent = this.$('.js-tabs__content');
    },
    events: {
        'click .js-tabs__tab': 'switchTabOnClick'
    },
    switchTabOnClick: function(e) {
        this.tab.removeClass('is-active');
        $(e.currentTarget).addClass('is-active');

        this.targetId = $(e.currentTarget).data('id');

        this.tabContent.removeClass('is-active');
        $('#' + this.targetId).addClass('is-active');

        this.tabsList.toggleClass('is-open');
    }
};

App.Control.install(TabsControl);
var VerticalTabs = {
    el: '.js-vertical-tabs',
    name: 'VerticalTabs',
    initialize: function() {
        this.tab = this.$('.js-vertical-tabs__tab');
        this.tabsList = this.$('.js-vertical-tabs__list');
        this.tabContent = this.$('.js-vertical-tabs__content');
    },

    events: {
        'click .js-vertical-tabs__tab': 'switchTabOnClick'

    },

    switchTabOnClick: function(e) {
        this.tab.removeClass('is-active');
        $(e.currentTarget).addClass('is-active');

        this.targetId = $(e.currentTarget).data('id');

        this.tabContent.removeClass('is-active');
        $('#' + this.targetId).addClass('is-active');


        this.tabsList.toggleClass('is-open');
    }
};

App.Control.install(VerticalTabs);
var MainNavView = {
    el: '.js-main-nav',
    name: 'MainNavView',
    initialize: function() {
        this.mainNavBtn = this.$('.js-main-nav__btn');
        this.mainNavList = this.$('.js-main-nav__list');
        this.mainNavOffsetTop = this.$el.offset().top;
        this.mainNavHeight = this.$el.outerHeight();

        var self = this;

        $(window).bind('resize', function () {
            self.mainNavOffsetTop = self.$el.offset().top;
        });

        $(window).bind('scroll', function () {
            self.fixedNav();
        });
    },

    events: {
        'click .js-main-nav__btn': 'toggleNav'
    },

    toggleNav: function() {
        this.mainNavList.toggleClass('main-nav__list--open')
    },

    fixedNav: function() {
        if ( $(window).scrollTop() > this.mainNavOffsetTop + this.mainNavHeight ) {
            this.$el.addClass('main-nav--fixed');
        } else {
            this.$el.removeClass('main-nav--fixed');
        }
    }
};

App.Control.install(MainNavView);
var MainSlider = {
    el: '.js-main-slider',
    name: 'MainSlider',
    initialize: function() {
        this.$el.bxSlider({
            mode: 'fade',
            pager: false,
            auto: true
        });
    }
};

App.Control.install(MainSlider);