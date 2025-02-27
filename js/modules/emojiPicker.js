export function setupEmojiPicker() {
  const emojiButton = document.getElementById('emoji-button');
  const emojiPickerOverlay = document.getElementById('emoji-picker-overlay');
  const closeEmojiPickerButton = document.getElementById('close-emoji-picker');
  const emojiPicker = document.getElementById('emoji-picker');
  let selectedEmoji = '';

  emojiButton.addEventListener('click', () => {
    document.getElementById('main-content').classList.add('hidden');
    emojiPickerOverlay.classList.remove('hidden');
  });

  closeEmojiPickerButton.addEventListener('click', () => {
    emojiPickerOverlay.classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
  });

  emojiPicker.addEventListener('emoji-click', event => {
    selectedEmoji = event.detail.unicode;
    emojiPickerOverlay.classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
  });

  return selectedEmoji;
}