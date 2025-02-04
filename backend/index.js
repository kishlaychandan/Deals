const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

// Helper function to extract and compute discount
const calculateDiscount = (originalPrice, currentPrice) => {
    const originalPriceNumber = parseInt(originalPrice.replace(/\D/g, ''), 10);
    const currentPriceNumber = parseInt(currentPrice.replace(/\D/g, ''), 10);
    return `${Math.round(100 * (originalPriceNumber - currentPriceNumber) / originalPriceNumber)}% OFF`;
};

// Fetch deals function for Hour Deals, Hot Deals, and Real-Time Deals
const fetchDeals = async (url, selectors) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const deals = [];

        $(selectors.parentSelector).each((i, el) => {
            const image = $(el).find(selectors.imageSelector).attr(selectors.imageAttr);
            const description = $(el).find(selectors.descriptionSelector).text().trim();
            const timeInfo = $(el).find(selectors.timeInfoSelector).text().trim();
            const currentPrice = $(el).find(selectors.currentPriceSelector).text().trim();
            const originalPrice = $(el).find(selectors.originalPriceSelector).text().trim();
            const shopLogo = $(el).find(selectors.shopLogoSelector).attr(selectors.shopLogoAttr) || 'N/A';
            const link = $(el).find(selectors.linkSelector).attr('href');

            const discount = calculateDiscount(originalPrice, currentPrice);

            deals.push({
                imageUrl: image || 'https://via.placeholder.com/150',
                description: description || 'No Description',
                timeInfo: timeInfo || 'No Time Info',
                currentPrice: currentPrice || 'N/A',
                originalPrice: originalPrice || 'N/A',
                shopLogo: shopLogo,
                dealUrl: link || '#',
                discount: discount
            });
        });

        return deals;
    } catch (error) {
        console.error(`Error fetching deals from ${url}:`, error.message);
        return [];
    }
};

// Endpoint for Hour Deals
app.get('/hour-deals', async (req, res) => {
    try {
        const { data } = await axios.get('https://indiadesire.com/lootdeals');
        const $ = cheerio.load(data);
        
        const deals = [];
        const imageLinks = $('.lazyload');
        const descriptions = $('.anchor');
        const timeInfo = $('.timeinfo');
        const currentPrices = $('.cprice');
        const originalPrices = $('.oprice');
        const links = $('.myButton');

        imageLinks.each((i, el) => {
            const deal = {
                imageUrl: $(el).attr('data-src'),
                description: $(descriptions[i]).text(),
                timeInfo: $(timeInfo[i]).text(),
                currentPrice: $(currentPrices[i]).text(),
                originalPrice: $(originalPrices[i]).text(),
                dealUrl: $(links[i]).attr('href')
            };
            deals.push(deal);
        });

        res.json(deals);
    } catch (error) {
        console.error('Error fetching deals:', error);
        res.status(500).send('Error fetching deals');
    }
});

app.get('/hot-deals', async (req, res) => {
    try {
        const { data } = await axios.get('https://indiadesire.com/lootdeals');
        const $ = cheerio.load(data);
        
        const deals = [];
        const imageLinks = $('.lazyload');
        const descriptions = $('.anchor');
        const timeInfo = $('.timeinfo');
        const currentPrices = $('.cprice');
        const originalPrices = $('.oprice');
        const links = $('.myButton');

        imageLinks.each((i, el) => {
            const deal = {
                imageUrl: $(el).attr('data-src'),
                description: $(descriptions[i]).text(),
                timeInfo: $(timeInfo[i]).text(),
                currentPrice: $(currentPrices[i]).text(),
                originalPrice: $(originalPrices[i]).text(),
                dealUrl: $(links[i]).attr('href')
            };
            deals.push(deal);
        });

        res.json(deals);
    } catch (error) {
        console.error('Error fetching deals:', error);
        res.status(500).send('Error fetching deals');
    }
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
