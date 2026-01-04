const basePath = window.location.pathname.includes('/modules/') ? '../' : '';

// global.js
fetch(basePath + 'partials/header.html')
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
async function fetchWithFallback(primary, fallback) {
  try {
    const res = await fetch(primary);
    if (!res.ok) throw new Error('Primary failed');
    return await res.text();
  } catch {
    const res = await fetch(fallback);
    if (!res.ok) throw new Error('Fallback failed');
    return await res.text();
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const [header, sidebar, footer] = await Promise.all([
      fetchWithFallback('../partials/header.html', 'partials/header.html'),
      fetchWithFallback('../partials/sidebar.html', 'partials/sidebar.html'),
      fetchWithFallback('../partials/footer.html', 'partials/footer.html')
    ]);

    document.getElementById('_header').innerHTML = header;
    document.getElementById('_sidebar').innerHTML = sidebar;
    document.getElementById('_footer').innerHTML = footer;

    if (typeof setActiveMenu === 'function') {
      setActiveMenu();
    }

    requestAnimationFrame(() => {
      document.body.classList.remove('preload');
    });
  } catch (err) {
    console.error('Partial load failed:', err);
  }
});


// for expand documentation
document.addEventListener('click', function (e) {

    const toggle = e.target.closest('.sidebar-toggle');
    if (!toggle) return;

    const targetId = toggle.getAttribute('data-target');
    const target = document.getElementById(targetId);
    const icon = toggle.querySelector('.toggle-icon');

    if (!target) return;

    if (target.classList.contains('d-none')) {
        target.classList.remove('d-none');
        icon.textContent = '−';
    } else {
        target.classList.add('d-none');
        icon.textContent = '+';
    }
});
// report.js

