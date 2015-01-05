# ruta3

> Route matcher devised for shared rendering JavaScript applications

# Install

```shell
npm install --save ruta3
```

# Sample Usage

Get a router instance

```js
var ruta3 = require('ruta3');
var router = ruta3();
```

Add some routes

```js
router.addRoute('/articles', getArticles);
router.addRoute('/articles/:slug', getArticleBySlug);
router.addRoute('/articles/search/*', searchForArticles);
```

Find a match

```js
router.match('/articles');
```

You'll get `null` back if no route matches the provided URL. Otherwise, the route match will provide all the useful information you need inside an object.

Key               | Description
------------------|---------------------------------------------------------------------------------------
`action`          | The action passed to `addRoute` as a second argument. Using a function is recommended
`next`            | Fall through to the next route, or `null` if no other routes match
`route`           | The route passed to `addRoute` as the first argument
`params`          | An object containing the values for named parameters in the route
`splats`          | An object filled with the values for wildcard parameters

# License

MIT

<sub>_(originally derived from [routes][1], **which is no longer maintained**)_</sub>

[1]: https://github.com/aaronblohowiak/routes.js
