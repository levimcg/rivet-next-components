/**
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Keeps track of the currently active toggle. Helps with focus management
let activeToggle;
let activeMenu;

/**
 * Global constants
 */
const KEYS = {
  up: 38,
  down: 40,
  tab: 9,
  escape: 27
};

// Anything that is focusable
const ALL_FOCUSABLE_ELS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

const TOGGLE_ATTR = 'data-sidenav-toggle';

// Get all menu toggles
const menuToggles = document.querySelectorAll('[data-sidenav-toggle]');

// Get all child menus
const childMenus = document.querySelectorAll('[data-sidenav-toggle] + .rvt-sidenav__list');

/**
 * @param {String} id - A unique string used for the dropdown toggle
 * element's data-dropdown-toggle attribute and the corresponding menu's
 * "id" attribute.
 * @param {Function} callback - An optional callback function that gets
 * emitted after the menu is opened.
 */
function openMenu(id, callback) {
  if (!id) {
    throw new Error('You must provide a unique id for the menu you\'re trying to open.');
  }

  // Set the current active menu the menu we're about to open
  activeMenu = id;

  var toggleSelector = '[' + TOGGLE_ATTR + '="' + id + '"]';

  var toggle = document.querySelector(toggleSelector);

  // Return if disabled dropdown is being opened programmatically
  if (toggle.hasAttribute('disabled')) {
    return;
  }

  // If the menu was opened by clicking an associated toggle
  if (toggle && toggle !== null) {
    toggle.setAttribute('aria-expanded', 'true');

    activeToggle = toggle;
  }

  // Get the menu to be opened by id
  var menu = document.getElementById(id);

  if (!menu) {
    throw new Error('There was no menu found with an id attribute that matches the "data-sidenav-toggle" attribute on the dropdown toggle.');
  }

  // Remove the 'hidden' attribute to show the menu
  menu.setAttribute('aria-hidden', 'false');

  // Emit a custom event that can be used as a hook for other actions
  // eslint-disable-next-line no-undef
  fireCustomEvent(toggle, TOGGLE_ATTR, 'dropdownOpen');

  // Execute supplied callback function if it exists
  if (callback && typeof callback === 'function') {
    callback();
  }
}

/**
 * @param {String} id - A unique string associate with the dropdown's
 * "data-sidenav-toggle" and "id" attributes.
 * @param {Function} callback - An optional callback function that is
 * executed after the closeMenu method is called.
 */
function closeMenu(id, callback) {
  if (!id) {
    throw new Error('You must provide a unique id for the menu you\'re trying to close.');
  }

  var toggle = document.querySelector('[' + TOGGLE_ATTR + '="' + id + '"]');

  // Return if disabled dropdown is being closed programmatically
  if (toggle.hasAttribute('disabled')) {
    return;
  }

  if (toggle && toggle !== undefined) {
    toggle.setAttribute('aria-expanded', 'false');
  }

  var menu = document.getElementById(id);

  if (!menu) {
    // If the menu has been removed from the DOM as a result of some other action in the menu then bail
    if (id) {
      return
    } else {
      // Otherwise throw an error
      throw new Error('There was no menu found with an id attribute that matches the "data-sidenav-toggle" attribute on the dropdown toggle.');
    }
  }

  menu.setAttribute('aria-hidden', 'true');

  // Emmit a custom event that can be used as a hook for other actions
  // eslint-disable-next-line no-undef
  fireCustomEvent(toggle, TOGGLE_ATTR, 'dropdownClose');

  // Execute supplied callback function if it exists
  if (callback && typeof callback === 'function') {
    callback();
  }
}

/**
 * @param {HTMLElement} menu - An HTMLElement that contains the dropdown
 * menu options. This function returns an object that holds a reference
 * to all focusable element in the menu, the first focusable, and the
 * last focusable element
 */
function _setUpMenu(menu) {
  var menuObject = {};

  // Create a real Array of all the focusable elements in the menu
  var menuFocusables = Array.prototype.slice.call(
    menu.querySelectorAll(ALL_FOCUSABLE_ELS)
  );

  // Create a property to hold an array of all focusables
  menuObject.all = menuFocusables;

  // Create a property with a reference to the first focusable
  menuObject.first = menuFocusables[0];

  // Create a property with a reference to the last focusable
  menuObject.last = menuFocusables[menuFocusables.length - 1];

  return menuObject;
}

/**
 * Event handlers
 */

/**
 * @param {Event} event - This is function is used to handle all click
 * events on the document. It accepts the Event object, checks the target
 * to see if it is a dropdown toggle. If so, it opens the menu otherwise
 * it closes any open/active dropdown.
 */
function _handleClick(event) {
  var toggle = event.target.closest('[' + TOGGLE_ATTR + ']');

  // If the toggle wasn't the target, then exit
  if (!toggle) {
    return;
  }

  var toggleId = toggle.getAttribute(TOGGLE_ATTR);
  var toggleValue = toggle.getAttribute('data-sidenav-toggle');

  var menu = document.querySelector('[id="' + toggleValue + '"]');

  // Exit if the target menu isn't linked with a button
  if (menu.getAttribute('id') === '') {
    throw new Error('The toggle that was clicked is not linked with a menu.');
  }

  if (menu.getAttribute('aria-hidden') === 'true') {
    openMenu(toggleId);
  } else {
    closeMenu(toggleId);
  }
}

