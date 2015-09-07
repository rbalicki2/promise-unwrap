# promise-unwrap

> Unwrap promises directly on the view, no controller necessary.

## What is promise-unwrap?

**promise-unwrap** is an Angular module that exposes directives that let you unwrap promises in your view, without the boilerplate of

```js
// in my-controller.js
var vm = this;
myService.asyncOp().then(function(results) {
  vm.results = results;
});
```

Instead, attach someService directly to the controller, and in the view:

```html
{{ myCtrl.myService.asyncOp() | resolvePromise }}
```

Resolve promise will return undefined (which will not render) before the promise has resolved, and if it is caught.

## API

### resolvePromise

Type: `filter`  
Parameter: `promise`  
Returns: `undefined` if the promise has not resolved or was rejected, and the resolved value if the promise has resolved.

### catchPromise

Type: `filter`  
Parameter: `promise`  
Returns: `undefined` if the promise has not resolved or was resolved, and the rejected value if the promise was rejected.

### promiseState

Type: `filter`  
Parameter: `promise`  
Returns: `'pending'`, `'resolved'` or `'rejected'`

## FAQ

### What if I need to operate on the results of an asynchronous call?

Example:

    {{ (myCtrl.myService.asyncOp() | resolvePromise ).data.members.count }}

Errors fail silently in Angular views, so nothing blows up before the promise resolves.

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