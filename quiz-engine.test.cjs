const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const QuizEngine = require('./quiz-engine');
const bank = vm.runInNewContext(fs.readFileSync('quiz-data.js','utf8') + fs.readFileSync('quiz-images.js','utf8') + '; [...QUIZ_QUESTIONS, ...QUIZ_IMAGE_QUESTIONS]');
assert.equal(bank.filter(q=>!q.image).length,96);
assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
for(const q of bank){assert(q.question);assert(q.options.length>=2);assert(q.options[q.correct]);}
for(let run=0;run<100;run++){
 const quiz = new QuizEngine(bank);
 assert.equal(quiz.questions.length,5);
 assert.equal(new Set(quiz.questions.map(q=>q.id)).size,5);
 assert.equal(quiz.questions.filter(q=>q.image).length,1);
 assert.equal(quiz.questions.filter(q=>!q.image).length,4);
 for(const q of quiz.questions)assert.equal(q.options.filter(o=>o.correct).length,1);
}
const quiz = new QuizEngine(bank);
quiz.start(1000);
assert.equal(quiz.deadline,61000);
assert.equal(quiz.advance(2000),false);
const wrong = quiz.current.options.findIndex(o=>!o.correct);
const right = quiz.current.options.findIndex(o=>o.correct);
assert.equal(quiz.select(wrong,2000),true);
assert.equal(quiz.select(right,60999),true);
assert.equal(quiz.select(wrong,61000),false);
assert.equal(quiz.tick(60999),false);
assert.equal(quiz.tick(61000),true);
assert.equal(quiz.answers[0].selected,right);
assert.equal(quiz.answers[0].correct,true);
assert.equal(quiz.index,1);
assert.equal(quiz.deadline,121000);
assert.equal(quiz.tick(61000),false);
quiz.tick(121000);
assert.equal(quiz.answers[1].selected,null);
assert.equal(quiz.answers[1].correct,false);
let now=122000;
while(!quiz.done){quiz.select(quiz.current.options.findIndex(o=>o.correct),now);assert(quiz.advance(now));now+=1000;}
assert.equal(quiz.answers.length,5);
assert.equal(quiz.score,4);
assert.equal(quiz.tick(now+100000),false);
assert.equal(quiz.advance(now),false);
const restart=new QuizEngine(bank);restart.start(0);assert.equal(restart.score,0);assert.equal(restart.answers.length,0);
const suspended=new QuizEngine(bank);suspended.start(0);suspended.tick(600000);assert.equal(suspended.index,1);assert.equal(suspended.deadline,660000);
for(const q of bank.filter(q=>q.image)){assert.equal(q.options.length,4);assert(fs.existsSync(q.image));assert(q.imageAlt);}
const photoQuiz = new QuizEngine(bank,()=>0.5);
photoQuiz.start(0);
for(let i=0;i<5;i++){
 const correct=photoQuiz.current.options.findIndex(o=>o.correct);
 photoQuiz.select(correct,i*60000+59999);
 photoQuiz.tick((i+1)*60000);
}
assert.equal(photoQuiz.score,5);
assert.equal(photoQuiz.answers.filter(a=>a.question.image).length,1);
assert(photoQuiz.answers.every(a=>a.timedOut));
const expanded = [...bank,{...bank.find(q=>q.image),id:'photo-test'}];
for(let i=0;i<100;i++)assert.equal(new QuizEngine(expanded).questions.filter(q=>q.image).length,1);
console.log('OK: 4 pytania tekstowe + 1 graficzne, pliki zdjęć, 100 losowań, tasowanie odpowiedzi, zapis po 60 sekundach, punktacja i restart.');

