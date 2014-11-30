var core    = require('coure-routing');
var Signals = core.signal.Signals;

var RouterSignalsStrategy = {
  _defaultSignalStrategy : function(signalName) {
    if (this[signalName]) {
      var args = [].slice.call(arguments, 1)
      this[signalName].dispatch(args);
    } else {
      logWarning("No signal for:" + signalName);
    }
  }
};

var RouterSignals = Xtender.extend(Signals, RouterSignalsStrategy);

module.exports = RouterSignals;
