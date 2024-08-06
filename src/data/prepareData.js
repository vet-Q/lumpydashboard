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

// Helper function to parse the year from a date string
const parseYear = (dateString) => {
    return new Date(dateString).getFullYear();
};

// Helper function to get continent
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

// Function to prepare data for different Nivo charts
const dataPreparation = (data) => {
    const countryCounts = {};
    const lineChartData = {};
    const bumpChartData = {};
    const barChartData = {};

    // Step 1: Count occurrences for each country and initialize lineChartData structure
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

            // Initialize barChartData structure
            const continent = getContinent(country);
            if (!barChartData[year]) {
                barChartData[year] = { year: year, Africa: 0, Asia: 0, Europe: 0 };
            }
            if (continent) {
                barChartData[year][continent]++;
            }
        });
    }

    // Step 2: Find the top 12 countries
    const topCountries = Object.keys(countryCounts)
        .sort((a, b) => countryCounts[b] - countryCounts[a])
        .slice(0, 12);

    // Step 3: Get all years and fill missing years with 0
    const allYears = Array.from(new Set(data.features.map(f => parseYear(f.properties.date)))).sort();

    topCountries.forEach(country => {
        allYears.forEach(year => {
            if (!lineChartData[country][year]) {
                lineChartData[country][year] = 0;
            }
        });
    });

    // Transform data into Nivo Line chart format
    const lineChartDataTransformed = topCountries.map(country => ({
        id: country,
        data: allYears.map(year => ({
            x: year.toString(),
            y: lineChartData[country][year] || 0
        }))
    }));

    // Step 4: Prepare data for Bump chart
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

    // Step 5: Prepare data for Choropleth chart
    const choroplethDataTransformed = topCountries.map(country => ({
        id: countryAbbreviations[country] || country,
        value: countryCounts[country] || 0
    }));

    // Transform data into Nivo Bar chart format
    const barChartDataTransformed = Object.keys(barChartData).map(year => ({
        year: year,
        Africa: barChartData[year].Africa,
        Asia: barChartData[year].Asia,
        Europe: barChartData[year].Europe
    }));

    // Combine all data into one object
    return {
        lineChartData: lineChartDataTransformed,
        bumpChartData: bumpChartDataTransformed,
        choroplethData: choroplethDataTransformed,
        barChartData: barChartDataTransformed
    };
};

// Function to fetch data and save if there are new changes
const fetchDataAndSave = async () => {
    try {
        // Fetch the data from the provided URL
        const response = await fetch('https://animal-diseases.efsa.europa.eu/LSDV/data.js');
        const text = await response.text();

        // Extract the JSON part from the response using regular expression
        const match = text.match(/data1\s*=\s*(\{[\s\S]*?\})\s*data1_semester/);
        if (!match) {
            throw new Error('Failed to extract JSON data from response');
        }

        // Parse the extracted JSON string
        const jsonString = match[1];
        const data = JSON.parse(jsonString);

        // Load previous data to compare changes
        let previousData = {};
        if (fs.existsSync('previousData.json')) {
            previousData = JSON.parse(fs.readFileSync('previousData.json', 'utf-8'));
        }

        // Get the ID of the last feature in the current data
        const lastFeatureId = data.features[data.features.length - 1].id;
        const lastFeatureIdPrev = previousData.features ? previousData.features[previousData.features.length - 1].id : null;

        // If the last ID has changed, process and save the new data
        if (lastFeatureId !== lastFeatureIdPrev) {
            const preparedData = dataPreparation(data);

            // Save the prepared data for Nivo charts
            const dataString = `export const preparedData = ${JSON.stringify(preparedData, null, 2)};`;
            fs.writeFileSync('preparedData.js', dataString);

            // Save the current data as the previous data for future comparison
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
