// Pytania z dokumentu; klucz odpowiedzi przekazany przez organizatora.
const QUIZ_QUESTIONS = [
  {
    "id": 1,
    "question": "W którym roku podczs II wojny światowej wojska niemieckie wkroczyły na tereny Czechowic?",
    "options": [
      "1989",
      "1899",
      "1939",
      "1940"
    ],
    "correct": 2
  },
  {
    "id": 2,
    "question": "Uzupełnij tekst: Lekarka Władysława Włoczewska z grupą wolontariuszek zorganizowała (1) dla polskich żołnierzy. Po powrocie mężczyzn do Czechowic zaczęto tworzyć struktury (2).",
    "options": [
      "1. Szpital polowy; 2. Polskiego Państwa Podziemnego",
      "1. Szkołę wojskową; 2. Polskiej Partii Robotniczej",
      "1. Punkt żywnościowy; 2. Wojska Polskiego"
    ],
    "correct": 0
  },
  {
    "id": 3,
    "question": "Oceń kolejno zdania (P — prawda, F — fałsz):\n1. Marian Krawczyk był lekarzem oraz służył Polskiemu Państwu Podziemnemu.\n2. Stanisław Bodych „Rawicz” był dowódcą kompanii „Goplana” z Czechowic.\n3. Jerzy Włoczewski był jednym z heroicznych szeregowych, który uratował wiele osób z rąk Niemców.",
    "options": [
      "F, P, F",
      "P, P, F",
      "F, F, P",
      "P, F, P"
    ],
    "correct": 0
  },
  {
    "id": 4,
    "question": "W którym roku powstała fabryka Ursus w Czechowicach?",
    "options": [
      "1987",
      "1924",
      "1910",
      "1919"
    ],
    "correct": 1
  },
  {
    "id": 5,
    "question": "W latach 1947 - 1950 był produkowany model traktora, wybierz",
    "options": [
      "C330",
      "C-45",
      "C-320",
      "C-325"
    ],
    "correct": 1
  },
  {
    "id": 6,
    "question": "Czy firma Massey-Ferguson podpisała jakąkolwiek umowę/licencje z firmą Ursus?",
    "options": [
      "Tak",
      "Nie"
    ],
    "correct": 0
  },
  {
    "id": 7,
    "question": "W którym roku miasto Ursus zostało włączone do Warszawy?",
    "options": [
      "1977",
      "1980",
      "1962",
      "1922"
    ],
    "correct": 0
  },
  {
    "id": 8,
    "question": "Z którego wieku pochodzą najstarsze wzmianki o terenach dzisiejszego Ursusa?",
    "options": [
      "X",
      "XII",
      "XX",
      "XV"
    ],
    "correct": 3
  },
  {
    "id": 9,
    "question": "Jaka firma w roku 2011 wykupiłaz Ursus?",
    "options": [
      "Massey-Ferguson",
      "John Deere",
      "POL-MOT",
      "Została sprzedana dla Miasta Warszawy"
    ],
    "correct": 2
  },
  {
    "id": 10,
    "question": "W którym roku odkryto w Czechowicach grób neolityczny, z którego znaleziska dziś są przechowywane w Moskwie?",
    "options": [
      "1877",
      "1956",
      "1746"
    ],
    "correct": 0
  },
  {
    "id": 11,
    "question": "Najstarsze wzmianki o Czechowicach pochodzą z:",
    "options": [
      "1417-1429",
      "1300-1301",
      "1567-1568"
    ],
    "correct": 0
  },
  {
    "id": 12,
    "question": "Najstarsze wzmianki o Gołąbkach pochodzą z:",
    "options": [
      "1425",
      "1200",
      "1678"
    ],
    "correct": 0
  },
  {
    "id": 13,
    "question": "Najstarsze wzmianki o Gołąbkach pochodzą z:",
    "options": [
      "1438",
      "1567",
      "1345"
    ],
    "correct": 0
  },
  {
    "id": 14,
    "question": "Gdzie znajduje się zabytkowa kapliczka z przełomu 18/19w z obrazem Matki Boskiej Częstochowskiej?",
    "options": [
      "przy skrzyżowaniu ul. Dzieci Warszawy z ul. Skoroszewska",
      "przy ul. Szancera",
      "przy ul. Zaczarowanej Dorożki"
    ],
    "correct": 0
  },
  {
    "id": 15,
    "question": "Kiedy siedziba gminy Pruszkowa została przeniesiona na Skorosze:",
    "options": [
      "ok 1890",
      "ok 1700",
      "ok 1914"
    ],
    "correct": 0
  },
  {
    "id": 16,
    "question": "Jakie miejscowości w maju 1918 r wchodziło w skład gminy skorosze?",
    "options": [
      "Skorosze i Czechowice",
      "Tylko Skorosze",
      "Skorosze i Gołąbki"
    ],
    "correct": 0
  },
  {
    "id": 17,
    "question": "Jak dawniej nazywała się ulica Dzieci Warszawy?",
    "options": [
      "Jana III Sobieskiego",
      "nie zmieniła swojej nazwy",
      "ul. Wolska"
    ],
    "correct": 0
  },
  {
    "id": 18,
    "question": "W którym roku siedzibę gminy skorosze przeniesiono do czechowic?",
    "options": [
      "1937",
      "1895",
      "1940"
    ],
    "correct": 0
  },
  {
    "id": 19,
    "question": "Jak się dawniej nazywała ulica Bohaterów Warszawy?",
    "options": [
      "Józefa Piłsudskiego",
      "nie zmieniła swojej nazwy",
      "Czubatki"
    ],
    "correct": 0
  },
  {
    "id": 20,
    "question": "Jak się początkowo nazywała Fabryka Ursus?",
    "options": [
      "Towarzystwo Udziałowe Specjalnej Fabryki Armatur i Motorów",
      "od początku nie zmieniła swojej nazwy"
    ],
    "correct": 0
  },
  {
    "id": 21,
    "question": "Co oznaczał skrót P7P?",
    "options": [
      "Posag 7 Panien",
      "Przemysł 7 Powiatów",
      "Projekt 7 Prototypów",
      "Przedsiębiorstwo 7 Partnerów"
    ],
    "correct": 0
  },
  {
    "id": 22,
    "question": "Co produkowano w Towarzystwie Udziałowym Specjalnej Fabryki Armatur i Motorów?",
    "options": [
      "Armaturę dla cukrowni, gorzelni i wodociągów oraz małe silniki Ursus",
      "tylko motory",
      "tylko silniki samochodowe"
    ],
    "correct": 0
  },
  {
    "id": 23,
    "question": "Dlaczego Fabrykę nazwano Ursus?",
    "options": [
      "Po zwiększeniu popularności „Quo Vadis” i otrzymaniu Nagrody Nobla przez Sienkiewicza (od nazwy jednego z głównych bohaterów) - była to nazwa którą początkowo nosił model silników",
      "Od nazwy dzielnicy"
    ],
    "correct": 0
  },
  {
    "id": 24,
    "question": "W jakiej dzielnicy uruchomiono w 1910 roku oddział zakładów?",
    "options": [
      "Wola",
      "Bemowo",
      "Białołęka"
    ],
    "correct": 0
  },
  {
    "id": 25,
    "question": "Co Ursus wyprodukował jako pierwszy  w Polsce?",
    "options": [
      "Ciągniki",
      "Motory",
      "Koparki"
    ],
    "correct": 0
  },
  {
    "id": 26,
    "question": "W co przekształciła się fabryka po I wojnie światowej?",
    "options": [
      "W spółkę akcyjną",
      "Nic nie zostało zmienione"
    ],
    "correct": 0
  },
  {
    "id": 27,
    "question": "Gdzie sprzedawano silniki spalinowe wyprodukowane w oddziale fabryki na Woli?",
    "options": [
      "W Rosji",
      "Na Węgrzech"
    ],
    "correct": 0
  },
  {
    "id": 28,
    "question": "Z jakich osiedli składa się Ursus?",
    "options": [
      "Gołąbki, Szamoty, Skorosze, Czechowice, Niedźwiadek",
      "Gołąbki i Szamoty",
      "Gołąbki, Szamoty, Skorosze, Czechowice"
    ],
    "correct": 0
  },
  {
    "id": 29,
    "question": "Z jakimi dzielnicami sąsiaduje Ursus?",
    "options": [
      "Włochy, Bemowo",
      "Tylko Włochy",
      "Włochy, Bemowo i Ursynów"
    ],
    "correct": 0
  },
  {
    "id": 30,
    "question": "Jaka była nazwa modelu pierwszego ciągnika wyprodukowanego w fabryce ,,Ursus” po II wojnie śwoatowej?",
    "options": [
      "C-45",
      "C-330",
      "C-4011",
      "C-360"
    ],
    "correct": 0
  },
  {
    "id": 31,
    "question": "W którym roku w Fabryce ,,Ursus” zaczęto produkować Czechosłowackie ciągniki Zetor 4011 (W Polsce oznaczone symbolem C-4011)?",
    "options": [
      "w 1961 roku",
      "w 1950",
      "w 1943"
    ],
    "correct": 0
  },
  {
    "id": 32,
    "question": "Ile osób pracowało w zakładzie ,,Ursus II” ?",
    "options": [
      "Ok. 20 tys",
      "30 tys",
      "5 tys"
    ],
    "correct": 0
  },
  {
    "id": 33,
    "question": "Ile producentów części i podzespołów ciągnikowych należało do Zrzeszenia Przemysłu Ciągnikowego URSUS?",
    "options": [
      "Pięć",
      "Cztery",
      "Dwa"
    ],
    "correct": 0
  },
  {
    "id": 34,
    "question": "W którym roku na mocy rozporządzenia premiera Józefa Cyrankiewicza zostało utworzone miasto Czechowice?",
    "options": [
      "w 1952 roku",
      "w 1976",
      "w 1800"
    ],
    "correct": 0
  },
  {
    "id": 35,
    "question": "W którym roku zmieniono miastu Czechowice nazwę na Ursus?",
    "options": [
      "w 1954 roku",
      "w 1900",
      "w 1973"
    ],
    "correct": 0
  },
  {
    "id": 36,
    "question": "W którym roku rozpoczęto budowę osiedla ,,Niedźwiadek”?",
    "options": [
      "w 1968 roku",
      "w 1900",
      "w 1970"
    ],
    "correct": 0
  },
  {
    "id": 37,
    "question": "Którego dnia czerwca rozpoczął się słynny strajk w 1976?",
    "options": [
      "25 Czerwca",
      "1 Czerwca",
      "12 Czerwca"
    ],
    "correct": 0
  },
  {
    "id": 38,
    "question": "Do jakiej dzielnicy Warszawy na początku należał Ursus?",
    "options": [
      "Do Ochoty",
      "Do Bemowa",
      "Do Włoch"
    ],
    "correct": 0
  },
  {
    "id": 39,
    "question": "Jakie były cele działania Tajnej Komisji Zakładowej?",
    "options": [
      "Przywrócenie związkowi „Solidarność” możliwości legalnego działania oraz obrona internowanych i represjonowanych.",
      "Organizacja eksportu ciągników i poszukiwanie zagranicznych inwestorów.",
      "Budowa osiedla Niedźwiadek i zarządzanie lokalnymi szkołami."
    ],
    "correct": 0
  },
  {
    "id": 40,
    "question": "Co produkowano w PZinż Ursus w latach 30  XX wieku?",
    "options": [
      "Traktory",
      "samoloty",
      "autobusy",
      "Czołgi."
    ],
    "correct": 3
  },
  {
    "id": 41,
    "question": "W którym roku odbył się rajd samochodowy decydujący o tym, od której firmy kupiono licencję na produkcji samochodów w Ursusie?",
    "options": [
      "1922",
      "1923",
      "1920",
      "1921"
    ],
    "correct": 1
  },
  {
    "id": 42,
    "question": "Jaka firma wygrała rajd w kategorii półciężarówek?",
    "options": [
      "Berliet",
      "Spa",
      "Saurer",
      "Mars"
    ],
    "correct": 1
  },
  {
    "id": 43,
    "question": "Kiedy podpisano umowę między ministerstwem spraw wojskowych a Ursusem na produkcję samochodów?",
    "options": [
      "1924",
      "1928",
      "1923",
      "1925"
    ],
    "correct": 0
  },
  {
    "id": 44,
    "question": "Kiedy bank gospodarstwa krajowego przejął Fabrykę Ursus?",
    "options": [
      "10 marca 1930",
      "17 kwietnia 1930",
      "16 maja 1930",
      "11 czerwca 1930"
    ],
    "correct": 0
  },
  {
    "id": 45,
    "question": "Co wnosiła umowa polsko-brytyjska z 1974 roku?",
    "options": [
      "Możliwość produkcji traktorów firmy Massey Ferguson",
      "Możliwość produkcji samochodów Fiat",
      "Możliwość produkcji samochodów Daewoo",
      "Możliwość produkcji traktorów Ursus"
    ],
    "correct": 0
  },
  {
    "id": 46,
    "question": "Kiedy powstała gmina Skorosze?",
    "options": [
      "1916",
      "1919",
      "1920",
      "1921"
    ],
    "correct": 0
  }
];
