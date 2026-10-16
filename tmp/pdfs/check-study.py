from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from pypdf import PdfReader
class Check(HTMLParser):
 def __init__(self): super().__init__(); self.ids=[];self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='a':self.links.append(a.get('href',''))
p=Check();p.feed(Path('strefa-wiedzy.html').read_text(encoding='utf-8-sig'))
assert len(p.ids)==len(set(p.ids)), 'Powtórzone identyfikatory'
pages=len(PdfReader('assets/ursus-fabryka-miasto-ludzie.pdf').pages)
for link in p.links:
 u=urlsplit(link)
 if u.scheme:continue
 if u.path:assert Path(u.path).exists(),link
 if not u.path and u.fragment:assert u.fragment in p.ids,link
 if u.path.endswith('.pdf') and u.fragment:assert 1<=int(u.fragment.split('=')[1])<=pages
assert sum(i.startswith('temat-') for i in p.ids)==8
print('OK: 8 tematów, unikalne identyfikatory, odnośniki lokalne, bibliografia i numery stron PDF.')
