// Entrada
const form = document.getElementById('form');
const textareaInput = document.getElementById('textarea-input');

// Salida
const output = document.getElementById('output');
const outputMessage = document.getElementById('output-message');
const textareaOutput = document.getElementById('textarea-output');
const copyButton = document.getElementById('copy');

// Botones
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');

// Impedir el envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Asignación de caracteres para cifrado/descifrado
const keys = {
  'e': 'enter',
  'i': 'imes',
  'a': 'ai',
  'o': 'ober',
  'u': 'ufat',
}

// Función para encriptar un mensaje
function encrypt(message) {
  let encryptedMessage = '';

  // Convertir el mensaje a minúsculas
  const lowerCaseMessage = message.toLowerCase();
  // Convertir el mensaje en un array de caracteres
  const messageArray = lowerCaseMessage.split('');

  // Iterar sobre cada letra del mensaje
  messageArray.forEach((letter) => {
    // Agregar a la variable encryptedMessage el valor correspondiente de la letra en el objeto keys, o la propia letra si no tiene un valor asignado
    encryptedMessage += keys[letter] || letter;
  });

  // Devolver el mensaje encriptado
  return encryptedMessage;
}

// Función para desencriptar un mensaje
function decrypt(encryptedMessage) {
  let decryptedMessage = encryptedMessage;

  // Obtener los valores del objeto keys y unirlos en una cadena separada por '|'
  const keysValues = Object.values(keys).join('|');
  // Crear una expresión regular utilizando los valores del objeto keys y la bandera 'gi' para que sea global y no distinga entre mayúsculas y minúsculas
  const regex = new RegExp(keysValues, 'gi');

  // Reemplazar todas las coincidencias con el regex
  decryptedMessage = decryptedMessage.replace(regex, (matched) => {
    // Obtener el índice del valor coincidente en los valores del objeto keys
    const index = Object.values(keys).indexOf(matched);
    // Devolver la clave correspondiente al índice encontrado
    return Object.keys(keys)[index];
  });

  // Devolver el mensaje desencriptado
  return decryptedMessage;
}


// Función para mostrar mensaje de error
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
// Función para ocultar elementos
function hideOutputElements() {
  outputMessage.style.display = "block";
  textareaOutput.style.display = "none";
  copyButton.style.display = "none";
  output.style.justifyContent = "center";
}

// Función para mostrar elementos
function showOutputElements() {
  output.style.justifyContent = "space-between";
  outputMessage.style.display = "none";
  textareaOutput.style.display = "block";
  copyButton.style.display = "block";
}

// Función para validar el contenido de un textarea
function validateTextarea() {
  // Obtener el valor del textarea y eliminar espacios en blanco al inicio y al final
  const textareaValue = textareaInput.value.trim();
  // Expresión regular que permite solo letras mayúsculas, letras minúsculas y espacios en blanco
  const regex = /^[a-zA-Z\s]*$/;

  // Verificar si el textarea está vacío
  if (textareaValue === "") {
    // Mostrar un mensaje de error indicando que se debe ingresar el texto a encriptar o desencriptar
    displayErrorMessage('Enter the text you want to encrypt or decrypt.');

    hideOutputElements();
    return;
  }

  // Verificar si el contenido del textarea no cumple con la expresión regular
  if (!regex.test(textareaInput.value)) {
    // Mostrar un mensaje de error indicando que no se permiten caracteres especiales ni números
    displayErrorMessage('Special characters and numbers are not allowed.');
    hideOutputElements();

    return;
  }

  // Mostrar los elementos de salida
  showOutputElements();
}


// Función que copia el mensaje cifrado/descifrado al portapapeles
copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(textareaOutput.value);
  // Reemplaza el mensaje en el textarea
  textareaInput.value = textareaOutput.value;
});

// Encriptar el mensaje
encryptButton.addEventListener('click', () => {
  textareaOutput.innerHTML = encrypt(textareaInput.value);
  validateTextarea();
});

// Desencriptar el mensaje
decryptButton.addEventListener('click', () => {
  textareaOutput.innerHTML = decrypt(textareaInput.value);
  validateTextarea();
});

// Función para convertir caracteres los caracteres ingresados a minúsculas
textareaInput.addEventListener('keyup', () => {
  textareaInput.value = textareaInput.value.toLowerCase();
});

validateTextarea();