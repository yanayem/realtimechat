const socket = io("https://realtimechat-uj7s.onrender.com"); // Replace with your Render URL
const chat = document.getElementById('chat');

socket.on('message', function(msg) {
    const p = document.createElement('p');
    p.textContent = msg;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
});

function sendMessage() {
    const input = document.getElementById('message');
    const msg = input.value;
    if (msg.trim() !== "") {
        socket.send(msg);
        input.value = '';
    }
}