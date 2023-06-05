document.addEventListener("DOMContentLoaded", function() {
  // Get references to DOM elements
  var textInput = document.getElementById("textbox");
  var emojiButton = document.getElementById("emoji-button");
  var emojiList = document.getElementById("emoji-list");
  var separatorSelect = document.getElementById("separator-select");
  var spacingSelect = document.getElementById("spacing-select");
  var formattedText = document.getElementById("formatted-text");
  var convertButton = document.getElementById("convert-button");
  var copyMessage = document.getElementById("copy-message");

  // Set click event for the emoji button
  emojiButton.addEventListener("click", function() {
    emojiList.style.display = (emojiList.style.display === "none") ? "block" : "none";
  });

  // Add emojis to the emoji list
  var emojis = ["✅", "🎫", "📊", "👥", "📌", "🌐", "💡", "👋", "📜", "🔨", "📋", "📣", "📬", "📅", "💠", "✨", "🎁", "🔗", "💎", "🎮", "❔", "💸", "⚡", "🏹", "💬", "🎥", "🔉", "🤍", "🧰", "🥋", "💻", "⛔", "🤖", "💾", "➕", "🎵", "📻", "💣", "🔑", "🍿", "☕", "🎉", "💰", "🚗", "👀", "🔥", "🔔", "🎭", "⏳", "📍", "🎯", "🔰", "💤"];
  for (var i = 0; i < emojis.length; i++) {
    var emojiButton = document.createElement("button");
    emojiButton.textContent = emojis[i];
    emojiButton.classList.add("emoji-item");
    emojiButton.addEventListener("click", function() {
      emojiButtonClicked(this.textContent);
    });
    emojiList.appendChild(emojiButton);
    emojiList.style.display = "none";
  }

  // Function called when an emoji is selected
  function emojiButtonClicked(emoji) {
    emojiList.style.display = "none";
    emojiButton.textContent = emoji;
  }

  // Set click event for the conversion button
  convertButton.addEventListener("click", function() {
    var text = textInput.value;
    var emoji = emojiButton.textContent;
    var separator = separatorSelect.value;
    var spacing = spacingSelect.value;

    // Convert only uppercase letters to custom letters
    text = text.replace(/[A-Z]/g, function(match) {
      return replacements[match] || match;
    });

    // Modify spaces
    text = text.replace(/ /g, spacing);

    // Format the text
    var formattedTextContent = emoji + separator + text;

    // Display the formatted text
    formattedText.textContent = formattedTextContent;

    // Apply CSS properties to the formatted text
    formattedText.style.width = "100%";
    formattedText.style.padding = "8px";
    formattedText.style.backgroundColor = "#202225";
    formattedText.style.color = "#FFFFFF";
    formattedText.style.border = "none";
    formattedText.style.borderRadius = "5px";
    formattedText.style.marginBottom = "10px";

    // Copy the text to the clipboard
    navigator.clipboard.writeText(formattedTextContent)
      .then(function() {
        copyMessage.textContent = "Il testo è stato copiato negli appunti.";
        copyMessage.style.display = "block";
        copyMessage.style.color = "#43B581"; // Green color for success message

        // Reset the formatted text and copy message after 5 seconds
        setTimeout(function() {
          formattedText.textContent = "";
          formattedText.style = "";
          copyMessage.textContent = "";
          copyMessage.style = "";
        }, 5000);
      })
      .catch(function() {
        copyMessage.textContent = "Impossibile copiare il testo negli appunti.";
        copyMessage.style.color = "#F04747"; // Red color for error message
        copyMessage.style.display = "block";
      });
  });

  // Map of replacements for custom letters
  var replacements = {
    'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴',
    'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
    'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾',
    'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃',
    'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈',
    'Z': '𝚉'
  };
});

