from pathlib import Path
p=Path('tmp/check-map.cjs');s=p.read_text(encoding='utf-8-sig')
s=s.replace("const errors=[];p.on('pageerror',e=>errors.push(e.message));","const errors=[];p.on('pageerror',e=>errors.push(e.message)); const external=[];p.on('request',r=>{if(r.url().startsWith('http'))external.push(r.url())});await p.context().setOffline(true);")
s=s.replace("const tiles=await p.locator('.map-review .leaflet-tile').evaluateAll(images=>images.filter(i=>i.complete&&i.naturalWidth>0).length);console.log('OK',width,'wynik, ostatni punkt po czasie, kafelki mapy:',tiles);","assert.equal(await p.locator('.leaflet-tile').count(),0);assert(await p.locator('.map-review canvas').count()>0);console.log('OK',width,'mapa lokalna offline, wynik i ostatni punkt po czasie');")
s=s.replace("assert.equal(errors.length,0,errors.join('\\n'));","assert.equal(errors.length,0,errors.join('\\n'));assert(!external.some(u=>!u.includes('fonts.googleapis')&&!u.includes('fonts.gstatic')),external.join('\\n'));")
Path('tmp/check-map-offline.cjs').write_text(s,encoding='utf-8')
