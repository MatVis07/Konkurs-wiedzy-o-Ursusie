import json,xml.etree.ElementTree as ET
from pathlib import Path
nodes={};ways={}
for i in range(16):
 root=ET.parse(f'tmp/ursus-grid-{i}.osm').getroot()
 for n in root.findall('node'):nodes[n.attrib['id']]=[round(float(n.attrib['lon']),6),round(float(n.attrib['lat']),6)]
 for w in root.findall('way'):ways[w.attrib['id']]=w
features=[]
for id,w in ways.items():
 tags={t.attrib['k']:t.attrib['v'] for t in w.findall('tag')}
 if tags.get('highway'):
  if tags['highway'] in ['footway','path','steps','corridor','cycleway','construction','proposed']:continue
  kind='road'
 elif tags.get('railway')=='rail':kind='rail'
 elif tags.get('natural')=='water':kind='water'
 elif tags.get('leisure')=='park' or tags.get('landuse') in ['forest','grass','recreation_ground']:kind='green'
 else:continue
 refs=[n.attrib['ref'] for n in w.findall('nd')]
 if any(n not in nodes for n in refs):continue
 points=[nodes[n] for n in refs]
 if len(points)<2:continue
 poly=kind in ['green','water']
 if poly and (len(points)<4 or points[0]!=points[-1]):continue
 features.append({'type':'Feature','properties':{'kind':kind,'road':tags.get('highway',''),'name':tags.get('name','')},'geometry':{'type':'Polygon' if poly else 'LineString','coordinates':[points] if poly else points}})
assert len(features)>300
result={'type':'FeatureCollection','source':'© OpenStreetMap contributors, ODbL 1.0','features':features}
Path('assets/ursus-map-data.js').write_text('// Lokalne dane mapy: © OpenStreetMap contributors, ODbL 1.0.\nconst URSUS_MAP_DATA = '+json.dumps(result,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
print('Lokalna mapa:',len(features),'obiektów,',Path('assets/ursus-map-data.js').stat().st_size,'bajtów')
