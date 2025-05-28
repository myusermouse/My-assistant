const API_KEY = """;
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;
  
  appendMessage(question, "user");
  appendMessage("⏳ Typing...", "bot");
  userInput.value = "";
  
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: question }] }]
        })
      }
    );
    
    const data = await res.json();
    console.log(data);
    
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
    chatBox.lastChild.remove(); // remove typing...
    appendMessage(reply, "bot");
  } catch (err) {
    chatBox.lastChild.remove(); // remove typing...
    appendMessage("❌ Error: " + err.message, "bot");
  }
}