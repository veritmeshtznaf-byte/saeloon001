// script.js — reliable single-click collapsibles
document.addEventListener('DOMContentLoaded', function() {
  // Find all headings that should toggle
  const headings = Array.from(document.querySelectorAll('.collapsible-heading'));

  // Helper: find the next element sibling that is the collapsible content
  function findContentAfter(node) {
    let el = node.nextElementSibling;
    while (el && !el.classList.contains('collapsible-content')) {
      el = el.nextElementSibling;
    }
    return el || null;
  }

  // Initialize: set ARIA and initial state
  headings.forEach(heading => {
    heading.setAttribute('role', 'button');
    heading.setAttribute('aria-expanded', 'false');

    const content = findContentAfter(heading);
    if (content) {
      // hide by default if not already open
      if (!content.classList.contains('open')) {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
        heading.classList.add('open');
        heading.setAttribute('aria-expanded', 'true');
      }
    }
  });

  // Handle clicks (stopPropagation to avoid parent handlers running)
  headings.forEach(heading => {
    heading.addEventListener('click', function(e) {
      e.stopPropagation(); // important — prevents nested heading clicks from toggling parents
      const content = findContentAfter(heading);
      if (!content) return;

      const isOpen = content.classList.toggle('open'); // toggle class
      heading.classList.toggle('open', isOpen);
      heading.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // toggle display immediately (no reliance on CSS adjacency)
      content.style.display = isOpen ? 'block' : 'none';
    });
  });

  // Optional: allow keyboard control (Enter / Space)
  headings.forEach(heading => {
    heading.tabIndex = 0;
    heading.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        heading.click();
      }
    });
  });
});
