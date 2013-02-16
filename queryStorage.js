(function (name, global, definition) {
  if (typeof require !== 'undefined' && typeof require.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('QueryStorage', this, function () {
  var arrayProto = Array.prototype
    , slice = arrayProto.slice
    , local = {}
    ;

  function QueryStorage() {

  }

  QueryStorage.create = function (form) {

  };

  QueryStorage.prototype.add = function (data) {

  };

  QueryStorage.prototype.addAll = function (datalist) {

  };

  QueryStorage.prototype.delete = function (name) {

  };

  QueryStorage.prototype.deleteAll = function (name) {

  };

  QueryStorage.prototype.deleteGroup = function (groupName) {

  };

  QueryStorage.prototype.deleteExcept = function (name) {

  };

  QueryStorage.prototype.deleteExceptGroup = function (groupName) {

  };

  QueryStorage.prototype.has = function (name) {

  };

  QueryStorage.prototype.hasGroup = function (groupName) {

  };

  QueryStorage.prototype.generateUrlParams = function () {

  };

  QueryStorage.prototype.generateHashData = function () {

  };

  QueryStorage.prototype.generateHiddenItems = function () {

  };

  function createObject(obj) {
    if (Object.create) {
      return Object.create(obj);
    }

    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = obj;
    return new F();
  }

  return QueryStorage;
});

