// input
const form = document.getElementById('form');
const textareaInput = document.getElementById('textarea-input');
const textareaOutput = document.getElementById('textarea-output');

// output
const output = document.getElementById('output');
const outputMessage = document.getElementById('output-message');
const copyButton = document.getElementById('copy');

// buttons
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');

// prevent submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
});

// character assignment for encryption/decryption
const keys = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
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

// functions to display elements
function displayErrorMessage(message) {
  outputMessage.innerHTML = `
  <div class="error">
    <img src="./images/illustration.png" alt="Illustration"/>
    <div class="error__text">
      <h1>No message was found</h1>
      <p>${message}</p>
    </div>
  </div>
`;
}

function hideOutputElements() {
  outputMessage.style.display = "block";
  textareaOutput.style.display = "none";
  copyButton.style.display = "none";
  output.style.justifyContent = "center";
}

function showOutputElements() {
  output.style.justifyContent = "space-between";
  outputMessage.style.display = "none";
  textareaOutput.style.display = "block";
  copyButton.style.display = "block";
}

// function to validate user input
function validateTextarea() {
  const textareaValue = textareaInput.value.trim();
  const regex = /^[a-zA-Z\s]*$/;

  if (textareaValue === "") {
    displayErrorMessage('Enter the text you want to encrypt or decrypt.');
    hideOutputElements();
    return;
  }

  if (!regex.test(textareaInput.value)) {
    displayErrorMessage('Special characters and numbers are not allowed.');
    hideOutputElements();
    return;
  }

  showOutputElements();
}

// function that copies the encrypted/decrypted message (clipboard - new message) 
copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(outputMessage.textContent);
  textareaInput.value = textareaOutput.value;
});

// encrypt the message
encryptButton.addEventListener('click', () => {
  textareaOutput.innerHTML = encrypt(textareaInput.value);
  validateTextarea();
});

// decrypt the message
decryptButton.addEventListener('click', () => {
  textareaOutput.innerHTML = decrypt(textareaInput.value);
  validateTextarea();
});

// function to convert characters to lower case
textareaInput.addEventListener('keyup', () => {
  textareaInput.value = textareaInput.value.toLowerCase();
});

validateTextarea();