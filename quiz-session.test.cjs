const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const Session=require('./quiz-session'),Engine=require('./quiz-engine');
const bank=vm.runInNewContext(['quiz-data.js','quiz-images.js','quiz-map-data.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+';[...QUIZ_QUESTIONS,...QUIZ_IMAGE_QUESTIONS,...QUIZ_MAP_QUESTIONS]');
const availability=Session.available(bank);assert.deepEqual(availability,{choice:96,image:2,map:2});
assert.deepEqual(Session.balanced(availability,['choice']),{choice:15,image:0,map:0});
assert.deepEqual(Session.balanced(availability,['image']),{choice:0,image:2,map:0});
assert.deepEqual(Session.balanced(availability,['choice','image','map']),{choice:11,image:2,map:2});
assert.deepEqual(Session.balanced({choice:30,image:30,map:30},['choice','image','map']),{choice:5,image:5,map:5});
assert.deepEqual(Session.balanced(availability,[]),{choice:0,image:0,map:0});
assert.throws(()=>Session.validate({choice:0,image:0,map:0},availability));
assert.throws(()=>Session.validate({choice:15,image:1,map:0},availability));
for(const counts of [{choice:15,image:0,map:0},{choice:1,image:0,map:0},{choice:0,image:2,map:2},{choice:8,image:2,map:1},{choice:0,image:0,map:1}]){
 Session.validate(counts,availability);
 for(let run=0;run<30;run++){
 const quiz=new Engine(bank,undefined,null,[],counts);
 assert.equal(quiz.questions.length,Object.values(counts).reduce((a,b)=>a+b,0));
 assert.equal(new Set(quiz.questions.map(q=>q.id)).size,quiz.questions.length);
 for(const type of Session.types)assert.equal(quiz.questions.filter(q=>Session.typeOf(q)===type.id).length,counts[type.id]);
 quiz.start(0);while(!quiz.done){quiz.select(quiz.current.type==='map'?quiz.current.location:quiz.current.options.findIndex(o=>o.correct),1);quiz.advance(2)}
 assert.equal(quiz.score,quiz.questions.length);
 }
}
for(const counts of [{choice:16,image:0,map:0},{choice:0,image:3,map:0},{choice:0,image:0,map:0},{choice:-1},{choice:1.5}])assert.throws(()=>new Engine(bank,undefined,null,[],counts));
console.log('OK: typy, równy podział, małe pule, limit 1–15, dokładne liczby, brak powtórek, pełna punktacja w 150 sesjach.');
