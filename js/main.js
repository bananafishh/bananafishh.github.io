$(document).ready(function() {
	// Кроссбраузерная поддержка svg спрайтов
	svg4everybody();


	$('.js-fancy-modal').fancybox({
	    wrapCSS: 'fancy-modal',
	    margin: ($(window).width() > 937) ? 20 : 5,
	    fitToView: false,
	    padding: 0,
	    helpers : {
	      overlay : {
	        css : {
	          'background' : 'rgba(0, 0, 0, 0.5)'
	        }
	      }
	    }
	});

	$('.js-fancy-video').fancybox({
	    wrapCSS: 'fancy-video',
	    margin: ($(window).width() > 937) ? 20 : 5,
	    fitToView: false,
	    padding: 15,
	    helpers : {
	      overlay : {
	        css : {
	          'background' : 'rgba(0, 0, 0, 0.5)'
	        }
	      }
	    }
	});
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

        if($('html').hasClass('fonts-loaded')) {
            self.setHeight();
        }

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
var ShowContent = {
	el: '.js-show-content',
	name: 'ShowContent',

	initialize: function() {
		this.btn = this.$('.js-show-content__btn');
		this.hiddenContent = this.$('.is-hide');
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
		if(!$(e.currentTarget).hasClass('is-open') && $(e.currentTarget).data('scroll-to')) {
			needScroll = true;
		}

		$(e.currentTarget).toggleClass('is-open');
		if(this.hiddenContent.length > 0) {
			this.hiddenContent.toggle().toggleClass('is-hide');
		}

		if(this.$el.hasClass('js-show-content--toggle')) {
			if ($(e.currentTarget).hasClass('is-open')) {
				$(e.currentTarget).text('скрыть');
			} else {
				$(e.currentTarget).text('продолжение');
			}
		}

		// Если скрытую информацию и кнопку-триггер невозможно разместить в общем контейнере
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
/**
 *
 * Абстрактный пример виджета, как мы будем использовать backbone.js.
 *
 * Используем декларативный подход, регламенты будут позже, в составе руководства к сборщику.
 * Ниже описан и приведен пример нашего собственного шаблона проектирования, данным примером и описанными ниже директивами
 * необходимо руководствоваться при работе с проектами на основе нашего сборщика.
 *
 * Backbone свободно реализует архитектуру MVC, но типы приложений, которые мы создаем,
 * в виду специфики (seo, необходима генерация кода страницы на стороне сервера полностью), не позволяют его так использовать,
 * и мы на наших проектах используем 1С-Битрикс, у него богатая архитектура и развитые классы рендеринга, нам вполне достаточно этого.
 *
 * Наши JS приложения будут реализованы по собственному паттерну основанному на принципах Singleton с одной стороны и Functional design с другой:
 * @link https://ru.wikipedia.org/wiki/Одиночка_(шаблон_проектирования)
 * @link https://ru.wikipedia.org/wiki/Шаблон_функционального_дизайна
 * *
 * "Почти" так же как прежде мы использовали CanJS,
 * но Backbone.js, в связке с нашим новым сборщиком, - как глоток свежего воздуха, после CanJS.
 * Мы больше не связаны основным объектом приложения,
 * и контроллер на каждый блок можем писать в отдельном файле рядом с pug-разметкой этого блока, в структуре исходников, в сборщике.
 * Исчезли множественные пространства имен, больше не нужно называть контрол на разных уровнях.
 * Появился полный свободный доступ к свойствам и методам от одного контрола к другому - контролы в глобальном объекте App.Views
 * Благодаря основе Underscore.js, и использованию его событийной модели, работа с делегированием событий вообще не вызывает проблем:
 * можно обещать объект для функции, а можно и функцию для объекта, вообще не указывая это явно.
 *
 * У Backbone ещё есть Модели, Коллекции, Роутер, модуль Событий (это не клиентские события, а события Объектов),
 * и он предлагает отличный шаблонизатор, но пока мы не пользуем их, и вряд ли будем.
 *
 * Backbone.View - это не традиционное Представление, в понятии MVC, это может быть модуль, контроллер,
 * виджет или объект другого вида, в зависимости от смысла его использования.
 * Как и прежде, разметка документа в pug и описание стилей в stylus-файлах структурируется по методологии BEM (вариант предложенный Гарри Робертсом).
 * Стремимся придерживаться подхода: Контроллер создается для Блока.
 *
 * В нашей архитектуре отдельны выделяем класс свойств-функций : Плагины.
 * Плагин - свойство-функция для объекта jQuery, находящаяся в области видимости, почти всегда, ограниченная конкретным назначенным Элементом,
 * не обращающаяся к Контроллерам, выполняющая одну конкретную функцию связанную с визуальным отображением элемента,
 * влияющим на его визуальное поведение, не хранящая больше одного состояния элемента (частные случаи могут быть исключением).
 * При необходимости все опции в плагин передаем через data-атрибуты элемента, к которому применяется плагин.
 * Плагины размещаем по смыслу в структуре:
 * общий плагин в /scripts/jquery.pluginname.js,
 * плагин который явно останется в контексте одного блока - рядом с блоком в аналогичный jquery.pluginname.js файл
 * Пример плагина написан ниже.
 *
 * Код скрипта без комментариев, для наглядности находится тут
 * https://pastebin.com/raw/FjEJtnYK
 * и выглядит, на мой взгляд, очень просто для понимания, при том, что он очень функционален,
 * а в условиях нашего сборщика (файловой структуры исходников и BEM-методологии разметки),
 * мы имеем все преимущества серьёзного js-приложения, в максимально удобном для использования виде, при минимальной нагрузке на браузер.
 *
 */


/**
 * Объявляем объект (модуль/контроллер/виджет) как расширение Backbone.View.
 * Называем все наши контролы в стиле CamelCase (слитно без пробелов, при этом каждое слово внутри фразы пишется с заглавной буквы)
 * В конце названия объекта добавляем суффикс View (напр. ContactFormView, PriceTableView)
 *
 * Свободно используем jquery (и свои/сторонние плагины на его основе) в методах котроллера.
 */
var CitySelectorView = Backbone.View.extend({

    /**
     * Объявление контекста контроллера.
     * Если на текущей странице элемент отсутствует - экземпляр будет проинициализирован без ошибок,
     * но с нулевым размером и не определенными свойствами.
     */
    el: '.js-city-selector',

    /**
     * Обявляем параметры объекта по умолчанию.
     * Они будут доступны по прямой ссылке, напр. this.engCityName
     */
    engCityName: 'Mosсow',
    rusCityName: 'Москва',

    /**
     * @function initialize() вызывается всегда при включении контроллера
     */
    initialize: function () {

        /**
         * Обявляем вычисляемые параметры экземпляра объекта контроллера
         */
        this.$cityNameSpan = this.$('.dotted__text');
        this.cityName = this.$('.dotted__text').html();

        /**
         * Пример привязки события к контексту всего контроллера:
         * Сообщение пользователю при двойном клике на блок.
         */
        this.$el.dblclick(function () {
            alert('Вызванное событие двойного клика привязано к основному блоку контроллера!');
        });

        /**
         * Вызываем прочие методы контроллера
         */
        this.render();

        /**
         * Если в собственном методе контроллера возвращается ссылка на него самого,
         * то при таком замыкании мы можем сцеплять методы
         */
        this.loggingState('one').loggingState('two').loggingState('three');
    },

    events: {
        /**
         * Вешаем события на существующий элемент
         */
        'mouseover .dotted--moscow': 'changeLangToEng',
        'mouseout .dotted--moscow': 'changeLangToRus',
        /**
         * Вешаем событие на несуществующий элемент
         */
        'click p.js-added-on-the-fly-inner': 'alertEx',
        /**
         * Мы можем тут указать как несуществующий элемент,
         * так и не существующую функцию, если в будующем они появятся,
         * то событие будет работать корректно
         */
        'click .js-unexist-dull': 'unexistFunct',
        /**
         * Пробуем повесить событие на элемент созданный нашим контролом, но отправленный за рамки контекста контрола
         */
        'click p.added-on-the-fly-outer': 'alertEx'
    },

    render: function () {

        /**
         * По следующему добавленному элементу сработает как двойной щелчек, привязанный ко всему блоку (выше, в initialize()),
         * так и одинарный, обработку которого мы прописали в наборе {events}.
         * Этот пример демонстрирует привязку к несуществующим элементам, которые могут появится в контексте контрола в будущем
         */
        $('<p class="js-added-on-the-fly-inner">Этот элемент остается в области видимости текущего контрола</p>').appendTo(this.$el);

        /**
         * Следующий код будет выполнен, но добавленный элемент уйдет из области видимости контрола,
         * и событие, которые мы пытались привязать - не сработает
         */
        this.$el.after('<p class="js-added-on-the-fly-outer">Этот элемент выходит из контекста контрола, он не услышит событий, привязанных к нему тут.</p>');

        /**
         * Для примера добавил использования нашего плагина, который описан ниже.
         * Плагин применится один раз в момент выполнения этого метода контроллера, так как данный метод более нигде не вызывается повторно.
         */
        $('.js-added-on-the-fly-outer').fadingEx();
    },

    loggingState: function (stringParam) {

        /**
         * Результат работы метода видно в консоли
         */
        console.info('Метод вызван с аргументом: ' + stringParam);

        /**
         * Возвращая в методе указатель на контроллер мы имеем возможнать сцеплять методы, как показано в примере выше
         */
        return this;

    },

    /**
     * Просто alert...
     */
    alertEx: function () {
        alert('Контроллер работает! Город: ' + this.cityName);
    },

    /**
     * Ещё метод...
     * Можем перехватить объект события jquery
     */
    changeLangToEng: function (ev) {

        var $bindedElement = $(ev.currentTarget);

        $bindedElement.find('span').text(this.engCityName);

        /**
         * Для примера добавил использования нашего плагина, который описан ниже, подключить можем тут заранее,
         * так как экземпляр начнет инициализацию когда jquery соберется.
         * В итоге получится, что плагин будет выстреливать тогда, когда сработает событие описанное в контроллере.
         */
        this.$cityNameSpan.fadingEx();
    },

    /**
     * Ещё метод...
     * Можем получить объект по ссылке из нашего экземпляра
     */
    changeLangToRus: function () {
        this.$cityNameSpan.text(this.rusCityName);
    }
});

/**
 * Создадим экземпляр контрола, когда jquery и документ будут готовы.
 * Экземпляр контрола называется по имени класса, но без суффикса View.
 * Складываем экземпляры в объект Views объекта App (он определен уже в ядре сборщика)
 * В итоге мы имеем доступ к методам и свойствам экземпляра глобально:
 * напр. можем получить текущй город из App.Views.CitySelector.cityName в любом другом модуле,
 * и даже изменить его из другого модуля, если требуется.
 */
$(function () {
    App.Views.CitySelector = new CitySelectorView();
});

/**
 * Пример Плагина jquery
 *
 * В течение пяти секунд элемент гаснет, потом резко появляется.
 */
(function ($) {

    $.fn.fadingEx = function () {

        /**
         * @var this в данном контексте jquery объект к которому применяется плагин
         */

        this.animate({
            opacity: 0
        }, 5000, function() {
            /**
             * В callback-функции, имея ту же область видимости jquery уже теряет контекст
             */
            $( this ).css('opacity', '1');
        });
    };

})(jQuery);

/**
 *
 * Итого наш демо-контроллер:
 *
 * Работает в контексте '.js-city-selector'
 * Имеет два предустановленных свойства, типа Строка.
 * При загрузке получает себе ссылку на элемент с названием города, и название города в виде строки.
 * По двойному клику на блок - вызывает сообщение.
 * Рисует два блока с текстом (один в своем контексте, второй вне). Для второго блока применяет плагин.
 * Повторяет собственный метод сцепкой, с разными аргументами
 * Обрабатывает события мыши на элементы в своём контексте:
 * 1. Наведение на название города меняет само название и применяет наш плагин
 * 2. При клике на первый блок с текстом вызывает собственный метод
 *
 * В примере я постарался максимально наглядно применить техники, которыми мы, на наших проектах пользуемся чаще всего.
 *
 *
 */
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