export default class Countdown{
  constructor({futureDate,atualDate}){
    this.futureDate=futureDate;
    this._atualDate=atualDate;
  }
  set _atualDate(atualDate){
    if(atualDate){
      this.atualDate=new Date(atualDate);
      return this.atualDate;
    }else{
      this.atualDate=new Date();
      return this.atualDate;
    }
  }
  get _futureDate(){
    return new Date(this.futureDate);
  }
  get _TimeDiff(){
    return this._futureDate.getTime() - this.atualDate.getTime();
  }
  get isTimeDiffEqualZero(){
    if(this._TimeDiff<=0){
      return true;
    }else{
      return false
    }
  }
  get days(){ 
    return Math.floor(this._TimeDiff/(1000*60*60*24));
  }
  get hours(){
    return Math.floor(this._TimeDiff/(1000*60*60));
  }
  get minutes(){
    return  Math.floor(this._TimeDiff/(1000*60));
  }
  get seconds(){
    return Math.floor(this._TimeDiff/1000);
  }
  get total(){
    const days=this.days;
    const hours= this.hours % 24;
    const minutes=this.minutes % 60;
    const seconds= this.seconds % 60;
    return{
      days,
      hours,
      minutes,
      seconds,
    }
  }

}