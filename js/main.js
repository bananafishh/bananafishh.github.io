$(document).ready(function() {
  // Управление загрузкой кастомного шрифта
  function fontLoad() {
    if( sessionStorage.foutFontsLoaded ) {
      document.documentElement.className += " fonts-loaded";
      return;
    }

    var font = new FontFaceObserver('Roboto', {
      weight: 400,
      style: 'normal'
    });

    var fontBold = new FontFaceObserver('Roboto', {
      weight: 700,
      style: 'normal'
    });

    var fontItalic = new FontFaceObserver('Roboto', {
      weight: 400,
      style: 'italic'
    });

    var fontBoldItalic = new FontFaceObserver('Roboto', {
      weight: 700,
      style: 'italic'
    });

    Promise.all([font.load(), fontBold.load(), fontItalic.load(), fontBoldItalic.load()]).then(function () {
      document.documentElement.className += " fonts-loaded";

      sessionStorage.foutFontsLoaded = true;
    });
  }

  fontLoad();


  // Кроссбраузерная поддержка svg спрайтов
  svg4everybody();


	$('.js-select').select2({
  		minimumResultsForSearch: Infinity
  	});

	$('.js-tooltip').tooltipster({
		theme: ['tooltipster-light', 'tooltipster-light-customized'],
		maxWidth: 443
	});

  $('.js-tooltip-right').tooltipster({
    side: 'right',
    theme: ['tooltipster-light', 'tooltipster-light-customized'],
    maxWidth: 443
  });

	$('.js-fancy-media').fancybox({
    wrapCSS: 'fancy-media',
    margin: ($(window).width() > 937) ? 20 : 5,
    fitToView: false,
    padding: 15,
    helpers : {
      overlay : {
        css : {
          'background' : 'rgba(27, 71, 105, 0.7)'
        }
      }
    }
  });

  $('.js-fancy-modal').fancybox({
    wrapCSS: 'fancy-modal',
    margin: ($(window).width() > 937) ? 20 : 5,
    fitToView: false,
    padding: 0,
    helpers : {
      overlay : {
        css : {
          'background' : 'rgba(27, 71, 105, 0.7)'
        }
      }
    }
  });

  $('.js-fancy-big-modal').fancybox({
    wrapCSS: 'fancy-big-modal',
    margin: ($(window).width() > 937) ? 20 : 5,
    fitToView: false,
    padding: 20,
    helpers : {
      overlay : {
        css : {
          'background' : 'rgba(27, 71, 105, 0.7)'
        }
      }
    }
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
var DottedNavSlider = {
    el: '.js-dotted-nav-slider',
    name: 'DottedNavSlider',
    initialize: function() {
        this.$el.bxSlider({
            controls: false,
            slideWidth: 706,
            minSlides: 1,
            maxSlides: 1,
            adaptiveHeight: true
        });
    }
};

App.Control.install(DottedNavSlider);
var EqualHeight = {
    el: '.js-equal-height',
    name: 'EqualHeight',

    initialize: function() {
        this.block = this.$('.js-equal-height__block');
        this.img = this.$('img');

        var self = this;

        this.setEqualHeight();

        this.img.bind('load', function() {
            self.setEqualHeight();
        });

        $(window).bind('resize', function() {
            self.setEqualHeight();
        });
    },

    setEqualHeight: function() {
        var maxHeight = 0;

        this.block.css('height', 'auto');

        this.block.each(function(index) {
            var blockHeight = parseInt($(this).outerHeight());

            if (blockHeight > maxHeight) {
                maxHeight = blockHeight;
            }
        });

        this.block.css('height', maxHeight);
    }
};

App.Control.install(EqualHeight);
App.Control.install({
    el: '.js-form',
    name: 'FormFabric',
    initialize: function () {

        this.$('.js-select-editable').select2({
            minimumResultsForSearch: Infinity,
            theme: "editable"
        });

        this.$('.js-form-select').select2({
            minimumResultsForSearch: Infinity,
            theme: "form-select"
        });


        // Select2 внутри fancybox работает некорректно, так как z-index fancybox больше.
        // Инициализируем плагин с дополнительным классом form-select-in-modal
        // для задания нужного z-index выпадающему списку
        this.$('.js-form-select-in-modal').select2({
            minimumResultsForSearch: Infinity,
            theme: "form-select form-select-in-modal"
        });

        this.multiSelectInputs = this.$el.find('.js-form-multiselect');
        this.choiseRadioContent = this.$el.find('.js-form-radio-choise');
        this.choiseTabsContent = this.$el.find('.js-form-tabs-changer');
        this.privacyAgree = this.$el.find('.js-form-privacy-agree');

        if(this.choiseRadioContent)
            this.initRadioChoisingControl();

        if(this.choiseTabsContent)
            this.initTabsContentControl();

        if(this.privacyAgree)
            this.initPrivacyAgree();

        if(this.multiSelectInputs)
            this.initMultiSelectControl();
    },

    initMultiSelectControl: function () {
        var self = this;
        _.each(this.multiSelectInputs, function(multiSelect){

            $multiSelect = $(multiSelect);

            var emptyText = !_.isEmpty($multiSelect.data('emptyText')) ? $multiSelect.data('emptyText') : 'Ничго не выбрано';

            this.$('.js-form-multiselect').selectpicker({
                selectedTextFormat: "count > 2",
                selectOnTab: true,
                noneSelectedText: emptyText,
            });

        });
    },

    initPrivacyAgree: function () {
        var self = this;
        this.privacyAgree.find('.js-form-privacy-agree-responsive-btn').on( 'click', function() {
            self.privacyAgree.find('.js-form-privacy-agree-full').removeClass('hide-up-to-md');
            self.privacyAgree.find('.js-form-privacy-agree-short').hide(0);
        });
    },

    initTabsContentControl: function () {
        var self = this;
        _.each(this.choiseTabsContent, function(tabsContent){
            $tabsContent = $(tabsContent);
            $controlBtns = $tabsContent.find('.js-form-tabs-changer-btns')
                .find('span');
            $controlTabs = $tabsContent.find('.js-form-tabs-changer-content')
                .find('.js-form-tabs-changer-block');

            $controlTabs.hide(0);

            if($controlBtns.length > 0) {
                $activeBtn = $controlBtns.eq(0);
                $controlBtns.not($activeBtn)
                    .addClass('dotted cur-pointer');
                $activeTab = $controlTabs.eq(0);
                $activeTab.show(0);
            }

            $controlBtns.on( 'click', function() {
                self.contentTabChange($(this));
            });
        });
    },
    contentTabChange: function($el) {
        $tabsContent = $el.closest('.js-form-tabs-changer');
        $controlBtns = $tabsContent.find('.js-form-tabs-changer-btns')
            .find('span');
        $controlTabs = $tabsContent.find('.js-form-tabs-changer-content')
            .find('.js-form-tabs-changer-block');

        $el.removeClass('dotted cur-pointer');
        $tab2Show = $controlTabs.eq($controlBtns.index($el));
        $controlTabs.not($tab2Show)
            .hide(0);
        $tab2Show.show(0);
        $controlBtns.not($el)
            .addClass('dotted cur-pointer');
    },

    initRadioChoisingControl: function () {
        var self = this;
        _.each(this.choiseRadioContent, function(radioCollection){
            $control = $(radioCollection);
            $controlRadios = $control.find('input[type="radio"]');
            $controledBlocks = $controlled = self.findClosestChoisingBlock($control)
                .find('.js-form-radio-content-block');
            $controledBlocks.hide(0);
            $activeRadioOpt = $controlRadios.filter(':checked');
            if($activeRadioOpt) {
                $activeOptIndex = $controlRadios.index($activeRadioOpt);
                if($activeOptIndex >= 0) {
                    $controledBlocks.eq($activeOptIndex)
                        .show(0);
                }
            }
            $controlRadios.on( 'click', function() {
                self.choisingBlockChange($(this));
            });
        });
    },
    choisingBlockChange: function($el) {
        $control = $el.closest('.js-form-radio-choise');
        $controledBlocks = this.findClosestChoisingBlock($control)
            .find('.js-form-radio-content-block');
        $block2Show = $controledBlocks.eq($control.find('input[type="radio"]')
            .index($el));
        $controledBlocks.not($block2Show)
            .hide(0);
        $block2Show.show(0);
    },
    findClosestChoisingBlock: function($el) {
        if($el.parent().length > 0) {
            $findRes = $el.parent()
                .find('.js-form-radio-content');
            if ($findRes.length > 0) {
                return $($findRes[0]);
            } else {
                return  this.findClosestChoisingBlock($el.parent())
            }
        }
        else
            return $();
    }
});
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

        this.$el.removeClass('is-hidden');
        this.hiddenContentHeight = this.hiddenContent.outerHeight();

        this.hiddenBlock.animate({
            height: this.hiddenContentHeight
        }, 500, function() {
            self.btnWrap.fadeOut(300);
        });
    }
};

App.Control.install(PartiallyHidden);
App.Control.install({
    el: '.que',
    name: 'QueTip',
    initialize: function () {
        var self = this;
        this.$el.tooltipster({
            side: 'right',
            content: self.$el.html(),
            theme: ['tooltipster-light', 'tooltipster-light-customized'],
            maxWidth: 443
        });
    }
});
var ScrollTo = {
    el: '.js-scroll-to',
    name: 'ScrollTo',
    initialize: function() {
        this.targetObject = this.getTarget();
    },

    getTarget: function () {
		return $('#' + this.$el.attr('href').substring(1));
	},

    events: {
        'click': 'scrollTo'
    },

    scrollTo: function(ev) {
        ev.preventDefault();

        this.targetOffsetTop = this.targetObject.offset().top;

        if($(window).outerWidth() < 900) {
            this.topOffset = 80;
        } else {
            this.topOffset = 20;
        }

        if(!$('.main-nav').hasClass('main-nav--fixed') && $(window).outerWidth() < 900) {
            this.targetOffsetTop -= $('.main-nav').outerHeight();
        } else {
            this.targetOffsetTop = this.targetObject.offset().top;
        }


        $('html, body').animate({
            scrollTop: this.targetOffsetTop - this.topOffset
        }, 1000);
    }
};

App.Control.install(ScrollTo);
App.Control.install({
    el: '.js-scrollbar',
    name: 'ScrollBar',
    responsiveMarginPersent: 0,
    brackpointRulesItems: {},

    initialize: function() {

        this.contentClass = _.isUndefined(this.$el.data("scrollbarContentClass")) ? 'hscroll-wrapper' : this.$el.data("scrollbarContentClass");
        this.initScrollbar();

    },

    initScrollbar: function() {

        var self = this;

        this.$el.children().first().addClass(this.contentClass);

        this.scrollbar = this.$el.mCustomScrollbar({
            axis:"x",
            theme:"dark-2",
            autoExpandScrollbar:true,
            scrollInertia: 500,
            mouseWheel: {
                enable: true,
                normalizeDelta: true
            },
            keyboard:{
                enable: false
            },
            advanced:{
                autoExpandHorizontalScroll:true,
                updateOnContentResize: true
            },
            callbacks:{
                onBeforeUpdate:function(){
                    self.initItems();
                },
                onUpdate:function(){
                    self.resizeItems();
                }
            }
        });
    },

    initItems: function() {

        this.$('.'+this.contentClass).children().css('float', 'left');

    },

    resizeItems: function() {

        if(!_.isEmpty(this.brackpointRulesItems)) {

            var itemsInRow = 1;

            _.mapObject(this.brackpointRulesItems, function (val, key) {
                if ($(window).width() > key)
                    itemsInRow = val;
            });

            var marginWidth = (this.$el.width() * (this.responsiveMarginPersent / 100));
            this.$('.' + this.contentClass).children()
                .width(( (this.$el.width() - ( marginWidth * (itemsInRow - 1) ) ) / itemsInRow) + 'px')
                .slice(1)
                .css('margin-left', marginWidth + 'px');

        }
    },

    destroyScrollbar: function() {
        this.$el.mCustomScrollbar('destroy');
    }
});


var ScrollBarEmployees = {
    el: '.js-scroll-employees',
    name: 'ScrollBarEmployees',
    responsiveMarginPersent: 3,
    brackpointRulesItems: {
        360 : 2,
        515 : 3,
        768 : 4
    }
};
App.Control.extend('ScrollBar', ScrollBarEmployees);


App.Control.extend('ScrollBar', {
    el: '.js-scroll-mass-media',
    name: 'ScrollBarMassMedia',
    responsiveMarginPersent: 3,
    brackpointRulesItems: {
        360 : 2,
        515 : 3,
        768 : 4
    }
});


App.Control.extend('ScrollBar', {
    el: '.js-scroll-employees-reviews',
    name: 'ScrollBarEmployeesReviews',
    responsiveMarginPersent: 3,

    initialize: function() {
        this.scrollBarDestroyBreakpoint = 1135;
        this.scrollbarIsInitialized = false;
        var self = this;

        if($(window).outerWidth() <= this.scrollBarDestroyBreakpoint) {
            this.contentClass = _.isUndefined(this.$el.data("scrollbarContentClass")) ? 'hscroll-wrapper' : this.$el.data("scrollbarContentClass");
            this.initScrollbar();
            this.scrollbarIsInitialized = true;
        }

        $(window).bind('resize', function() {
            if($(window).outerWidth() > self.scrollBarDestroyBreakpoint && self.scrollbarIsInitialized) {
                self.destroyScrollbar();
                self.scrollbarIsInitialized = false;
            } else if($(window).outerWidth() <= self.scrollBarDestroyBreakpoint  && !self.scrollbarIsInitialized) {
                self.contentClass = _.isUndefined(self.$el.data("scrollbarContentClass")) ? 'hscroll-wrapper' : self.$el.data("scrollbarContentClass");
                self.initScrollbar();
                self.scrollbarIsInitialized = true;
            }
        });
    }
});


App.Control.extend('ScrollBar', {
    el: '.js-scroll-clients',
    name: 'ScrollBarClients',
    responsiveMarginPersent: 3,
    brackpointRulesItems: {
        360 : 2,
        515 : 3,
        768 : 4
    }
});
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
var ShowContent = {
	el: '.js-show-content',
	name: 'ShowContent',

	initialize: function() {
		this.btn = this.$('.js-show-content__btn');
		this.hiddenContent = this.$('.js-show-content__content');
	},

	events: {
        'click .js-show-content__btn': 'showContent'
    },

	scrollTo: function() {
		var self = this;

		$('html, body').animate({
			scrollTop: $('[data-target=' + self.dataTarget + ']').offset().top - 60
		}, 1500);
	},

	showContent: function(e) {
		e.preventDefault();

		var needScroll = false;
		if(!$(e.currentTarget).hasClass('open') && $(e.currentTarget).data('scroll-to')) {
			needScroll = true;
		}

		$(e.currentTarget).toggleClass('open');
		if(!$(e.currentTarget).data('attribute')) {
			$(e.currentTarget).next(this.hiddenContent).slideToggle();
		}

		// Если скрытую информацию и кнопку-триггер невозможно разместить в общем контейнере
		// Или скрытая информация расположена не после кнопки-триггера
		if(this.$el.filter('[data-attribute]')) {
			this.dataTarget = $(e.currentTarget).attr('data-attribute');
			$('[data-target=' + this.dataTarget + ']').slideToggle();
		}

		if(needScroll) {
			this.scrollTo();
		}
	}
};

App.Control.install(ShowContent);
var ShowMore = {
	el: '.js-show-more',
	name: 'ShowMore',

	initialize: function() {
		this.pagination = this.$('.js-show-more__pagination');
		this.item = this.$('.js-show-more__item');

		this.replaceDefaultPagination();
	},

	events: {
		'click .js-show-more__btn': 'showMoreItem'
	},

	replaceDefaultPagination: function() {
		this.pagination.remove();

		var brandNewBtn = $(document.createElement('button'))
			.addClass('btn js-show-more__btn')
			.attr('type', 'button')
			.text('Показать еще');

		var brandNewBtnContainer = $(document.createElement('div'))
			.addClass('btn-shadow')
			.append(brandNewBtn)
			.appendTo(this.$el);
	},

	showMoreItem: function() {
		if(this.$el.hasClass('js-partially-hidden__content')) {
			this.$el.parent('.js-partially-hidden__block').css({'height': 'auto'});
		}

		this.item.slideDown()
		         .removeClass('is-hidden');
	}
};

App.Control.install(ShowMore);
var SliderEmployeesReviews = {
    el: '.js-slider-employees-reviews',
    name: 'SliderEmployeesReviews',

    initialize: function() {
        this.sliderIsInititalized = false;
        this.sliderDestroyBreakpoint = 1136;
        var self = this;

        if($(window).outerWidth() >= this.sliderDestroyBreakpoint) {
            this.initSlider();
            this.sliderIsInititalized = true;
        }

        $(window).bind('resize', function() {
            if($(window).outerWidth() < self.sliderDestroyBreakpoint && self.sliderIsInititalized) {
                self.$el.destroySlider();
                self.sliderIsInititalized = false;
            } else if($(window).outerWidth() >= self.sliderDestroyBreakpoint && !self.sliderIsInititalized) {
                self.initSlider();
                self.sliderIsInititalized = true;
            }
        });
    },

    initSlider: function() {
        this.$el.bxSlider({
            pager: false,
            slideWidth: 960,
            minSlides: 1,
            maxSlides: 1,
            adaptiveHeight: true
        });
    }
};

App.Control.install(SliderEmployeesReviews);
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
var TextCatHide = {
	el: '.text-cat-hide-btn',
	name: 'TextCatHide',

	initialize: function() {
		this.$el.bind('click', function(e) {
			$(e.currentTarget).parent().next().remove();
			$(e.currentTarget).parent().next().next().find('.tet-cat').show();
			$(e.currentTarget).parent().remove();
		});
	}
};

App.Control.install(TextCatHide);
var TextCat = {
	el: '.text-cat',
	name: 'TextCat',

	initialize: function() {
		this.popupContent = this.$el.html();
		this.triggerLink = this.$el.attr('title');
		this.$el.html(this.triggerLink);

		var self = this;

		this.$el.bind('click', function(e) {
			$(e.currentTarget).hide();
			$(e.currentTarget).parent().after('<p class="text-cat-content">' + self.popupContent + '</p>');
			$(e.currentTarget).parent().next().after('<p><span class="text-cat-hide-btn">Скрыть</span></p>');
		});

		$(document).on('click', '.text-cat-hide-btn', function(){
		    $('.text-cat').show();
		    $(this).parent().prev().remove();
		    $(this).parent().remove();
		});
	}
};

App.Control.install(TextCat);
App.Control.install({
    el: '.text-popup',
    name: 'TextPopup',
    initialize: function () {
        this.content = this.$el.html();
        this.triggerLink = this.$el.attr('title');
        this.$el.html(this.triggerLink);

        var self = this;

        this.$el.tooltipster({
            content: self.content,
            theme: ['tooltipster-light', 'tooltipster-light-customized'],
            maxWidth: 443,
            trigger: 'click'
        });
    }
});
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
var VisitedPages = {
	el: '.js-visited-pages',
	name: 'VisitedPages',

	initialize: function() {
		this.mainSlider = $('.main-slider');
		this.mainSliderOffsetTop = this.mainSlider.offset().top;
		this.mainSliderHeight = this.mainSlider.outerHeight();

		this.container = this.$el.parent('.container');
		this.containerWidth = this.container.outerWidth();
		this.elWidth = ($(window).width() - this.containerWidth) / 2;

		this.pushPoint = this.mainSliderOffsetTop + this.mainSliderHeight;

		var self = this;

		this.setStickyBlockWidth();

		$(window).bind('resize', function() {
			self.elWidth = ($(window).width() - self.containerWidth) / 2;
			self.setStickyBlockWidth();
		});

		$(window).bind('scroll', function() {
			self.stickyOnScroll();
		});
	},

	setStickyBlockWidth: function() {
		this.$el.css({'width': this.elWidth});
	},

	stickyOnScroll: function() {
		if($(window).scrollTop() >= this.pushPoint) {
			this.$el.addClass('visited-pages--fixed');
		} else {
			this.$el.removeClass('visited-pages--fixed');
		}
	}
};

App.Control.install(VisitedPages);
App.Control.install({
    el: '.input-checkbox',
    name: 'InputCheckbox',
    initialize: function () {
        if(this.$('input').is(':checked'))
            this.$el.addClass('_checked');
    },
    events: {
        'change input': 'toggle'
    },
    toggle: function() {
        if(this.$('input').is(':checked'))
            this.$el.addClass('_checked');
        else
            this.$el.removeClass('_checked');
    }
});
/* ============================================================
 * bootstrap-dropdown.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* DROPDOWN CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle="dropdown"]'
        , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
            $el.parent().removeClass('open')
        })
    }

    Dropdown.prototype = {

        constructor: Dropdown

        , toggle: function (e) {
            var $this = $(this)
                , $parent
                , selector
                , isActive

            if ($this.is('.disabled, :disabled')) return

            selector = $this.attr('data-target')

            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
            }

            $parent = $(selector)
            $parent.length || ($parent = $this.parent())

            isActive = $parent.hasClass('open')

            clearMenus()

            if (!isActive) $parent.toggleClass('open')

            return false
        }

    }

    function clearMenus() {
        $(toggle).parent().removeClass('open')
    }


    /* DROPDOWN PLUGIN DEFINITION
     * ========================== */

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('dropdown')
            if (!data) $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */

    $(function () {
        $('html').on('click.dropdown.data-api', clearMenus)
        $('body')
            .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
            .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    })

}(window.jQuery);
App.Control.install({
    el: '.input-file',
    name: 'InputFile',
    initialize: function () {

        this.$inputFile = this.$('input[type=file]')
            .addClass('file-hidden');

        this.$inputPath = $(document.createElement('input'))
            .addClass('file-path-input')
            .attr('type','text')
            .attr('readonly',true)
            .prependTo(this.$el);

        this.$inputButton = $(document.createElement('div'))
            .addClass('btn btn-input-file')
            .html('Обзор...')
            .prependTo(this.$('label'));

        this.$el.addClass('input-file2');

    },
    events: {
        'change [type=file]': 'changeValue'
    },
    changeValue: function() {
        this.$inputPath.val(this.$inputFile.val().replace('C:\\fakepath\\',''));
    }
});
App.Control.install({
    el: '.input-multifile',
    name: 'InputMultiFile',
    initialize: function () {

        var self = this;

        this.inputName = this.$el.data('name');

        this.$inputButton = $(document.createElement('div'))
            .addClass('btn btn-input-multifile')
            .html('Выбрать файлы')
            .prependTo(this.$el);

        this.$fileList = $(document.createElement('div'))
            .addClass('input-multifile__file-list')
            .prependTo(this.$el);

        this.$inputButton.on( 'click', function() {
            self.startChoose($(this));
        });

        this.$('input[type=file]')
            .addClass('file-hidden');

    },
    startChoose: function() {
        var self = this;
        $lastInput = this.$el.find('input[type=file]').last();
        $lastInput.trigger('click');
        $lastInput.one( 'change', function() {
            if(!_.isEmpty($lastInput.val())) {
                self.addtitionsFile2List($(this));
            } else {
                $(this).off();
            }
        });
    },
    addtitionsFile2List: function($input) {
        var self = this,
            addFilePath = $input.val().replace('C:\\fakepath\\','');

        $inputIndex = this.$el.find('input[type=file]').index($input);

        if(_.isUndefined(this.$fileList.find('.input-multifile__file-item').get($inputIndex))) {

            var $itemFileRemoveBtn = $(document.createElement('span'))
                .addClass('input-multifile__file-item-remove')
                .html('&times;')
                .one( 'click', function() {
                    self.removeFile4List($(this));
                });

            var $itemFileName = $(document.createElement('span'))
                .addClass('input-multifile__file-item-name')
                .html(addFilePath);

            var $fileItem = $(document.createElement('div'))
                .addClass('input-multifile__file-item')
                .append($itemFileName)
                .append($itemFileRemoveBtn)
                .appendTo(this.$fileList);

            var $nextFileInput = $(document.createElement('input'))
                .attr('type','file')
                .attr('name',this.inputName)
                .addClass('file-hidden')
                .appendTo(this.$el);
        } else
            return null;

    },
    removeFile4List: function($removeBtn) {

        var self = this;
        $fileItem = $removeBtn.parent();
        $inputIndex = this.$fileList.find('.input-multifile__file-item').index($fileItem);

        $input = this.$el.find('input[type=file]').get($inputIndex);

        $fileItem.remove();
        $input.remove();

    }
});
App.Control.install({
    el: '.input-radio',
    name: 'InputRadio',
    initialize: function () {

        if(this.$('input').is(':checked'))
            this.$el.addClass('_checked');

        this.inputName = this.$('input').attr('name');
        this.$arOptions = $('body')
            .find('input[name=\'' + this.inputName + '\']')
            .parent();

    },
    events: {
        'change input': 'toggle'
    },
    toggle: function() {

        _.each(this.$arOptions, function(input){
            $(input).removeClass('_checked');
        });

        this.$el.addClass('_checked');

    }
});
var SliderWidget = {
	el: '.js-slider-widget',
	name: 'SliderWidget',

	initialize: function() {
		this.slider = this.$el.find('.js-slider-widget__slider');
        this.sliderValue = this.$el.find('.js-slider-widget__value');
        this.sliderDefaultValue = 1;

        this.initFormSlider();
	},

	initFormSlider: function() {
        var self = this;

        this.slider.slider({
            range: 'min',
            min: 1,
            max: self.slider.data('max-value'),
            step: 1,
            value: self.sliderValue.val(),

            slide: function(event, ui) {
                self.sliderValue.val(ui.value);
				self.sliderValue.trigger('change');
            }
        });

        this.sliderValue.on('input', function(e) {
            self.slider.slider('value', $(e.currentTarget).val());
        })
    }
};

App.Control.install(SliderWidget);
App.Control.install({
    el: '.spoiler-link',
    name: 'SpoilerContent',
    initialize: function () {
        this.$content = $();
        this.hidden = true;

        if(this.$el.data('closest'))
            this.$content = this.findClosest(this.$el);

        this.$content.hide(0);
    },
    events: {
        'click': 'toggle'
    },
    toggle: function() {
        if(this.hidden) {
            this.$el.addClass('_rolldown');
            this.hidden = false;
            this.$content.slideDown(400, function ()
                {}
            );
        } else {
            this.$el.removeClass('_rolldown');
            this.hidden = true;
            this.$content.slideUp(400, function ()
                {}
            );
        }
    },
    findClosest: function($el) {
        if($el.parent().length > 0) {
            $findRes = $el.parent().find('.spoiler-content');
            if ($findRes.length > 0) {
                return $($findRes[0]);
            } else {
                return  this.findClosest($el.parent())
            }
        }
        else
            return $();
    }
});