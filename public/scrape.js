const axios = require('axios');  // For making requests
const cheerio = require('cheerio');  // For parsing HTML

// This function will get case titles and their brief descriptions
async function scrapeIndianKanoon() {
  const url = 'https://indiankanoon.org/search/?formInput=domestic+violence';

  try {
    // Make a request to the Indian Kanoon search page
    const { data } = await axios.get(url);
    
    // Use Cheerio to load and parse the HTML
    const $ = cheerio.load(data);

    // Create an array to store the case details
    const caseDetails = [];

    // Loop through each case in the search results and grab the title and description
    $('h2.case-title').each((index, element) => {
      const caseTitle = $(element).text().trim();
      const caseDescription = $(element).next('p.case-summary').text().trim();  // assuming description is right after title
      
      // Push the case details to the array
      caseDetails.push({ title: caseTitle, description: caseDescription });
    });

    // Log the case details to the console
    console.log(caseDetails);
  } catch (error) {
    console.error('Error scraping the data:', error);
  }
}

// Run the function to scrape the cases
scrapeIndianKanoon();
