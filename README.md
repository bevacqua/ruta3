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

```json

```

You'll get `null` back if no route matches the provided URL.

# License

MIT

<sub>_(originally derived from [routes][1], **which is no longer maintained**)_</sub>

[1]: https://github.com/aaronblohowiak/routes.js
