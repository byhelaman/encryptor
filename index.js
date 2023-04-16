// input
const form = document.getElementById('form');
const textarea = document.getElementById('textarea');

// output
const output = document.getElementById('output');
const outputMessage = document.getElementById('output-message');
const copyButton = document.getElementById('copy');

// buttons
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');


form.addEventListener('submit', (event) => {
  event.preventDefault();
});

// character assignment for encryption/decryption
const keys = {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat',
}

// function to encrypt a message
function encrypt(message) {
  let encryptedMessage = '';

  const lowerCaseMessage = message.toLowerCase();
  const messageArray = lowerCaseMessage.split('');

  messageArray.forEach((letter) => {
    encryptedMessage += keys[letter] || letter;
  });

  return encryptedMessage;
}

// function to decrypt a message
function decrypt(encryptedMessage) {
  let decryptedMessage = encryptedMessage;

  const keysValues = Object.values(keys).join('|');
  const regex = new RegExp(keysValues, 'gi');

  decryptedMessage = decryptedMessage.replace(regex, (matched) => {
    const index = Object.values(keys).indexOf(matched);
    return Object.keys(keys)[index];
  });

  return decryptedMessage;
}

// function to validate user input
function validateTextarea() {
  const textareaValue = textarea.value.trim();

  if (textareaValue === "") {
    outputMessage.innerHTML = `
      <div class="error">
        <img src="./images/illustration.png" alt="Illustration"/>
        <div class="error__text">
          <h1>No message was found</h1>
          <p>Enter the text you want to encrypt or decrypt.</p>
        </div>
      </div>
    `;
    copyButton.style.display = "none";
    output.style.justifyContent = "center";

  } else {
    output.style.justifyContent = "space-between";
    copyButton.style.display = "block";
  }
}

// function that copies the encrypted/decrypted message (clipboard - new message) 
copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(outputMessage.textContent);
  textarea.value = outputMessage.textContent;
});

// encrypt the message
encryptButton.addEventListener('click', () => {
  outputMessage.innerHTML = `<p>${encrypt(textarea.value)}</p>`;
  validateTextarea();
});

// decrypt the message
decryptButton.addEventListener('click', () => {
  outputMessage.innerHTML = `<p>${decrypt(textarea.value)}</p>`;
  validateTextarea();
});

validateTextarea();