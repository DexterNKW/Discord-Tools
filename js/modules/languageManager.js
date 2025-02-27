export async function setupLanguageManager() {
  const config = await fetch('./data/config.json').then(response => response.json());
  const languages = await fetch('./data/languages.json').then(response => response.json());
  const languageSelect = document.getElementById('language-select');
  let language = localStorage.getItem('selectedLanguage') || (navigator.language.startsWith('it') ? 'it' : 'en');
  let langConfig = languages.languages[language];

  Object.keys(languages.languages).forEach(langKey => {
    const option = document.createElement('option');
    option.value = langKey;
    option.textContent = languages.languages[langKey].name;
    languageSelect.appendChild(option);
  });

  function updateLanguage() {
    langConfig = languages.languages[languageSelect.value];
    document.title = langConfig.title;
    document.querySelector('.title').textContent = langConfig.title;
    document.querySelector('.attribution').textContent = langConfig.attribution;
    document.querySelector('label[for="separator-select"]').textContent = langConfig.selectSeparator;
    document.querySelector('label[for="spacing-select"]').textContent = langConfig.selectSpacing;
    document.getElementById('convert-button').textContent = langConfig.convertButton;
    document.getElementById('formatted-text').textContent = langConfig.resultPlaceholder;
    document.querySelector('label[for="textbox"]').textContent = langConfig.insertText;
    document.querySelector('label[for="emoji-button"]').textContent = langConfig.selectEmoji;
    document.getElementById('close-emoji-picker').textContent = langConfig.closeEmojiPicker;
    document.querySelector('label[for="language-select"]').textContent = langConfig.languageLabel;

    document.querySelector('title').textContent = langConfig.inactiveTitle;

    if (window.titleAnimation) {
      window.titleAnimation.updateTitle(langConfig.title, langConfig.inactiveTitle);
    }
  }

  languageSelect.value = language;
  languageSelect.addEventListener('change', () => {
    language = languageSelect.value;
    localStorage.setItem('selectedLanguage', language);
    updateLanguage();
  });

  updateLanguage();
  return { config, langConfig };
}