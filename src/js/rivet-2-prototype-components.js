import NavMenu from './components/NavMenu';

// This is lame. Needs refactored into something reusable for the search.
function init() {
  // Initial set up
  const globalMenu = document.getElementById('global-menu');
  const globalMenuToggle = document.querySelector('[data-global-menu-toggle]');
  globalMenu.setAttribute('hidden', '');
  
  const localMenu = document.getElementById('local-menu');
  const localMenuToggle = document.querySelector('[data-local-menu-toggle]');
  localMenu.setAttribute('hidden', '');
  
  function openMenu(menu, toggle) {
    menu.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');
  }
  
  function closeMenu(menu, toggle) {
    menu.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
  }
  
  // Listen for clicks and toggle
  globalMenuToggle.addEventListener('click', () => {
    let isExpanded = globalMenuToggle.getAttribute('aria-expanded');
    if (isExpanded == 'false') {
      openMenu(globalMenu, globalMenuToggle);
    } else {
      closeMenu(globalMenu, globalMenuToggle);
    }
  });
  
  // Listen for clicks and toggle
  localMenuToggle.addEventListener('click', () => {
    let isExpanded = localMenuToggle.getAttribute('aria-expanded');
    if (isExpanded == 'false') {
      openMenu(localMenu, localMenuToggle);
    } else {
      closeMenu(localMenu, localMenuToggle);
    }
  });
}

export default { NavMenu, init };