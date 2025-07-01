// Profile page specific event handlers

window.addEventListener('profile:js:unload', (e) => {
  // Perform cleanup, remove event listeners etc.
  console.log('Cleaning up profile JS', e.detail);
});