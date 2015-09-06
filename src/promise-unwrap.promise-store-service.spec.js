'use strict';

describe('PromiseUnwrap.PromiseStoreService', function() {

  var PromiseConstant,
      PromiseStoreService,
      $q,
      $rootScope;

  beforeEach(module('promise-unwrap'));
  beforeEach(inject(function($injector) {
    PromiseConstant = $injector.get('PromiseUnwrap.PromiseConstant');
    PromiseStoreService = $injector.get('PromiseUnwrap.PromiseStoreService');
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('CachedPromise', function() {
    var cp,
        deferred;

    beforeEach(function() {
      deferred = $q.defer();
      cp = new PromiseStoreService.CachedPromise(deferred.promise);
    });

    describe('on construction', function() {
      it('should have state === pending', function() {
        expect(cp.state).toEqual(PromiseConstant.promiseStates.pending);
      });

      it('should have the cp.promise === promise', function() {
        expect(cp.promise).toEqual(deferred.promise);
      });
    });

    describe('on promise resolution', function() {
      var resolvedValue = {};

      beforeEach(function() {
        deferred.resolve(resolvedValue);
        $rootScope.$digest();
      });

      it('should have state === resolved', function() {
        expect(cp.state).toEqual(PromiseConstant.promiseStates.resolved);
      });

      it('should have cp.resolved === resolvedValue', function() {
        expect(cp.resolved).toEqual(resolvedValue);
      });
    });

    describe('on promise rejection', function() {
      var rejectedValue = {};

      beforeEach(function() {
        deferred.reject(rejectedValue);
        $rootScope.$digest();
      });

      it('should have state === rejected', function() {
        expect(cp.state).toEqual(PromiseConstant.promiseStates.rejected);
      });

      it('should have cp.rejected === rejectedValue', function() {
        expect(cp.rejected).toEqual(rejectedValue);
      });
    });
  });

  describe('getCachedPromise', function() {
    describe('given we are passing in the same promise repeatedly', function() {
      var promise,
          cp1,
          cp2;

      beforeEach(function() {
        promise = $q.when();
        cp1 = PromiseStoreService.getCachedPromise(promise);
        cp2 = PromiseStoreService.getCachedPromise(promise);
      });

      it('should return a CachedPromise', function() {
        expect(cp1 instanceof PromiseStoreService.CachedPromise).toBe(true);
      });

      it('should return the same CachedPromise', function() {
        expect(cp1).toEqual(cp2);
      });
    });
  });

});