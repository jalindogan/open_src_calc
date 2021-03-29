/**
 * Top level implementation and integration
 */

import actionHandler from './handler';

/* Add handler to calculator action buttons */
document.getElementById('add-btn')?.addEventListener("click", actionHandler);
document.getElementById('subtract-btn')?.addEventListener("click", actionHandler);
document.getElementById('mod-2-btn')?.addEventListener("click", actionHandler);