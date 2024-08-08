const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '../public/data/news.json');

const PASSWORD_FILE_PATH = path.join(__dirname, '../public/data/naverPassword.json');
// 기본 이미지 파일 경로를 설정합니다.

// 패스워드 데이터를 로드하는 함수입니다.
function loadPasswordData() {
    if (!fs.existsSync(PASSWORD_FILE_PATH)) {
        throw new Error('Password file not found'); // 파일이 없으면 에러를 던집니다.
    }
    const data = fs.readFileSync(PASSWORD_FILE_PATH); // 파일 내용을 읽어옵니다.
    try {
        return JSON.parse(data); // 파일 내용을 JSON으로 파싱하여 반환합니다.
    } catch (error) {
        console.error('Error parsing password JSON:', error); // JSON 파싱 중 에러가 발생하면 로그를 출력합니다.
        throw error; // 에러를 던집니다.
    }
}

async function searchNews(q) {

    const passwordData = loadPasswordData(); // 패스워드 데이터를 로드합니다.
    const clientSecret = passwordData.NewsAPI; // 클라이언트 시크릿을 가져옵니다.

    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const fromDate = formatDate(oneMonthAgo);
    const toDate = formatDate(today);

    q = encodeURIComponent(q);
    const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=${clientSecret}`);

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

    const updatedData = { articles: [...filteredNewArticles, ...existingData.articles, ] };
    saveData(updatedData);
    console.log('Data updated in news.json');
}

updateNewsData().catch(console.error);
