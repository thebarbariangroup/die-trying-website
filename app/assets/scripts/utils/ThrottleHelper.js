import getScrollY from './getScrollY';
const ID = Symbol('id');

export default class ThrottleHelper {

  constructor (type) {
    this.queue = [];
    this.ticking = false;
    this.type = type;
    this.scrollY = window.getScrollY();
    this.nextId = 0;

    this._init();
  }

  static getInstance (type) {
    let instance = ThrottleHelper.instances.find((instance) => {
      return instance.type === type;
    });
    if (!instance) {
      instance = new ThrottleHelper(type);
      ThrottleHelper.instances.push(instance);
    }
    return instance;
  }

  _init () {
    this._onUpdate = this._onUpdate.bind(this);
    window.addEventListener(this.type, this._onUpdate, {passive: true});
  }

  _onUpdate (e) {
    if (this.ticking) { return; }
    this.ticking = true;
    if (this.type === 'scroll') {
      this.scrollY = window.getScrollY();
    }
    requestAnimationFrame(this._update.bind(this, e));
  }

  _update (e) {
    this.queue.forEach((fn) => {
      fn(e);
    });
    this.ticking = false;
  }

  add (fn) {
    fn[ID] = this.nextId++;
    this.queue.push(fn);
    return fn[ID];
  }

  remove (id) {
    this.queue = this.queue.filter((fn) => {
      return fn[ID] !== id;
    });
  }

}

ThrottleHelper.instances = [];