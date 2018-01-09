console.log('main script file');
$(document).ready(function() {
    $(".js-fancybox").fancybox();
});
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
						'background' : 'rgba(27, 71, 105, 0.7)'
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

        // if($(window).outerWidth() < 900) {
        //     this.topOffset = 80;
        // } else {
        //     this.topOffset = 20;
        // }


        $('html, body').animate({
            scrollTop: this.targetOffsetTop //- this.topOffset
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
    	this.slide = this.$el.find('.js-slider-experts__slide');

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

			this.slider = this.$el.bxSlider({
				mode: 'fade',
            	pager: false,
            	onSlideAfter: function() {
            		self.activeSlide = self.slide.filter('[aria-hidden=false]');
            		self.expertName = self.activeSlide.data('name');
            		self.expertPosition = self.activeSlide.data('position');

            		$('[data-title-expert-name=true]').text(self.expertName);
            		$('[data-title-expert-position=true]').text(self.expertPosition);
            	}
			});
		}
    },

    destroySlider: function() {
		if(this.slider) {
			this.slider.destroySlider();
			this.slider = null;

			$('[data-title-expert-name=true]').text('Алексей Абрамов');
            $('[data-title-expert-position=true]').text('управляющий партнер');
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
				mode: 'fade',
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