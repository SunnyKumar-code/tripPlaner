import { GoogleGenerativeAI } from "@google/generative-ai";
        const API_KEY = "AIzaSyDiiPQO9WgRDTrpqst0EeQxLQfV7KdrF6A";
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        document.getElementById("generateTrip").addEventListener("click", async function () {
          const destination = document.getElementById("Destination").value.trim();
          const startDate = document.getElementById("Start-Date").value;
          const endDate = document.getElementById("End-Date").value;
      
          if (!destination || !startDate || !endDate) {
              alert("Please fill all fields!");
              return;
          }
      
          const loading = document.getElementById("loading");
          const itineraryBox = document.getElementById("itinerary");
      
          // Show the loading indicator
          loading.style.display = "block";
          itineraryBox.style.display = "none";
      
          const prompt = `Create a detailed day-by-day trip itinerary for a vacation to ${destination} from ${startDate} to ${endDate}. Format the output in HTML tags with headings for each day, lists for recommendations, and include vibrant inline styling for colors.`;
      
          try {
              const result = await model.generateContent(prompt);
              const itinerary = result.response.text();
      
              // Clean and format itinerary
              const cleanItinerary = itinerary
                  .replace(/```html|```/g, "") // Remove code block markers
                  .trim();
      
              loading.style.display = "none";
              itineraryBox.style.display = "block";
              itineraryBox.innerHTML = `
                  <h2>Itinerary for ${destination}</h2>
                  <h3>Start Date: ${startDate} | End Date: ${endDate}</h3>
                  ${cleanItinerary}
              `;
          } catch (error) {
              console.error("Error generating itinerary:", error);
              loading.style.display = "none";
              alert("Failed to generate itinerary. Please try again.");
          }
      });
      