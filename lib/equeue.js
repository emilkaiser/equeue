(function () {
  function nextTick(fn) {
    if (typeof setImmediate === 'function') {
      setImmediate(fn);
    } else {
      setTimeout(fn, 0);
    }
  }
  function equeue(worker) {
    var q = [], flushed = false;
    function fn(d) {
      return function () {
        worker(d);
      };
    }
    return {
      push: function (data) {
        if (flushed) {
          nextTick(fn(data));
        } else {
          q.push(data);
        }
      },
      unshift: function (data) {
        if (flushed) {
          nextTick(fn(data));
        } else {
          q.unshift(data);
        }
      },
      flush: function () {
        if (flushed) {
          return;
        }
        while (q[0]) {
          nextTick(fn(q.shift()));
        }
        flushed = true;
      },
      fill: function () {
        flushed = false;
      }
    };
  }
  if (typeof module !== 'undefined') {
    module.exports = equeue;
  } else {
    this.equeue = equeue;
  }
}());
