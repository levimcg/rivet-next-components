import NavMenu from './components/NavMenu';

// This is lame. Needs refactored into something reusable for the search.
function init() {
  // Initial set up
  const globalMenu = document.getElementById('global-menu');
  const globalMenuToggle = document.querySelector('[data-global-menu-toggle]');
  globalMenu.setAttribute('hidden', '');
  
  // Listen for clicks and toggle
  globalMenuToggle.addEventListener('click', () => {
    let isExpanded = globalMenuToggle.getAttribute('aria-expanded');
    if (isExpanded == 'false') {
      globalMenu.removeAttribute('hidden');
      globalMenuToggle.setAttribute('aria-expanded', 'true');
    } else {
      globalMenu.setAttribute('hidden', '');
      globalMenuToggle.setAttribute('aria-expanded', 'false');
    }
  })
}

export default { NavMenu, init };