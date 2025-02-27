export function setupFaviconAnimation(langConfig) {
  const totalFrames = 50;
  const framePrefix = "favicon/frame_";
  const frameSuffix = ".png";
  const faviconFrames = Array.from({ length: totalFrames }, (_, i) => `${framePrefix}${String(i + 1).padStart(4, '0')}${frameSuffix}`);

  let currentFrame = 0;
  let faviconInterval;
  let isWindowActive = true;

  function animateFavicon() {
    if (!isWindowActive) return;
    const favicon = document.getElementById('favicon');
    favicon.href = faviconFrames[currentFrame];
    currentFrame = (currentFrame + 1) % faviconFrames.length;
    faviconInterval = setTimeout(animateFavicon, 50);
  }

  animateFavicon();

  document.addEventListener('visibilitychange', function() {
    const titleElement = document.querySelector('title');
    const favicon = document.getElementById('favicon');

    if (document.hidden) {
      isWindowActive = false;
      clearTimeout(faviconInterval);
      titleElement.textContent = langConfig.inactiveTitle;
      favicon.href = "media/img/favicon.png";
    } else {
      isWindowActive = true;
      currentFrame = 0;
      animateFavicon();
    }
  });
}
