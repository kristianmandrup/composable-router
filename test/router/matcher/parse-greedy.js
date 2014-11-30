// Generated by LiveScript 1.2.0
(function(){
  var crossroads;
  crossroads = require('../../../crossroads');
  describe('crossroads.parse )', function(){
    var _prevTypecast;
    beforeEach(function(){
      var _prevTypecast;
      return _prevTypecast = crossroads.shouldTypecast;
    });
    afterEach(function(){
      crossroads.resetState();
      crossroads.removeAllRoutes();
      crossroads.routed.removeAll();
      crossroads.bypassed.removeAll();
      return crossroads.shouldTypecast = _prevTypecast;
    });
    describe('greedy routes', function(){
      specify('should match multiple greedy routes', function(){
        var t1, t2, t3, t4, t5, t6, t7, t8, r1, r2, r3, r4;
        r1 = crossroads.addRoute('/{a}/{b}/', function(a, b){
          var t1, t2;
          t1 = a;
          return t2 = b;
        });
        r1.greedy = false;
        r2 = crossroads.addRoute('/bar/{b}/', function(a, b){
          var t3, t4;
          t3 = a;
          return t4 = b;
        });
        r2.greedy = true;
        r3 = crossroads.addRoute('/foo/{b}/', function(a, b){
          var t5, t6;
          t5 = a;
          return t6 = b;
        });
        r3.greedy = true;
        r4 = crossroads.addRoute('/{a}/:b:/', function(a, b){
          var t7, t8;
          t7 = a;
          return t8 = b;
        });
        r4.greedy = true;
        crossroads.parse('/foo/lorem');
        expect(t1).toEqual('foo');
        expect(t2).toEqual('lorem');
        expect(t3).toBeUndefined();
        expect(t4).toBeUndefined();
        expect(t5).toEqual('lorem');
        expect(t6).toBeUndefined();
        expect(t7).toEqual('foo');
        return expect(t8).toEqual('lorem');
      });
      specify('should allow global greedy setting', function(){
        var t1, t2, t3, t4, t5, t6, t7, t8, r1, r2, r3, r4;
        crossroads.greedy = true;
        r1 = crossroads.addRoute('/{a}/{b}/', function(a, b){
          var t1, t2;
          t1 = a;
          return t2 = b;
        });
        r2 = crossroads.addRoute('/bar/{b}/', function(a, b){
          var t3, t4;
          t3 = a;
          return t4 = b;
        });
        r3 = crossroads.addRoute('/foo/{b}/', function(a, b){
          var t5, t6;
          t5 = a;
          return t6 = b;
        });
        r4 = crossroads.addRoute('/{a}/:b:/', function(a, b){
          var t7, t8;
          t7 = a;
          return t8 = b;
        });
        crossroads.parse('/foo/lorem');
        expect(t1).toEqual('foo');
        expect(t2).toEqual('lorem');
        expect(t3).toBeUndefined();
        expect(t4).toBeUndefined();
        expect(t5).toEqual('lorem');
        expect(t6).toBeUndefined();
        expect(t7).toEqual('foo');
        expect(t8).toEqual('lorem');
        return crossroads.greedy = false;
      });
      return describe('greedyEnabled', function(){
        afterEach(function(){
          return crossroads.greedyEnabled = true;
        });
        return specify('should toggle greedy behavior', function(){
          var t1, t2, t3, t4, t5, t6, t7, t8, r1, r2, r3, r4;
          crossroads.greedyEnabled = false;
          r1 = crossroads.addRoute('/{a}/{b}/', function(a, b){
            var t1, t2;
            t1 = a;
            return t2 = b;
          });
          r1.greedy = false;
          r2 = crossroads.addRoute('/bar/{b}/', function(a, b){
            var t3, t4;
            t3 = a;
            return t4 = b;
          });
          r2.greedy = true;
          r3 = crossroads.addRoute('/foo/{b}/', function(a, b){
            var t5, t6;
            t5 = a;
            return t6 = b;
          });
          r3.greedy = true;
          r4 = crossroads.addRoute('/{a}/:b:/', function(a, b){
            var t7, t8;
            t7 = a;
            return t8 = b;
          });
          r4.greedy = true;
          crossroads.parse('/foo/lorem');
          expect(t1).toEqual('foo');
          expect(t2).toEqual('lorem');
          expect(t3).toBeUndefined();
          expect(t4).toBeUndefined();
          expect(t5).toBeUndefined();
          expect(t6).toBeUndefined();
          expect(t7).toBeUndefined();
          return expect(t8).toBeUndefined();
        });
      });
    });
    describe('default arguments', function(){
      return specify('should pass default arguments to all signals', function(){
        var t1, t2, t3, t4, t5, t6, t7, t8;
        crossroads.addRoute('foo', function(a, b){
          var t1, t2;
          t1 = a;
          return t2 = b;
        });
        crossroads.bypassed.add(function(a, b, c){
          var t3, t4, t5;
          t3 = a;
          t4 = b;
          return t5 = c;
        });
        crossroads.routed.add(function(a, b, c){
          var t6, t7, t8;
          t6 = a;
          t7 = b;
          return t8 = c;
        });
        crossroads.parse('foo', [123, 'dolor']);
        crossroads.parse('bar', ['ipsum', 123]);
        expect(t1).toEqual(123);
        expect(t2).toEqual('dolor');
        expect(t3).toEqual('ipsum');
        expect(t4).toEqual(123);
        expect(t5).toEqual('bar');
        expect(t6).toEqual(123);
        expect(t7).toEqual('dolor');
        return expect(t8).toEqual('foo');
      });
    });
    describe('rest params', function(){
      specify('should pass rest as a single argument', function(){
        var t1, t2, t3, t4, t5, t6, t7, t8, t9, r;
        r = crossroads.addRoute('{a}/{b}/:c*:');
        r.rules = {
          a: ['news', 'article'],
          b: /[\-0-9a-zA-Z]+/,
          'c*': ['foo/bar', 'edit', '123/456/789']
        };
        r.matched.addOnce(function(a, b, c){
          var t1, t2, t3;
          t1 = a;
          t2 = b;
          return t3 = c;
        });
        crossroads.parse('article/333');
        expect(t1).toBe('article');
        expect(t2).toBe('333');
        expect(t3).toBeUndefined();
        r.matched.addOnce(function(a, b, c){
          var t4, t5, t6;
          t4 = a;
          t5 = b;
          return t6 = c;
        });
        crossroads.parse('news/456/foo/bar');
        expect(t4).toBe('news');
        expect(t5).toBe('456');
        expect(t6).toBe('foo/bar');
        r.matched.addOnce(function(a, b, c){
          var t7, t8, t9;
          t7 = a;
          t8 = b;
          return t9 = c;
        });
        crossroads.parse('news/456/123/aaa/bbb');
        expect(t7).toBeUndefined();
        expect(t8).toBeUndefined();
        return expect(t9).toBeUndefined();
      });
      specify('should work in the middle of segment as well', function(){
        var t1, t2, t3, t4, t5, t6, t7, t8, t9, r;
        r = crossroads.addRoute('{a}/{b*}/{c}');
        r.rules = {
          a: ['news', 'article'],
          c: ['add', 'edit']
        };
        r.matched.addOnce(function(a, b, c){
          var t1, t2, t3;
          t1 = a;
          t2 = b;
          return t3 = c;
        });
        crossroads.parse('article/333/add');
        expect(t1).toBe('article');
        expect(t2).toBe('333');
        expect(t3).toBe('add');
        r.matched.addOnce(function(a, b, c){
          var t4, t5, t6;
          t4 = a;
          t5 = b;
          return t6 = c;
        });
        crossroads.parse('news/456/foo/bar/edit');
        expect(t4).toBe('news');
        expect(t5).toBe('456/foo/bar');
        expect(t6).toBe('edit');
        r.matched.addOnce(function(a, b, c){
          var t7, t8, t9;
          t7 = a;
          t8 = b;
          return t9 = c;
        });
        crossroads.parse('news/456/123/aaa/bbb');
        expect(t7).toBeUndefined();
        expect(t8).toBeUndefined();
        return expect(t9).toBeUndefined();
      });
      return specify('should handle multiple rest params even though they dont make sense', function(){
        var calls, r;
        calls = 0;
        r = crossroads.addRoute('{a}/{b*}/{c*}/{d}');
        r.rules = {
          a: ['news', 'article']
        };
        r.matched.add(function(a, b, c, d){
          expect(c).toBe('the');
          expect(d).toBe('end');
          return calls++;
        });
        crossroads.parse('news/456/foo/bar/this/the/end');
        crossroads.parse('news/456/foo/bar/this/is/crazy/long/the/end');
        crossroads.parse('article/weather/rain-tomorrow/the/end');
        return expect(calls).toBe(3);
      });
    });
    return describe('query string', function(){
      describe('old syntax', function(){
        return specify('should only parse query string if using special capturing group', function(){
          var r, t1, t2, t3;
          r = crossroads.addRoute('{a}?{q}#{hash}');
          r.matched.addOnce(function(a, b, c){
            var t1, t2, t3;
            t1 = a;
            t2 = b;
            return t3 = c;
          });
          crossroads.parse('foo.php?foo=bar&lorem=123#bar');
          expect(t1).toEqual('foo.php');
          expect(t2).toEqual('foo=bar&lorem=123');
          return expect(t3).toEqual('bar');
        });
      });
      describe('required query string after required segment', function(){
        return specify('should parse query string into an object and typecast vals', function(){
          var r, t1, t2;
          crossroads.shouldTypecast = true;
          r = crossroads.addRoute('{a}{?b}');
          r.matched.addOnce(function(a, b){
            var t1, t2;
            t1 = a;
            return t2 = b;
          });
          crossroads.parse('foo.php?lorem=ipsum&asd=123&bar=false');
          expect(t1).toEqual('foo.php');
          return expect(t2).toEqual({
            lorem: 'ipsum',
            asd: 123,
            bar: false
          });
        });
      });
      describe('required query string after optional segment', function(){
        return specify('should parse query string into an object and typecast vals', function(){
          var r, t1, t2, t3, t4;
          crossroads.shouldTypecast = true;
          r = crossroads.addRoute(':a:{?b}');
          r.matched.addOnce(function(a, b){
            var t1, t2;
            t1 = a;
            return t2 = b;
          });
          crossroads.parse('foo.php?lorem=ipsum&asd=123&bar=false');
          expect(t1).toEqual('foo.php');
          expect(t2).toEqual({
            lorem: 'ipsum',
            asd: 123,
            bar: false
          });
          r.matched.addOnce(function(a, b){
            var t3, t4;
            t3 = a;
            return t4 = b;
          });
          crossroads.parse('?lorem=ipsum&asd=123');
          expect(t3).toBeUndefined();
          return expect(t4).toEqual({
            lorem: 'ipsum',
            asd: 123
          });
        });
      });
      describe('optional query string after required segment', function(){
        return specify('should parse query string into an object and typecast vals', function(){
          var r, t1, t2, t3, t4;
          crossroads.shouldTypecast = true;
          r = crossroads.addRoute('{a}:?b:');
          r.matched.addOnce(function(a, b){
            var t1, t2;
            t1 = a;
            return t2 = b;
          });
          crossroads.parse('foo.php?lorem=ipsum&asd=123&bar=false');
          expect(t1).toEqual('foo.php');
          expect(t2).toEqual({
            lorem: 'ipsum',
            asd: 123,
            bar: false
          });
          r.matched.addOnce(function(a, b){
            var t3, t4;
            t3 = a;
            return t4 = b;
          });
          crossroads.parse('bar.php');
          expect(t3).toEqual('bar.php');
          return expect(t4).toBeUndefined();
        });
      });
      describe('optional query string after optional segment', function(){
        return specify('should parse query string into an object and typecast vals', function(){
          var r, t1, t2, t3, t4;
          crossroads.shouldTypecast = true;
          r = crossroads.addRoute(':a::?b:');
          r.matched.addOnce(function(a, b){
            var t1, t2;
            t1 = a;
            return t2 = b;
          });
          crossroads.parse('foo.php?lorem=ipsum&asd=123&bar=false');
          expect(t1).toEqual('foo.php');
          expect(t2).toEqual({
            lorem: 'ipsum',
            asd: 123,
            bar: false
          });
          r.matched.addOnce(function(a, b){
            var t3, t4;
            t3 = a;
            return t4 = b;
          });
          crossroads.parse('bar.php');
          expect(t3).toEqual('bar.php');
          return expect(t4).toBeUndefined();
        });
      });
      return describe('optional query string after required segment without typecasting', function(){
        return specify('should parse query string into an object and not typecast vals', function(){
          var r, t1, t2;
          r = crossroads.addRoute('{a}:?b:');
          r.matched.addOnce(function(a, b){
            var t1, t2;
            t1 = a;
            return t2 = b;
          });
          crossroads.parse('foo.php?lorem=ipsum&asd=123&bar=false');
          expect(t1).toEqual('foo.php');
          return expect(t2).toEqual({
            lorem: 'ipsum',
            asd: '123',
            bar: 'false'
          });
        });
      });
    });
  });
}).call(this);
