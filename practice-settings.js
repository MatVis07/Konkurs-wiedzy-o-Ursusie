const PracticeSettings = (() => {
  const bank=[...QUIZ_QUESTIONS,...QUIZ_IMAGE_QUESTIONS,...QUIZ_MAP_QUESTIONS];
  const available=QuizSession.available(bank);
  const types=QuizSession.types.filter(t=>available[t.id]>0);
  const selected=new Set(types.map(t=>t.id));
  let manual=false;
  let counts=QuizSession.balanced(available,[...selected]);
  const choices=document.getElementById('task-types');
  const rows=document.getElementById('task-counts');
  const toggle=document.getElementById('advanced-toggle');
  const panel=document.getElementById('advanced-panel');
  const summary=document.getElementById('session-total');
  const start=document.getElementById('quiz-start');
  const controls=new Map();
  function update() {
    const total=Object.values(counts).reduce((a,b)=>a+b,0);
    summary.textContent=`Wybrano ${total} z 15 zadań`;
    start.disabled=total===0;
    document.getElementById('session-message').textContent=total===0?'Zaznacz rodzaj i wybierz co najmniej 1 zadanie.':manual?'Tryb zaawansowany: zastosujemy dokładnie podane liczby.':'Tryb podstawowy: automatycznie rozdzielamy zadania między wybrane rodzaje.';
    for(const type of types) {
      const c=controls.get(type.id);
      c.checkbox.checked=selected.has(type.id);
      c.input.value=counts[type.id];
      c.input.max=Math.min(available[type.id],counts[type.id]+15-total);
      c.input.disabled=!selected.has(type.id);
      c.minus.disabled=!selected.has(type.id)||counts[type.id]===0;
      c.plus.disabled=!selected.has(type.id)||total>=15||counts[type.id]>=available[type.id];
      c.row.classList.toggle('type-disabled',!selected.has(type.id));
    }
    document.getElementById('settings-reset').hidden=!manual;
    PracticeLayout.fit();
  }
  function changeCount(type,value) {
    manual=true;
    const others=Object.entries(counts).filter(([id])=>id!==type).reduce((sum,[,n])=>sum+n,0);
    const maximum=Math.min(available[type],15-others);
    const number=Number(value);
    const normalized=Number.isFinite(number)?Math.max(0,Math.min(maximum,Math.trunc(number))):0;
    counts[type]=selected.has(type)?normalized:0;
    document.getElementById('settings-feedback').textContent=number>maximum?`Możesz wybrać maksymalnie ${maximum} zadań tego rodzaju: dostępnych jest ${available[type]}, a limit sesji wynosi 15.`:'';
    update();
  }
  for(const type of types) {
    const label=document.createElement('label');label.className='task-type';
    const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=true;checkbox.id=`type-${type.id}`;
    const copy=document.createElement('span');const title=document.createElement('strong');title.textContent=type.label;
    const hint=document.createElement('small');hint.textContent=`${type.hint} Dostępne: ${available[type.id]}.`;
    copy.append(title,hint);label.append(checkbox,copy);choices.append(label);
    const row=document.createElement('div');row.className='task-count-row';
    const fieldLabel=document.createElement('label');fieldLabel.htmlFor=`count-${type.id}`;fieldLabel.textContent=type.label;
    const group=document.createElement('div');group.className='count-stepper';
    const minus=document.createElement('button');minus.type='button';minus.textContent='−';minus.setAttribute('aria-label',`Zmniejsz: ${type.label}`);
    const input=document.createElement('input');input.type='number';input.id=`count-${type.id}`;input.min='0';input.step='1';input.inputMode='numeric';
    const plus=document.createElement('button');plus.type='button';plus.textContent='+';plus.setAttribute('aria-label',`Zwiększ: ${type.label}`);
    group.append(minus,input,plus);row.append(fieldLabel,group);
    const note=document.createElement('small');note.className='count-availability';note.textContent=`Dostępne w bazie: ${available[type.id]}${available[type.id]<15?' — więcej zadań tego rodzaju nie można wybrać.':'.'}`;row.append(note);rows.append(row);
    controls.set(type.id,{checkbox,input,minus,plus,row});
    checkbox.addEventListener('change',()=>{
      if(checkbox.checked)selected.add(type.id);else selected.delete(type.id);
      if(manual){counts[type.id]=checkbox.checked?Math.min(1,available[type.id],15-Object.values(counts).reduce((a,b)=>a+b,0)):0;}
      else counts=QuizSession.balanced(available,[...selected]);
      document.getElementById('settings-feedback').textContent='';update();
    });
    minus.addEventListener('click',()=>changeCount(type.id,counts[type.id]-1));
    plus.addEventListener('click',()=>changeCount(type.id,counts[type.id]+1));
    input.addEventListener('input',()=>changeCount(type.id,input.value));
  }
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));panel.classList.toggle('is-open',open);panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));
    document.body.classList.toggle('practice-settings-open',open);PracticeLayout.fit();
  });
  document.getElementById('settings-reset').addEventListener('click',()=>{manual=false;counts=QuizSession.balanced(available,[...selected]);document.getElementById('settings-feedback').textContent='';update();});
  update();
  return {getCounts(){QuizSession.validate(counts,available);return {...counts};}};
})();
