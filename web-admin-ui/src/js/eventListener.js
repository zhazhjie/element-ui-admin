/**
 * @author: zzj
 * @date: 2019-08-16 11:40:20
 * @version: 1.0
 * 事件监听器（事件订阅、触发）
 */
export class EventListener{
  constructor(){
    this.subs={};
  }
  emit(event,...arg){
    this.subs[event]&&this.subs[event].forEach(cb=>{
      cb.call(this,...arg);
    })
  }
  on(event,cb){
    if(!this.subs[event]){
      this.subs[event]=[];
    }
    this.subs[event].push(cb);
  }
  once(event,onceCb){
    let cb=(...arg)=>{
      onceCb.call(this,...arg);
      this.off(event,cb);
    };
    this.on(event,cb);
  }
  off(event,cb){
    if(this.subs[event]){
      let index=this.subs[event].indexOf(cb);
      if(index>-1){
        this.subs[event].splice(index,1);
      }
    }
  }
}
