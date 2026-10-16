from pathlib import Path
import re
p=Path('index.html');s=p.read_text(encoding='utf-8-sig')
icons=[('<path d="M12 7c-3-2-6-2-9-1v14c3-1 6-1 9 1m0-14c3-2 6-2 9-1v14c-3-1-6-1-9 1V7Z"/>','✳'),('<path d="M12 18V6m0 0C9 1 4 4 5 7c-4 1-4 7-1 8-1 4 5 7 8 3m0-12c3-5 8-2 7 1 4 1 4 7 1 8 1 4-5 7-8 3M5 7l3 2m-4 6 4-2m11-6-3 2m4 6-4-2"/>','?'),('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>','≡')]
for paths,old in icons:
 s=s.replace(f'<span class="tile-symbol" aria-hidden="true">{old}</span>',f'<span class="tile-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">{paths}</svg></span>')
p.write_text(s,encoding='utf-8')
p=Path('style.css');s=p.read_text(encoding='utf-8-sig')
s=re.sub(r'/\* Strona główna dopasowana.*?(?=/\* Logo z pliku)', '',s,flags=re.S)
s=re.sub(r'/\* Rozmyte zdjęcie.*?(?=/\* Zdjęcia w pytaniach)', '',s,flags=re.S)
p.write_text(s,encoding='utf-8')
