// Logika niezależna od widoku; czas liczony względem terminu końca pytania.
class QuizEngine {
  static random() {
    if (globalThis.crypto?.getRandomValues) {
      return globalThis.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
    }
    return Math.random();
  }
  constructor(bank, random = QuizEngine.random, previousMapId = null, textHistory = []) {
    const shuffle = items => {
      const pool = [...items];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool;
    };
    const textQuestions = bank.filter(q => !q.image);
    const imageQuestions = bank.filter(q => q.image && q.type !== 'map');
    const mapQuestions = bank.filter(q => q.type === 'map');
    const textCount = mapQuestions.length ? 3 : 4;
    if (textQuestions.length < textCount || imageQuestions.length < 1) {
      throw new Error('Quiz wymaga co najmniej 4 pytań tekstowych i 1 graficznego.');
    }
    const knownIds = new Set(textQuestions.map(q => q.id));
    const seenIds = new Set((Array.isArray(textHistory) ? textHistory : []).filter(id => knownIds.has(id)));
    const fresh = shuffle(textQuestions.filter(q => !seenIds.has(q.id))).slice(0, textCount);
    let nextHistory = [...seenIds, ...fresh.map(q => q.id)];
    if (fresh.length < textCount) {
      const picked = new Set(fresh.map(q => q.id));
      const refill = shuffle(textQuestions.filter(q => !picked.has(q.id))).slice(0, textCount - fresh.length);
      fresh.push(...refill);
      nextHistory = refill.map(q => q.id);
    }
    this.textHistory = nextHistory;
    const selected = [...fresh, shuffle(imageQuestions)[0]];
    if (mapQuestions.length) {
      const differentMaps = mapQuestions.filter(q => q.id !== previousMapId);
      selected.push(shuffle(differentMaps.length ? differentMaps : mapQuestions)[0]);
    }
    this.questions = shuffle(selected).map(q => {
      const options = (q.options || []).map((text, index) => ({text, correct: index === q.correct}));
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
  static distanceMeters(a, b) {
    const radians = value => value * Math.PI / 180;
    const dLat = radians(b.lat - a.lat);
    const dLng = radians(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(Math.min(1, h)), Math.sqrt(Math.max(0, 1 - h)));
  }
  select(index, now) {
    if (this.done || now >= this.deadline) return false;
    if (this.current.type === 'map') {
      if (!index || !Number.isFinite(index.lat) || !Number.isFinite(index.lng) || Math.abs(index.lat) > 90 || Math.abs(index.lng) > 180) return false;
      this.selected = {lat: index.lat, lng: index.lng};
      return true;
    }
    if (!Number.isInteger(index) || !this.current.options[index]) return false;
    this.selected = index;
    return true;
  }
  advance(now, timedOut = false) {
    if (this.done) return false;
    if (!timedOut && now < this.deadline && this.selected === null) return false;
    const distance = this.current.type === 'map' && this.selected !== null
      ? QuizEngine.distanceMeters(this.selected, this.current.location) : null;
    this.answers.push({question: this.current, selected: this.selected, distance,
      correct: this.selected !== null && (this.current.type === 'map'
        ? distance <= this.current.radiusMeters : this.current.options[this.selected].correct),
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
