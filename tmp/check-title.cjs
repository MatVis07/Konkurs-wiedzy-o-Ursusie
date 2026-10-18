const {chromium}=require('C:/Users/mateu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('node:path');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height] of [[1440,900],[1366,768],[1024,768],[768,1024],[390,844],[375,667],[320,568]]){
await page.setViewportSize({width,height});await page.goto('file:///'+path.resolve('index.html').replaceAll('\\','/'));await page.waitForTimeout(600);
const m=await page.evaluate(()=>({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight,img:document.querySelector('.collage-art img').naturalWidth}));assert(m.w<=width,`Overflow ${width}: ${m.w}`);assert(m.img>0);assert(await page.locator(".title-line").evaluateAll(lines=>lines.every(line=>line.scrollWidth<=line.clientWidth)),"Nagłówek wykracza poza kolumnę");console.log(width,height,m.h);}
for(const [name,file]of [['Strefa wiedzy','strefa-wiedzy.html'],['Ćwiczenia','cwiczenia.html'],['Regulamin','regulamin.html']]){await page.goto('file:///'+path.resolve('index.html').replaceAll('\\','/'));await page.getByRole('navigation',{name:'Menu główne'}).getByRole('link',{name,exact:true}).click();assert(page.url().endsWith(file));}
assert.equal(errors.length,0);await browser.close();console.log('OK: obrazy, responsywność, nawigacja, brak błędów JavaScript.');})().catch(e=>{console.error(e);process.exit(1)});

