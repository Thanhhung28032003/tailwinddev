// api.js - Tin tức smart home từ VnExpress RSS
async function fetchCarNews() {
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=https://vnexpress.net/rss/so-hoa.rss';
    try {
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
}
