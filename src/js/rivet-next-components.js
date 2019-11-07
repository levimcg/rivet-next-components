/**
 * NOTE: These polyfills are included by default in Rivet's JS file
 * (rivet.js). But if the toggle element needs used on it's own for
 * any reason, uncomment the two lines below and rebuild file.
 */

// import './polyfills/closest';
// import './polyfills/CustomEvent.js';
import toggle from './components/toggle';
import sidenav from './components/sidenav';

export default { toggle, sidenav };