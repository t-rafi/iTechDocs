// global.js
fetch('partials/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('_header').innerHTML = data;
  })
  .catch(err => console.error('Error loading header:', err));

fetch('partials/sidebar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('_sidebar').innerHTML = data;
  })
  .catch(err => console.error('Error loading sidebar:', err));

fetch('partials/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('_footer').innerHTML = data;
  })
  .catch(err => console.error('Error loading footer:', err));

// Remove preload class after content is loaded

document.addEventListener('DOMContentLoaded', () => {

    Promise.all([
        fetch('partials/header.html').then(r => r.text()),
        fetch('partials/sidebar.html').then(r => r.text()),
        fetch('partials/footer.html').then(r => r.text())
    ]).then(([header, sidebar, footer]) => {

        document.getElementById('_header').innerHTML = header;
        document.getElementById('_sidebar').innerHTML = sidebar;
        document.getElementById('_footer').innerHTML = footer;

        setActiveMenu();

        // Enable animations AFTER render
        requestAnimationFrame(() => {
            document.body.classList.remove('preload');
        });
    });
});
