// api.js
// Gọi API lấy dữ liệu cho trang xe

// Lấy tin tức về xe từ nhiều nguồn khác nhau
async function fetchCarNews() {
    const newsapiKey = 'YOUR_NEWSAPI_KEY'; // Thay bằng API key của bạn
    const bingKey = 'YOUR_BING_KEY'; // Nếu dùng Bing News Search
    let allArticles = [];

    // NewsAPI
    try {
        const url = `https://newsapi.org/v2/everything?q=car OR ô tô OR xe hơi&language=vi&pageSize=5&sortBy=publishedAt&apiKey=${newsapiKey}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            allArticles = allArticles.concat(data.articles);
        }
    } catch (e) { console.error('NewsAPI error', e); }

    // Bing News Search (nếu có key)
    try {
        if (bingKey !== 'YOUR_BING_KEY') {
            const bingUrl = `https://api.bing.microsoft.com/v7.0/news/search?q=car OR ô tô OR xe hơi&count=5&mkt=vi-VN`;
            const response = await fetch(bingUrl, { headers: { 'Ocp-Apim-Subscription-Key': bingKey } });
            if (response.ok) {
                const data = await response.json();
                if (data.value) {
                    allArticles = allArticles.concat(data.value.map(item => ({
                        title: item.name,
                        url: item.url,
                        description: item.description,
                        publishedAt: item.datePublished
                    })));
                }
            }
        }
    } catch (e) { console.error('Bing News error', e); }

    // Demo: Lấy từ RSS (ví dụ VnExpress)
    // Chỉ demo, thực tế cần backend proxy do CORS
    try {
        const url = 'https://api.rss2json.com/v1/api.json?rss_url=https://vnexpress.net/rss/oto-xe-may.rss';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Không lấy được tin VnExpress');
        const data = await response.json();
        return data.items.map(item => ({
            title: item.title,
            url: item.link,
            description: item.description,
            publishedAt: item.pubDate
        }));
    } catch (error) {
        console.error(error);
        return [];
    }

    // Loại bỏ trùng lặp theo url
    const unique = {};
    allArticles.forEach(a => { if (a.url) unique[a.url] = a; });
    return Object.values(unique);
}