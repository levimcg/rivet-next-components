// TODO: Refactor this into something coherent
function init() {
  console.log('All good to go!');
}

function toggle() {
  function handleClick() {
    const toggleTrigger = event.target.closest('[data-toggle]');
    if (!toggleTrigger) return;
    
    const toggleId = toggleTrigger.dataset.toggle;
    const elementToToggle = document.getElementById(toggleId);
    
    if (toggleTrigger.getAttribute('aria-expanded') == 'false') {
      toggleTrigger.setAttribute('aria-expanded', 'true');
      elementToToggle.classList.add('rvt-display-block');
    } else {
      toggleTrigger.setAttribute('aria-expanded', 'false');
      elementToToggle.classList.remove('rvt-display-block')
    }
  }
  
  document.addEventListener('click', handleClick, false)
}

export default { init, toggle };