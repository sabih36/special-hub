let chatMessages = [];

window.onload = () => {
  const stored = localStorage.getItem("chatHistory");
  if (stored) {
    chatMessages = JSON.parse(stored);
    chatMessages.forEach((msg, index) => renderHistoryItem(msg, index));
  }
};

function addMessage() {
  const type = document.getElementById("type").value;
  const content = document.getElementById("content").value.trim();
  if (!content) return;

  const newMessage = { type, content };
  chatMessages.unshift(newMessage); // Add to beginning
  localStorage.setItem("chatHistory", JSON.stringify(chatMessages));

  renderMessage(newMessage);
  renderHistoryItem(newMessage, 0, true);
  document.getElementById("content").value = "";
}

function renderMessage(msg) {
  const chatFeed = document.getElementById("chat-feed");
  chatFeed.innerHTML = ""; // clear view
  const box = document.createElement("div");
  box.className = "message";

  switch (msg.type) {
    case "text":
      box.innerText = msg.content;
      break;
    case "link":
      box.innerHTML = `<a href="${msg.content}" target="_blank">${msg.content}</a>`;
      break;
    case "image":
      box.innerHTML = `<img src="${msg.content}" alt="Shared Image">`;
      break;
    case "video":
      box.innerHTML = `
        <video controls>
          <source src="${msg.content}" type="video/mp4">
          Your browser does not support video.
        </video>`;
      break;
  }

  chatFeed.appendChild(box);
}

function renderHistoryItem(msg, index, insertTop = false) {
  const list = document.getElementById("history-list");
  const item = document.createElement("li");
  item.innerText = `${msg.type.toUpperCase()}: ${msg.content.slice(0, 30)}`;
  item.style.cursor = "pointer";

  item.onclick = () => renderMessage(msg);

  if (insertTop && list.firstChild) {
    list.insertBefore(item, list.firstChild);
  } else {
    list.appendChild(item);
  }
}
