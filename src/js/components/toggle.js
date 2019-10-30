export default function toggle() {
  let currentElement = null;

  function handleClick(event) {
    const toggleTrigger = event.target.closest('[data-toggle]');
    // The click didn't happen on a toggle element
    if (!toggleTrigger) {
      /**
       * If there is a visible element and the click didn't happen inside
       * the visible element, hide the visible element, e.g. when the
       * user clicks away from either the toggle or the visible element.
       */
      if (currentElement && !event.target.closest('#' + currentElement)) {
        hideElement(currentElement);
      }
      // Other wise bail out and don't run the rest of the script.
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

    const isExpanded = toggleTrigger.getAttribute('aria-expanded');
    const toggleId = toggleTrigger.dataset.toggle;

    isExpanded == 'false' ? showElement(toggleId) : hideElement(toggleId);
  }

  function showElement(id) {
    const showTrigger = document.querySelector(`[data-toggle="${id}"]`);
    const showElement = document.getElementById(id);
    showTrigger.setAttribute('aria-expanded', 'true');
    showElement.classList.add('rvt-display-block');
    currentElement = id;
  }

  function hideElement(id) {
    const hideTrigger = document.querySelector(`[data-toggle="${id}"]`);
    const hideElement = document.getElementById(id);
    hideTrigger.setAttribute('aria-expanded', 'false');
    hideElement.classList.remove('rvt-display-block');
    currentElement = null;
  }

  document.addEventListener('click', handleClick, false);
}
