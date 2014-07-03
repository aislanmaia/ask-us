String.prototype.trunc =
  function(n, useWordBoundary) {
    var toLong = this.length > n,
        s_ = toLong ? this.substr(0, n-1) : this;

    s_ = useWordBoundary && toLong ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    //return toLong ? s_ + '&hellip;' : s_;
    return s_;
  };

Array.prototype.sum = function(selector) {
  if (typeof selector !== 'function') {
    selector = function(item) {
      return item;
    };
  }
  var sum = 0;
  for (var i = 0; i < this.length; i++) {
    sum += selector(this[i]);
  }
  return sum;
};
