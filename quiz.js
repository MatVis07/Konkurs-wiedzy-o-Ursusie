const intro = document.getElementById('quiz-intro');
const active = document.getElementById('quiz-active');
const result = document.getElementById('quiz-result');
const title = document.getElementById('question-title');
const options = document.getElementById('quiz-options');
const next = document.getElementById('quiz-next');
const timer = document.getElementById('quiz-timer');
const timeBar = document.getElementById('quiz-timebar');
let quiz;
let interval;
function focusHeading(element) { element.focus({preventScroll:true}); }
function startQuiz() {
  clearInterval(interval);
  quiz = new QuizEngine([...QUIZ_QUESTIONS, ...QUIZ_IMAGE_QUESTIONS]);
  quiz.start(Date.now());
  intro.hidden = true;
  result.hidden = true;
  active.hidden = false;
  renderQuestion();
  interval = setInterval(updateTime, 100);
}
function renderQuestion() {
  if (quiz.done) { showResult(); return; }
  document.getElementById('quiz-progress').textContent = `Pytanie ${quiz.index + 1} z ${quiz.questions.length}`;
  title.textContent = quiz.current.question;
  const photo = document.getElementById('quiz-photo');
  const image = document.getElementById('quiz-image');
  photo.hidden = !quiz.current.image;
  if (quiz.current.image) {
    image.src = quiz.current.image;
    image.alt = quiz.current.imageAlt;
  } else {
    image.removeAttribute('src');
    image.alt = '';
  }
  options.replaceChildren();
  quiz.current.options.forEach((option, index) => {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'quiz-answer';
    input.value = index;
    input.addEventListener('change', () => {
      const now = Date.now();
      // Odpowiedź po terminie nie może nadpisać wcześniejszego wyboru.
      if (quiz.tick(now)) { renderQuestion(); return; }
      if (quiz.select(index, now)) next.disabled = false;
    });
    const text = document.createElement('span');
    text.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
    label.append(input, text);
    options.append(label);
  });
  next.disabled = true;
  next.textContent = quiz.index === quiz.questions.length - 1 ? 'Zatwierdź i zobacz wynik →' : 'Zatwierdź i przejdź dalej →';
  updateTime();
  focusHeading(title);
}
function updateTime() {
  if (quiz.done) return;
  if (quiz.tick(Date.now())) { renderQuestion(); return; }
  const remaining = Math.max(0, quiz.deadline - Date.now());
  timer.textContent = `${Math.ceil(remaining / 1000)} s`;
  timeBar.value = remaining / 1000;
  timer.classList.toggle('time-low', remaining <= 10000);
}
function showResult() {
  clearInterval(interval);
  active.hidden = true;
  result.hidden = false;
  document.getElementById('quiz-score').textContent = `${quiz.score} / ${quiz.questions.length}`;
  const review = document.getElementById('quiz-review');
  review.replaceChildren();
  quiz.answers.forEach((answer, index) => {
    const item = document.createElement('section');
    item.className = `quiz-review-item ${answer.correct ? 'answer-correct' : 'answer-incorrect'}`;
    const heading = document.createElement('h3');
    heading.textContent = `${index + 1}. ${answer.question.question}`;
    const status = document.createElement('p');
    status.className = 'review-status';
    status.textContent = `${answer.correct ? 'Poprawna odpowiedź · 1 pkt' : '0 pkt'}${answer.timedOut ? ' · upłynął czas' : ''}`;
    const chosen = document.createElement('p');
    chosen.textContent = `Twoja odpowiedź: ${answer.selected === null ? 'Brak odpowiedzi' : answer.question.options[answer.selected].text}`;
    const correct = document.createElement('p');
    correct.textContent = `Poprawna odpowiedź: ${answer.question.options.find(option => option.correct).text}`;
    item.append(heading, status, chosen, correct);
    if (answer.question.image) {
      const photo = document.createElement('img');
      photo.className = 'quiz-review-photo';
      photo.src = answer.question.image;
      photo.alt = answer.question.imageAlt;
      item.insertBefore(photo, status);
    }
    review.append(item);
  });
  focusHeading(document.getElementById('quiz-result-title'));
}
next.addEventListener('click', () => {
  const now = Date.now();
  if (quiz.tick(now)) { renderQuestion(); return; }
  if (quiz.advance(now)) renderQuestion();
});
document.getElementById('quiz-start').addEventListener('click', startQuiz);
document.getElementById('quiz-restart').addEventListener('click', startQuiz);
document.addEventListener('visibilitychange', () => {
  if (quiz && !quiz.done && !document.hidden) updateTime();
});
