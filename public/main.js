const htopMenu = document.getElementById('h-top-menu');
const toggleTopMenuIcon = document.getElementById('h-toggle-top-menu-icon');

if (toggleTopMenuIcon) {
  toggleTopMenuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    htopMenu.classList.toggle('hidden');
  });
}

document.addEventListener('click', (e) => {
  if (htopMenu && !htopMenu.contains(e.target) && !toggleTopMenuIcon?.contains(e.target)) {
    htopMenu.classList.add('hidden');
  }
});

// Highlight active menu item based on current URL
(() => {
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('#h-top-menu a');
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if ((current === 'index.html' && href === 'index.html') || (href && current === href)) {
      a.parentElement?.classList.add('active');
    }
  });
})();
