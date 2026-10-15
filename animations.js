// Animacje sekcji przy przewijaniu; treść pozostaje widoczna bez JavaScript.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
}

const challenges = [
  'Wybierz się na spacer i znajdź detal budynku, którego wcześniej nie zauważyłeś.',
  'Zapytaj kogoś bliskiego o jego najstarsze wspomnienie związane z Ursusem.',
  'Znajdź nazwę lokalnej ulicy i odkryj, skąd się wzięła.',
  'Zrób zdjęcie miejsca, które najlepiej oddaje dla Ciebie charakter Ursusa.',
  'Poszukaj starego zdjęcia okolicy i porównaj je z dzisiejszym widokiem.'
];
let previous = -1;
document.getElementById('draw-challenge').addEventListener('click', () => {
  // Losowanie bez powtórzenia poprzedniego wyzwania.
  const offset = 1 + Math.floor(Math.random() * (challenges.length - 1));
  previous = previous < 0 ? Math.floor(Math.random() * challenges.length) : (previous + offset) % challenges.length;
  document.getElementById('challenge-text').textContent = challenges[previous];
  const card = document.querySelector('.challenge-card');
  card.classList.remove('pulse');
  void card.offsetWidth;
  card.classList.add('pulse');
});
