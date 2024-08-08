const fs = require('fs');
const fetch = require('node-fetch');

const countryAbbreviations = {
    "Afghanistan": "AFG",
    "Angola": "AGO",
    "Albania": "ALB",
    "United Arab Emirates": "ARE",
    "Argentina": "ARG",
    "Armenia": "ARM",
    "Antarctica": "ATA",
    "French Southern Territories": "ATF",
    "Austria": "AUT",
    "Azerbaijan": "AZE",
    "Burundi": "BDI",
    "Egypt": "EGY",
    "Israel": "ISR",
    "Mozambique": "MOZ",
    "Mauritius": "MUS",
    "Mali": "MLI",
    "Guinea": "GIN",
    "Palestine": "PSE",
    "Iraq": "IRQ",
    "Thailand": "THA",
    "Malaysia": "MYS",
    "Russia": "RUS",
    "Türkiye": "TUR",
    "Greece": "GRC",
    "Serbia": "SRB",
    "North Macedonia": "MKD",
    "Korea (Rep. of)": "KOR",
    "Montenegro": "MNE",
    "Bulgaria": "BGR"
    // 필요한 모든 국가 추가...
};

const parseYear = (dateString) => {
    return new Date(dateString).getFullYear();
};

const parseDate = (dateString) => {
    return new Date(dateString);
};

const getContinent = (country) => {
    const continentMapping = {
        "Africa": ["EGY", "AGO", "MOZ", "MUS", "MLI", "GIN", "NAM", "BDI", "DJI", "LBY"],
        "Asia": ["ISR", "PSE", "IRQ", "THA", "MYS", "ARE", "ARM", "AZE", "KAZ", "CHN", "BGD", "IND", "TWN", "NPL", "BTN", "VNM", "MMR", "HKG", "LKA", "KOR", "LAO", "IDN", "PAK", "SGP", "AFG"],
        "Europe": ["RUS", "TUR", "GRC", "SRB", "MKD", "MNE", "BGR", "ALB"]
    };

    for (const [continent, countries] of Object.entries(continentMapping)) {
        if (countries.includes(countryAbbreviations[country])) {
            return continent;
        }
    }
    return null;
};

const prepareSummaryData = (data) => {
    // 국가의 집합을 저장하기 위한 Set
    const countriesSet = new Set();
    // 총 발생 건수를 저장할 변수
    let totalOutbreaks = 0;
    // 어제까지의 총 발생 건수를 저장할 변수
    let totalOutbreaksYesterday = 0;
    // 오늘까지의 총 발생 건수를 저장할 변수
    let totalOutbreaksToday = 0;

    // 오늘 날짜를 구하고, 시간을 자정으로 설정
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 자정으로 설정하여 날짜 비교 용이

    // 어제 날짜를 구하고, 시간을 자정으로 설정
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // 하루 전 날짜로 설정

    // 데이터의 각 피처를 순회
    data.features.forEach(feature => {
        // 피처에서 국가 이름을 가져옴
        const country = feature.properties.country;
        // 피처에서 날짜를 파싱하여 Date 객체로 변환
        const date = parseDate(feature.properties.date);

        // 국가를 Set에 추가 (중복 방지)
        countriesSet.add(country);
        // 총 발생 건수를 증가
        totalOutbreaks++;

        // 날짜가 어제 자정 이전이면 어제까지의 총 발생 건수를 증가
        if (date <= yesterday) {
            totalOutbreaksYesterday++;
        }
        // 날짜가 오늘 자정 이전이면 오늘까지의 총 발생 건수를 증가
        if (date <= today) {
            totalOutbreaksToday++;
        }
    });

    // 어제와 오늘의 총 발생 건수의 차이를 계산
    const increaseFromYesterday = totalOutbreaksToday - totalOutbreaksYesterday;

    // 요약 데이터를 반환
    return {
        countries: countriesSet.size, // 중복되지 않는 국가의 수
        totalOutbreaks, // 총 발생 건수
        increaseFromYesterday, // 어제와 오늘의 발생 건수 차이
        totalOutbreaksYesterday, // 어제까지의 총 발생 건수
        totalOutbreaksToday // 오늘까지의 총 발생 건수
    };
};



