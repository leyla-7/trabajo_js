document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#news-list');
  if (!container) return;

  loadNewsJSON('./data/news.json', container).catch(() => {
    const err = document.querySelector('#news-error');
    if (err) err.classList.remove('visually-hidden');
    container.innerHTML = '<p>No hay noticias disponibles ahora mismo.</p>';
  });
});

async function loadNewsJSON(path, container) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const items = await res.json();

  items.sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = items.map(toNewsCard).join('');
}

function toNewsCard(item) {
  const dateStr = formatDate(item.date);
  return `
    <article class="news-card">
      <h3><a href="${item.url}" target="_blank" rel="noopener">${escapeHTML(item.title)}</a></h3>
      <time datetime="${item.date}">${dateStr}</time>
      <p>${escapeHTML(item.excerpt)}</p>
    </article>
  `;
}

function formatDate(iso) {
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
}

function escapeHTML(str = '') {
  return str.replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
