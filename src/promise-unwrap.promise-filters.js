'use strict';

angular.module('promise-unwrap')
  .filter('resolvePromise', [

    'PromiseUnwrap.PromiseStoreService',

    function(PromiseStoreService) {
      return function(promise) {
        return PromiseStoreService.getCachedPromise(promise).resolved;
      };
    }

  ]);

angular.module('promise-unwrap')
  .filter('catchPromise', [

    'PromiseUnwrap.PromiseStoreService',

    function(PromiseStoreService) {
      return function(promise) {
        return PromiseStoreService.getCachedPromise(promise).rejected;
      };
    }

  ]);

angular.module('promise-unwrap')
  .filter('promiseState', [

    'PromiseUnwrap.PromiseStoreService',

    function(PromiseStoreService) {
      return function(promise) {
        return PromiseStoreService.getCachedPromise(promise).state;
      };
    }

  ]);