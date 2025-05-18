function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, 'user');
  input.value = "";

  setTimeout(() => {
    const reply = getBotReply(message);
    addMessage(reply, 'bot');
  }, 500);
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgDiv.innerHTML = `
    <span class="text">${text}</span>
    <span class="time">${time}</span>
  `;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  saveChat(); // Save current state
}

function getBotReply(msg) {
  const lower = msg.toLowerCase();

  if (lower.includes("hi") || lower.includes("hello")) {
    return "Hi there! 👋 How can I help you?";
  } else if (lower.includes("how are you")) {
    return "I'm just a bot, but I'm doing great!";
  } else if (lower.includes("bye")) {
    return "Goodbye! 👋 Have a nice day!";
  } else if (lower.includes("help")) {
    return "I'm here to answer basic questions. Try saying 'hi' or 'bye'.";
  } else {
    return "I'm not sure how to respond to that. Try asking something else!";
  }
}

function clearChat() {
  document.getElementById("chat-box").innerHTML = "";
  localStorage.removeItem("chatHistory");
}

function saveChat() {
  const chatBox = document.getElementById("chat-box");
  localStorage.setItem("chatHistory", chatBox.innerHTML);
}

function loadChat() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) {
    document.getElementById("chat-box").innerHTML = saved;
  }
}

// Load chat on page start
window.onload = loadChat;
