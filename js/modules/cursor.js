export function setupCustomCursor() {
     const customCursor = document.createElement('img');
     customCursor.src = 'media/img/cursor.png';
     customCursor.style.position = 'absolute';
     customCursor.style.pointerEvents = 'none';
     customCursor.style.zIndex = '10000';
     customCursor.style.width = '25px';
     customCursor.style.height = '25px';
     customCursor.style.display = 'none';
     document.body.appendChild(customCursor);
   
     document.addEventListener('mousemove', (e) => {
       customCursor.style.left = `${e.clientX}px`;
       customCursor.style.top = `${e.clientY}px`;
       customCursor.style.display = 'block';
       createWaveEffect(e.clientX, e.clientY);
     });
   
     document.addEventListener('mouseleave', () => {
       customCursor.style.display = 'none';
     });
   
     document.addEventListener('mouseenter', () => {
       customCursor.style.display = 'block';
     });
   }
   
   function createWaveEffect(x, y) {
     const waveEffect = document.querySelector('.wave-effect');
     const wave = document.createElement('div');
     wave.className = 'wave';
     wave.style.left = `${x - 40}px`;
     wave.style.top = `${y - 40}px`;
     waveEffect.appendChild(wave);
   
     wave.addEventListener('animationend', () => {
       waveEffect.removeChild(wave);
     });
   }