/* Designishkul — renders all content from content.json (edited via /admin dashboard) */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // Theme toggle
  var themeBtn = $('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('dk-theme', next); } catch (e) {}
    });
  }

  // Mobile menu
  var toggle = $('navToggle'), menu = $('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  $('year').textContent = new Date().getFullYear();

  fetch('content.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () { /* keep static fallbacks in HTML */ });

  function render(d) {
    var email = d.contact.email;
    var waNum = String(d.contact.whatsapp).replace(/\D/g, '');
    var waLink = 'https://wa.me/' + waNum;
    var waMsg = waLink + '?text=' + encodeURIComponent('Hi! I saw your portfolio and I have a project.');

    document.title = d.site.name + ' — ' + d.site.title;
    $('brandName').textContent = d.site.brand;
    $('footerBrand').textContent = d.site.brand;
    $('footerName').textContent = d.site.name;

    // Hero
    $('heroBadge').textContent = d.hero.badge;
    $('heroName').textContent = d.site.name;
    $('heroHeading').textContent = d.hero.heading;
    $('heroSubtitle').textContent = d.hero.subtitle;
    $('cardName').textContent = d.site.name;
    $('cardRole').textContent = d.site.title + ' — ' + d.site.location;
    $('heroStats').innerHTML = d.hero.stats.map(function (s) {
      return '<div class="stat"><b>' + esc(s.value) + '</b><span>' + esc(s.label) + '</span></div>';
    }).join('');

    // CTAs
    $('headerCta').href = 'mailto:' + email + '?subject=Project%20inquiry';
    $('ctaMail').textContent = email;
    $('heroWa').href = waMsg;

    // About
    $('aboutHeading').textContent = d.about.heading;
    $('aboutText').textContent = d.about.text;
    $('aboutChecklist').innerHTML = d.about.checklist.map(function (c) {
      return '<li><span class="tick">✓</span><span>' + esc(c) + '</span></li>';
    }).join('');
    $('footerAbout').textContent = d.hero.subtitle;

    // Projects
    $('projectGrid').innerHTML = d.projects.map(function (p) {
      return '<article class="card">' +
        '<a class="thumb" href="' + esc(p.url) + '" target="_blank" rel="noopener" aria-label="' + esc(p.title) + '">' + esc(p.letter) + '</a>' +
        '<div class="pad"><h3><a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a></h3>' +
        '<p>' + esc(p.subtitle) + '</p>' +
        '<div class="meta">♥ ' + esc(p.appreciations) + ' appreciations · Behance</div></div></article>';
    }).join('');

    // Services
    $('serviceGrid').innerHTML = d.services.map(function (s, i) {
      return '<div class="card service-card' + (i === 1 ? ' featured' : '') + '">' +
        '<div class="kicker">' + esc(s.title) + '</div>' +
        '<div class="from"><small>from</small> ' + esc(s.price) + '</div>' +
        '<p>' + esc(s.description) + '</p>' +
        '<a class="btn btn-primary" href="mailto:' + esc(email) + '?subject=' + encodeURIComponent('Inquiry: ' + s.title) + '">Order now</a></div>';
    }).join('');
    $('footerServices').innerHTML = d.services.map(function (s) {
      return '<li><a href="#services">' + esc(s.title) + ' — from ' + esc(s.price) + '</a></li>';
    }).join('');

    // Contact
    $('contactEmail').href = 'mailto:' + email;
    $('contactEmail').textContent = email;
    $('contactWa').href = waLink;
    $('contactWa').textContent = '+' + waNum;
    $('contactWaLabel').textContent = d.contact.whatsappLabel;
    $('contactLocation').textContent = d.contact.location;
    $('ctaWa').href = waMsg;
    $('ctaEmailBtn').href = 'mailto:' + email;
    $('ctaEmailBtn').textContent = email;
    $('footerEmail').href = 'mailto:' + email;
    $('footerEmail').textContent = email;
    $('footerWa').href = waLink;
    $('footerWa').textContent = 'WhatsApp: +' + waNum;
    $('footerLocation').textContent = d.contact.location;
    $('waFloat').href = waMsg;
    $('waFloatLabel').textContent = d.contact.whatsappLabel;
    $('formWa').href = waMsg;

    // Socials
    var socialHtml = d.socials.map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.name) + '" title="' + esc(s.name) + '">' + esc(s.name.charAt(0)) + '</a>';
    }).join('');
    $('socialRow').innerHTML = socialHtml;
    $('footerSocials').innerHTML = socialHtml;

    // Contact form → mailto / WhatsApp with prefilled message
    $('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var body = 'Name: ' + $('cfName').value + '\nEmail: ' + $('cfEmail').value + '\n\n' + $('cfMessage').value;
      window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent($('cfSubject').value || 'New project inquiry') + '&body=' + encodeURIComponent(body);
    });
  }
})();
