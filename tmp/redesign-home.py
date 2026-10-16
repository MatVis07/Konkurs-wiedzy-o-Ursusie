from pathlib import Path
import re
p=Path('index.html');s=p.read_text(encoding='utf-8-sig')
s=s.replace('<link rel="stylesheet" href="style.css">','<link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="home.css">')
s=s.replace('<span class="header-label">POZNAJ. POĆWICZ. WEŹ UDZIAŁ.</span>','''<nav class="home-navigation" aria-label="Menu główne">
      <a href="strefa-wiedzy.html">Strefa wiedzy</a>
      <a href="cwiczenia.html">Ćwiczenia</a>
      <a href="regulamin.html">Regulamin</a>
    </nav>''')
main='''  <main class="container collage-home">
    <section class="collage-copy" aria-labelledby="home-title">
      <p class="eyebrow">KONKURS WIEDZY O URSUSIE</p>
      <h1 id="home-title">Twój<br><em>Ursus.</em><br>Twoja<br>historia.</h1>
      <p class="collage-description">Przygotuj się do konkursu. Odkryj materiały, sprawdź swoją wiedzę i poznaj zasady udziału.</p>
      <div class="home-actions">
        <a class="home-action home-action-primary" href="strefa-wiedzy.html">Poznaj materiały <span aria-hidden="true">↗</span></a>
        <a class="home-action home-action-secondary" href="cwiczenia.html">Sprawdź swoją wiedzę <span aria-hidden="true">→</span></a>
      </div>
      <a class="home-rules" href="regulamin.html">Poznaj regulamin konkursu <span aria-hidden="true">↗</span></a>
    </section>
    <div class="collage-art" aria-hidden="true">
      <img src="assets/ursus-collage.png" alt="" width="1024" height="1024" fetchpriority="high">
      <span class="collage-note">Taka dzielnica.<br>Wielkie historie.</span>
    </div>
  </main>'''
s=re.sub(r'  <main.*?</main>',lambda m:main,s,count=1,flags=re.S)
p.write_text(s,encoding='utf-8')
