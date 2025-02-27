export function setupTitleAnimation(config, langConfig) {
  let titleText = langConfig.title;
  let inactiveTitle = langConfig.inactiveTitle;
  let titleIndex = 1;
  let titleInterval;
  let isWindowActive = true;
  let blinkCount = 0;

  const states = {
    TYPING: 'TYPING',
    PAUSING: 'PAUSING',
    BLINKING: 'BLINKING',
    DELETING: 'DELETING'
  };

  let currentState = states.TYPING;

  function updateTitle() {
    if (!isWindowActive) return;
    const titleElement = document.querySelector('title');
    let delay;

    switch (currentState) {
      case states.TYPING:
        delay = Math.random() * (config.titleTypingSpeedRange[1] - config.titleTypingSpeedRange[0]) + config.titleTypingSpeedRange[0];
        titleElement.textContent = titleText.substring(0, titleIndex + 1);
        titleIndex++;
        if (titleIndex === titleText.length) {
          currentState = states.PAUSING;
          delay = 2000;
        }
        break;

      case states.PAUSING:
        currentState = states.BLINKING;
        blinkCount = 0;
        delay = 0;
        break;

      case states.BLINKING:
        delay = 200;
        titleElement.textContent = blinkCount % 2 === 0 ? '᲼' : titleText;
        blinkCount++;
        if (blinkCount >= 6) {
          currentState = states.DELETING;
        }
        break;

      case states.DELETING:
        delay = Math.random() * (config.titleTypingSpeedRange[1] - config.titleTypingSpeedRange[0]) + config.titleTypingSpeedRange[0];
        titleElement.textContent = titleText.substring(0, titleIndex - 1);
        titleIndex--;
        if (titleIndex === 1) {
          currentState = states.TYPING;
        }
        break;
    }

    titleInterval = setTimeout(updateTitle, delay);
  }

  updateTitle();

  document.addEventListener('visibilitychange', function() {
    const titleElement = document.querySelector('title');

    if (document.hidden) {
      isWindowActive = false;
      clearTimeout(titleInterval);
      titleElement.textContent = inactiveTitle;
    } else {
      isWindowActive = true;
      titleIndex = 1;
      currentState = states.TYPING;
      updateTitle();
    }
  });

  window.titleAnimation = {
    updateTitle: (newTitle, newInactiveTitle) => {
      titleText = newTitle;
      inactiveTitle = newInactiveTitle;
      titleIndex = 1;
      currentState = states.TYPING;
      updateTitle();
    }
  };
}