'use strict';

angular.module('promise-unwrap')
  .constant('PromiseUnwrap.PromiseConstant', {
    promiseStates: {
      pending: 'pending',
      resolved: 'resolved',
      rejected: 'rejected'
    }
  });