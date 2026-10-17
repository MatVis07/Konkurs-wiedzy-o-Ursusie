const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const Engine=require('./quiz-engine');
const bank=vm.runInNewContext(['quiz-data.js','quiz-images.js','quiz-map-data.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+'; [...QUIZ_QUESTIONS,...QUIZ_IMAGE_QUESTIONS,...QUIZ_MAP_QUESTIONS]');
assert.equal(Engine.distanceMeters({lat:52,lng:20},{lat:52,lng:20}),0);
assert(Math.abs(Engine.distanceMeters({lat:0,lng:0},{lat:1,lng:0})-111194.9266)<.1);
assert.equal(Engine.distanceMeters({lat:52,lng:20},{lat:53,lng:21}),Engine.distanceMeters({lat:53,lng:21},{lat:52,lng:20}));
for(let i=0;i<200;i++){
 const q=new Engine(bank);assert.equal(q.questions.length,5);assert.equal(q.questions.filter(x=>x.type==='map').length,1);assert.equal(q.questions.filter(x=>x.image&&x.type!=='map').length,1);assert.equal(q.questions.filter(x=>!x.image).length,3);
 assert.equal(new Set(q.questions.map(x=>x.id)).size,5);
}
function atMap(){const q=new Engine(bank);q.start(0);while(q.current.type!=='map'){q.select(0,1);q.advance(2)}return q;}
const q=atMap();const loc=q.current.location;
assert.equal(q.select({lat:NaN,lng:20},3),false);
assert.equal(q.select({lat:99,lng:20},3),false);
assert(q.select({lat:loc.lat+.01,lng:loc.lng},3));assert(q.select(loc,q.deadline-1));
assert.equal(q.select({lat:loc.lat+.02,lng:loc.lng},q.deadline),false);
q.tick(q.deadline);const a=q.answers.at(-1);assert(a.correct);assert.equal(a.distance,0);assert(a.timedOut);assert.notEqual(a.selected,loc);
const outside=atMap();outside.select({lat:outside.current.location.lat+.003,lng:outside.current.location.lng},3);outside.advance(4);assert(!outside.answers.at(-1).correct);assert(outside.answers.at(-1).distance>300);
const empty=atMap();empty.tick(empty.deadline);assert.equal(empty.answers.at(-1).distance,null);assert(!empty.answers.at(-1).correct);
const all=new Engine(bank);all.start(0);while(!all.done){all.select(all.current.type==='map'?all.current.location:all.current.options.findIndex(o=>o.correct),1);all.advance(2)}assert.equal(all.score,5);
console.log('OK: 200 losowań 3+1+1, odległość haversine, poprawny/błędny punkt, limit czasu, ostatnie wskazanie, brak wskazania, wynik 5/5.');
