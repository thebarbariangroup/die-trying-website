const ID        = Symbol('id');
const WAIT      = Symbol('wait');
const TIMEOUT   = Symbol('timeout');
const IMMEDIATE = Symbol('immediate');

export default class DebounceHelper {

  constructor (type) {
    this.queue = [];
    this.type = type;
    this.nextId = 0;

    this._init();
  }

  static getInstance (type) {
    let instance = DebounceHelper.instances.find((instance) => {
      return instance.type === type;
    });
    if (!instance) {
      instance = new DebounceHelper(type);
      DebounceHelper.instances.push(instance);
    }
    return instance;
  }

  _init () {
    this._onUpdate = this._onUpdate.bind(this);
    window.addEventListener(this.type, this._onUpdate, {passive: true});
  }

  _onUpdate (e) {
    requestAnimationFrame(this._update.bind(this, e));
  }

  _update (e) {
    this.queue.forEach((fn) => {
      clearTimeout(fn[TIMEOUT]);
      
      if (fn[IMMEDIATE] && !fn[TIMEOUT]) {
        fn(e);
      }
      
      fn[TIMEOUT] = setTimeout(() => {
        fn[TIMEOUT] = null;
        if (!fn[IMMEDIATE]) {
          fn(e);
        }
      }, fn[WAIT] || 200);
    });
  }

  add (fn, wait, immediate) {
    fn[ID] = this.nextId++;
    fn[WAIT] = wait;
    fn[IMMEDIATE] = !!immediate;
    this.queue.push(fn);
    return fn[ID];
  }

  remove (id) {
    this.queue = this.queue.filter((fn) => {
      return fn[ID] !== id;
    });
  }

}

DebounceHelper.instances = [];