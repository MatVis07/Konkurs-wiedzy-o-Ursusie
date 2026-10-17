const fs=require('node:fs');
const data=JSON.parse(fs.readFileSync('tmp/ursus-map-source.json','utf8'));
if(!Array.isArray(data.elements)||data.elements.length<100)throw Error('Brak kompletnych danych mapy');
const features=[];
for(const way of data.elements){
 if(!way.geometry||way.geometry.length<2)continue;
 const tags=way.tags||{};
 let kind=tags.highway?'road':tags.railway==='rail'?'rail':tags.natural==='water'?'water':'green';
 const points=way.geometry.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon)).map(p=>[+p.lon.toFixed(6),+p.lat.toFixed(6)]);
 const closed=points.length>=4&&points[0][0]===points.at(-1)[0]&&points[0][1]===points.at(-1)[1];
 if((kind==='water'||kind==='green')&&!closed)continue;
 features.push({type:'Feature',properties:{kind,road:tags.highway||'',name:tags.name||''},geometry:{type:closed&&(kind==='water'||kind==='green')?'Polygon':'LineString',coordinates:closed&&(kind==='water'||kind==='green')?[points]:points}});
}
const result={type:'FeatureCollection',source:'© OpenStreetMap contributors, ODbL 1.0',timestamp:data.osm3s?.timestamp_osm_base,features};
fs.writeFileSync('assets/ursus-map-data.js','// Lokalne dane mapy: © OpenStreetMap contributors, ODbL 1.0.\nconst URSUS_MAP_DATA = '+JSON.stringify(result)+';\n');
console.log('Lokalna mapa:',features.length,'obiektów;',fs.statSync('assets/ursus-map-data.js').size,'bajtów.');
