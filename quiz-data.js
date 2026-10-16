// Pytania z dokumentów; klucze odpowiedzi przekazane przez organizatora.
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
  },
  {
    "id": 47,
    "question": "Kto odkrył starożytny grób podczas orania pola w Czechowicach w 1877 roku?",
    "options": [
      "Tomasz Płoński",
      "Iwan Anders",
      "Franciszek Acher",
      "Kazimierz Matecki"
    ],
    "correct": 1
  },
  {
    "id": 48,
    "question": "Który rosyjski uczony prowadził badania odkrytego w Czechowicach grobowca?",
    "options": [
      "Dmitrij Mendelejew",
      "Iwan Pawłow",
      "Dymitr Samokwasow",
      "Nikołaj Łobaczewski"
    ],
    "correct": 2
  },
  {
    "id": 49,
    "question": "Z ilu granitowych płyt zbudowany był neolityczny grobowiec odkryty w Czechowicach?",
    "options": [
      "13",
      "8",
      "20",
      "6"
    ],
    "correct": 0
  },
  {
    "id": 50,
    "question": "Który ród był związany z Czechowicami w okresie średniowiecza?",
    "options": [
      "Radziwiłłowie",
      "Zamoyscy",
      "Lubomirscy",
      "Wierzbowie"
    ],
    "correct": 3
  },
  {
    "id": 51,
    "question": "Jakim herbem posługiwała się rodzina Czechowskich wywodząca się z Czechowic?",
    "options": [
      "Leliwa",
      "Oksza",
      "Jastrzębiec",
      "Pobóg"
    ],
    "correct": 1
  },
  {
    "id": 52,
    "question": "Ilu właścicieli cząstkowych miały Czechowice według rejestru podatkowego z 1580 roku?",
    "options": [
      "4",
      "6",
      "10",
      "20"
    ],
    "correct": 2
  },
  {
    "id": 53,
    "question": "Kto w 1822 roku kupił Czechowice i Szamoty od Edwarda Płońskiego?",
    "options": [
      "Antoni Korwin-Bieńkowski",
      "Władysław Grabski",
      "Franciszek Acher",
      "Stanisław Wojciechowski"
    ],
    "correct": 0
  },
  {
    "id": 54,
    "question": "Ile osób zamieszkiwało Czechowice w 1822 roku według danych przytoczonych przez Jerzego Domżalskiego?",
    "options": [
      "150",
      "90",
      "300",
      "27"
    ],
    "correct": 3
  },
  {
    "id": 55,
    "question": "Jak nazywała się niewielka wieś położona niegdyś w południowej części dzisiejszego osiedla Niedźwiadek?",
    "options": [
      "Grabkowo",
      "Kalisze",
      "Rakowiec",
      "Jelonki"
    ],
    "correct": 1
  },
  {
    "id": 56,
    "question": "Z jakiego niemieckiego regionu wywodziła się rodzina Kifferów, która osiedliła się w Czechowicach?",
    "options": [
      "Bawarii",
      "Saksonii",
      "Hesji",
      "Brandenburgii"
    ],
    "correct": 2
  },
  {
    "id": 57,
    "question": "Przy jakiej warszawskiej ulicy powstała w 1893 roku fabryka, z której wywodzi się Ursus?",
    "options": [
      "Siennej 15",
      "Wolskiej 100",
      "Marszałkowskiej 1",
      "Żelaznej 50"
    ],
    "correct": 0
  },
  {
    "id": 58,
    "question": "Ilu samochodów wojskowych dotyczył przetarg wygrany przez zakłady Ursus w maju 1924 roku?",
    "options": [
      "500",
      "2000",
      "750",
      "1050"
    ],
    "correct": 3
  },
  {
    "id": 59,
    "question": "W którym roku uruchomiono pierwszy przystanek kolejowy w Gołąbkach?",
    "options": [
      "1926",
      "1913",
      "1939",
      "1905"
    ],
    "correct": 1
  },
  {
    "id": 60,
    "question": "Kto był pierwszym prezesem i fundatorem Ochotniczej Straży Pożarnej utworzonej w Czechowicach w 1925 roku?",
    "options": [
      "Kazimierz Gierdziejewski",
      "Stanisław Bodych",
      "Franciszek Adolf Acher",
      "Władysław Grabski"
    ],
    "correct": 2
  },
  {
    "id": 61,
    "question": "W jaki sposób robotnicy wymuszali zatrzymywanie pociągów w pobliżu fabryki, zanim wprowadzono regularne postoje?",
    "options": [
      "Zaciągali hamulce ręczne i rozpalali ogniska na torach.",
      "Budowali prowizoryczne perony.",
      "Blokowali wejścia na dworzec w Warszawie.",
      "Organizowali strajki w parowozowni."
    ],
    "correct": 0
  },
  {
    "id": 62,
    "question": "Który prezydent Polski interweniował w sprawie regularnych postojów pociągów w Ursusie?",
    "options": [
      "Gabriel Narutowicz",
      "Stanisław Wojciechowski",
      "Lech Wałęsa",
      "Ignacy Mościcki"
    ],
    "correct": 3
  },
  {
    "id": 63,
    "question": "W którym roku zakończono pierwszy etap budowy nowej fabryki Ursus na Szamotach?",
    "options": [
      "1924",
      "1928",
      "1935",
      "1918"
    ],
    "correct": 1
  },
  {
    "id": 64,
    "question": "Który inżynier odpowiadał za projektowanie i nadzór nad budową Fabryki Metalurgicznej w Ursusie?",
    "options": [
      "Edward Habich",
      "Karol Taylor",
      "Kazimierz Gierdziejewski",
      "Bolesław Koehler"
    ],
    "correct": 2
  },
  {
    "id": 65,
    "question": "Na licencji jakiej włoskiej firmy produkowano przed wojną samochody i autobusy Ursus A?",
    "options": [
      "S.P.A.",
      "Alfa Romeo",
      "Lancia",
      "Maserati"
    ],
    "correct": 0
  },
  {
    "id": 66,
    "question": "W którym roku wybudowano Szkołę Powszechną w Czechowicach, do której w pierwszym roku uczęszczało 314 uczniów?",
    "options": [
      "1920",
      "1945",
      "1952",
      "1933"
    ],
    "correct": 3
  },
  {
    "id": 67,
    "question": "Ile numerów obsługiwała pierwsza centrala telefoniczna uruchomiona w Czechowicach w 1937 roku?",
    "options": [
      "100",
      "10",
      "50",
      "500"
    ],
    "correct": 1
  },
  {
    "id": 68,
    "question": "Ilu mieszkańców liczyła osada fabryczna Czechowice w 1939 roku?",
    "options": [
      "Około 3 tysięcy",
      "Około 30 tysięcy",
      "Około 11 tysięcy",
      "Około 50 tysięcy"
    ],
    "correct": 2
  },
  {
    "id": 69,
    "question": "Jak brzmiała skrócona niemiecka nazwa zakładów Ursus podczas okupacji?",
    "options": [
      "Waverma",
      "Ostwerk",
      "Panzerwerke",
      "Ursuswerke"
    ],
    "correct": 0
  },
  {
    "id": 70,
    "question": "Jakie zadanie miały mobilne warsztaty utworzone w fabryce po wybuchu II wojny światowej?",
    "options": [
      "Produkować sprzęt rolniczy dla ludności cywilnej.",
      "Przewozić rannych do szpitali.",
      "Budować fortyfikacje wokół Warszawy.",
      "Naprawiać sprzęt wojskowy za linią frontu."
    ],
    "correct": 3
  },
  {
    "id": 71,
    "question": "Kto sprawował funkcję wójta gminy Skorosze podczas okupacji niemieckiej i pomagał chronić mieszkańców przed represjami?",
    "options": [
      "Franciszek Acher",
      "Władysław Godurkiewicz",
      "Kazimierz Jackowski",
      "Henryk Linowski"
    ],
    "correct": 1
  },
  {
    "id": 72,
    "question": "Jak nazywała się rodzina z Gołąbek, która podczas okupacji ukrywała Żydów i została uhonorowana tytułem Sprawiedliwych wśród Narodów Świata?",
    "options": [
      "Szpudowie",
      "Kifferowie",
      "Krępeciowie",
      "Płońscy"
    ],
    "correct": 2
  },
  {
    "id": 73,
    "question": "Jak nazywano w konspiracji gospodarstwo rodziny Krępeciów, w którym ukrywano osoby prześladowane przez Niemców?",
    "options": [
      "Osada",
      "Twierdza",
      "Przystań",
      "Leśniczówka"
    ],
    "correct": 0
  },
  {
    "id": 74,
    "question": "Jaką nazwę nosił pluton AK wywodzący się z Czechowic, który walczył podczas Powstania Warszawskiego w batalionie „Miotła”?",
    "options": [
      "Goplana",
      "Kordian",
      "Parasol",
      "Torpeda"
    ],
    "correct": 3
  },
  {
    "id": 75,
    "question": "Jaką funkcję pełnił teren zakładów Ursus po upadku Powstania Warszawskiego w 1944 roku?",
    "options": [
      "Lotniska wojskowego",
      "Obozu przejściowego dla wysiedlanej ludności Warszawy",
      "Ośrodka szkolenia niemieckich pilotów",
      "Magazynu żywności dla Warszawy"
    ],
    "correct": 1
  },
  {
    "id": 76,
    "question": "Ile łóżek znajdowało się początkowo w szpitalu powstańczym uruchomionym w Czechowicach w sierpniu 1944 roku?",
    "options": [
      "100",
      "15",
      "30",
      "200"
    ],
    "correct": 2
  },
  {
    "id": 77,
    "question": "Który inżynier kierował powojenną akcją odzyskiwania maszyn Ursusa wywiezionych przez Niemców?",
    "options": [
      "Bolesław Koehler",
      "Kazimierz Gierdziejewski",
      "Emil Schönfeld",
      "Ludwik Rossman"
    ],
    "correct": 0
  },
  {
    "id": 78,
    "question": "Jaki procent wywiezionych maszyn fabrycznych udało się odzyskać do 1946 roku?",
    "options": [
      "Około 25%",
      "Około 40%",
      "Około 95%",
      "Około 70%"
    ],
    "correct": 3
  },
  {
    "id": 79,
    "question": "Na podstawie którego niemieckiego ciągnika opracowano powojenny model Ursus C-45?",
    "options": [
      "Hanomag R40",
      "Lanz Bulldog",
      "Deutz F1M414",
      "Porsche Diesel"
    ],
    "correct": 1
  },
  {
    "id": 80,
    "question": "Który polski inżynier nadzorował prace projektowe nad powojennym ciągnikiem LB-45, później nazwanym Ursus C-45?",
    "options": [
      "Tadeusz Hennel",
      "Stefan Putowski",
      "Edward Habich",
      "Stanisław Śliski"
    ],
    "correct": 2
  },
  {
    "id": 81,
    "question": "Ile ciągników Ursus C-45 wyprodukowano łącznie do 1959 roku według książki „Ursus. Fabryka, Miasto, Ludzie”?",
    "options": [
      "Około 60 tysięcy",
      "Około 10 tysięcy",
      "Około 120 tysięcy",
      "Około 300 tysięcy"
    ],
    "correct": 0
  },
  {
    "id": 82,
    "question": "Jaką nazwę otrzymała w 1957 roku dawna ulica Józefa Piłsudskiego, przemianowana wcześniej na ulicę Józefa Stalina?",
    "options": [
      "Cierlicka",
      "Traktorzystów",
      "Wojciechowskiego",
      "Bohaterów Warszawy"
    ],
    "correct": 3
  },
  {
    "id": 83,
    "question": "W którym roku rozpoczęto budowę tunelu pod torami kolejowymi w ciągu dawnej ulicy Żwirki i Wigury, obecnie Cierlickiej?",
    "options": [
      "1947",
      "1958",
      "1976",
      "1993"
    ],
    "correct": 1
  },
  {
    "id": 84,
    "question": "Jak nazywał się charakterystyczny modernistyczny dom handlowy w Ursusie, znany również z popularnej kawiarni?",
    "options": [
      "Sezam",
      "Smyk",
      "Okrąglak",
      "Merkury"
    ],
    "correct": 2
  },
  {
    "id": 85,
    "question": "Który znany polski zespół muzyczny odnosił pierwsze sukcesy w Domu Kultury Zakładów Mechanicznych Ursus?",
    "options": [
      "Maanam",
      "Perfect",
      "Lady Pank",
      "Budka Suflera"
    ],
    "correct": 0
  },
  {
    "id": 86,
    "question": "Który architekt kierował zespołem, który wygrał konkurs na projekt osiedla Niedźwiadek w 1965 roku?",
    "options": [
      "Marek Leykam",
      "Arseniusz Romanowicz",
      "Bohdan Pniewski",
      "Stefan Putowski"
    ],
    "correct": 3
  },
  {
    "id": 87,
    "question": "Który architekt zaprojektował otwarty w 1971 roku przystanek kolejowy Ursus Północny?",
    "options": [
      "Stefan Putowski",
      "Arseniusz Romanowicz",
      "Marek Leykam",
      "Christian Piotr Aigner"
    ],
    "correct": 1
  },
  {
    "id": 88,
    "question": "Jak potocznie nazywano budynek administracyjny fabryki Ursus, do którego udali się protestujący robotnicy w czerwcu 1976 roku?",
    "options": [
      "Biały Dom",
      "Pałac Dyrektora",
      "Dom Robotnika",
      "Czerwony Pałac"
    ],
    "correct": 0
  },
  {
    "id": 89,
    "question": "Jak nazywał się pociąg, którego elektrowóz został wykolejony podczas protestów robotniczych w Ursusie w czerwcu 1976 roku?",
    "options": [
      "Kaszub",
      "Górnik",
      "Opolanin",
      "Mazowsze"
    ],
    "correct": 2
  },
  {
    "id": 90,
    "question": "W którym roku odsłonięto Pomnik Czerwca 1976 roku w Ursusie?",
    "options": [
      "1976",
      "1990",
      "2001",
      "1981"
    ],
    "correct": 3
  },
  {
    "id": 91,
    "question": "Kto był wieloletnim burmistrzem Ursusa w latach 1993–2002?",
    "options": [
      "Władysław Godurkiewicz",
      "Henryk Linowski",
      "Franciszek Acher",
      "Bolesław Koehler"
    ],
    "correct": 1
  },
  {
    "id": 92,
    "question": "W którym roku ogłoszono upadłość Zakładów Przemysłu Ciągnikowego „Ursus” S.A.?",
    "options": [
      "2003",
      "1991",
      "2011",
      "1989"
    ],
    "correct": 0
  },
  {
    "id": 93,
    "question": "Kiedy uruchomiono przystanek kolejowy Warszawa Ursus Niedźwiadek?",
    "options": [
      "1 stycznia 2000 roku",
      "15 maja 1927 roku",
      "7 stycznia 2014 roku",
      "1 sierpnia 1977 roku"
    ],
    "correct": 2
  },
  {
    "id": 94,
    "question": "Kto zaprojektował trzymetrową rzeźbę niedźwiedzia stojącą u zbiegu ulic Prystora i Ryżowej?",
    "options": [
      "Leszek Nadstawny",
      "Magdalena Abakanowicz",
      "Xawery Dunikowski",
      "Aleksandra Ławicka-Cuper"
    ],
    "correct": 3
  },
  {
    "id": 95,
    "question": "Czyje imię nadano stadionowi RKS Ursus w 2025 roku?",
    "options": [
      "Kazimierza Deyny",
      "Krzysztofa Nowaka",
      "Roberta Gadochy",
      "Włodzimierza Lubańskiego"
    ],
    "correct": 1
  },
  {
    "id": 96,
    "question": "Ile niewielkich rzeźb niedźwiadków z brązu ustawiono w Ursusie w 2024 roku w ramach projektu budżetu obywatelskiego?",
    "options": [
      "8",
      "4",
      "12",
      "20"
    ],
    "correct": 0
  }
];
