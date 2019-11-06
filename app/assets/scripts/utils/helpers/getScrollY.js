export default (function () {
  window.getScrollY = function getScrollY () {
    return window.scrollY || window.pageYOffset;
  }
})();