$(document).ready(function() {

	// Управление загрузкой кастомного шрифта
	if( sessionStorage.foutFontsLoaded ) {
		document.documentElement.className += " fonts-loaded";
		return;
	}

	var font = new FontFaceObserver('Segoe UI', {
		weight: 400,
		style: 'normal'
	});

	var fontSemiBold = new FontFaceObserver('Segoe UI', {
		weight: 700,
		style: 'normal'
	});

	var fontBold = new FontFaceObserver('Segoe UI', {
		weight: 800,
		style: 'normal'
	});

	var fontItalic = new FontFaceObserver('Segoe UI', {
		weight: 400,
		style: 'italic'
	});

	Promise.all([font.load(), fontSemiBold.load(), fontBold.load()]), fontItalic.load().then(function () {
		document.documentElement.className += " fonts-loaded";

		sessionStorage.foutFontsLoaded = true;
	});


	svg4everybody();

    $(".js-fancybox").fancybox();
});
var CitySelection = {
	el: '.js-city-selection',
	name: 'CitySelection',

	initialize: function() {
		this.$el.select2({
			minimumResultsForSearch: Infinity,
			theme: 'city-selection'
		});
	}
};

App.Control.install(CitySelection)
var ContentSlider = {
	el: '.js-content-slider',
	name: 'ContentSlider',

	initialize: function() {
		this.$el.bxSlider({
            pager: false,
            slideWidth: 168,
            minSlides: 1,
            maxSlides: 5,
            moveSlides: 1,
            slideMargin: 30,
            adaptiveHeight: true
        });
	}
};

App.Control.install(ContentSlider);
var EqualHeightBlocks = {
    el: '.js-equal-height-blocks',
    name: 'EqualHeightBlocks',

    initialize: function() {
        this.items = this.$('.js-equal-height-blocks__item');
        this.images = this.$('img');

        var self = this;

        self.setHeight();

        $(window).bind('resize', function () {
            self.setHeight();
        });

        this.images.bind('load', function() {
            self.setHeight();
        });
    },


    setHeight: function() {
        var maxHeight = 0;
        this.items.css('height', 'auto');

        this.items.each(function(index) {
            var itemHeight = parseInt($(this).outerHeight());

            if (itemHeight > maxHeight) {
                maxHeight = itemHeight;
            }
        });

        if($(window).outerWidth() >= 650) {
            this.items.css('height', maxHeight);
        }
    }
};

App.Control.install(EqualHeightBlocks);
var NewsSlider = {
	el: '.js-news-slider',
	name: 'NewsSlider',

	initialize: function() {
		this.sliderInitPoint = 1120;
        this.sliderIsInitialized = false;

        var self = this;

        if($(window).outerWidth() >= this.sliderInitPoint) {
            this.initSlider();
            this.sliderIsInitialized = true;
        }

        $(window).bind('resize', function() {
            if($(window).outerWidth() < self.sliderInitPoint && self.sliderIsInitialized) {
                self.$el.destroySlider();
                self.sliderIsInitialized = false;
            } else if($(window).outerWidth() >= self.sliderInitPoint && !self.sliderIsInitialized) {
                self.initSlider();
                self.sliderIsInitialized = true;
            }
        });
	},

    initSlider: function() {
        this.$el.bxSlider({
            pager: false,
            slideWidth: 465,
            minSlides: 1,
            maxSlides: 2,
            moveSlides: 1,
            slideMargin: 30,
            adaptiveHeight: true
        });
    }
};

App.Control.install(NewsSlider);
var PartiallyHidden = {
	el: '.js-partially-hidden',
	name: 'PartiallyHidden',

	initialize: function() {
		this.hiddenContent = this.$('.is-hide');
		this.btn = this.$('.js-partially-hidden__btn');
	},

	events: {
		'click .js-partially-hidden__btn': 'showHiddenContent'
	},

	showHiddenContent: function() {
		this.hiddenContent.toggleClass('is-hide');
		this.btn.toggleClass('is-open');
		this.$el.toggleClass('is-hide');
	}
};