const dataPreparation = (data) => {
    const countryCounts = {};
    const lineChartData = {};
    const bumpChartData = {};
    const barChartData = {};
    const summaryData = prepareSummaryData(data);

    if (data.features) {
        data.features.forEach(feature => {
            const country = feature.properties.country;
            const year = parseYear(feature.properties.date);

            if (!countryCounts[country]) {
                countryCounts[country] = 0;
            }
            countryCounts[country]++;

            if (!lineChartData[country]) {
                lineChartData[country] = {};
            }

            if (!lineChartData[country][year]) {
                lineChartData[country][year] = 0;
            }

            lineChartData[country][year]++;

            const continent = getContinent(country);
            if (!barChartData[year]) {
                barChartData[year] = { year: year, Africa: 0, Asia: 0, Europe: 0 };
            }
            if (continent) {
                barChartData[year][continent]++;
            }
        });
    }

    const topCountries = Object.keys(countryCounts)
        .sort((a, b) => countryCounts[b] - countryCounts[a])
        .slice(0, 12);

    const allYears = Array.from(new Set(data.features.map(f => parseYear(f.properties.date)))).sort();

    topCountries.forEach(country => {
        allYears.forEach(year => {
            if (!lineChartData[country][year]) {
                lineChartData[country][year] = 0;
            }
        });
    });

    const lineChartDataTransformed = topCountries.map(country => ({
        id: country,
        data: allYears.map(year => ({
            x: year.toString(),
            y: lineChartData[country][year] || 0
        }))
    }));

    const yearCountryCounts = {};

    allYears.forEach(year => {
        yearCountryCounts[year] = {};
        topCountries.forEach(country => {
            yearCountryCounts[year][country] = 0;
        });
    });

    if (data.features) {
        data.features.forEach(feature => {
            const year = parseYear(feature.properties.date);
            const country = feature.properties.country;
            if (topCountries.includes(country)) {
                yearCountryCounts[year][country]++;
            }
        });
    }

    const bumpChartDataTransformed = topCountries.map(country => ({
        id: country,
        data: allYears.map(year => {
            const yearData = yearCountryCounts[year];
            const sortedCountries = Object.keys(yearData)
                .sort((a, b) => yearData[b] - yearData[a])
                .map((c, index) => ({ id: c, rank: index + 1 }));

            const countryRank = sortedCountries.find(sc => sc.id === country);
            return {
                x: year.toString(),
                y: countryRank ? countryRank.rank : 0
            };
        })
    }));

    const choroplethDataTransformed = topCountries.map(country => ({
        id: countryAbbreviations[country] || country,
        value: countryCounts[country] || 0
    }));

    const barChartDataTransformed = Object.keys(barChartData).map(year => ({
        year: year,
        Africa: barChartData[year].Africa,
        Asia: barChartData[year].Asia,
        Europe: barChartData[year].Europe
    }));

    return {
        summaryData,
        lineChartData: lineChartDataTransformed,
        bumpChartData: bumpChartDataTransformed,
        choroplethData: choroplethDataTransformed,
        barChartData: barChartDataTransformed
    };
};

const fetchDataAndSave = async () => {
    try {
        const response = await fetch('https://animal-diseases.efsa.europa.eu/LSDV/data.js');
        const text = await response.text();

        const match = text.match(/data1\s*=\s*(\{[\s\S]*?\})\s*data1_semester/);
        if (!match) {
            throw new Error('Failed to extract JSON data from response');
        }

        const jsonString = match[1];
        const data = JSON.parse(jsonString);

        let previousData = {};
        if (fs.existsSync('previousData.json')) {
            previousData = JSON.parse(fs.readFileSync('previousData.json', 'utf-8'));
        }

        const lastFeatureId = data.features[data.features.length - 1].id;
        const lastFeatureIdPrev = previousData.features ? previousData.features[previousData.features.length - 1].id : null;

        if (lastFeatureId !== lastFeatureIdPrev) {
            const preparedData = dataPreparation(data);

            const dataString = `export const preparedData = ${JSON.stringify(preparedData, null, 2)};`;
            fs.writeFileSync('preparedData.js', dataString);

            fs.writeFileSync('previousData.json', JSON.stringify(data, null, 2));

            console.log('Data has been saved to preparedData.js');
        } else {
            console.log('No new data to update.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchDataAndSave();




