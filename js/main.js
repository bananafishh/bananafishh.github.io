$(document).ready(function() {
	svg4everybody();

  $(".js-select").select2({
  	minimumResultsForSearch: Infinity
  });

});


var BackToTop = Backbone.View.extend({
	el: '.js-back-to-top',

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
});

$(function () {
    App.Views.BackToTop = new BackToTop();
});


var Tabs = Backbone.View.extend({
	el: '.js-tabs',

    initialize: function() {
        this.tab = this.$('.js-tabs__tab');
        this.selectMenu = this.$('.js-tabs__select-menu');
        this.tabsList = this.$('.js-tabs__list');
        this.tabContent = this.$('.js-tabs__content');
    },

    events: {
    	'click .js-tabs__tab': 'switchTabOnClick',
        'click .js-tabs__select-menu': 'toggleTabsList'
    },

    switchTabOnClick: function(e) {
        this.tab.removeClass('active');
        $(e.currentTarget).addClass('active');

        this.targetId = $(e.currentTarget).data('id');

        this.tabContent.removeClass('active');
        $('#' + this.targetId).addClass('active');

        this.activeTabText = $(e.currentTarget).text();
        this.selectMenu.text(this.activeTabText);

        this.toggleTabsList();
    },

    toggleTabsList: function() {
        if($(window).outerWidth() < 880) {
            this.tabsList.slideToggle('fast');
        }
    }
});

$(function () {
    App.Views.Tabs = new Tabs();
});


var MainNavView = Backbone.View.extend({
	el: '.js-main-nav',

    initialize: function() {
    	this.mainNavBtn = this.$('.js-main-nav__btn');
    	this.mainNavList = this.$('.js-main-nav__list');
    },

    events: {
    	'click .js-main-nav__btn': 'toggleNav'
    },

    toggleNav: function() {
    	this.mainNavList.toggleClass('main-nav__list--open')
    }
});

$(function () {
    App.Views.MainNavView = new MainNavView();
});
var MainSlider = Backbone.View.extend({
	el: '.js-main-slider',

    initialize: function() {
    	this.$el.bxSlider({
		  	mode: 'fade',
		  	pager: false,
		  	auto: true
		});
    }
});

$(function () {
    App.Views.MainSlider = new MainSlider();
});