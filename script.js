// script.js — single-click collapsibles, animated open/close, auto TOC, language switcher, TOC highlight

document.addEventListener('DOMContentLoaded', function() {

  // ---- utilities ----
  function nextCollapsible(el) {
    let n = el.nextElementSibling;
    while (n && !n.classList.contains('collapsible-content')) n = n.nextElementSibling;
    return n || null;
  }

  // ---- collapsibles: init ----
  const headings = Array.from(document.querySelectorAll('.collapsible-heading'));
  headings.forEach(h => {
    h.setAttribute('role','button');
    h.tabIndex = 0;
    h.setAttribute('aria-expanded','false');

    // init state
    const c = nextCollapsible(h);
    if (c) {
      // if open class present keep open
      if (c.classList.contains('open')) {
        c.style.maxHeight = c.scrollHeight + 'px';
        c.classList.add('open');
        h.classList.add('open');
        h.setAttribute('aria-expanded','true');
      } else {
        c.style.maxHeight = '0px';
      }
    }

    // click handler
    h.addEventListener('click', function(e) {
      e.stopPropagation();
      const content = nextCollapsible(h);
      if (!content) return;
      const isOpen = content.classList.toggle('open');
      h.classList.toggle('open', isOpen);
      h.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // smooth height toggle
      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px'; // set to current so transition works
        // force reflow then set to 0
        requestAnimationFrame(() => { content.style.maxHeight = '0px'; });
      }
    });

    // keyboard support
    h.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); h.click(); }
    });
  });

  // ---- AUTOMATIC TOC ----
  const tocEl = document.getElementById('toc');
  if (tocEl) {
    const headers = document.querySelectorAll('.article-content h2');
    if (headers.length) {
      const ol = document.createElement('ol');
      headers.forEach((hd, idx) => {
        if (!hd.id) hd.id = 'section-' + idx;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + hd.id;
        a.textContent = hd.textContent;
        a.addEventListener('click', function(ev) {
          ev.preventDefault();
          document.querySelector('#' + hd.id).scrollIntoView({behavior:'smooth', block:'start'});
          // highlight clicked item in TOC (simple)
          const all = tocEl.querySelectorAll('a'); all.forEach(x=>x.classList.remove('active'));
          a.classList.add('active');
        });
        li.appendChild(a); ol.appendChild(li);
      });
      const title = document.createElement('h2'); title.textContent = 'Contents';
      tocEl.appendChild(title); tocEl.appendChild(ol);
    }
  }

  // ---- TOC active on scroll (simple) ----
  const tocLinks = tocEl ? Array.from(tocEl.querySelectorAll('a')) : [];
  if (tocLinks.length) {
    const headerEls = Array.from(document.querySelectorAll('.article-content h2'));
    function onScroll() {
      const top = window.scrollY + 120; // offset
      let activeIndex = -1;
      headerEls.forEach((h, i) => {
        if (h.offsetTop <= top) activeIndex = i;
      });
      tocLinks.forEach((a,i)=> a.classList.toggle('active', i===activeIndex));
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // ---- language switcher behavior (if present) ----
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', function() {
      // if current page ends with _ar or lang is ar -> go to English, else go to Arabic
      const href = window.location.pathname;
      if (href.includes('_ar') || href.endsWith('/saeloon_ar.html')) {
        window.location.href = href.replace('saeloon_ar.html','saeloon.html').replace('_ar','');
      } else {
        // go to Arabic file
        if (href.endsWith('saeloon.html')) window.location.href = 'saeloon_ar.html';
        else window.location.href = 'saeloon_ar.html';
      }
    });
  }

});
