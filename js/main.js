import { setupEmojiPicker } from './modules/emojiPicker.js';
import { setupTextFormatter } from './modules/textFormatter.js';
import { setupFaviconAnimation } from './modules/faviconAnimation.js';
import { setupTitleAnimation } from './modules/titleAnimation.js';
import { setupLanguageManager } from './modules/languageManager.js';
import { loadJSON } from './modules/utils.js';
import { setupCustomCursor } from './modules/cursor.js';
import { populateSelect } from './modules/populateSelect.js';
import { isMobileDevice } from './modules/isMobileDevice.js';

document.addEventListener("DOMContentLoaded", async function() {
  const { config, langConfig } = await setupLanguageManager();

  const [separators, spacings, colors] = await Promise.all([
    loadJSON('./data/separators.json'),
    loadJSON('./data/spacings.json'),
    loadJSON('./data/colors.json')
  ]);

  Object.keys(colors).forEach(color => {
    document.documentElement.style.setProperty(`--${color}`, colors[color]);
  });

  populateSelect('separator-select', separators.separators);
  populateSelect('spacing-select', spacings.spacings);

  const selectedEmoji = setupEmojiPicker();
  setupTextFormatter(selectedEmoji, config, langConfig);
  setupFaviconAnimation(config, langConfig);
  setupTitleAnimation(config, langConfig);

  if (!isMobileDevice()) {
    setupCustomCursor();
  }
});