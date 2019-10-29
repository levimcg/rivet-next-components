import NavMenu from './components/NavMenu';

// This is lame. Needs refactored into something reusable for the search.

function init() {
  /**
  function openMenu(menu, toggle) {
    menu.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');
  }
  
  function closeMenu(menu, toggle) {
    menu.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
  }
  
  const globalMenu = document.getElementById('global-menu');
  const globalMenuToggle = document.querySelector('[data-global-menu-toggle]');
  
  globalMenu.setAttribute('hidden', '');
  // Listen for clicks and toggle
  globalMenuToggle.addEventListener('click', () => {
    let isExpanded = globalMenuToggle.getAttribute('aria-expanded');
    if (isExpanded == 'false') {
      openMenu(globalMenu, globalMenuToggle);
    } else {
      closeMenu(globalMenu, globalMenuToggle);
    }
  });
  
  const localMenu = document.getElementById('local-menu');
  const localMenuToggle = document.querySelector('[data-local-menu-toggle]');
  
  if (localMenu) {
    localMenu.setAttribute('hidden', '');
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
  
  const secondaryMenu = document.getElementById('secondary-menu');
  const secondaryToggle = document.getElementById('secondary-menu-toggle');

  if (secondaryMenu) {
    secondaryMenu.setAttribute('hidden', '');
    // Listen for clicks and toggle
    secondaryToggle.addEventListener('click', () => {
      let isExpanded = secondaryToggle.getAttribute('aria-expanded');
      if (isExpanded == 'false') {
        openMenu(secondaryMenu, secondaryToggle);
      } else {
        closeMenu(secondaryMenu, secondaryToggle);
      }
    });
  }
   */
}

// export default { NavMenu, init };