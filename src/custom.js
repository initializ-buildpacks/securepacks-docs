// custom.js

document.addEventListener("DOMContentLoaded", function() {
    const tab2 = document.querySelector('input[type="radio"][value="tab2"]');
    const dialog = document.getElementById('dialog');
    
    tab2.addEventListener('click', function() {
      // Show the dialog when Tab 2 is clicked
      dialog.style.display = 'block';
    });
  });
  