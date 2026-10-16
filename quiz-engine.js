// Logika niezależna od widoku; czas liczony względem terminu końca pytania.
class QuizEngine {
  constructor(bank, random = Math.random) {
    const shuffle = items => {
      const pool = [...items];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool;
    };
    const textQuestions = bank.filter(q => !q.image);
    const imageQuestions = bank.filter(q => q.image);
    if (textQuestions.length < 4 || imageQuestions.length < 1) {
      throw new Error('Quiz wymaga co najmniej 4 pytań tekstowych i 1 graficznego.');
    }
    const selected = [...shuffle(textQuestions).slice(0, 4), shuffle(imageQuestions)[0]];
    this.questions = shuffle(selected).map(q => {
      const options = q.options.map((text, index) => ({text, correct: index === q.correct}));
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return {...q, options};
    });
    this.index = 0;
    this.selected = null;
    this.answers = [];
    this.deadline = null;
  }
  get done() { return this.index >= this.questions.length; }
  get current() { return this.questions[this.index]; }
  start(now) { this.deadline = now + 60000; }
  select(index, now) {
    if (this.done || now >= this.deadline) return false;
    if (!Number.isInteger(index) || !this.current.options[index]) return false;
    this.selected = index;
    return true;
  }
  advance(now, timedOut = false) {
    if (this.done) return false;
    if (!timedOut && now < this.deadline && this.selected === null) return false;
    this.answers.push({question: this.current, selected: this.selected,
      correct: this.selected !== null && this.current.options[this.selected].correct,
      timedOut: timedOut || now >= this.deadline});
    this.index++;
    this.selected = null;
    if (!this.done) this.start(now);
    return true;
  }
  tick(now) {
    if (!this.done && now >= this.deadline) return this.advance(now, true);
    return false;
  }
  get score() { return this.answers.filter(answer => answer.correct).length; }
}
if (typeof module !== 'undefined') module.exports = QuizEngine;
