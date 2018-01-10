console.log('main script file');
$(document).ready(function() {
    $(".js-fancybox").fancybox();
});
var BackToTop = {
		el: '.js-back-to-top',
		name: 'BackToTop',
		initialize: function() {
				this.offset = 1000;
				this.backToTopBtn = this.$('.js-back-to-top__btn');

				var self = this;

		},

		events: {
				'click .js-back-to-top__btn': 'scrollToTop'
		},

		scrollToTop: function(ev) {
				ev.preventDefault();

				$('html, body').animate({
						scrollTop: 0
				}, 1800);
		}

};

App.Control.install(BackToTop);

var Equalizer = {
    el: '.js-equalizer',
    name: 'Equalizer',

    initialize: function() {
        this.block = this.$('.js-equalizer__item');
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

App.Control.install(Equalizer);
App.Control.install({
	el: '.js-fancy-modal',
	name: 'FancyModal',
	initialize: function () {
		var self = this;
		this.$el.fancybox({
			wrapCSS: 'fancy-modal',
			margin: ($(window).width() > 937) ? 20 : 5,
			fitToView: false,
			padding: 0,
			helpers : {
				overlay : {
					css : {
						'background' : 'rgba(0, 0, 0, 0.95)'
					}
				}
			}
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

        if($(window).outerWidth() < 768) {
            this.topOffset = 65;
        } else {
            this.topOffset = 0;
        }


        $('html, body').animate({
            scrollTop: this.targetOffsetTop - this.topOffset
        }, 1000);
    }
};

App.Control.install(ScrollTo);
var ShowHiddenContent = {
	el: '.js-show-hidden-content',
	name: 'ShowHiddenContent',

	initialize: function() {
		this.btn = this.$('.js-show-hidden-content__btn');
		this.hiddenContent = this.$('.js-show-hidden-content__content');
	},

	events: {
        'click .js-show-hidden-content__btn': 'showHiddenContent'
    },

	showHiddenContent: function(e) {
		e.preventDefault();

		$(e.currentTarget).toggleClass('is-hidden');
		$(e.currentTarget).next(this.hiddenContent).slideToggle();
		$(this.$el).toggleClass('is-shown');
	}
};

App.Control.install(ShowHiddenContent);
var ShowBtn = {
	el: '.js-show-buttons',
	name: 'ShowBtn',
	initialize: function () {
		this.offset = 1000;
		var self = this;
		$(window).bind('scroll', function () {
			self.fadeIn();
		});
	},
	fadeIn: function () {
		if ($(window).scrollTop() > this.offset) {
			this.$el.removeClass('buttons-round--hidden')
		} else {
			this.$el.addClass('buttons-round--hidden');
		}
	}
};
App.Control.install(ShowBtn);

var SliderExperts = {
    el: '.js-slider-experts',
    name: 'SliderExperts',
    breakpoint: 1200,
    slider: null,

    initialize: function() {
		this.initialActiveSlide = this.$el.find('.js-slider-experts__slide.active');
		this.initialExpertName = this.initialActiveSlide.data('name');
		this.initialExpertPosition = this.initialActiveSlide.data('position');

		this.renderMode();

		var self = this;

		$(window).bind('resize', function() {
			self.renderMode();
		});
    },

    renderMode: function () {
		var self = this;

		if($(window).outerWidth() < self.breakpoint) {
			self.destroySlider();
		} else {
			self.initSlider();
		}
	},

    initSlider: function() {
    	if(!this.slider) {
    		var self = this;

			this.slider = this.$el.owlCarousel({
				items: 1,
				loop: true,
				nav: true,
				dots: false,
				animateOut: 'fadeOut',
				mouseDrag: false
			});

			this.slider.on('translate.owl.carousel', function(event) {
				self.slides = self.$el.find('.owl-item');
				self.activeSlide = self.slides[event.item.index];
				self.activeSlideImg = $(self.activeSlide).find('.js-slider-experts__slide');

				self.expertName = self.activeSlideImg.data('name');
				self.expertPosition = self.activeSlideImg.data('position');

				$('[data-title-expert-name]').text(self.expertName);
				$('[data-title-expert-position]').text(self.expertPosition);
			});
		}
    },

    destroySlider: function() {
		if(this.slider) {
			var self = this;

			this.slider.owlCarousel('destroy');
			this.slider = null;

			$('[data-title-expert-name]').text(self.initialExpertName);
            $('[data-title-expert-position]').text(self.initialExpertPosition);
		}
	}
};

App.Control.install(SliderExperts);
var SliderServices = {
    el: '.js-slider-services',
    name: 'SliderServices',
    breakpoint: 650,
    slider: null,

    initialize: function() {
		this.renderMode();

		var self = this;

		$(window).bind('resize', function() {
			self.renderMode();
		});
    },

    renderMode: function () {
		var self = this;

		if($(window).outerWidth() < self.breakpoint) {
			self.destroySlider();
		} else {
			self.initSlider();
		}
	},

    initSlider: function() {
    	if(!this.slider) {
			this.slider = this.$el.bxSlider({
				adaptiveHeight: true,
				pagerCustom: '#bx-pager'
			});
		}
    },

    destroySlider: function() {
		if(this.slider) {
			this.slider.destroySlider();
			this.slider = null;
		}
	}
};

App.Control.install(SliderServices);
App.Control.install({
    el: '.js-tooltip',
    name: 'Tooltip',
    initialize: function () {
        this.$el.tooltipster({
					content: $('#tooltip-templates__content'),
					theme:'tooltipster-shadow',
					contentCloning: true
				});
    }
});
/*var FixedMenu = {
		el: '.js-main-nav',
		name: 'FixedMenu',
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
						self.fixedMenu();
				});
		},

		fixedMenu: function() {
				if ( $(window).scrollTop() > this.mainNavOffsetTop + this.mainNavHeight ) {
						this.$el.addClass('main-nav--fixed');
				} else {
						this.$el.removeClass('main-nav--fixed');
				}
		}
};

App.Control.install(FixedMenu);*/

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
				'click .js-main-nav__btn': 'toggleNav',
				'click .js-main-nav__link': 'toggleNav'
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
