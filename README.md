# promise-unwrap

> Unwrap promises directly on the view, no controller necessary.

## What is promise-unwrap?

**promise-unwrap** is an Angular module that exposes filters that let you unwrap promises in your view, without the boilerplate of

```js
// in my-controller.js
var vm = this;
myService.asyncOp().then(function(results) {
  vm.results = results;
});
```

Instead, attach someService directly to the controller:

```js
// in my-controller.js
var vm = this;
vm.myService = myService;
```

And in the view:

```html
{{ myCtrl.myService.asyncOp() | resolvePromise }}
```

Resolve promise will return undefined (which will not render) before the promise has resolved, and if it is caught.

## How to use

* Include `promise-unwrap.min.js` in your HTML file, or concatenate it to your project's javascript file, etc.
* Import 'promise-unwrap' in your module.

```js
angular.module('my-module', [
  // all your other dependencies...
  'promise-unwrap'
]);
```

* Expose promises directly to the view, e.g.

```js
// in my-controller.js
var vm = this;
vm.myService = myService;
```

* And unwrap the promise directly in the view.

```html
{{ myCtrl.myService.asyncOp() | resolvePromise }}
```

## API

### resolvePromise

**Type:** `filter`  
**Parameter:** `promise`  
**Returns:** `undefined` if the promise has not resolved or was rejected, and the resolved value if the promise has resolved.

### catchPromise

**Type:** `filter`  
**Parameter:** `promise`  
**Returns:** `undefined` if the promise has not resolved or was resolved, and the rejected value if the promise was rejected.

### promiseState

**Type:** `filter`  
**Parameter:** `promise`  
**Returns:** `'pending'`, `'resolved'` or `'rejected'`

### PromiseUnwrap.PromiseStoreService

**Type:** `service`

#### CachedPromise

**Type:** `constructor`  
**Parameter:** `promise`  
**Returns:** `CachedPromise`

Each `CachedPromise cp` is an object with the following schema:

```js
cp.promise // original promise
cp.resolved // resolved value, if available
cp.rejected // rejected value, if available
cp.promiseState // 'pending', 'resolved' or 'rejected'
cp.remove() // removes cp from the PromiseStore
```

#### getCachedPromise

**Type:** `function`  
**Parameter:** `promise`  
**Returns:** An existing `CachedPromise` if it exists in the store, otherwise, a new `CachedPromise`. This new `CachedPromise` is put in the store.

## FAQ

### What if I need to operate on the results of an asynchronous call?

Example:

    {{ (myCtrl.myService.asyncOp() | resolvePromise ).data.members.count }}

Errors fail silently in Angular views, so nothing blows up before the promise resolves.

### What if my function returns a new instance of a promise every time?

The filters will not work with functions that return new promises every time, as the library compares promises for equality. If used in the view, you will immediately get an infinite digests error.

Example:

```js
// this will work
var asyncOpPromise;
function getAsyncThing() {
  if (!asyncOpPromise) {
    asyncOpPromise = someAsyncOperation();
  }
  return asyncOpPromise; // this promise is always the same reference
}

// this will not work
function getModifiedAsyncThing() {
  // .then returns a new promise every time... this will cause an infinite digest error
  return getAsyncThing().then(function(thing) {
    return thing + ' was modified';
  });
}

// Workaround 1: don't call "then" every time the function is called, but cache it.
var modifiedAsyncOpPromise;
function getModifiedAsyncThing() {
  if (!modifiedAsyncOpPromise) {
    modifiedAsyncOpPromise = getAsyncThing().then(function(thing) {
      return thing + ' was modified';
    });
  }
  return modifiedAsyncOpPromise;
}
```

```html
<!-- Workaround 2: Do the modifications directly in the view, if they are simple -->
<span ng-if="(myService.getAsyncThing() | promiseState) === 'resolved'">
  {{ (myService.getAsyncThing() | resolvePromise) + ' was modified' }}
</span>
```

## Run Tests

```sh
npm install
npm install -g gulp
gulp test
```

## Other commands

```sh
gulp
gulp lint
gulp test
gulp watch
gulp build
```

## Future

* Remove dependency on lodash
* Catch errors gracefully when the parameter to the filters is not a promise, or wrap the parameter in $q.when, etc.
* Thank you!

## Contact me

Robert Balicki, robert.balicki@gmail.com