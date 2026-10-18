// Wspólne zasady konfiguracji ekranu i silnika quizu.
class QuizSession {
  static limit = 15;
  static types = [
    {id:'choice',label:'Pytania jednokrotnego wyboru',hint:'Wybierz jedną poprawną odpowiedź.'},
    {id:'image',label:'Rozpoznawanie zdjęć',hint:'Zdjęcie miejsca i odpowiedzi A, B, C, D.'},
    {id:'map',label:'Zaznaczanie miejsca na mapie',hint:'Zdjęcie miejsca i wskazanie jego położenia.'}
  ];
  static typeOf(q) { return q.type === 'map' ? 'map' : q.image ? 'image' : 'choice'; }
  static available(bank) {
    return Object.fromEntries(this.types.map(type=>[type.id,bank.filter(q=>this.typeOf(q)===type.id).length]));
  }
  static balanced(available, selected) {
    const counts=Object.fromEntries(this.types.map(t=>[t.id,0]));
    let total=0;
    while(total<this.limit) {
      let changed=false;
      for(const {id} of this.types) {
        if(total===this.limit) break;
        if(selected.includes(id)&&counts[id]<available[id]) { counts[id]++;total++;changed=true; }
      }
      if(!changed) break;
    }
    return counts;
  }
  static validate(counts, available) {
    let total=0;
    for(const {id} of this.types) {
      const value=counts[id]??0;
      if(!Number.isInteger(value)||value<0||value>available[id]) throw new Error('Liczba zadań przekracza dostępną pulę.');
      total+=value;
    }
    if(total<1||total>this.limit) throw new Error('Wybierz od 1 do 15 zadań.');
    return total;
  }
}
if(typeof module!=='undefined') module.exports=QuizSession;

