'use strict';

var pathToRegExp = require('./pathToRegExp');

function match (routes, uri, startAt) {
  var captures;
  var i = startAt || 0;

  for (var len = routes.length; i < len; ++i) {
    var route = routes[i];
    var re = route.re;
    var keys = route.keys;
    var splats = [];
    var params = {};

    if (captures = uri.match(re)) {
      for (var j = 1, len = captures.length; j < len; ++j) {
        var value = typeof captures[j] === 'string' ? decodeURIComponent(captures[j]) : captures[j];
        var key = keys[j - 1];
        if (key) {
          params[key] = value;
        } else {
          splats.push(value);
        }
      }

      return {
        params: params,
        splats: splats,
        route: route.src,
        next: i + 1,
        index: route.index
      };
    }
  }

  return null;
}

function routeInfo (path, index) {
  var src;
  var re;
  var keys = [];

  if (path instanceof RegExp) {
    re = path;
    src = path.toString();
  } else {
    re = pathToRegExp(path, keys);
    src = path;
  }

  return {
     re: re,
     src: path.toString(),
     keys: keys,
     index: index
  };
}

function Router () {
  if (!(this instanceof Router)) {
    return new Router();
  }

  this.routes = [];
  this.routeMap = [];
}

Router.prototype.addRoute = function (path, action) {
  if (!path) {
    throw new Error(' route requires a path');
  }
  if (!action) {
    throw new Error(' route ' + path.toString() + ' requires an action');
  }

  var route = routeInfo(path, this.routeMap.length);
  route.action = action;
  this.routes.push(route);
  this.routeMap.push([path, action]);
}

Router.prototype.match = function (uri, startAt) {
  var route = match(this.routes, uri, startAt);
  if (route) {
    route.action = this.routeMap[route.index][1];
    route.next = this.match.bind(this, uri, route.next);
  }
  return route;
}

module.exports = Router;
