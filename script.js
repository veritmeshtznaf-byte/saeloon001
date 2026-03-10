
document.addEventListener('DOMContentLoaded', function() {
  const headings = document.querySelectorAll('.collapsible-heading');

  headings.forEach(heading => {
    heading.addEventListener('click', function() {
      // Toggle arrow rotation
      heading.classList.toggle('active');

      // Toggle the next sibling collapsible content
      let content = heading.nextElementSibling;

      // Sometimes there are text nodes between heading and content
      while(content && !content.classList.contains('collapsible-content')) {
        content = content.nextElementSibling;
      }

      if(content) {
        if(content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      }
    });
  });
});
