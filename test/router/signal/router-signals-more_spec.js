// Generated by LiveScript 1.2.0
(function(){
  var signals, signalProducer;
  signals = require('../../../signal/signals');
  signalProducer = {};
  describe('Signals', function(){
    afterEach(function(){
      signalProducer.bypassed.removeAll();
      return signalProducer.routed.removeAll();
    });
    specify('should dispatch routed/bypassed/matched twice for same request if calling resetState() in between', function(){
      var bypassed, routed, matched, switched, a, b;
      bypassed = [];
      routed = [];
      matched = [];
      switched = [];
      a = crossroads.addRoute('/{foo}_{bar}');
      a.matched.add(function(a, b){
        return matched.push(a, b);
      });
      a.switched.add(function(req){
        return switched.push(req);
      });
      b = crossroads.addRoute('/maecennas');
      b.matched.add(function(){
        return matched.push('maecennas');
      });
      b.switched.add(function(req){
        return switched.push(req);
      });
      crossroads.bypassed.add(function(req){
        return bypassed.push(req);
      });
      crossroads.routed.add(function(req, data){
        return routed.push(req);
      });
      crossroads.parse('/lorem/ipsum');
      crossroads.parse('/foo_bar');
      crossroads.resetState();
      crossroads.parse('/foo_bar');
      crossroads.parse('/lorem_ipsum');
      crossroads.parse('/dolor');
      crossroads.resetState();
      crossroads.parse('/dolor');
      crossroads.parse('/lorem_ipsum');
      crossroads.parse('/maecennas');
      crossroads.parse('/lorem_ipsum');
      crossroads.parse('/lorem_ipsum');
      expect(routed).toEqual(['/foo_bar', '/foo_bar', '/lorem_ipsum', '/lorem_ipsum', '/maecennas', '/lorem_ipsum']);
      expect(bypassed).toEqual(['/lorem/ipsum', '/dolor', '/dolor']);
      expect(switched).toEqual(['/maecennas', '/lorem_ipsum']);
      return expect(matched).toEqual(['foo', 'bar', 'foo', 'bar', 'lorem', 'ipsum', 'lorem', 'ipsum', 'maecennas', 'lorem', 'ipsum']);
    });
    specify('should dispatch routed/bypassed/matched multiple times for same request if ignoreState == true', function(){
      var bypassed, routed, matched, switched, a;
      bypassed = [];
      routed = [];
      matched = [];
      switched = [];
      crossroads.ignoreState = true;
      a = crossroads.addRoute('/{foo}_{bar}');
      a.matched.add(function(a, b){
        return matched.push(a, b);
      });
      a.switched.add(function(req){
        return switched.push(req);
      });
      crossroads.bypassed.add(function(req){
        return bypassed.push(req);
      });
      crossroads.routed.add(function(req, data){
        routed.push(req);
        return expect(data.route).toBe(a);
      });
      crossroads.parse('/lorem/ipsum');
      crossroads.parse('/foo_bar');
      crossroads.parse('/foo_bar');
      crossroads.parse('/lorem_ipsum');
      crossroads.parse('/dolor');
      crossroads.parse('/dolor');
      crossroads.parse('/lorem_ipsum');
      crossroads.parse('/lorem_ipsum');
      expect(routed).toEqual(['/foo_bar', '/foo_bar', '/lorem_ipsum', '/lorem_ipsum', '/lorem_ipsum']);
      expect(bypassed).toEqual(['/lorem/ipsum', '/dolor', '/dolor']);
      expect(switched).toEqual([]);
      return expect(matched).toEqual(['foo', 'bar', 'foo', 'bar', 'lorem', 'ipsum', 'lorem', 'ipsum', 'lorem', 'ipsum']);
    });
    specify('isFirst should be false on greedy matches', function(){
      var count, firsts;
      count = 0;
      firsts = [];
      crossroads.routed.add(function(req, data){
        count += 1;
        return firsts.push(data.isFirst);
      });
      crossroads.addRoute('/{a}/{b}');
      crossroads.addRoute('/{a}/{b}').greedy = true;
      crossroads.addRoute('/{a}/{b}').greedy = true;
      crossroads.parse('/foo/bar');
      expect(count).toEqual(3);
      expect(firsts[0]).toEqual(true);
      expect(firsts[1]).toEqual(false);
      return expect(firsts[2]).toEqual(false);
    });
    return specify('should dispatch `switched` when matching another route', function(){
      var count, vals, req, r1, r2;
      count = 0;
      vals = [];
      r1 = crossroads.addRoute('/{a}', function(a){
        vals.push(a);
        return count += 1;
      });
      r1.switched.add(function(r){
        var req;
        vals.push('SWITCH');
        req = r;
        return count += 1;
      });
      r2 = crossroads.addRoute('/foo/{a}', function(a){
        vals.push(a);
        return count += 1;
      });
      crossroads.parse('/foo');
      crossroads.parse('/dolor');
      crossroads.parse('/foo/bar');
      expect(count).toBe(4);
      expect(vals).toEqual(['foo', 'dolor', 'SWITCH', 'bar']);
      return expect(req).toEqual('/foo/bar');
    });
  });
}).call(this);
