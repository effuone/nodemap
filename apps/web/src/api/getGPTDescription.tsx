// Define the function to send a request to the GPT API
async function getGPTDescription(promptText: string) {

    const updTitle = "Generate short description for this topic: " + promptText;
    
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",     
            // message: updTitle,
            "messages": [
                {
                  "role": "system",
                  "content": "You are a helpful assistant."
                },
                {
                  "role": "user",
                  "content": updTitle
                }
              ],
            max_tokens: 200,
            temperature: 0.7 
        })
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        const responseData = await response.json();

        if (response.ok) {
            console.log('GPT API Response:', responseData);
            return responseData;
        } else {
            console.error('GPT API Error:', responseData);
            return null;
        }
    } catch (error) {
        console.error('Request Failed:', error);
        return null;
    }
}

export default getGPTDescription;

// // Example usage
// const promptText = 'Write a short story about a robot learning to paint.';
// sendGptRequest(promptText).then((response) => {
//     if (response) {
//         console.log('Generated text:', response.choices[0].text);
//     }
// });
