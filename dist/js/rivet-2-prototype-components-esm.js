function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var GlobalHeader =
/*#__PURE__*/
function () {
  function GlobalHeader(element) {
    _classCallCheck(this, GlobalHeader);

    this.searchToggle = element.querySelector('[data-header-search-toggle]');
    this.searchInput = element.querySelector('[data-header-search-input]');
    this.element = element;
    this._handleClick = this._handleClick.bind(this);
    this.init();
  }

  _createClass(GlobalHeader, [{
    key: "_handleClick",
    value: function _handleClick() {
      var toggleButton = event.target.closest('[data-header-search-toggle]');
      var newEvent = new CustomEvent('rvt:headerSearchOpen', {
        bubbles: true,
        cancelable: true,
        detail: {
          searchInput: toggleButton.getAttribute('data-header-search-toggle')
        }
      });
      var searchInput = this.element.querySelector('[data-header-search-input="' + newEvent.detail.searchInput + '"]'); // Exit if toggle button doesn't exist

      if (!toggleButton) {
        return;
      } // Exit if the search input isn't linked with the toggle


      if (searchInput.getAttribute('data-header-search-input') === '') {
        return;
      }

      if (searchInput.hasAttribute('hidden')) {
        this.open(toggleButton, searchInput);
      } else {
        this.close(toggleButton, searchInput);
      }
    }
  }, {
    key: "open",
    value: function open(toggleButton, searchInput) {
      toggleButton.setAttribute('aria-expanded', 'true');
      searchInput.removeAttribute('hidden');
    }
  }, {
    key: "close",
    value: function close(toggleButton, searchInput) {
      toggleButton.setAttribute('aria-expanded', 'false');
      searchInput.setAttribute('hidden', '');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('click', this._handleClick, false);
    }
  }, {
    key: "init",
    value: function init() {
      this.searchToggle.setAttribute('aria-expanded', 'false');
      this.searchInput.setAttribute('hidden', ''); // Add click handlers

      this.element.addEventListener('click', this._handleClick, false);
    }
  }]);

  return GlobalHeader;
}();

export { GlobalHeader };
