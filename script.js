const bubble = document.getElementById("chat-bubble");
const box = document.getElementById("chat-box");
const messages = document.getElementById("chat-messages");
const input = document.getElementById("user-input");

bubble.addEventListener("click", () => {
  box.style.display = box.style.display === "none" ? "flex" : "none";
});

function sendMessage() {
  const userText = input.value.trim();
  if (userText === "") return;
  
  // Show user's message
  messages.innerHTML += `<div><strong>You:</strong> ${userText}</div>`;
  input.value = "";
  
  // Fake bot response for now
  setTimeout(() => {
    messages.innerHTML += `<div><strong>Bot:</strong> I'm still learning. 😊</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 500);
}