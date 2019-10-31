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

function _getElements(id) {
  return {
    trigger: document.querySelector(`[data-toggle="${id}"]`),
    elementToToggle: document.getElementById(id)
  }
}

function showElement(id) {
  const showElements = _getElements(id);
  
  const showEvent = new CustomEvent('rvt:toggleShow', {
    bubbles: true,
    cancelable: true,
    detail: {
      elementId: showElements.elementToToggle.id
    }
  });

  /**
   * If preventDefault is used while listening to this custom event
   * it element.dispatchEvent will return false. This makes these
   * custom events able to be caught and canceld by developers
   * based on some condition of their choosing.
   */
  let eventShouldFire = showElements.elementToToggle.dispatchEvent(showEvent);
  if (!eventShouldFire) return;

  showElements.trigger.setAttribute('aria-expanded', 'true');
  showElements.elementToToggle.classList.add('rvt-display-block');
  currentElement = id;
}

function hideElement(id) {
  const hideElements = _getElements(id);
  
  const hideEvent = new CustomEvent('rvt:toggleHide', {
    bubbles: true,
    cancelable: true,
    detail: {
      elementId: hideElements.elementToToggle.id
    }
  });

  let eventShouldFire = hideElements.elementToToggle.dispatchEvent(hideEvent);
  if (!eventShouldFire) return;
  
  hideElements.trigger.setAttribute('aria-expanded', 'false');
  hideElements.elementToToggle.classList.remove('rvt-display-block');
  currentElement = null;
}

function init() {
  document.addEventListener('click', handleClick, false);
}

function destroy() {
  document.removeEventListener('click', handleClick, false);
}

export default { init, destroy, showElement, hideElement }