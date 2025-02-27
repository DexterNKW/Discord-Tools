import { loadJSON } from './utils.js';

export async function setupTextFormatter(selectedEmoji, config, langConfig) {
  const textInput = document.getElementById('textbox');
  const formattedText = document.getElementById('formatted-text');
  const convertButton = document.getElementById('convert-button');
  const separatorSelect = document.getElementById('separator-select');
  const spacingSelect = document.getElementById('spacing-select');

  const replacements = await loadJSON('./data/replacements.json').then(data => data.replacements);

  document.querySelector('label[for="separator-select"]').textContent = langConfig.selectSeparator;
  document.querySelector('label[for="spacing-select"]').textContent = langConfig.selectSpacing;
  convertButton.textContent = langConfig.convertButton;
  formattedText.textContent = langConfig.resultPlaceholder;
  formattedText.classList.add("placeholder");

  convertButton.addEventListener("click", function() {
    let text = textInput.value;
    const separator = separatorSelect.value;
    const spacing = spacingSelect.value;

    text = text.replace(/[A-Z]/g, match => replacements[match] || match);
    text = text.replace(/ /g, spacing);

    const formattedTextContent = selectedEmoji + separator + text;
    formattedText.textContent = formattedTextContent;
    formattedText.classList.remove("placeholder");

    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = formattedTextContent;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    try {
      document.execCommand("copy");
      console.log(langConfig.copyMessage);
      showSuccessAnimation();
    } catch (err) {
      console.error("Impossibile copiare il testo negli appunti.");
    }
    document.body.removeChild(tempTextarea);

    if (formattedTextContent.trim() === "") {
      formattedText.textContent = langConfig.resultPlaceholder;
      formattedText.classList.add("placeholder");
    } else {
      formattedText.classList.remove("placeholder");
    }
  });

  function showSuccessAnimation() {
    const successAnimationContainer = document.createElement('div');
    successAnimationContainer.classList.add('success-animation');
    formattedText.appendChild(successAnimationContainer);

    lottie.loadAnimation({
      container: successAnimationContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'data/success.json'
    });

    setTimeout(() => {
      successAnimationContainer.classList.add('fade-out');
      setTimeout(() => {
        formattedText.removeChild(successAnimationContainer);
      }, 1000);
    }, 2000);
  }
}