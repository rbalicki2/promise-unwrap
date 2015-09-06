'use strict';

describe('mb-promise-unwrap filters', function() {
  var resolvePromise,
      catchPromise,
      promiseState,
      PromiseConstant,
      $q,
      $rootScope;

  beforeEach(module('promise-unwrap'));

  beforeEach(inject(function($injector) {
    var $filter = $injector.get('$filter');

    resolvePromise = $filter('resolvePromise');
    catchPromise = $filter('catchPromise');
    promiseState = $filter('promiseState');

    PromiseConstant = $injector.get('PromiseUnwrap.PromiseConstant');
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
  }));

  describe('for unresolved promises', function() {
    var deferred;

    beforeEach(function() {
      deferred = $q.defer();
    });

    it('should return undefined for resolvePromise', function() {
      expect(resolvePromise(deferred.promise)).toEqual(undefined);
    });

    it('should return undefined for catchPromise', function() {
      expect(catchPromise(deferred.promise)).toEqual(undefined);
    });

    it('should have state === pending', function() {
      expect(promiseState(deferred.promise)).toEqual(PromiseConstant.promiseStates.pending);
    });
  });

  describe('for resolved promises', function() {
    var deferred,
        resolvedValue = {};

    beforeEach(function() {
      deferred = $q.defer();
      deferred.resolve(resolvedValue);

      // kick things off... note: this would happen automatically
      // in the view
      resolvePromise(deferred.promise);
      $rootScope.$digest();
    });

    it('should return resolvedValue for resolvePromise', function() {
      expect(resolvePromise(deferred.promise)).toEqual(resolvedValue);
    });

    it('should return undefined for catchPromise', function() {
      expect(catchPromise(deferred.promise)).toEqual(undefined);
    });

    it('should have state === resolved', function() {
      expect(promiseState(deferred.promise)).toEqual(PromiseConstant.promiseStates.resolved);
    });
  });

  describe('for rejected promises', function() {
    var deferred,
        rejectedValue = {};

    beforeEach(function() {
      deferred = $q.defer();
      deferred.reject(rejectedValue);

      // kick things off... note: this would happen automatically
      // in the view
      resolvePromise(deferred.promise);
      $rootScope.$digest();
    });

    it('should return undefined for resolvePromise', function() {
      expect(resolvePromise(deferred.promise)).toEqual(undefined);
    });

    it('should return rejectedValue for catchPromise', function() {
      expect(catchPromise(deferred.promise)).toEqual(rejectedValue);
    });

    it('should have state === rejected', function() {
      expect(promiseState(deferred.promise)).toEqual(PromiseConstant.promiseStates.rejected);
    });
  });
});