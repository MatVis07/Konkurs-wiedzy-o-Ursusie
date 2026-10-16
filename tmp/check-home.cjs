const {chromium}=require('C:/Users/mateu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height] of [[1440,900],[1366,768],[1024,768],[768,1024],[390,844],[375,667],[320,568]]){
 await page.setViewportSize({width,height});
 await page.goto('file:///'+path.resolve('index.html').replaceAll('\\','/'));
 await page.waitForTimeout(1000);
 const measurements=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,tiles:[...document.querySelectorAll('.tile')].map(x=>({radius:getComputedStyle(x).borderRadius,visible:x.getBoundingClientRect().width>0})),icons:document.querySelectorAll('.tile-symbol svg').length}));
 assert(measurements.scrollWidth<=width,`Horizontal overflow ${width}`);
 assert(measurements.scrollHeight<=height,`Vertical overflow ${width}x${height}: ${measurements.scrollHeight}`);
 assert.equal(measurements.icons,3);
 assert(measurements.tiles.every(t=>t.radius==='12px'&&t.visible));
 await page.screenshot({path:`tmp/home-${width}.png`,fullPage:true});
 console.log('OK',width,height,measurements.scrollHeight);
}
for(const [label,file] of [['Strefa wiedzy','strefa-wiedzy.html'],['Ćwiczenia','cwiczenia.html'],['Regulamin','regulamin.html']]){
 await page.goto('file:///'+path.resolve('index.html').replaceAll('\\','/'));
 await page.getByRole('link').filter({has:page.getByRole('heading',{name:label,exact:true})}).click();
 assert(page.url().endsWith(file));
}
assert.equal(errors.length,0,errors.join('\n'));
console.log('OK: nawigacja i brak błędów JavaScript.');
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
