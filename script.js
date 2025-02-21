document.addEventListener("DOMContentLoaded", function() {
  const emojiButton = document.getElementById('emoji-button');
  const emojiPickerOverlay = document.getElementById('emoji-picker-overlay');
  const closeEmojiPickerButton = document.getElementById('close-emoji-picker');
  const emojiPicker = document.getElementById('emoji-picker');
  const textInput = document.getElementById('textbox');
  const mainContent = document.getElementById('main-content');
  const formattedText = document.getElementById('formatted-text');
  const convertButton = document.getElementById('convert-button');
  const originalFavicon = document.getElementById('favicon').href;
  let selectedEmoji = '';

  // Set initial placeholder text
  formattedText.textContent = "Il risultato apparirà qui..";
  formattedText.classList.add("placeholder");

  emojiButton.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    emojiPickerOverlay.classList.remove('hidden');
  });

  closeEmojiPickerButton.addEventListener('click', () => {
    emojiPickerOverlay.classList.add('hidden');
    mainContent.classList.remove('hidden');
  });

  emojiPicker.addEventListener('emoji-click', event => {
    selectedEmoji = event.detail.unicode;
    emojiPickerOverlay.classList.add('hidden');
    mainContent.classList.remove('hidden');
  });

  // Get references to other DOM elements
  var separatorSelect = document.getElementById("separator-select");
  var spacingSelect = document.getElementById("spacing-select");

  // Set click event for the conversion button
  convertButton.addEventListener("click", function() {
    var text = textInput.value;
    var separator = separatorSelect.value;
    var spacing = spacingSelect.value;

    // Convert only uppercase letters to custom letters
    text = text.replace(/[A-Z]/g, function(match) {
      return replacements[match] || match;
    });

    // Modify spaces
    text = text.replace(/ /g, spacing);

    // Format the text
    var formattedTextContent = selectedEmoji + separator + text;

    // Display the formatted text
    formattedText.textContent = formattedTextContent;
    formattedText.classList.remove("placeholder");

    // Copy the text to the clipboard using a temporary textarea
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = formattedTextContent;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    try {
      document.execCommand("copy");
      console.log("Il testo è stato copiato negli appunti.");
      showSuccessAnimation();
    } catch (err) {
      console.error("Impossibile copiare il testo negli appunti.");
    }
    document.body.removeChild(tempTextarea);

    // Add placeholder text if the formatted text is empty
    if (formattedTextContent.trim() === "") {
      formattedText.textContent = "Il risultato apparirà qui..";
      formattedText.classList.add("placeholder");
    } else {
      formattedText.classList.remove("placeholder");
    }
  });

  // Function to show success animation
  function showSuccessAnimation() {
    const successAnimationContainer = document.createElement('div');
    successAnimationContainer.classList.add('success-animation');
    formattedText.appendChild(successAnimationContainer);

    lottie.loadAnimation({
      container: successAnimationContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'success.json' // Replace with the path to your animation JSON file
    });

    setTimeout(() => {
      successAnimationContainer.classList.add('fade-out');
      setTimeout(() => {
        formattedText.removeChild(successAnimationContainer);
      }, 1000);
    }, 2000);
  }

  // Map of replacements for custom letters
  var replacements = {
    'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤',
    'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩',
    'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮',
    'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳',
    'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸',
    'Z': '𝖹'
  };

  // Favicon animation
  const faviconFrames = [
    "favicon/frame_0001.png",
    "favicon/frame_0002.png",
    "favicon/frame_0003.png",
    "favicon/frame_0004.png",
    "favicon/frame_0005.png",
    "favicon/frame_0006.png",
    "favicon/frame_0007.png",
    "favicon/frame_0008.png",
    "favicon/frame_0009.png",
    "favicon/frame_0010.png",
    "favicon/frame_0011.png",
    "favicon/frame_0012.png",
    "favicon/frame_0013.png",
    "favicon/frame_0014.png",
    "favicon/frame_0015.png",
    "favicon/frame_0016.png",
    "favicon/frame_0017.png",
    "favicon/frame_0018.png",
    "favicon/frame_0019.png",
    "favicon/frame_0020.png",
    "favicon/frame_0021.png",
    "favicon/frame_0022.png",
    "favicon/frame_0023.png",
    "favicon/frame_0024.png",
    "favicon/frame_0025.png",
    "favicon/frame_0026.png",
    "favicon/frame_0027.png",
    "favicon/frame_0028.png",
    "favicon/frame_0029.png",
    "favicon/frame_0030.png",
    "favicon/frame_0031.png",
    "favicon/frame_0032.png",
    "favicon/frame_0033.png",
    "favicon/frame_0034.png",
    "favicon/frame_0035.png",
    "favicon/frame_0036.png",
    "favicon/frame_0037.png",
    "favicon/frame_0038.png",
    "favicon/frame_0039.png",
    "favicon/frame_0040.png",
    "favicon/frame_0041.png",
    "favicon/frame_0042.png",
    "favicon/frame_0043.png",
    "favicon/frame_0044.png",
    "favicon/frame_0045.png",
    "favicon/frame_0046.png",
    "favicon/frame_0047.png",
    "favicon/frame_0048.png",
    "favicon/frame_0049.png",
    "favicon/frame_0050.png"
  ];
  let currentFrame = 0;
  let faviconInterval;
  let isWindowActive = true;

  function animateFavicon() {
    if (!isWindowActive) return;
    const favicon = document.getElementById('favicon');
    favicon.href = faviconFrames[currentFrame];
    currentFrame = (currentFrame + 1) % faviconFrames.length;
    faviconInterval = setTimeout(animateFavicon, 50); // Change frame every 50ms
  }

  animateFavicon();

  // Title animation
  const titleText = "Discord Tools";
  let titleIndex = 0;
  let isDeleting = false;
  let titleInterval;

  function typeTitle() {
    if (!isWindowActive) return;
    const titleElement = document.querySelector('title');
    const delay = Math.random() * (200 - 50) + 50; // Random delay between 50ms and 200ms

    if (!isDeleting && titleIndex < titleText.length) {
      titleElement.textContent = titleText.substring(0, titleIndex + 1);
      titleIndex++;
    } else if (isDeleting && titleIndex > 0) {
      titleElement.textContent = titleText.substring(0, titleIndex - 1);
      titleIndex--;
    }

    if (titleIndex === titleText.length) {
      isDeleting = true;
    } else if (titleIndex === 0) {
      isDeleting = false;
    }

    titleInterval = setTimeout(typeTitle, delay);
  }

  typeTitle();

  // Handle window visibility change
  document.addEventListener('visibilitychange', function() {
    const titleElement = document.querySelector('title');
    const favicon = document.getElementById('favicon');

    if (document.hidden) {
      isWindowActive = false;
      clearTimeout(faviconInterval);
      clearTimeout(titleInterval);
      titleElement.textContent = "DS Tools | Torna da noi";
      favicon.href = "favicon.png";
    } else {
      isWindowActive = true;
      currentFrame = 0; // Reset frame to start animation from the beginning
      titleIndex = 0; // Reset title index to start animation from the beginning
      isDeleting = false; // Reset deleting state
      animateFavicon();
      typeTitle();
    }
  });
});