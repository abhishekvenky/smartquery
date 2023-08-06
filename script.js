// Get required elements from the DOM
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// Function to create a new chat message
function createChatMessage(message, sender) {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message', sender);
  chatMessage.innerHTML = `<span class="message">${message}</span>`;
  chatBox.appendChild(chatMessage);

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle user's input and generate bot reply
function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage !== '') {
    // Create and append user message to the chat box
    createChatMessage(userMessage, 'user');

    // Parse user input and create JSON payload
    const [row_start, row_end] = userMessage.split(',').map((str) => parseInt(str.trim()));
    const requestBody = { "row_start": row_start, "row_end": row_end };

    // Call Python API using fetch
    fetch('https://funcapp-smartquery.azurewebsites.net/api/func-smartquery?code=ioBNNz-716JOMCb_mO5U4eeHTuOsV4Fk-Q8DrZmnOZU3AzFun0GeXw%3D%3D', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      // Bot reply with the API response
      createChatMessage(JSON.stringify(data), 'bot');
    })
    .catch(error => {
      // Handle errors, e.g., API call failure
      console.error('Error:', error);
    });

    // Clear the user input
    userInput.value = '';
  }
}

// Handle user pressing Enter key to send message
userInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
