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

  function QueryStorage(form) {
    this.data = local.distillFormValues(form);
  }

  QueryStorage.create = function (form) {
    var queryStorage = createObject(QueryStorage.prototype)
      , args = slice.call(arguments);

    QueryStorage.apply(queryStorage, args);
    return queryStorage;
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

  local.distillFormValues = function (form) {
    var elementsList = form.elements
      , sendableTagPattern = /^(?:input|select|textarea|keygen)/i
      , notSendableTypePattern = /^(?:submit|button|image|reset|file)$/i
      , checkableTypePattern = /^(?:checkbox|radio)$/i
      , crlfPattern = /\r?\n/g
      , rPattern = /\r/g
      , dataset = []
      , elements
      , element
      , type
      , name
      , val
      , i
      , iz
      ;

    elements = (elementsList) ? nodeListToArray(elementsList) : form;
    for (i = 0, iz = elements.length; i < iz; i++) {
      element = elements[i];
      type = element.type;
      name = element.name;
      if (!(name &&
            !isDisabled(element) &&
            sendableTagPattern.test(element.nodeName) &&
            !notSendableTypePattern.test(type) &&
            (element.checked || !checkableTypePattern.test(type)))) {
        continue;
      }

      val = element.value;
      val = (typeof val === "string") ? val.replace(rPattern, "").replace(crlfPattern, "\r\n") : ((val == null) ? "" : val);
      dataset.push({name: name, value: val});
    }

    return dataset;
  };

  function isDisabled(element) {
    var matches = element.matchesSelector ||
      element.mozMatchesSelector ||
      element.webkitMatchesSelector ||
      element.oMatchesSelector ||
      element.msMatchesSelector
    ;

    if (matches) {
      return matches.call(element, ':disabled');
    }

    if (window.Sizzle) {
      return Sizzle.matchesSelector(element, ':disabled');
    }

    return element.disabled === true;
  }

  function nodeListToArray(nodelist) {
    var len, res;

    try {
      res = slide.call(nodelist);
    } catch (e) {
      res = [];
      len = nodelist.length || 0;
      while(len--) {
        res[len] = nodelist[len];
      }
    }

    return res;
  }

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

