const $window = $(window);
const $body = $('body');
const $header = $('#header');
let $titleBar = null;
const $nav = $('#nav');
const $wrapper = $('#wrapper');

// Rozmezí šířky okna.
const breakpoints = {
  xlarge: ['1281px', '1680px'],
  large: ['1025px', '1280px'],
  medium: ['737px', '1024px'],
  small: ['481px', '736px'],
  xsmall: [null, '480px'],
};

// Spustit počáteční animace při načtení stránky.
$window.on('load', () => {
  setTimeout(() => {
    $body.removeClass('is-preload');
  }, 10000);
});

// Opravy a úpravy.

// Polyfill: Object fit (Zajistí správné zobrazení obrázků na pozadí).
if (!browser.canUse('object-fit')) {
  $('.image[data-position]').each(() => {
    const $this = $(this);
    const $img = $this.children('img');

    // Použít obrázek jako pozadí.
    $this
      .css('background-image', `url("${$img.attr('src')}")`)
      .css('background-position', $this.data('position'))
      .css('background-size', 'cover')
      .css('background-repeat', 'no-repeat');

    // Schovat obrázek.
    $img.css('opacity', '0');
  });
}

// Panel záhlaví (hlavičky).

// Navigace.
const $nav_a = $nav.find('a');

$nav_a
  .addClass('scrolly')
  .on('click', () => {
    const $this = $(this);

    // Externí odkaz? Přerušit.
    if ($this.attr('href').charAt(0) != '#') {
      return;
    }

    // Deaktivovat všechny odkazy.
    $nav_a.removeClass('active');

    // Aktivovat odkaz *a* uzamknout ho (aby Scrollex nepokusil aktivovat jiné odkazy během posunu na tuto sekci).
    $this.addClass('active').addClass('active-locked');
  })
  .each(function () {
    const $this = $(this);
    const id = $this.attr('href');
    const $section = $(id);

    // Pro tento odkaz neexistuje sekce? Přerušit.
    if ($section.length < 1) {
      return;
    }

    // Scrollex (plugin pro plynulý posun na různé části stránky).
    $section.scrollex({
      mode: 'middle',
      top: '5vh',
      bottom: '5vh',
      initialize: () => {
        // Deaktivovat sekci.
        $section.addClass('inactive');
      },
      enter: () => {
        // Aktivovat sekci.
        $section.removeClass('inactive');

        // Nejsou uzamčeny žádné odkazy? Deaktivovat všechny odkazy a aktivovat tento odkaz v sekci.
        if ($nav_a.filter('.active-locked').length == 0) {
          $nav_a.removeClass('active');
          $this.addClass('active');
        } else if ($this.hasClass('active-locked')) {
          // Pokud je tento odkaz uzamčený, odemknout ho.
          $this.removeClass('active-locked');
        }
      },
    });
  });

// Titulní lišta (bar na vrchu stránky).
$titleBar = $(
  `<div id="titleBar">
    <a href="#header" class="toggle"></a>
    <span class="title">${$('#logo').html()}</span>
  </div>`
).appendTo($body);

// Panel záhlaví.
$header.panel({
  delay: 500,
  hideOnClick: true,
  hideOnSwipe: true,
  resetScroll: true,
  resetForms: true,
  side: 'right',
  target: $body,
  visibleClass: 'header-visible',
});

// Scrolly (přidání plynulého posunu na stránku).
$('.scrolly').scrolly({
  speed: 1000,
  offset: () => {
    // Pokud je šířka okna menší než nebo rovna "medium" breakpointu, použijeme výšku titulní lišty jako offset, jinak žádný offset.
    if (breakpoints.active('<=medium')) {
      return $titleBar.height();
    }
    return 0;
  },
});
