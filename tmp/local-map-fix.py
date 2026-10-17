from pathlib import Path
p=Path('quiz-map.js');s=p.read_text(encoding='utf-8-sig')
s=s.replace('minZoom: 12, maxZoom: 19,','minZoom: 13, maxZoom: 18,\n      preferCanvas: true,')
s=s.replace('maxBounds: [[52.16,20.81],[52.245,20.96]],','maxBounds: [[52.175,20.845],[52.229,20.94]],\n      maxBoundsViscosity: 1,')
start=s.index("    L.tileLayer(")
end=s.index('    map.fitBounds(bounds',start)
s=s[:start]+'''    addLocalMap(map);
'''+s[end:]
start=s.index('    const tileLayer = ')
end=s.index('    choosePoint = ',start)
s=s[:start]+s[end:]
s=s.replace("    if (typeof L === 'undefined') {","    if (typeof L === 'undefined' || typeof URSUS_MAP_DATA === 'undefined') {")
s=s.replace("    if (typeof L === 'undefined') return;","    if (typeof L === 'undefined' || typeof URSUS_MAP_DATA === 'undefined') return;")
s=s.replace("  function baseMap(container, interactive = true) {",'''  function addLocalMap(map) {
    map.attributionControl.addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> · mapa lokalna');
    const features = URSUS_MAP_DATA.features;
    const collection = list => ({type:'FeatureCollection',features:list});
    const layer = (list, style) => L.geoJSON(collection(list), {style,interactive:false}).addTo(map);
    layer(features.filter(f => f.properties.kind === 'green'),{color:'#bfd0ac',fillColor:'#d6e1c8',fillOpacity:1,weight:1});
    layer(features.filter(f => f.properties.kind === 'water'),{color:'#9cbeca',fillColor:'#bbd7df',fillOpacity:1,weight:1});
    const roads = features.filter(f => f.properties.kind === 'road');
    const major = road => /^(motorway|trunk|primary|secondary|tertiary)(_link)?$/.test(road);
    layer(roads, f => ({color:major(f.properties.road)?'#c8b586':'#c7c7b9',weight:major(f.properties.road)?7:4,opacity:1}));
    layer(roads, f => ({color:major(f.properties.road)?'#f5dfae':'#fffdf5',weight:major(f.properties.road)?5:2,opacity:1}));
    layer(features.filter(f => f.properties.kind === 'rail'),{color:'#80877a',weight:2,dashArray:'6 4',opacity:.9});
    const labels = L.layerGroup().addTo(map);
    const named = new Map();
    roads.filter(f => f.properties.name).forEach(f => {
      const previous = named.get(f.properties.name);
      if (!previous || f.geometry.coordinates.length > previous.geometry.coordinates.length) named.set(f.properties.name,f);
    });
    const updateLabels = () => {
      labels.clearLayers();
      const occupied = [];
      const view = map.getBounds();
      [...named.values()].sort((a,b)=>Number(major(b.properties.road))-Number(major(a.properties.road))).forEach(f => {
        if (map.getZoom() < 14 && !major(f.properties.road)) return;
        const visible = f.geometry.coordinates.filter(c => view.contains([c[1],c[0]]));
        if (!visible.length) return;
        const point = visible[Math.floor(visible.length/2)];
        const screen = map.latLngToContainerPoint([point[1],point[0]]);
        if (occupied.some(p => Math.abs(p.x-screen.x)<110 && Math.abs(p.y-screen.y)<27)) return;
        occupied.push(screen);
        const text = document.createElement('span');text.textContent=f.properties.name;
        L.marker([point[1],point[0]],{icon:L.divIcon({className:'local-map-label',html:text,iconSize:[140,20],iconAnchor:[70,10]}),interactive:false,keyboard:false}).addTo(labels);
      });
    };
    map.on('moveend zoomend resize',updateLabels);
    map.whenReady(updateLabels);
    L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);
  }
  function baseMap(container, interactive = true) {''')
p.write_text(s,encoding='utf-8')
p=Path('cwiczenia.html');s=p.read_text(encoding='utf-8-sig');s=s.replace('<script src="quiz-map.js" defer></script>','<script src="assets/ursus-map-data.js" defer></script>\n  <script src="quiz-map.js" defer></script>');s=s.replace('Mapa wymaga połączenia z internetem.','Mapa Ursusa jest zapisana lokalnie i działa także bez internetu.');p.write_text(s,encoding='utf-8')
