// main.js
// JavaScript chính cho trang xe
const newsapiKey = 'eb1999c64e30481c811edb625080c49c';
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    if (typeof fetchCarNews === 'function') {
        const newsContainer = document.getElementById('car-news');
        if (newsContainer) {
            fetchCarNews().then(newsList => {
                if (newsList && newsList.length > 0) {
                    newsContainer.innerHTML = newsList.map(article => `
                        <div class="mb-6 p-4 bg-white rounded-xl shadow text-left">
                            <a href="${article.url}" target="_blank" class="font-bold text-blue-600 text-lg hover:underline">${article.title}</a>
                            <p class="text-gray-500 text-xs mb-2">${article.publishedAt ? article.publishedAt.slice(0,10) : ''}</p>
                            <p class="text-gray-700">${article.description ? article.description.slice(0, 120) + (article.description.length > 120 ? '...' : '') : ''}</p>
                        </div>
                    `).join('');
                } else {
                    newsContainer.innerHTML = '<div class="text-gray-400 italic">Không có tin tức mới.</div>';
                }
            });
        }
    }
    if (typeof fetchCarNews === 'function') {
        const newsContainer = document.getElementById('car-news');
        if (newsContainer) {
            fetchCarNews().then(newsList => {
                if (newsList && newsList.length > 0) {
                    newsContainer.innerHTML = newsList.map(article => `
                        <div class="mb-6 p-4 bg-white rounded-xl shadow text-left">
                            <a href="${article.url}" target="_blank" class="font-bold text-blue-600 text-lg hover:underline">${article.title}</a>
                            <p class="text-gray-500 text-xs mb-2">${article.publishedAt ? article.publishedAt.slice(0,10) : ''}</p>
                            <p class="text-gray-700">${article.description ? article.description.slice(0, 120) + (article.description.length > 120 ? '...' : '') : ''}</p>
                        </div>
                    `).join('');
                } else {
                    newsContainer.innerHTML = '<div class="text-gray-400 italic">Không có tin tức mới.</div>';
                }
            });
        }
    }
});