const QUIZ_MAP_QUESTIONS = [
  {
    id: 'map-urzad-ursus',
    type: 'map',
    question: 'Gdzie znajduje się miejsce ze zdjęcia? Zaznacz jego położenie na mapie Ursusa.',
    image: 'assets/urzad-dzielnicy-ursus.jpg',
    imageAlt: 'Duży budynek z zegarem, kolorowymi pasami na elewacji i parkingiem przed wejściem.',
    placeName: 'Urząd Dzielnicy Ursus',
    location: {lat: 52.20122, lng: 20.89314},
    radiusMeters: 200,
    locationSource: 'https://www.openstreetmap.org/way/113458042'
  },
  {
    id: 'map-kapliczka-skorosze',
    type: 'map',
    question: 'Gdzie znajduje się miejsce z archiwalnego zdjęcia? Zaznacz jego dzisiejsze położenie na mapie Ursusa.',
    image: 'assets/kapliczka-skorosze.jpeg',
    imageAlt: 'Archiwalne zdjęcie niewielkiej kapliczki z ozdobnym szczytem, stojącej między drzewami.',
    placeName: 'Zabytkowa kapliczka na Skoroszach — ul. Dzieci Warszawy 27A',
    location: {lat: 52.1932527, lng: 20.9043791},
    radiusMeters: 200,
    locationSource: 'https://www.openstreetmap.org/node/2990162926'
  }
];
