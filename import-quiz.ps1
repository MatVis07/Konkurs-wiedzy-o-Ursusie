Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::OpenRead('C:/Users/mateu/Downloads/zestaw pytań finał (1).docx')
$reader = [IO.StreamReader]::new($zip.GetEntry('word/document.xml').Open())
[xml]$doc = $reader.ReadToEnd(); $reader.Dispose(); $zip.Dispose()
$ns = [Xml.XmlNamespaceManager]::new($doc.NameTable); $ns.AddNamespace('w','http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$lines = @($doc.SelectNodes('//w:body//w:p',$ns) | ForEach-Object { ($_.SelectNodes('.//w:t',$ns) | ForEach-Object InnerText) -join '' })
$blocks = @{}; $current = 0
foreach ($line in $lines) {
 if ($line -match '^(\d+)\.\s*(\S.*)$') {
  $number = [int]$Matches[1]
  if ($number -eq $current + 1) { $current = $number; $blocks[$current] = @($Matches[2]); continue }
 }
 if ($current -gt 0 -and $line.Trim()) { $blocks[$current] += $line.Trim() }
}
$key = @{1='C';4='B';5='B';7='A';8='D';9='C';40='D';41='B';42='B'}
$questions = @()
for ($id=1; $id -le 46; $id++) {
 $block = $blocks[$id]; if (-not $block) { throw "Brak pytania $id" }
 $options = @(); $letter = if ($key.ContainsKey($id)) {$key[$id]} else {'A'}; $correct = -1
 foreach ($line in $block) {
  if ($line -match '^([A-D])\.\s*(.+)$') { if ($Matches[1] -eq $letter) {$correct=$options.Count}; $options += $Matches[2] }
 }
 $question = $block[0]
 switch ($id) {
  2 { $question='Uzupełnij tekst: Lekarka Władysława Włoczewska z grupą wolontariuszek zorganizowała (1) dla polskich żołnierzy. Po powrocie mężczyzn do Czechowic zaczęto tworzyć struktury (2).'; $options=@('1. Szpital polowy; 2. Polskiego Państwa Podziemnego','1. Szkołę wojskową; 2. Polskiej Partii Robotniczej','1. Punkt żywnościowy; 2. Wojska Polskiego'); $correct=0 }
  3 { $question='Oceń kolejno zdania (P — prawda, F — fałsz):\n1. Marian Krawczyk był lekarzem oraz służył Polskiemu Państwu Podziemnemu.\n2. Stanisław Bodych „Rawicz” był dowódcą kompanii „Goplana” z Czechowic.\n3. Jerzy Włoczewski był jednym z heroicznych szeregowych, który uratował wiele osób z rąk Niemców.'; $question=$question.Replace('\n',"`n"); $options=@('F, P, F','P, P, F','F, F, P','P, F, P'); $correct=0 }
  6 { $options=@('Tak','Nie'); $correct=0 }
  21 { $options=@('Posag 7 Panien','Przemysł 7 Powiatów','Projekt 7 Prototypów','Przedsiębiorstwo 7 Partnerów'); $correct=0 }
  30 { $options=@('C-45','C-330','C-4011','C-360'); $correct=0 }
  39 { $options=@('Przywrócenie związkowi „Solidarność” możliwości legalnego działania oraz obrona internowanych i represjonowanych.','Organizacja eksportu ciągników i poszukiwanie zagranicznych inwestorów.','Budowa osiedla Niedźwiadek i zarządzanie lokalnymi szkołami.'); $correct=0 }
 }
 if ($options.Count -lt 2 -or $correct -lt 0) {throw "Błędne odpowiedzi $id"}
 $questions += [ordered]@{id=$id;question=$question;options=$options;correct=$correct}
}
'// Pytania z dokumentu; klucz odpowiedzi przekazany przez organizatora.' + "`n" + 'const QUIZ_QUESTIONS = ' + (ConvertTo-Json -InputObject $questions -Depth 5) + ';' | Set-Content -Encoding utf8 quiz-data.js
'Zaimportowano ' + $questions.Count + ' pytań.'
