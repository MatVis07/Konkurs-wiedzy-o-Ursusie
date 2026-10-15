// Nawigacja po artykułach obsługuje również przyciski Wstecz i Dalej.
const topicList = document.getElementById('tematy');
const panels = [...document.querySelectorAll('.study-panel')];
let lastTopic = null;
function updateStudyView(focus = false) {
  const activePanel = panels.find(panel => `#${panel.id}` === window.location.hash);
  topicList.hidden = Boolean(activePanel);
  panels.forEach(panel => { panel.hidden = panel !== activePanel; });
  if (activePanel) {
    lastTopic = activePanel.id.replace('temat-', '');
    if (focus) activePanel.querySelector('h2').focus({ preventScroll: true });
  } else if (focus) {
    const previousCard = [...document.querySelectorAll('[data-topic]')].find(card => card.dataset.topic === lastTopic);
    (previousCard || document.getElementById('study-title')).focus({ preventScroll: true });
  }
  if (focus) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
window.addEventListener('hashchange', () => updateStudyView(true));
updateStudyView();
