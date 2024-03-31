import axios from "axios";

async function fetchAndStoreBraveSearchResults() {
  try {
    const response = await axios.post('https://api.search.brave.com/res/v1/web/search', {
    params: {
        q: 'brave search'
    },
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': import.meta.env.BRAVE_SEARCH_API_KEY,
      }
    });

    // const searchData = response.data;

    console.log(response);

  } catch (error) {
    console.log(error)
    // console.error('Error fetching Brave search results:', error);
  }
}

export default fetchAndStoreBraveSearchResults;