export default class NavMenu {
  constructor(element, options) {
    /* eslint-disable */
    const defaultOptions = {
      openAllOnInit: false,
      onOpen: null,
      onClose: null,
    };

    const settings = Object.assign({}, defaultOptions, options);
    /* eslint-enable */
    
    this.element = element;
    this.onOpen = options.onOpen;
    this.openAllOnInit = options.openAllOnInit;

    // get DOM selectors
    this.childMenus = this.element.querySelectorAll('[data-sidenav-toggle] + [data-sidenav-list]');
    this.menuToggles = this.element.querySelectorAll('[data-sidenav-toggle]');

    this.init();
  }

  _handleClick(event) {
    const toggleButton = event.target.closest('[data-sidenav-toggle]');
    const newEvent = new CustomEvent('rvt:sideNavFoldOpen', {
      bubbles: true,
      cancelable: true,
      detail: {
        foldValue: toggleButton.getAttribute('data-sidenav-toggle')
      }
    });
    const targetList = this.element.querySelector('[data-sidenav-list="' + newEvent.detail.foldValue + '"]');

    // Exit if toggle button doesn't exist
    if (!toggleButton) {
      return;
    }

    // Exit if the target list isn't linked with a button
    if (targetList.getAttribute('data-sidenav-list') === '') {
      return;
    }

    if (targetList.hasAttribute('hidden')) {
      this.open(toggleButton, targetList)
    } else {
      this.close(toggleButton, targetList)
    }
  }

  open(toggleButton, targetList) {
    toggleButton.setAttribute('aria-expanded', 'true');
    targetList.removeAttribute('hidden');
  }

  close(toggleButton, targetList) {
    toggleButton.setAttribute('aria-expanded', 'false');
    targetList.setAttribute('hidden', '');
  }

  destroy() {
    this.element.removeEventListener('click', this._handleClick, false);
  }

  init() {
    // Handle open/closed folds on load
    if (this.openAllOnInit === false) {
      this.menuToggles.forEach(function (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      });

      this.childMenus.forEach(function (childMenu) {
        childMenu.setAttribute('hidden', '');
      });
    }

    // Add click handlers
    this.element.addEventListener('click', e => this._handleClick(e), false);
  }
}