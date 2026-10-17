// Leaflet odpowiada za mapę, a QuizEngine za odległość i punktację.
const QuizMaps = (() => {
  const bounds = [[52.177,20.842],[52.226,20.937]];
  let activeMap = null;
  let reviewMaps = [];
  let selectedMarker = null;
  let choosePoint = null;
  function addLocalMap(map) {
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
  function baseMap(container, interactive = true) {
    const map = L.map(container, {
      scrollWheelZoom: false,
      maxBounds: [[52.175,20.845],[52.229,20.94]],
      maxBoundsViscosity: 1,
      minZoom: 13, maxZoom: 18,
      preferCanvas: true,
      keyboard: interactive,
      zoomAnimation: false,
      fadeAnimation: false,
      markerZoomAnimation: false
    });
    addLocalMap(map);
    map.fitBounds(bounds, {padding:[10,10],animate:false});
    return map;
  }
  function stop() {
    if (activeMap) activeMap.remove();
    activeMap = null;
    selectedMarker = null;
    choosePoint = null;
  }
  function clearReviews() {
    reviewMaps.forEach(map => map.remove());
    reviewMaps = [];
  }
  function start(onSelect) {
    stop();
    const status = document.getElementById('map-selection-status');
    const network = document.getElementById('map-network-status');
    status.textContent = 'Nie zaznaczono jeszcze miejsca.';
    network.hidden = true;
    if (typeof L === 'undefined' || typeof URSUS_MAP_DATA === 'undefined') {
      network.textContent = 'Nie udało się uruchomić mapy. Odśwież stronę i sprawdź pliki mapy.';
      network.hidden = false;
      return;
    }
    activeMap = baseMap('quiz-map');
    choosePoint = point => {
      if (!onSelect({lat:point.lat,lng:point.lng})) return;
      if (selectedMarker) selectedMarker.setLatLng(point);
      else selectedMarker = L.circleMarker(point, {radius:9,color:'#202821',weight:3,fillColor:'#B5A77B',fillOpacity:1}).addTo(activeMap);
      status.textContent = 'Miejsce zaznaczone. Kliknij inne miejsce, aby zmienić wybór, lub zatwierdź odpowiedź.';
    };
    activeMap.on('click', event => choosePoint(event.latlng));
    activeMap.invalidateSize();
  }
  document.getElementById('map-select-center').addEventListener('click', () => {
    if (activeMap && choosePoint) choosePoint(activeMap.getCenter());
  });
  document.getElementById('map-reset-view').addEventListener('click', () => {
    if (activeMap) activeMap.fitBounds(bounds,{padding:[10,10]});
  });
  function review(container, answer) {
    if (typeof L === 'undefined' || typeof URSUS_MAP_DATA === 'undefined') return;
    const map = baseMap(container, false);
    reviewMaps.push(map);
    const actual = answer.question.location;
    L.circleMarker(actual,{radius:8,color:'#355b3b',fillColor:'#607457',fillOpacity:1,weight:3}).addTo(map).bindTooltip('Prawidłowa lokalizacja');
    L.circle(actual,{radius:answer.question.radiusMeters,color:'#607457',fillOpacity:.1,weight:1}).addTo(map);
    if (answer.selected) {
      L.circleMarker(answer.selected,{radius:8,color:'#5d4221',fillColor:'#B5A77B',fillOpacity:1,weight:3}).addTo(map).bindTooltip('Twoje wskazanie');
      L.polyline([answer.selected,actual],{color:'#5d4221',weight:2,dashArray:'6 6'}).addTo(map);
      map.fitBounds(L.latLngBounds([answer.selected,actual]).pad(.5),{maxZoom:16,padding:[35,35],animate:false});
    } else map.setView(actual,15,{animate:false});
    map.invalidateSize();
  }
  return {start,stop,clearReviews,review};
})();
