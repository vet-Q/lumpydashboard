const fs = require('fs'); // 파일 시스템 모듈을 불러옵니다.
const fetch = require('node-fetch'); // node-fetch 모듈을 불러옵니다.
const path = require('path'); // 경로 모듈을 불러옵니다.

// 데이터 파일 경로를 설정합니다.
const DATA_FILE_PATH = path.join(__dirname, '../public/data/news.json');
// 패스워드 파일 경로를 설정합니다.
const PASSWORD_FILE_PATH = path.join(__dirname, '../public/data/naverPassword.json');
// 기본 이미지 파일 경로를 설정합니다.
const DEFAULT_IMAGE_URL = "https://cdn.pixabay.com/photo/2023/01/26/13/58/cow-7746048_1280.jpg"

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

// HTML 태그를 제거하는 함수입니다.
function removeHtmlTags(str) {
    if (!str) return '';
    return str.replace(/<\/?[^>]+(>|$)/g, '');
}

// 네이버 기사 포맷을 변환하는 함수입니다.
function transformNaverArticles(articles) {
    return articles.map(article => ({
        source: {
            id: null,
            name: 'Naver News' // 소스 이름을 'Naver News'로 설정합니다.
        },
        author: null, // 작성자는 null로 설정합니다.
        title: removeHtmlTags(article.title), // 제목에서 HTML 태그를 제거합니다.
        description: removeHtmlTags(article.description), // 설명에서 HTML 태그를 제거합니다.
        url: article.link, // URL을 설정합니다.
        urlToImage: article.thumbnail ? article.thumbnail : DEFAULT_IMAGE_URL, // 이미지가 없는 경우 기본 이미지 사용
        publishedAt: new Date(article.pubDate).toISOString(), // 발행일을 ISO 형식으로 변환합니다.
        content: null // 콘텐츠는 null로 설정합니다.
    }));
}

// 네이버 뉴스 API를 호출하는 함수입니다.
async function searchNewsNaver(q) {
    const passwordData = loadPasswordData(); // 패스워드 데이터를 로드합니다.
    const clientId = passwordData.NAVER_CLIENT_ID; // 클라이언트 ID를 가져옵니다.
    const clientSecret = passwordData.NAVER_CLIENT_SECRET; // 클라이언트 시크릿을 가져옵니다.

    q = encodeURIComponent(q); // 쿼리를 URL 인코딩합니다.
    const response = await fetch(`https://openapi.naver.com/v1/search/news.json?query=${q}`, {
        headers: {
            'X-Naver-Client-Id': clientId, // 요청 헤더에 클라이언트 ID를 설정합니다.
            'X-Naver-Client-Secret': clientSecret // 요청 헤더에 클라이언트 시크릿을 설정합니다.
        }
    });

    // Too many requests 에러를 처리합니다.
    if (response.status === 429) {
        console.error(`Error fetching news: ${response.status} ${response.statusText}`);
        return []; // Too many requests인 경우 빈 배열을 반환합니다.
    }

    // 응답이 정상적이지 않은 경우 에러를 처리합니다.
    if (!response.ok) {
        console.error(`Error fetching news: ${response.status} ${response.statusText}`);
        return [];
    }

    const body = await response.json(); // 응답 본문을 JSON으로 파싱합니다.
    return transformNaverArticles(body.items || []); // 기사를 변환하여 반환합니다.
}

// 기존 데이터를 로드하는 함수입니다.
function loadExistingData() {
    // 데이터 파일이 존재하지 않는 경우 빈 데이터 구조를 반환합니다.
    if (!fs.existsSync(DATA_FILE_PATH)) {
        return { articles: [] };
    }
    const data = fs.readFileSync(DATA_FILE_PATH); // 파일 내용을 읽어옵니다.
    try {
        return JSON.parse(data); // 파일 내용을 JSON으로 파싱하여 반환합니다.
    } catch (error) {
        console.error('Error parsing JSON:', error); // JSON 파싱 중 에러가 발생하면 로그를 출력합니다.
        return { articles: [] }; // 에러가 발생한 경우 빈 데이터 구조를 반환합니다.
    }
}

// 데이터를 파일에 저장하는 함수입니다.
function saveData(data) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2)); // 데이터를 JSON 문자열로 변환하여 파일에 저장합니다.
}

// 뉴스를 업데이트하는 메인 함수입니다.
async function updateNewsData() {
    let newArticles = [];
    try {
        newArticles = await searchNewsNaver('럼피스킨'); // 네이버 뉴스 API를 호출하여 새로운 기사를 가져옵니다.
    } catch (error) {
        console.error('Error fetching new articles:', error); // API 호출 중 에러가 발생하면 로그를 출력합니다.
    }

    // 새로운 기사가 없는 경우 기존 데이터를 유지합니다.
    if (newArticles.length === 0) {
        console.log('No new articles fetched, keeping existing data.');
        return;
    }

    const existingData = loadExistingData(); // 기존 데이터를 로드합니다.

    // 기존 데이터 포맷이 잘못된 경우 에러를 처리합니다.
    if (!existingData.articles) {
        console.error('Invalid existing data format:', existingData);
        existingData.articles = [];
    }

    // 중복 기사를 제거합니다.
    const existingUrls = new Set(existingData.articles.map(article => article.url)); // 기존 기사 URL을 집합으로 만듭니다.
    const existingTitles = new Set(existingData.articles.map(article => article.title)); // 기존 기사 제목을 집합으로 만듭니다.
    const filteredNewArticles = newArticles.filter(article => !existingUrls.has(article.url) && !existingTitles.has(article.title)); // 새로운 기사 중 중복되지 않은 기사를 필터링합니다.

    const updatedData = { articles: [...filteredNewArticles, ...existingData.articles] }; // 기존 기사와 새로운 기사를 합칩니다.
    saveData(updatedData); // 업데이트된 데이터를 파일에 저장합니다.
    console.log('Data updated in news.json');
}

updateNewsData().catch(console.error); // 메인 함수를 실행하고 에러가 발생하면 로그를 출력합니다.