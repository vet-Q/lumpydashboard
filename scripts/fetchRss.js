const fs = require('fs');
const RSSParser = require('rss-parser');
const path = require("path");
const parser = new RSSParser();

const rssURL = 'https://www.gov.uk/search/all.atom?keywords=lumpy+skin+disease&' +
    'evel_one_taxon=3cf97f69-84de-41ae-bc7b-7e2cc238fa58&' +
    'level_two_taxon=695dc6f2-27cc-4d8b-adc4-8d07c2bff748&order=relevance'


const filePath = path.join(__dirname, '../public/data/rss_data.json');

async function fetchRSS() {
    try {
        const feed = await parser.parseURL(rssURL);
        console.log("feed:", feed);

        const entries = feed.items.map(item => ({
            id: item.id,
            title: item.title,
            link: item.link,
            updated: item.isoDate.split('T')[0], // 날짜 부분만 저장
        }));

        // 기존 데이터 읽기
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            if (jsonData) {
                existingData = JSON.parse(jsonData);
                // existingData가 배열인지 확인
                if (!Array.isArray(existingData)) {
                    existingData = [];
                }
            }
        }

        // 중복 제거
        const newEntries = entries.filter(entry => !existingData.some(data => data.id === entry.id));

        // 새로운 데이터 추가
        const updatedData = [...existingData, ...newEntries];

        // JSON 형태로 저장
        const jsonData = JSON.stringify(updatedData, null, 2);
        fs.writeFileSync(filePath, jsonData);
        console.log('RSS data saved to rss_data.json');
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
    }
}

module.exports = fetchRSS;

// 스크립트를 실행하여 RSS 데이터를 가져오고 저장
fetchRSS();
