'use strict';

angular.module('promise-unwrap')

  .factory('PromiseUnwrap.PromiseStoreService', [

    'PromiseUnwrap.PromiseConstant',

    function(

      PromiseConstant

    ) {

      var promiseStore = [];

      CachedPromise.prototype.remove = removePromise;

      return {
        CachedPromise: CachedPromise,
        getCachedPromise: getCachedPromise
      };

      ///////////

      function CachedPromise (promise, options) {
        var self = this;

        self.promise = promise;
        self.state = PromiseConstant.promiseStates.pending;

        promise.then(function(val) {
          self.state = PromiseConstant.promiseStates.resolved;
          self.resolved = val;
        }, function(err) {
          self.state = PromiseConstant.promiseStates.rejected;
          self.rejected = err;
        });
      }

      function getCachedPromise (promise) {
        var cp = findCachedPromise(promise);

        if (!cp) {
          cp = new CachedPromise(promise);
          promiseStore.push(cp);
        }

        return cp;
      }

      function findCachedPromise (promise) {
      return _.find(promiseStore, function(cp) {
          return cp.promise === promise;
        });
      }

      function removeCachedPromise (cp) {
        // cp can be a CachedPromise or a promise
        var promise = cp.then ? cp : cp.promise;
        _.remove(promiseStore, function(cached) {
          cached.promise === promise;
        });
      }

      function removePromise () {
        // jshint validthis:true

        removeCachedPromise(this);
      }
    }

  ]);