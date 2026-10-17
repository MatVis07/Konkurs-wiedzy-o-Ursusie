const {chromium}=require('C:/Users/mateu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');const path=require('node:path');
(async()=>{const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
for(const [width,height]of [[1366,900],[375,812]]){
await p.setViewportSize({width,height});await p.goto('file:///'+path.resolve('cwiczenia.html').replaceAll('\\','/'));await p.clock.install();await p.locator('#quiz-start').click();
let sawMap=false;
for(let i=0;i<5;i++){
if(await p.locator('#quiz-map-task').isVisible()){
 sawMap=true;await p.locator('#quiz-map').scrollIntoViewIfNeeded();
 await p.locator('#quiz-map').click({position:{x:150,y:150}});
 assert(await p.locator('#quiz-next').isEnabled());
 const first=await p.evaluate(()=>({...quiz.selected}));
 await p.locator('#map-select-center').click();
 const last=await p.evaluate(()=>({...quiz.selected}));
 assert(Number.isFinite(last.lat));assert.notDeepEqual(first,last);
 await p.screenshot({path:`tmp/map-question-${width}.png`,fullPage:false});
 await p.clock.fastForward(60100);
 const recorded=await p.evaluate(()=>quiz.answers.find(a=>a.question.type==='map'));
 assert.deepEqual(recorded.selected,last);assert(recorded.timedOut);assert(Number.isFinite(recorded.distance));
}else{await p.locator('#quiz-options input').first().check();await p.locator('#quiz-next').click();}
}
assert(sawMap);assert(await p.locator('#quiz-result').isVisible());assert.equal(await p.locator('.map-review').count(),1);assert.equal(await p.locator('.quiz-review-item').count(),5);assert(await p.locator('.map-distance').textContent());
assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await p.locator('.map-review').scrollIntoViewIfNeeded();await p.screenshot({path:`tmp/map-result-${width}.png`,fullPage:false});
const tiles=await p.locator('.map-review .leaflet-tile').evaluateAll(images=>images.filter(i=>i.complete&&i.naturalWidth>0).length);console.log('OK',width,'wynik, ostatni punkt po czasie, kafelki mapy:',tiles);
await p.locator('#quiz-restart').click();assert(await p.locator('#quiz-active').isVisible());await p.clock.resume();
}
assert.equal(errors.length,0,errors.join('\n'));await b.close();console.log('OK: desktop, telefon, wskazanie, zmiana punktu, automatyczny zapis, mapa wyniku i restart.');})().catch(e=>{console.error(e);process.exit(1)});
