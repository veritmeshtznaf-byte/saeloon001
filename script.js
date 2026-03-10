document.addEventListener('DOMContentLoaded', function() {
  const headings = document.querySelectorAll('.collapsible-heading');

  headings.forEach(heading => {
    heading.addEventListener('click', function() {
      heading.classList.toggle('active'); // toggles the arrow rotation
      const content = heading.nextElementSibling;
      if(content && content.classList.contains('collapsible-content')) {
        // Toggle display in one click
        if(content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      }
    });
  });
});
