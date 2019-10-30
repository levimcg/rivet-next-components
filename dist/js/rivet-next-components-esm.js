function toggle() {
  var currentElement = null;

  function handleClick(event) {
    var toggleTrigger = event.target.closest('[data-toggle]'); // The click didn't happen on a toggle element

    if (!toggleTrigger) {
      /**
       * If there is a visible element and the click didn't happen inside
       * the visible element, hide the visible element, e.g. when the
       * user clicks away from either the toggle or the visible element.
       */
      if (currentElement && !event.target.closest('#' + currentElement)) {
        hideElement(currentElement);
      } // Other wise bail out and don't run the rest of the script.


      return;
    }
    /**
     * Now we know the click was on a toggle. If the click wasn't on
     * the currently visible toggle e.g. it was on another toggle,
     * hide the currently visible element.
     */


    if (currentElement && toggleTrigger.dataset.toggle !== currentElement) {
      hideElement(currentElement);
    }

    var isExpanded = toggleTrigger.getAttribute('aria-expanded');
    var toggleId = toggleTrigger.dataset.toggle;
    isExpanded == 'false' ? showElement(toggleId) : hideElement(toggleId);
  }

  function showElement(id) {
    var showTrigger = document.querySelector("[data-toggle=\"".concat(id, "\"]"));
    var showElement = document.getElementById(id);
    showTrigger.setAttribute('aria-expanded', 'true');
    showElement.classList.add('rvt-display-block');
    currentElement = id;
  }

  function hideElement(id) {
    var hideTrigger = document.querySelector("[data-toggle=\"".concat(id, "\"]"));
    var hideElement = document.getElementById(id);
    hideTrigger.setAttribute('aria-expanded', 'false');
    hideElement.classList.remove('rvt-display-block');
    currentElement = null;
  }

  document.addEventListener('click', handleClick, false);
}

var rivetNextComponents = {
  toggle: toggle
};

export default rivetNextComponents;
