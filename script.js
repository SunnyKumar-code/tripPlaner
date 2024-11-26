// let destination = document.getElementById('destination');
// let startDate= document.getElementById('startDate');
// let endDate= document.getElementById('endDate');
// let url = document.getElementById('url');
// let key = "AIzaSyBwGduU78I5Lwlqd1GUWULaW-f72o68njY";



let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDiiPQO9WgRDTrpqst0EeQxLQfV7KdrF6A";
const prompt = "hi";
const API_KEY = "AIzaSyDiiPQO9WgRDTrpqst0EeQxLQfV7KdrF6A"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function generateStory() {
  try {
    // Make the POST request
    let response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,  // Send the prompt in the body
      }),
    });

    // Check if response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse the response data
    let data = await response.json();

    // Check and log the response (assuming the text is under `choices[0].text`)
    if (data && data.choices && data.choices[0]) {
      console.log('Generated content:', data.choices[0].text);
    } else {
      console.log('No content generated:', data);
    }

  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Call the function to generate content
generateStory();
