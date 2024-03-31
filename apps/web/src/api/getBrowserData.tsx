import axios from "axios";

const SearchLinks = async (question: string) => {

  const key = import.meta.env.VITE_GOOGLE_SEARCH_API_KEY;
  const browserEngineId = import.meta.env.VITE_BROWSER_ENGINE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${browserEngineId}&q=${question}`;

  try{
    const response = await axios.get(url)
    return response.data.items
  } catch (error) {
    console.log(error);
  }
}

export default SearchLinks;