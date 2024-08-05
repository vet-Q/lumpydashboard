const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '../public/data/news.json');

async function searchNews(q) {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const fromDate = formatDate(oneMonthAgo);
    const toDate = formatDate(today);

    q = encodeURIComponent(q);
    const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=`);

    if (response.status === 429) {
        console.error(`Error fetching news: ${response.status} ${response.statusText}`);
        return []; // Too many requests, return an empty array
    }

    if (!response.ok) {
        console.error(`Error fetching news: ${response.status} ${response.statusText}`);
        return [];
    }

    const body = await response.json();
    return body.articles || [];
}

function loadExistingData() {
    if (!fs.existsSync(DATA_FILE_PATH)) {
        return { articles: [] };
    }
    const data = fs.readFileSync(DATA_FILE_PATH);
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return { articles: [] };
    }
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}

async function updateNewsData() {
    let newArticles = [];
    try {
        newArticles = await searchNews('lumpy skin disease');
    } catch (error) {
        console.error('Error fetching new articles:', error);
    }

    if (newArticles.length === 0) {
        console.log('No new articles fetched, keeping existing data.');
        return;
    }

    const existingData = loadExistingData();

    if (!existingData.articles) {
        console.error('Invalid existing data format:', existingData);
        existingData.articles = [];
    }

    // 중복 제거
    const existingUrls = new Set(existingData.articles.map(article => article.url));
    const filteredNewArticles = newArticles.filter(article => !existingUrls.has(article.url));

    const updatedData = { articles: [...existingData.articles, ...filteredNewArticles] };
    saveData(updatedData);
    console.log('Data updated in news.json');
}

updateNewsData().catch(console.error);
