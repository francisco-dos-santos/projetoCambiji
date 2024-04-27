export default class Countdown{
  constructor({futureDate}){
    this.futureDate=futureDate;
    this._atualDate=new Date();
  }

  get _futureDate(){
    return new Date(this.futureDate);
  }
  get _TimeDiff(){
    return this._futureDate.getTime() - this._atualDate.getTime();
  }
  get isTimeDiffEqualZero(){
    let isFineshedTime = this._TimeDiff <= 0;
    if(isFineshedTime){
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