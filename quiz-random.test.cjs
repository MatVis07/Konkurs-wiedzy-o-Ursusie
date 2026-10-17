const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),Engine=require('./quiz-engine');
const bank=vm.runInNewContext(['quiz-data.js','quiz-images.js','quiz-map-data.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+';[...QUIZ_QUESTIONS,...QUIZ_IMAGE_QUESTIONS,...QUIZ_MAP_QUESTIONS]');
let history=[],previous=null;const ids=[];const positions=new Set();
for(let i=0;i<64;i++){
 const q=new Engine(bank,undefined,previous,history);history=q.textHistory;
 const texts=q.questions.filter(x=>!x.image);const map=q.questions.find(x=>x.type==='map');
 assert.equal(texts.length,3);assert.equal(q.questions.length,5);assert.notEqual(map.id,previous);previous=map.id;
 assert.equal(new Set(q.questions.map(x=>x.id)).size,5);positions.add(q.questions.indexOf(map));
 ids.push(...texts.map(x=>x.id));
}
assert.equal(new Set(ids.slice(0,96)).size,96);assert.equal(new Set(ids.slice(96)).size,96);
assert(positions.size>=4);
const almost=bank.filter(x=>!x.image).slice(0,95).map(x=>x.id);
const boundary=new Engine(bank,undefined,null,almost);assert.equal(new Set(boundary.questions.map(x=>x.id)).size,5);assert.equal(boundary.textHistory.length,2);
console.log('OK: 2 pełne cykle po 96 pytań bez powtórek, mieszanie pozycji, granica cyklu i zachowanie 3+1+1.');