/**
 *
 * @param {Event} event - This functions handles all keydown events on
 * the document. It accepts the event object, determines which keys were
 * pressed and preforms the appropriate actions. Used to handle
 * keyboard navigation.
 */
function _handleKeydown(event) {
  switch (event.keyCode) {
    // Handle down key
    case KEYS.down:
      // Prevent page from scrolling when using down arrow key
      event.preventDefault();

      var toggle = event.target.closest('[' + TOGGLE_ATTR + ']');

      /**
       * If you were focused on the dropdown toggle
       */
      if (toggle && toggle !== null) {
        var toggleId = toggle.getAttribute(TOGGLE_ATTR);

        var menu = document.getElementById(toggleId);

        // If you're focused on the toggle button and the menu is open.
        if (toggle.getAttribute('aria-expanded') === 'true') {
          var currentMenu = _setUpMenu(menu);

          currentMenu.first.focus();
        }

        openMenu(toggleId);
      }

      /**
       * Handle down arrow key when inside the open menu.
       */
      if (event.target.closest('#' + activeMenu) !== null) {
        var theMenu = event.target.closest('#' + activeMenu);

        currentMenu = _setUpMenu(theMenu);

        var currentIndex;

        /**
         * This keeps track of which button/focusable is focused in the open menu
         */
        for (var i = 0; i < currentMenu.all.length; i++) {
          if (event.target == currentMenu.all[i]) {
            currentIndex = i;
          }
        }

        var nextItem = currentMenu.all[currentIndex + 1];

        if (!nextItem) {
          currentMenu.first.focus();

          return;
        }

        nextItem.focus();
      }

      break;

    case KEYS.up:
      // Prevent page from scrolling when using up arrow key
      event.preventDefault();

      // Handle up arrow key when inside the open menu.
      if (event.target.closest('#' + activeMenu) !== null) {
        theMenu = event.target.closest('#' + activeMenu);

        currentMenu = _setUpMenu(theMenu);

        currentIndex;

        // This keeps track of which button/focusable is focused in the open menu
        for (i = 0; i < currentMenu.all.length; i++) {
          if (event.target == currentMenu.all[i]) {
            currentIndex = i;
          }
        }

        var previousItem = currentMenu.all[currentIndex - 1];

        if (!previousItem && currentMenu.last !== undefined) {
          currentMenu.last.focus();
          return;
        }

        previousItem.focus();
      }

      break;

    case KEYS.escape:
      // If there's an open menu, close it.
      if (activeMenu) {
        closeMenu(activeMenu);
      }

      if (activeToggle && activeToggle !== null) {
        activeToggle.focus();
      }

      /**
       * Resets the state variables so as not to interfere with other
       * Escape key handlers/interactions
       */
      activeMenu = null;
      activeToggle = null;

      break;

    case KEYS.tab:
      // Handle tab key when inside the open menu.
      if (event.target.closest('#' + activeMenu) !== null || undefined) {
        theMenu = event.target.closest('#' + activeMenu);

        currentMenu = _setUpMenu(theMenu);

        currentIndex;

        // This keeps track of which button/focusable is focused in the open menu
        for (i = 0; i < currentMenu.all.length; i++) {
          if (event.target == currentMenu.all[i]) {
            currentIndex = i;
          }
        }
      }

      break;
  }
}

/**
 *
 * @param {HTMLElement} context - An optional DOM element. This only
 * needs to be passed in if a DOM element was passed to the init()
 * function. If so, the element passed in must be the same element
 * that was passed in at initialization so that the event listeners can
 * be properly removed.
 */
function destroy(context) {
  // Optional element to bind the event listeners to
  if (context === undefined) {
    context = document;
  }
  /**
   * Clean up event listeners
   */
  context.removeEventListener('click', _handleClick, false);
  context.removeEventListener('keydown', _handleKeydown, false);
}

/**
 *
 * @param {HTMLElement} context - An optional DOM element that the
 * dropdown can be initialized on. All event listeners will be attached
 * to this element. Usually best to just leave it to default
 * to the document.
 */
function init(context) {
  // Optional element to bind the event listeners to
  if (context === undefined) {
    context = document;
  }

  Array.prototype.slice.call(menuToggles).forEach(function (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-haspopup', 'true');
  });

  Array.prototype.slice.call(childMenus).forEach(function(childMenu) {
    childMenu.setAttribute('aria-hidden', 'true');
  });

  // Destroy any currently initialized dropdowns
  destroy(context);

  /**
   * Attach all event listeners to the document
   */
  context.addEventListener('click', _handleClick, false);
  context.addEventListener('keydown', _handleKeydown, false);
}

export default { openMenu, closeMenu, init, destroy };