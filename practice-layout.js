const PracticeLayout = (() => {
  const main = document.querySelector('main');
  function fit() {
    main.style.zoom = '';
    if (document.body.classList.contains('quiz-running') || document.body.classList.contains('quiz-finished')) return;
    const header = document.querySelector('body > header');
    const footer = document.querySelector('body > footer');
    const available = window.innerHeight - header.getBoundingClientRect().height - footer.getBoundingClientRect().height - 4;
    let scale = 1;
    for (let i = 0; i < 6; i++) {
      const height = main.getBoundingClientRect().height;
      if (height <= available) break;
      scale *= available / height;
      main.style.zoom = Math.min(1, scale * .995);
    }
  }
  function setMode(mode) {
    document.body.classList.toggle('quiz-running', mode === 'active');
    document.body.classList.toggle('quiz-finished', mode === 'result');
    main.style.zoom = '';
  }
  window.addEventListener('resize', fit);
  window.addEventListener('pageshow', fit);
  if (document.fonts) document.fonts.ready.then(fit);
  fit();
  return {setMode,fit};
})();