App.Control.install(PartiallyHidden);
var Scrollbar = {
	el: '.js-scrollbar',
	name: 'Scrollbar',

	initialize: function() {
		this.scrollBarInitPoint = 992;
		this.scrollbarIsInitialized = false;

		var self = this;

		if($(window).outerWidth() >= this.scrollBarInitPoint) {
			self.initScrollbar();
			this.scrollbarIsInitialized = true;
		}

		$(window).bind('resize', function() {
			if($(window).outerWidth() < self.scrollBarInitPoint && self.scrollbarIsInitialized) {
				self.destroyScrollbar();
				self.scrollbarIsInitialized = false;
			} else if($(window).outerWidth() >= self.scrollBarInitPoint && !self.scrollbarIsInitialized) {
				self.initScrollbar();
				self.scrollbarIsInitialized = true;
			}
		});
	},

	initScrollbar: function() {
		this.$el.mCustomScrollbar({
			axis: 'x'
		});
	},

	destroyScrollbar: function() {
        this.$el.mCustomScrollbar('destroy');
    }
};

App.Control.install(Scrollbar)
var PartiallyHiddenContent = {
	el: '.js-partially-hidden-content',
	name: 'PartiallyHiddenContent',

	initialize: function() {
		this.hiddenContent = this.$('.is-hide');
		this.btn = this.$('.js-partially-hidden-content__btn');
	},

	events: {
		'click .js-partially-hidden-content__btn': 'showHiddenContent'
	},

	showHiddenContent: function() {
		this.hiddenContent.toggleClass('is-hide');
		this.btn.toggleClass('is-active');
		this.$el.toggleClass('is-hide');
	}
};

App.Control.install(PartiallyHiddenContent);
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

	showContent: function(e) {
		e.preventDefault();

		$(e.currentTarget).toggleClass('is-open');
		this.hiddenContent.toggle().toggleClass('is-hide');

		if ($(e.currentTarget).hasClass('is-open')) {
			$(e.currentTarget).text('скрыть');
		} else {
			$(e.currentTarget).text('продолжение');
		}
	}
};

App.Control.install(ShowContent);
var Tabs = {
    el: '.js-tabs',
    name: 'Tabs',

    initialize: function() {
        this.tab = this.$('.js-tabs__tab');
        this.tabs = this.$('.js-tabs__tabs');
        this.tabContent = this.$('.js-tabs__content');
    },

    events: {
        'click .js-tabs__tab': 'switchTabOnClick'
    },

    switchTabOnClick: function(e) {
        var self = this;

        this.tab.removeClass('is-active');
        $(e.currentTarget).addClass('is-active');

        this.targetId = $(e.currentTarget).data('id');

        this.tabContent.removeClass('is-active');
        $('#' + this.targetId).addClass('is-active');


        if(this.$el.hasClass('js-tabs--social')) {
            var dataIdArray = [];

            _.each(this.tab, function(element, index, list) {
                dataIdArray.push($(element).data('id'));
            });

            _.each(dataIdArray, function(element, index, list) {
                self.tabs.removeClass('social-tabs__tabs--' + element + '-is-active').addClass('social-tabs__tabs--' + self.targetId + '-is-active');
            });
        }
    }
};

App.Control.install(Tabs);
console.log('header script file');
var MainNav = {
	el: '.js-main-nav',
	name: 'MainNav',

	initialize: function() {
		this.btn = this.$('.js-main-nav__btn');
		this.list = this.$('.js-main-nav__list');
	},

	events: {
		'click .js-main-nav__btn': 'toggleNav'
	},

	toggleNav: function() {
		this.list.slideToggle();
	}
};

App.Control.install(MainNav)
console.log('Other block script is ready to use');
console.log('Script for main page file');