// TODO: Refactor this into something coherent
function init() {
  // console.log('All good to go!');
}

function toggle() {
  let currentElement = null;

  function handleClick(event) {
    const toggleTrigger = event.target.closest('[data-toggle]');
    if (!toggleTrigger) {
      if(currentElement) {
        const currentToggle = document.querySelector(`[data-toggle="${currentElement.id}"]`);
        hideElement(currentToggle, currentElement);
        return;
      }
      return;
    }
    
    const toggleId = toggleTrigger.dataset.toggle;
    const elementToToggle = document.getElementById(toggleId);
    // If the click happened inside the toggled element, bail.
    if (event.target.closest('#' + toggleId)) return;
    
    const isExpanded = toggleTrigger.getAttribute('aria-expanded');
    
    isExpanded == 'false' ?
      showElement(toggleTrigger, elementToToggle) :
      hideElement(toggleTrigger, elementToToggle);
  }
  
  function showElement(trigger, element) {
    trigger.setAttribute('aria-expanded', 'true');
    element.classList.add('rvt-display-block');
    currentElement = element;
    console.log(currentElement);
  }
  
  function hideElement(trigger, element) {
    trigger.setAttribute('aria-expanded', 'false');
    element.classList.remove('rvt-display-block');
    currentElement = null;
  }
  
  document.addEventListener('click', handleClick, false)
}

export default { init, toggle };