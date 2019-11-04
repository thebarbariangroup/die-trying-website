import BaseClass from '../utils/BaseClass';

export default class Module extends BaseClass {
  
  constructor(element) {
    super();
    this.element = element;
    this._mqs = [];
  }

  _initialize () {
    console.log('MODULE abstract initialize');
  }

  _setupHandlers () {
    this.onMediaQuery = this.onMediaQuery.bind(this);
    this._checkMqs = this._checkMqs.bind(this);
    this.resizeHelper.add(this._checkMqs);
    // console.log('MODULE setupHandlers done')
  }

  _createMediaQuery (bp, cb) {
    let mqList;
    try {
      mqList = window.matchMedia(bp);
    } catch (e) {
      console.error(`Could not make a media query from provided media string: ${ bp }`);
      throw new Error(e);
    }

    this._mqs.push({
      mq: mqList,
      callback: cb
    });
  }

  onMediaQuery (bp, cb) {
    this._createMediaQuery(bp, cb);
  }

  _checkMqs () {
    this._mqs.forEach(({mq, callback}) => {
      if (mq.matches) callback();
    });
    console.log('checking MQs done', this, this._mqs);
  }
};