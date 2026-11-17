// The Biblical Cookbook — flipbook wiring (StPageFlip v2, vendored in vendor/)
(function () {
  var bookEl = document.getElementById('book');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var tocBtn = document.getElementById('tocBtn');
  var pageLabel = document.getElementById('pageLabel');

  // Page names for the indicator (0-based page index -> label)
  var PAGE_NAMES = ['Cover', 'How to Use', 'Contents', 'Contents', 'Recipe 1', 'Recipe 1', 'Recipe 2', 'Recipe 2', 'Recipe 3', 'Recipe 3', 'Recipe 4', 'Recipe 4', 'Recipe 5', 'Recipe 5', 'Recipe 6', 'Recipe 6', 'Recipe 7', 'Recipe 7', 'Recipe 8', 'Recipe 8', 'Recipe 9', 'Recipe 9', 'Recipe 10', 'Recipe 10', 'Recipe 11', 'Recipe 11', 'Recipe 12', 'Recipe 12', 'Recipe 13', 'Recipe 13', 'Recipe 14', 'Recipe 14', 'Recipe 15', 'Recipe 15', 'Recipe 16', 'Recipe 16', 'Recipe 17', 'Recipe 17', 'Recipe 18', 'Recipe 18', 'Recipe 19', 'Recipe 19', 'Recipe 20', 'Recipe 20', 'Recipe 21', 'Recipe 21', 'Recipe 22', 'Recipe 22', 'Recipe 23', 'Recipe 23', 'Recipe 24', 'Recipe 24', 'Recipe 25', 'Recipe 25', 'Article 1', 'Article 1', 'Article 2', 'Article 2', 'Article 3', 'Article 3', 'Article 4', 'Article 4'];
  var TOTAL = 62;

  var pageFlip = new St.PageFlip(bookEl, {
    width: 420,
    height: 700,
    size: 'stretch',
    minWidth: 315,
    maxWidth: 620,
    minHeight: 420,
    maxHeight: 820,
    showCover: true,
    usePortrait: true,
    mobileScrollSupport: true,
    swipeDistance: 30,
    clickEventForward: true,
    useMouseEvents: true,
    drawShadow: true,
    flippingTime: 700,
    maxShadowOpacity: 0.5,
    showPageCorners: true,
    disableFlipByClick: false
  });

  pageFlip.loadFromHTML(document.querySelectorAll('.page'));

  // Debug/verification handle (harmless in production).
  window.__pageFlip = pageFlip;

  function updateUI() {
    var i = pageFlip.getCurrentPageIndex();
    var landscape = (pageFlip.getOrientation() === 'landscape');
    var label;
    if (landscape && i > 0) {
      // In spread view the label shows the pages on display.
      var last = Math.min(i + 1, TOTAL - 1);
      label = (last > i)
        ? PAGE_NAMES[i] + '  ·  Pages ' + (i + 1) + '–' + (last + 1) + ' / ' + TOTAL
        : PAGE_NAMES[i] + '  ·  ' + (i + 1) + ' / ' + TOTAL;
    } else {
      label = PAGE_NAMES[i] + '  ·  ' + (i + 1) + ' / ' + TOTAL;
    }
    pageLabel.textContent = label;
    prevBtn.disabled = (i === 0);
    nextBtn.disabled = landscape ? (i >= TOTAL - 2) : (i === TOTAL - 1);
  }

  pageFlip.on('flip', updateUI);
  pageFlip.on('init', updateUI);

  prevBtn.addEventListener('click', function () { pageFlip.flipPrev(); });
  nextBtn.addEventListener('click', function () { pageFlip.flipNext(); });
  tocBtn.addEventListener('click', function () { pageFlip.turnToPage(2); });

  // Contents jump links + "Back to Contents" links
  document.querySelectorAll('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function (ev) {
      ev.stopPropagation();
      pageFlip.turnToPage(parseInt(el.getAttribute('data-goto'), 10));
    });
  });

  // Keyboard arrows
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowRight') pageFlip.flipNext();
    if (ev.key === 'ArrowLeft') pageFlip.flipPrev();
  });

  updateUI();
})();
