/*!
* rivet-next-components - @version 0.0.1

* Copyright (C) 2018 The Trustees of Indiana University
* SPDX-License-Identifier: BSD-3-Clause
*/

var RivetNext = (function () {
  'use strict';

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

  function _getElements(id) {
    return {
      trigger: document.querySelector("[data-toggle=\"".concat(id, "\"]")),
      elementToToggle: document.getElementById(id)
    };
  }

  function showElement(id) {
    var showElements = _getElements(id);

    var showEvent = new CustomEvent('rvt:toggleShow', {
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

    var eventShouldFire = showElements.elementToToggle.dispatchEvent(showEvent);
    if (!eventShouldFire) return;
    showElements.trigger.setAttribute('aria-expanded', 'true');
    showElements.elementToToggle.classList.add('rvt-display-block');
    currentElement = id;
  }

  function hideElement(id) {
    var hideElements = _getElements(id);

    var hideEvent = new CustomEvent('rvt:toggleHide', {
      bubbles: true,
      cancelable: true,
      detail: {
        elementId: hideElements.elementToToggle.id
      }
    });
    var eventShouldFire = hideElements.elementToToggle.dispatchEvent(hideEvent);
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

  var toggle = {
    init: init,
    destroy: destroy,
    showElement: showElement,
    hideElement: hideElement
  };

  /**
   * NOTE: These polyfills are included by default in Rivet's JS file
   * (rivet.js). But if the toggle element needs used on it's own for
   * any reason, uncomment the two lines below and rebuild file.
   */
  var rivetNextComponents = {
    toggle: toggle
  };

  return rivetNextComponents;

}());
