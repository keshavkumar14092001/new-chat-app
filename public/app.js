const socket = io()
let msgText = document.querySelector('#enteredMessage');
let sendButton = document.querySelector('#sendBtn');
let displayBox = document.querySelector('.chatContent');
let displayMessage = document.querySelector('.message');
let connectionCount = document.querySelector('#totalNumber');

let user;
do {
    user = prompt('Please enter your name!');
} while (!user);

document.querySelector('#yourName').textContent = user;

msgText.focus()

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    let data = msgText.value;
    sendMessage(data);
    msgText.value = '';
    msgText.focus();
    displayBox.scrollTop = displayBox.scrollHeight;
})

function sendMessage(data) {
    let msg = {
        name: user,
        message: data.trim()
    }

    display(msg, 'outgoing');
    socket.emit('sendMessage', msg);
}

socket.on('sendToAll', (msg) => {
    display(msg, 'incoming');
    displayBox.scrollTop = displayBox.scrollHeight;
})

socket.on('totalCount', (number) => {
    connectionCount.innerHTML = number
})

function display(msg, type) {
    const newDiv = document.createElement('div');
    let className = type;
    newDiv.classList.add(className, 'rowMessage');
    let times = new Date().toLocaleTimeString();
    let innerText = `
    <div class="msgTitle">
        🙂<span>${msg.name}</span>
    </div>
    <div class="msgText">
        <p>
            ${msg.message}
        </p>
    </div>
    <div class="msgTime">
        <p>${times}</p>
    </div>
    `;
    newDiv.innerHTML = innerText;
    displayMessage.appendChild(newDiv);
}