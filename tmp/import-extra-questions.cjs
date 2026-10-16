const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('C:/Users/mateu/Downloads/pytania_ursus_codex.md','utf8');
const bank = vm.runInNewContext(fs.readFileSync('quiz-data.js','utf8')+'; QUIZ_QUESTIONS');
const original = JSON.stringify(bank);
const blocks = [...source.matchAll(/^### (\d+)\. (.+)\r?\n([\s\S]*?)(?=^### |^## |$(?![\s\S]))/gm)];
assert.equal(blocks.length,50);
let added = 0;
for (const match of blocks) {
 const id = Number(match[1]);
 const options = [...match[3].matchAll(/^([A-D])\. (.+)$/gm)].map(m=>m[2].trim());
 const letter = match[3].match(/\*\*POPRAWNA: ([A-D])\*\*/)?.[1];
 assert.equal(options.length,4,`Odpowiedzi pytania ${id}`);
 assert(letter,`Klucz pytania ${id}`);
 const question = {id,question:match[2].trim(),options,correct:letter.charCodeAt(0)-65};
 const existing = bank.find(q=>q.id===id);
 if(existing){assert.equal(JSON.stringify(existing),JSON.stringify(question));continue;}
 assert(!bank.some(q=>q.question.trim()===question.question),`Duplikat ${id}`);
 bank.push(question);added++;
}
assert.equal(bank.length,96);
assert.equal(JSON.stringify(bank.slice(0,46)),original);
assert.equal(new Set(bank.map(q=>q.id)).size,96);
fs.writeFileSync('quiz-data.js','// Pytania z dokumentów; klucze odpowiedzi przekazane przez organizatora.\nconst QUIZ_QUESTIONS = '+JSON.stringify(bank,null,2)+';\n');
console.log(`Dodano ${added} pytań. Baza: 96 pytań tekstowych. Zachowano wszystkie wcześniejsze pytania i sprawdzono 50 kluczy.`);
